<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/home" icon="home-o">
        <!-- 默认插槽 -->
        <span>首页</span>
        <!-- 具名插槽 -->
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/video" icon="search">
        <!-- 默认插槽 -->
        <span>视频</span>
        <!-- 具名插槽 -->
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/qa" icon="friends-o">
        <!-- 默认插槽 -->
        <span>问答</span>
        <!-- 具名插槽 -->
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/profile" icon="setting-o">
        <!-- 默认插槽 -->
        <span>我的</span>
        <!-- 具名插槽 -->
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped lang=less>
.layout-container{
  .van-tabbar{
    .toutiao{
      font-size: 38px;
    }
  }
}
</style>
