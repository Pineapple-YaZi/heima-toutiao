<template>
  <div>
    <!-- 顶部导航 -->
    <van-nav-bar
      :title="comment.reply_count ? comment.reply_count + '条回复' : '暂无回复' "
    >
      <template #left>
        <van-icon @click="$emit('closeReply')" name="cross" />
      </template>
    </van-nav-bar>
    <!-- 中间内容 -->
    <div class="scroll-center">
      <CommentItem :row="comment" />
      <van-cell title="全部回复" />
      <CommentList type="c" :source="comment.com_id" :list="list" />
    </div>
    <!-- 底部评论 -->
    <div class="post-warp">
      <van-button round @click="isShowPost=true">评论</van-button>
    </div>

    <van-popup v-model="isShowPost" position="bottom" >
    <CommentPost @onPostSuccess="onPostSuccess" :target="comment.com_id" :artId="$route.params.articleId" ></CommentPost>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '../../../components/CommentItem.vue'
import CommentList from '../../../components/CommentList.vue'
import CommentPost from './commentPost.vue'
export default {
  data () {
    return {
      list: [],
      isShowPost: false
    }
  },

  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  components: {
    CommentItem,
    CommentList,
    CommentPost
  },

  created () {

  },

  methods: {
    onPostSuccess (obj) {
      this.list.unshift(obj)
      this.isShowPost = false
    }
  }
}
</script>

<style scoped lang=less>
.post-warp {
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: teal;
  .van-button {
    width: 640px;
    height: 80px;
  }
}

.scroll-center{
  position: absolute;
  top: 92px;
  bottom: 102px;
  overflow-y: scroll;
  width: 100%;
}
</style>
