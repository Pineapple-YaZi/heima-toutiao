<template>
  <div class="search-container">
    <van-sticky>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296FA"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isShowResults = false"
      />
    </form>
    </van-sticky>

    <!-- 搜索结果 -->
    <SearchResults :searchText="searchText" v-if="isShowResults"></SearchResults>
    <!-- 搜索历史 -->
    <SearchHistory @delHistoryList="history = []" v-else-if="!searchText" :history="history" @search="onSearch"></SearchHistory>
    <!-- 联想建议 -->
    <SearchSuggestion @clickItem="onSearch" :searchText="searchText" v-else ></SearchSuggestion>

  </div>
</template>

<script>
import SearchHistory from './compontents/SearchHistory.vue'
import SearchResults from './compontents/SearchResults.vue'
import SearchSuggestion from './compontents/SearchSuggestion.vue'
import { setItem, getItem } from '../../utils/storage'
export default {
  data () {
    return {
      searchText: '',
      isShowResults: false,
      history: getItem('HMTT-HISTORY') || [] // 记录搜索历史
    }
  },

  components: {
    SearchHistory,
    SearchResults,
    SearchSuggestion
  },

  created () {

  },

  watch: {
    history: {
      deep: true,
      handler () {
        setItem('HMTT-HISTORY', this.history)
      }
    }
  },

  methods: {
    onSearch (val) {
      // 记录搜索历史
      this.history.unshift(val)
      // new Set es6新方法 可以实现数组去重
      this.history = [...new Set(this.history)]
      console.log(this.history)
      this.searchText = val
      this.isShowResults = true
    }
  }
}
</script>

<style scoped lang=less>
.search-container{
  .van-search__action{
    color: #fff;
  }
}
</style>
