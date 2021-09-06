<template>
  <div class="login-container">
    <van-nav-bar
      title="标题"
      class="page-nav-bar"
    />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="form.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="FormRules.mobile"
        type="number"
        maxlength="11"
      >
      <template v-slot:left-icon>
        <i class="toutiao toutiao-shouji"></i>
      </template>
      </van-field>
      <van-field
        v-model="form.code"
        name="code"
        placeholder="请输入验证码"
        :rules="FormRules.code"
        type="number"
        maxlength="6"
      >
      <!-- 左侧图标 -->
       <template v-slot:left-icon>
        <i class="toutiao toutiao-yanzhengma"></i>
      </template>
      <!-- 右侧按钮 -->
      <template #button>
      <van-count-down @finish="isShowCountDown = false" v-if="isShowCountDown" :time="60 * 1000" format="ss s" />
        <van-button
        v-else
        size="mini"
        native-type="button"
        class="send-btn"
        @click="onSendCode"
        >发送验证码</van-button>
      </template>
      </van-field>
      <div class="login-btn" >
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { sendCode, login } from '@/api/user.js'
import { Toast } from 'vant'
const mobileReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
export default {
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      },
      FormRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: mobileReg, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^[0-9]{6}$/, message: '请输入正确的验证码' }
        ]
      },
      isShowCountDown: false
    }
  },

  created () {

  },

  methods: {
    // 登录请求
    async onSubmit () {
      try {
        const { data: res } = await login(this.form)
        console.log(res.data)
        this.$store.commit('setUser', res.data)
        Toast.success('登录成功！')
        this.$router.push('/profile')
      } catch (err) {
        console.dir(err)
      }
    },
    // 发送验证码
    async onSendCode () {
      // this.$refs.form 通过ref获取表单组件
      // 这一行代码出异常了 验证失败
      // 没有异常 成功
      try {
        await this.$refs.form.validate('mobile') // 如果这一行代码出错 后续代码将不再执行 直接进入到catch阶段
      } catch (err) {
        if (err.response && err.response.status === 400) {
          return Toast.fail('验证码或手机号错误')
        }
        Toast('网络异常！')
      }
      // Toast.loading({
      //   message: '发送中...',
      //   forbidClick: true,
      //   duration: 0 // 持续展示
      // })
      // 校验成功 发送请求
      try {
        await sendCode(this.form.mobile)
        Toast('发送成功！')
        this.isShowCountDown = true
      } catch (err) {
        console.dir(err)
        if (err.response && err.response.status === 429) {
          return Toast('亲，操作过于频繁请稍后再试')
        }
        Toast('网络异常！')
      }
    }
  }
}
</script>

<style lang=less scoped>
.login-container{
  .toutiao {
    font-size: 37px;
  }

  .send-btn{
    width: 152px;
    height: 46px;
    background: #EDEDED;
    border-radius: 23px;
    color: #666;
  }
  .login-btn{
    margin: 53px 28px;
    .van-button{
      width: 694px;
      height: 88px;
      background: #6DB4FB;
      border-radius: 10px;
      border: none;
    }
  }
}
</style>
