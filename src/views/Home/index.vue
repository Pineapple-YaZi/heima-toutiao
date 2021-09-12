<template>
  <div class="home-container">
    <!-- 头部导航条 -->
    <van-nav-bar
      class="page-nav-bar"
      fixed
    >
    <template #title>
      <van-button class="search-btn" icon="search" to="/search" type="primary">按钮</van-button>
    </template>
    </van-nav-bar>

    <!-- 滑动导航栏 -->
    <van-tabs class="header-tabs" v-model="active" animated swipeable>
      <van-tab :title="item.name"  v-for="item in channels" :key="item.id">
        <ArticleList :channelId='item.id'></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="right-btn" @click="isShowEditPopup = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="placeholderBox"></div>
      </template>
    </van-tabs>

    <!-- 编辑弹出层 -->
    <van-popup
      v-model="isShowEditPopup"
      closeable
      position="bottom"
      :style="{ height: '90%' }"
      close-icon-position="top-left"
    >
    <ChannelEdit @updata-active="onUpdataActive" :myChannels = channels :activeIndex = active ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/ArticleList.vue'
import { getUserChannels } from '@/api/user.js'
import { Toast } from 'vant'
import ChannelEdit from './components/ChannelEdit.vue'
import { getItem } from '../../utils/storage'
export default {
  data () {
    return {
      active: 0,
      channels: [],
      isShowEditPopup: false
    }
  },

  created () {
    this.loadUserChannels()
  },

  components: {
    ArticleList,
    ChannelEdit
  },

  methods: {
    async loadUserChannels () {
      try {
        // 用户登录了 发送请求
        // 用户没登录 判断本地是否有数据
        // 本地有数据用本地
        // 本地没有数据发请求
        // 什么时候用本地数据 未登录 且本地有数据
        const localChannel = getItem('HMTT-CHANNELS')
        if (!this.$store.state.user && localChannel) {
          this.channels = localChannel
        } else {
          // 什么时候发请求
          const res = await getUserChannels()
          this.channels = res.channels
        }
      } catch (err) {
        Toast('登录过期！')
      }
    },
    onUpdataActive (index, isShow) {
      this.active = index
      this.isShowEditPopup = isShow
    }
  }
}
</script>

<style scoped lang=less>
.home-container {
  padding-top: 172px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }

  .search-btn {
    width: 555px;
    height: 64px;
    background: rgba(255, 255, 255, .2);
    border-radius: 32px;
    border: none;
    .van-icon-search{
      color: #fff;
    }
  }

  /deep/ .header-tabs {
    .van-tabs__wrap {
      height: 80px;
      border-bottom: 1px solid #EDEFF3;
      position:fixed;
      width: 100%;
      top: 92px;
      z-index: 2;
    }

    .van-tab {
      width: 200px;
      border-right: 1px solid #EDEFF3;
    }

    .van-tabs__nav--line {
      padding: 0;
    }

    /* 普通的tab */
    .van-tab {
      width: 200px;
      border-right: 1px solid #EDEFF3;
      .van-tab__text {
        font-size: 28px;
        color: #777;
      }
    }

    /* 选中的 */
    .van-tab--active {
      .van-tab__text {
        font-size: 30px;
        color: #333;
      }
    }

    /* 条 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296FA;
      border-radius: 3px;
      bottom: 8px;
    }

    .right-btn {
      z-index: 999;
      width: 66px;
      height: 80px;
      position: fixed;
      background-color: rgba(255, 255, 255, .9);
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .toutiao-gengduo{
        font-size: 33px;
      }
      &::before{
        content: '';
        width: 2px;
        height: 58px;
        background-image: url('../../assets/gradient-gray-line.png');
        position: absolute;
        left: 0;
        background-size: 100% 100%;
      }
    }

    .placeholderBox{
      width: 66px;
      flex-shrink: 0;
    }
  }
}
</style>
