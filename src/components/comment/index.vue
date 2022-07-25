<template>
  <div>
    <div class="comment" v-for="(item, index) in commentArr" :key="index">
      <div class="left"><img :src="item.aut_photo" alt="" /></div>
      <div class="count">
        <div class="name">{{ item.aut_name }}</div>
        <div class="comment">{{ item.content }}</div>
        <div>
          <div class="time">
            <span>{{ dayjs(item) }}</span>
            <van-button type="default" round @click="btn(item)"
              >回复{{ item.reply_count }}
              <div class="huifu">
                <van-cell is-link @click="showPopup"></van-cell>
                <van-popup
                  v-model="show"
                  closeable
                  close-icon-position="top-left"
                  position="bottom"
                  :style="{ height: '100%' }"
                  ><comments
                    :commentss="commentss"
                    :commentArrr="commentArrr"
                  ></comments
                ></van-popup></div
            ></van-button>
          </div>
        </div>
      </div>
      <div
        class="right"
        v-if="!item.is_liking"
        @click="thumbsUps(item.is_liking, item.com_id)"
      >
        <van-icon name="good-job-o" size="16px" /><span>赞</span>
      </div>
      <div class="right" v-else @click="thumbsUps(item.is_liking, item.com_id)">
        <van-icon name="good-job" size="16px" color="rgb(50, 150, 250);" /><span
          >赞</span
        >
      </div>
    </div>
  </div>
</template>

<script>
// 点赞 取消点赞
import { comment } from '@/api/comment'
// 获取评论回复
import dayjs from '@/utils/dayjs'
import comments from '@/components/comment/comments'
export default {
  props: {
    commentArr: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      // isThumbsUp: false,
      commentArrr: [],
      show: false,
      commentss: '',
      list: [],
      lists: []
    }
  },
  created() {
    // this.comment()
  },
  methods: {
    dayjs(item) {
      const time = dayjs(item.pubdate).fromNow()
      return time
    },

    // 点赞 取消点赞
    thumbsUps(isliking, id) {
      this.$emit('thumbsUps', isliking, id)
      // this.is_liking = !this.is_liking
      // console.log(id)
      // console.log(isliking, id)
      // if (!isliking) {
      //   try {
      //     const res = await thumbsUp(id)
      //     console.log(res)
      //   } catch (error) {
      //     // console.log(error)
      //   }
      // } else {
      //   try {
      //     const res = await cancelThumbsUp(id)
      //     console.log(res)
      //   } catch (error) {
      //     // console.log(error)
      //   }
      // }
    },
    // 评论的评论

    showPopup() {
      this.show = true
    },
    async btn(id) {
      console.log(id)
      this.commentss = id
      const res = await comment('c', id.com_id)
      console.log(res)
      this.commentArrr = res.data.data.results
      console.log(this.commentArrr)
    }
  },
  computed: {},
  components: {
    comments
  }
}
</script>

<style lang="less" scoped>
// 评论区域
.comment {
  width: 90%;
  height: 236px;
  // background-color: #333;
  display: flex;
  margin: auto;
  .left {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .count {
    width: 7rem;
    background-color: #fff;

    .name {
      color: #406599;
      font-size: 0.34667rem;
      padding-left: 25px;
      padding-top: 10px;
    }
    .comment {
      padding: 40px 0;
      font-size: 0.42667rem;
      color: #222;
      height: 30px;
    }
  }
  .time {
    width: 5.66667rem;
    span {
      font-size: 0.25333rem;
      color: #222;
      padding-left: 25px;
    }
    .van-button--round {
      margin-left: 50px;
      width: 1.8rem;
      height: 0.64rem;
      .van-button__text {
        padding: 0;
      }
      .van-button__text {
        padding-top: 40px;
      }
    }
    .van-cell__right-icon {
      height: 0;
      font-size: 0rem;
    }
  }
  .right {
    span {
      font-size: 30px;
      margin-left: 10px;
      // margin-bottom: 10px;
    }
  }
}
.huifu {
}
</style>
