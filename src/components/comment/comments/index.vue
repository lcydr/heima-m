<template>
  <div>
    <div class="hander">
      <span>{{ commentss.reply_count }}条回复</span>
    </div>
    <!-- top -->
    <div class="commit">
      <div class="left">
        <van-image
          width="36px"
          height="36px"
          round
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="count">
        <div class="a">
          <span>{{ commentss.aut_name }}</span>
        </div>
        <div class="b">
          <span>{{ commentss.content }}</span>
        </div>
        <div class="c">
          <span>{{ dayjs(commentss) }}</span>
          <van-button round class="btn3" size="mini"
            >回复{{ commentss.reply_count }}</van-button
          >
        </div>
      </div>
      <div class="right">
        <van-icon name="good-job-o" size="16px" /><span>赞</span>
      </div>
    </div>
    <!-- bottom -->
    <div class="commit" v-for="(item, index) in commentArrr" :key="index">
      <div class="left">
        <van-image width="36px" height="36px" round :src="item.aut_photo" />
      </div>
      <div class="count">
        <div class="a">
          <span>{{ item.aut_name }}</span>
        </div>
        <div class="b">
          <span>{{ item.content }}</span>
        </div>
        <div class="c">
          <span>{{ dayjs(item) }}</span>
          <van-button round class="btn3" size="mini"
            >回复{{ item.reply_count }}</van-button
          >
        </div>
      </div>
      <div class="right">
        <van-icon name="good-job-o" size="16px" /><span>赞</span>
      </div>
    </div>
    <div class="foots">
      <van-button round class="foot" type="default">
        <van-cell is-link @click="showPopup" round>评论</van-cell>
        <van-popup v-model="show" position="bottom" :style="{ height: '19%' }">
          <div class="pinglun">
            <div class="pingl">
              <van-field
                class="text"
                v-model="message"
                rows="2"
                :autosize="false"
                type="textarea"
                maxlength="50"
                placeholder="请输入留言"
                show-word-limit
              />
            </div>
            <div class="fabu" @click="release">发布</div>
          </div>
        </van-popup></van-button
      >
    </div>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { getComment } from '@/api/comment'
export default {
  props: {
    commentss: {
      type: [String, Object],
      require: true
    },
    commentArrr: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      show: false,
      message: ''
    }
  },
  created() {
    console.log(this.$route.params.id)
  },
  methods: {
    dayjs(item) {
      const time = dayjs(item.pubdate).fromNow()
      return time
    },
    showPopup() {
      this.show = true
    },
    // 对文章进行评论

    async release() {
      if (this.message.trim() === '') {
        this.$toast.fail('评论不能为空')
        this.show = false
      } else {
        try {
          const res = await getComment(
            this.commentss.com_id,
            this.message,
            this.$route.params.id
          )
          console.log(res)
          this.$toast.success('评论成功', res)
          this.show = false
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.hander {
  height: 102px;
  border-bottom: 1px solid #999;
  font-size: 0.42667rem;
  color: #323233;
  display: flex;
  align-items: center;
  justify-content: center;
}
// 评论区域
.commit {
  display: flex;
  height: 240px;
  width: 90%;
  margin: auto;
  margin-top: 20px;
  border-bottom: 1px solid #999;
  // background-color: #333;
  .count {
    width: 530px;
    // background-color: #fff;
    .a {
      height: 60px;
      // background-color: #333;
      display: flex;
      align-items: center;
      span {
        padding-left: 20px;
        // margin-top: 50px;
      }
    }
    .b {
      height: 60px;
      // background-color: #333;
      display: flex;
      align-items: center;
      margin-top: 20px;
      span {
        padding-left: 20px;
      }
    }
    .c {
      height: 60px;
      // background-color: #333;
      display: flex;
      align-items: center;
      margin-top: 20px;
      span {
        padding-left: 20px;
      }
      .btn3 {
        margin-left: 50px;
        .van-button__text {
          padding: 0;
        }
      }
    }
    .right {
      span {
        font-size: 0.4rem;
        margin-left: 10px;
        // margin-bottom: 10px;
      }
    }
  }
}
// 底部
.foots {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: pink;
  height: 100px;
}
.foot {
  position: fixed;
  bottom: 0;
  left: 10%;

  // background-color: pink;
}
/deep/.van-button--normal {
  width: 600px;
  margin-bottom: 5px;
}
.pinglun {
  // z-index: 99999;
  display: flex;
  align-items: center;
  .pingl {
    // width: 100px;
    width: 600px;
    .van-field {
      width: 99%;
      margin-left: 30px;
      margin-top: 30px;
      background-color: #f5f7f9;
    }
  }
  .fabu {
    height: 100px;
    font-size: 30px;
    color: #6ba3d8;
    margin-left: 0.6rem;
    margin-top: 1.3rem;
  }
}
</style>
