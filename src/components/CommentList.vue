<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <!-- <van-cell  :title="item.content" /> -->
      <CommentItem @clickReply="$emit('clickReply', $event)" :row="item" v-for="item in list" :key="item.com_id + ''"></CommentItem>
    </van-list>
  </div>
</template>

<script>
import { getComment } from '../api/article'
import CommentItem from './CommentItem.vue'
export default {
  data () {
    return {
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
    },
    list: {
      type: Array,
      required: true
    }
  },

  components: {
    CommentItem
  },

  created () {
    this.onLoad()
  },

  methods: {
    async onLoad () {
      // 发送请求
      const res = await getComment({
        type: this.type,
        source: this.source + '',
        offset: this.offset,
        limit: this.limit
      })
      console.log(res.total_count)
      this.$emit('updataCount', res.total_count)
      // 保存数据
      this.list.push(...res.results)
      // 关闭loading
      this.loading = false
      // 判断是否加载完成全部数据
      if (!res.last_id || this.list.length >= res.total_count) {
        this.finished = true
      } else {
        this.offset = res.last_id
      }
    }
  }
}
</script>

<style scoped>

</style>
