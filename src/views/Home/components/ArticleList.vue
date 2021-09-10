<template>
  <div class="articleList">
    <van-pull-refresh
    v-model="isPullLoging"
    @refresh="onRefresh"
    :success-text="pullText"
    success-duration=1500
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        error-text="请求失败，点击重新加载"
        :error.sync="error"
      >
        <ArticleItem :articleItem="item" v-for="item in list" :key="item.art_id"/>

      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article.js'
import { Toast } from 'vant'
import ArticleItem from '@/components/articleItem.vue'
export default {
  props: {
    channelId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      preTimestamp: null,
      error: false,
      isPullLoging: false,
      pullText: ''
    }
  },

  components: {
    ArticleItem
  },

  created () {

  },

  methods: {
    // 列表初次显示
    // 加载的数据不能显示一整屏
    // 触底时候
    async onLoad () {
      // 1、发送请求获取数据
      try {
        const res = await getArticleList({
          channel_id: this.channelId,
          timestamp: this.preTimestamp || Date.now(),
          with_top: 1
        })
        if (Math.random() > 0.2) {
          console.lg('123')
        }
        // 2、保存数据
        this.list.push(...res.results)
        this.preTimestamp = res.pre_timestamp
        // 3、加载状态结束
        this.loading = false
        // 4、数据全部加载完成
        if (!this.preTimestamp) {
          this.finished = true
        }
      } catch (err) {
        Toast.clear()
        this.error = true
        this.loading = false
      }
    },
    // 下拉刷新
    async onRefresh () {
      try {
        const res = await getArticleList({
          channel_id: this.channelId,
          timestamp: Date.now(),
          with_top: 1
        })
        if (Math.random() > 0.2) {
          console.lg('132')
        }
        this.list.unshift(...res.results)
        this.isPullLoging = false
        this.pullText = '刷新成功'
      } catch (err) {
        this.isPullLoging = false
        console.log('刷新失败！')
        this.pullText = '刷新失败，请稍后再试'
      }
    }
  }
}
</script>

<style scoped lang=less>
.articleList{
  height: 80vh;
  overflow: scroll;
}

</style>
