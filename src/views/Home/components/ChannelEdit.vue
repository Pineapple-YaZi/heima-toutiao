<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <div class="my-channel channel">
      <van-cell :border="false" title="我的频道" >
        <template>
          <van-button plain round
          color="#e94242"
          size="mini"
          @click="isEdit = !isEdit"
          > &emsp;{{isEdit ? '完成' : '编辑'}}&emsp; </van-button>
        </template>
      </van-cell>
      <!-- 我的频道列表 -->
      <van-grid :gutter="10">
        <van-grid-item
          v-for="(item, index) in myChannels"
          :icon=" (isEdit && index !==0 ) ? 'close' : ''"
          :key="item.id"
          :text="item.name"
          :class="{ active: index === activeIndex }"
          @click="onClickMyChannel(index, item.id)"
        />
        </van-grid>
    </div>

    <!-- 推荐频道 -->
    <div class="recommend-channel channel">
      <van-cell :border="false" title="推荐频道" ></van-cell>
      <!-- 推荐频道列表 -->
      <van-grid :gutter="10" direction="horizontal" icon-size="0.32rem">
        <van-grid-item @click="addToMyChannel(item)" v-for="item in recommendChannels" icon="plus"  :key="item.id" :text="item.name" />
      </van-grid>
    </div>

  </div>
</template>

<script>
import { getAllChannel, addUserChannel, deleteUserChannel } from '@/api/channel'
import { Toast } from 'vant'
import { mapState } from 'vuex'
import { setItem } from '../../../utils/storage'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    // 决定哪一项被选中
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },

  computed: {
    // 推荐频道数据
    // 循环全部的频道数据
    recommendChannels () {
      // 循环判断我的频道数据是否包含在全部数据中，在返回false 不在返回true
      return this.allChannels.filter(channelItem => {
        return !this.myChannels.some(myChannel => myChannel.id === channelItem.id)
      })
    },
    ...mapState(['user'])
  },

  created () {
    this.loadAllChannel()
  },

  methods: {
    async loadAllChannel () {
      try {
        const { channels } = await getAllChannel()
        this.allChannels = channels
      } catch (err) {
        Toast('网络异常！')
      }
    },

    addToMyChannel (item) {
      // 数据持久化 判断用户是否登录
      this.myChannels.push(item)
      console.log(this.user)
      if (this.user) {
        console.log(this.user)
        addUserChannel({
          id: item.id,
          seq: this.myChannels.length
        })
      } else {
        setItem('HMTT-CHANNELS', this.myChannels)
      }
    },
    // 点击我的频道
    onClickMyChannel (index, id) {
      if (this.isEdit) {
        if (index === 0) return
        if (index <= this.activeIndex) {
          this.$emit('updata-active', this.activeIndex - 1, true)
        }
        this.myChannels.splice(index, 1)
        // 进行持久化
        this.deleteStorage(id)
      } else {
        this.$emit('updata-active', index)
      }
    },

    // 删除持久化
    deleteStorage (id) {
      // 判断是否登录
      if (this.user) {
        deleteUserChannel(id)
      } else {
        setItem('HMTT-CHANNELS', this.myChannels)
      }
    }
  }
}
</script>

<style scoped lang=less>
.channel-edit{
  padding-top: 90px;
  /* 公共样式 */
  .channel{
    /deep/.van-grid {
      .van-grid-item__content {
        width: 160px;
        height: 86px;
        background-color: #F4F5F6;
        border-radius: 6px;
        .van-grid-item__text {
          font-size: 28px;
          color: #222;
        }

        .van-grid-item__content::after {
          border: none;
        }
      }
    }
  }

  /deep/ .active{
    .van-grid-item__text{
      color: tomato !important;
    }
  }
  /* 我的频道 */
  .my-channel{
    /deep/ .van-grid-item__icon+.van-grid-item__text{
      margin-top: 0;
    }
    .van-cell{
      display: flex;
      align-items: center;
    }

    /deep/.van-icon-close {
      position: absolute;
      font-size: 32px;
      right: -10px;
      top: -10px;
    }
  }
}
</style>
