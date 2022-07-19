<template>
  <div>
    <!-- 0 -->
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
    />
    <!-- 1 -->
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      ></van-image>
    </van-cell>

    <!-- 3 -->
    <van-cell v-if="articleInfo.cover.type === 3">
      <template #label>
        <div>
          <van-image
            v-for="(item, index) in articleInfo.cover.images"
            :key="index"
            width="3rem"
            height="2rem"
            :src="item"
          >
          </van-image>
        </div>
        <span>{{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  name: 'articleInfo',
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // articleDesc: 0
    }
  },
  computed: {
    // 文章叙述
    articleDesc() {
      const arr = this.articleInfo
      const relativeTime = dayjs(arr.pubdate).fromNow()
      return `${arr.aut_name} ${arr.comm_count}评论 ${relativeTime}`
    }
  }
}
</script>

<style></style>
