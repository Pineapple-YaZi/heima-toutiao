<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="黑马头条"
    >
    <template #left>
      <van-icon @click="$router.back()" color="#fff" name="arrow-left" />
    </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="isLoading" class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.art_id" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{ article.pubdate |formatDate }}</div>
          <!-- <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-if="!article.is_followed"
            @click="onFollowed"
          >关注</van-button>
          <van-button
            class="follow-btn"
            round
            size="small"
            v-else
            @click="onFollowed"
          >已关注</van-button> -->
          <FollowedUser v-model="article.is_followed" :autId="article.aut_id" :isFollowed="article.is_followed"></FollowedUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div ref="content" class="article-content" v-html="article.content">这是文章内容</div>
        <van-divider>正文结束</van-divider>
        <CommentList @clickReply="onClickReply" :list="list" @updataCount="totalCount = $event" :source="article.art_id"></CommentList>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="is404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticleInfo">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <!-- 因为页面刚渲染时article没有数据 所以传给子组件的数据为空 因此这个组件应该先隐藏 等article获取到数据之后在进行渲染 -->
    <div v-if="article.art_id" class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isShowPost = true"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        :badge="totalCount"
        color="#777"
      />
      <ArtCollect @onArtCol="article.art_id = $event" :artId="article.art_id" v-model="article.is_collected"></ArtCollect>
      <van-icon
        color="#777"
        name="good-job-o"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <!-- 弹出层 -->
    <van-popup v-model="isShowPost" position="bottom" >
      <CommentPost @onPostSuccess="onClose" :target="articleId"></CommentPost>
    </van-popup>
    <!-- 恢复评论弹出层 -->
    <van-popup
      v-model="isShowReply"
      position="bottom"
      :style="{ height: '100%' }"
    >
    <CommentReply v-if="isShowReply" @closeReply="isShowReply = false" :comment="comment" />
    </van-popup>
  </div>
</template>

<script>
import { getArticleDetail } from '../../api/article'
import { ImagePreview } from 'vant'
import './github-markdown.css'
import FollowedUser from '@/components/FollowedUser.vue'
import CommentList from '@/components/CommentList.vue'
import ArtCollect from '../../components/artCollect.vue'
import CommentPost from './components/commentPost.vue'
import CommentReply from './components/commentReply'
export default {
  data () {
    return {
      article: {},
      isLoading: true,
      is404: false,
      totalCount: 0,
      isShowPost: false,
      list: [],
      isShowReply: false,
      comment: {}
    }
  },

  props: {
    articleId: {
      type: String,
      required: true
    }
  },

  components: {
    FollowedUser,
    ArtCollect,
    CommentList,
    CommentPost,
    CommentReply
  },

  created () {
    this.loadArticleInfo()
  },

  methods: {
    // 获取文章详情数据
    async loadArticleInfo () {
      this.isLoading = true
      try {
        const res = await getArticleDetail(this.articleId)
        this.article = res
        this.isLoading = false
        this.$nextTick(() => {
          this.previewImg()
        })
      } catch (err) {
        this.isLoading = false
        if (err.response && err.response.status === 404) {
          this.is404 = true
        }
        console.dir(err)
      }
    },
    // 图片点击事件
    previewImg () {
      const contentEl = this.$refs.content
      const imgs = contentEl.querySelectorAll('img')
      // 定义一个数组
      const images = []
      imgs.forEach((item, index) => {
        // 每次循环把每一项的图片地址push到数组中
        images.push(item.src)
        // 给每一项添加点击事件
        item.onclick = function () {
          // vant 图片预览方法
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    onClose (obj) {
      this.isShowPost = false
      this.list.unshift(obj)
    },
    onClickReply (comment) {
      this.isShowReply = true
      this.comment = comment
    }
    // 点击关注或取消关注
    // async onFollowed () {
    //   try {
    //     if (this.article.is_followed) {
    //       // 当前关注 点击取消关注
    //       await removeFollowUser(this.article.aut_id)
    //       Toast.success('关注成功！')
    //     } else {
    //       // 当前未关注 点击添加关注
    //       await addFollowUser(this.article.aut_id)
    //       Toast.success('取消成功！')
    //     }
    //     this.article.is_followed = !this.article.is_followed
    //   } catch (err) {
    //     Toast.fail('操作失败')
    //   }
    // }

  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
