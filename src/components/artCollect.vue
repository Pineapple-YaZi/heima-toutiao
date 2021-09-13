<template>
  <van-icon
    @click="onCollected"
    :color="value ? '#ffc700' : '#777'"
    :name="value ? 'star' : 'star-o'"
  />
</template>

<script>
import { Toast } from 'vant'
import { addCollected, removeCollected } from '../api/article'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    artId: {
      type: [Number, Object],
      required: true
    }
  },
  data () {
    return {

    }
  },

  created () {

  },

  methods: {
    async onCollected () {
      try {
        if (this.value) {
          // 收藏 点击取消收藏
          await removeCollected(this.artId)
          Toast.success('取消成功')
        } else {
          // 未收藏 点击收藏
          await addCollected(this.artId)
          Toast.success('收藏成功')
        }
        this.$emit('input', !this.value)
      } catch (err) {
        Toast.fail('操作失败！')
      }
    }
  }
}
</script>

<style scoped>

</style>
