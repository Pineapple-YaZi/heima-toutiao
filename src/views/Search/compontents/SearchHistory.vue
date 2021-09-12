<template>
  <div class="search-container">
    <van-cell title="搜索历史">
      <template >
        <div class="rightText"  v-if="isDel">
          <!-- <span @click="history.splice(0)">全部删除</span> -->
          <span @click="$emit('delHistoryList')">全部删除</span>
          <span @click="isDel = !isDel" >完成</span>
        </div>
        <van-icon name="delete-o" v-else  @click="isDel = !isDel"/>
      </template>
    </van-cell>
    <!-- 历史列表 -->
    <van-cell v-for="(item,index) in history" :key="item" :title="item" @click="delHistory(index)" >
      <template>
        <van-icon name="close" v-if="isDel" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    history: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      isDel: false
    }
  },

  created () {

  },

  methods: {
    delHistory (i) {
      if (this.isDel) {
        this.history.splice(i, 1)
      } else {
        this.$emit('search', this.history[i])
      }
    }
  }
}
</script>

<style scoped lang=less>
.search-container{
  .rightText{
    span:nth-child(1){
    margin-right: 10px;
    }
  }
}
</style>
