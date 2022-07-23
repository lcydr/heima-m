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
        <ArticleItem
          v-for="(item, index) in articles"
          :key="index"
          :articleInfo="item"
        ></ArticleItem
      ></van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/news.js'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  props: {
    // 频道id
    id: {
      type: [String, Number],
      require: true
    }
  },
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      finished: false,
      loading: false,
      error: false,
      refreshLoading: false
    }
  },

  created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        console.log(data)
        this.pre_timestamp = data.data.pre_timestamp

        this.articles = data.data.results
        console.log(this.articles)
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请重新刷新')
        }
      }
    },
    // 加载下一页频道数据
    async loadNextPage() {
      try {
        if (Math.random() < 0.7) {
          throw new Error('错误了')
        }
        const { data } = await getArticleList(this.id, this.pre_timestamp)

        if (!data.data.pre_timestamp) {
          this.finished = true
        }

        // 将第n页的数据，放在articles
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        this.articles.push(...data.data.results)
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
  },
  components: {
    ArticleItem
  }
}
</script>

<style></style>
