<template>
  <div>
    <van-button
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      v-if="!isFollowed"
      @click="onFollowed"
    >关注</van-button>
    <van-button
      class="follow-btn"
      round
      size="small"
      v-else
      @click="onFollowed"
    >已关注</van-button>
  </div>
</template>

<script>
import { addFollowUser, removeFollowUser } from '../api/user'
import { Toast } from 'vant'
export default {
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    autId: {
      type: [Number, Object],
      require: true
    }
  },

  model: {
    prop: 'isFollowed',
    event: 'updataFollow'
  },

  data () {
    return {

    }
  },

  created () {

  },

  methods: {
    async onFollowed () {
      try {
        if (this.isFollowed) {
          // 当前关注 点击取消关注
          await removeFollowUser(this.autId)
          Toast.success('关注成功！')
        } else {
          // 当前未关注 点击添加关注
          await addFollowUser(this.autId)
          Toast.success('取消成功！')
        }
        this.$emit('updataFollow', !this.isFollowed)
      } catch (err) {
        Toast.fail('操作失败')
      }
    }
  }
}
</script>

<style scoped lang=less>
.follow-btn {
  width: 170px;
  height: 58px;
}
</style>
