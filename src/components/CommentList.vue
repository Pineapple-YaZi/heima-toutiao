<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.com_id + ''" :title="item.content" />
    </van-list>
  </div>
</template>

<script>
import { getComment } from '../api/article'
export default {
  data () {
    return {
      list: [],
      loading: false, // 控制是否在加载中 为false停止加载
      finished: false, // 控制数据是否全部加载完毕 为 true 不再加载数据
      offset: null,
      limit: 10
    }
  },

  props: {
    type: {
      type: String,
      default: 'a'
    },
    source: {
      type: [Number, Object, String],
      required: true
    }
  },

  created () {

  },

  methods: {
    async onLoad () {
      // 发送请求
      const res = await getComment({
        type: this.type,
        source: this.source,
        offset: this.offset,
        limit: this.limit
      })
      // 保存数据
      this.list.push(...res.results)
      // 关闭loading
      this.loading = false
      // 判断是否加载完成全部数据
      if (res.last_id) {
        this.offset = res.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped>

</style>
