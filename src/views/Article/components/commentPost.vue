<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      :disabled="!message"
      @click="onSend"
    >发布</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { postComment } from '../../../api/article'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    artId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSend () {
      try {
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0 // 持续展示
        })
        const res = await postComment({
          target: this.target + '',
          content: this.message,
          art_id: this.artId
        })
        Toast.success('评论成功')
        this.$emit('onPostSuccess', res.new_obj)
        this.message = ''
      } catch (err) {
        Toast.fail('评论失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
