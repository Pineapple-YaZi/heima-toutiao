<template>
  <div>
    <van-cell @click="onClickItem(item)" v-for="(item,index) in suggestions" :key="index" :title="item" icon="search" >
      <template #title>
        <div v-html="formatStr(item)"></div>
      </template>
    </van-cell>
    <!-- 搜索提示 -->
    <van-empty v-if="!suggestions.length" image="search" description="暂无匹配结果~" />
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { Toast } from 'vant'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      suggestions: []
    }
  },

  watch: {
    // 监听父组件输入框的变化
    searchText: {
      immediate: true, // 首次监听
      handler (newVal) {
        // 防抖
        this.setId && clearTimeout(this.setId)
        this.setId = setTimeout(() => {
          this.loadSearchSug()
        }, 800)
      }
    }
  },

  created () {

  },

  beforeDestroy () {
    clearTimeout(this.setId)
  },

  methods: {
    async loadSearchSug () {
      try {
        const { options: res } = await getSearchSuggestion(this.searchText)
        this.suggestions = res
      } catch (err) {
        Toast('获取联想建议失败')
      }
    },
    formatStr (str) {
      const reg = new RegExp(this.searchText, 'gi')
      return str.replace(reg, `<span style="color: red">${this.searchText}</span>`)
    },
    onClickItem (item) {
      this.$emit('clickItem', item)
    }
  }
}
</script>

<style scoped>

</style>
