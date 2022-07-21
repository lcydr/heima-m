<template>
  <div>
    <!-- 每一篇文章的结构 -->
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPage"
      success-text="刷新成功~"
    >
      <van-list
        v-model="loading"
        @load="loadNextPage"
        :offset="1"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <div v-for="(item, index) in resultsArr" :key="index" class="result">
          <div class="text">{{ item.title }}</div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  props: {
    results: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      resultsArr: [],
      pre_timestamp: '',
      finished: false,
      loading: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getSearchResult()
  },
  methods: {
    async getSearchResult() {
      // console.log(this.results)
      try {
        const res = await getSearchResult(this.results)
        console.log(res)
        this.pre_timestamp = res.data.data.pre_timestamp
        this.resultsArr = res.data.data.results
        console.log(this.resultsArr)
      } catch (error) {}
    },
    onLoad() {},
    // 加载下一页频道数据
    async loadNextPage() {
      try {
        if (Math.random() < 0.7) {
          throw new Error('错误了')
        }
        const { data } = await getSearchResult(this.results)

        if (!data.data.pre_timestamp) {
          this.finished = true
        }

        // 将第n页的数据，放在articles
        if (this.refreshLoading) {
          this.resultsArr.unshift(...data.data.results)
        } else {
          this.resultsArr.push(...data.data.results)
        }
        this.resultsArr.push(...data.data.results)
        // 更新页数
        this.pre_timestamp = data.data.pre_timestamp
        this.loading = false
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.result {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0.26667rem 0.42667rem;
  overflow: hidden;
  color: #323233;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  background-color: #fff;
}
</style>
