<template>
  <div>
    <!-- 导航 -->
    <div>
      <van-nav-bar title="黑马头条" left-arrow @click-left="onClickLeft" />
    </div>
    <!-- 标题 -->
    <div class="title">
      <h1>{{ DetailsArr.title }}</h1>
    </div>
    <!-- 用户 -->
    <div class="user">
      <div class="left">
        <div class="left"><img :src="DetailsArr.aut_photo" alt="" /></div>
        <div class="right1">
          <p class="text1">{{ DetailsArr.aut_name }}</p>
          <p class="text2">{{ relativeTime }}</p>
        </div>
      </div>
      <div class="right" v-if="!DetailsArr.is_followed" @click="Follow">
        <van-button type="default" round
          ><van-icon name="plus" /> 关注</van-button
        >
      </div>
      <div class="right" v-else @click="Follow">
        <van-button type="default" round> 已关注</van-button>
      </div>
    </div>
    <!-- 内容 -->
    <div>
      <article v-html="content" class="markdown-body markdown-img1"></article>
    </div>
    <!-- 正文结束 -->
    <div class="textEnd"><span>正文结束</span></div>
    <!-- 评论区域 -->
    <van-list
      v-model="loading"
      :finished="finished"
      :offset="1"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <Comment :commentArr="commentArr" @thumbsUps="thumbsUps"></Comment>
    </van-list>
    <!-- 没有更多了 -->
    <div class="textEnd1"><span>没有更多了</span></div>
    <!-- 底部固定导航 -->
    <div class="foot">
      <div class="foots">
        <div class="left">
          <van-cell is-link @click="showPopup" round>写评论</van-cell>
          <van-popup
            v-model="show"
            position="bottom"
            :style="{ height: '19%' }"
          >
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
          </van-popup>
        </div>
        <div class="right">
          <span
            ><van-icon
              name="comment-o"
              size="20px"
              :badge="this.commentAr.total_count"
          /></span>
          <span v-if="!DetailsArr.is_collected" @click="Collection"
            ><van-icon name="star-o" size="20px"
          /></span>
          <span v-if="DetailsArr.is_collected" @click="Collection"
            ><van-icon name="star" color="#6ba3d8" size="20px"
          /></span>
          <span v-if="DetailsArr.attitude === -1" @click="ArticleLikes1"
            ><van-icon name="good-job-o" size="20px"
          /></span>
          <span v-if="DetailsArr.attitude === 1" @click="ArticleLikes1"
            ><van-icon name="good-job" size="20px" color="#6ba3d8"
          /></span>
          <span class="aaa">
            <van-cell @click="showShare = true"
              ><van-icon name="share" size="20px"
            /></van-cell>
            <van-share-sheet
              v-model="showShare"
              title="立即分享给好友"
              :options="options"
              @select="onSelect"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import dayjs from '@/utils/dayjs'
// 文章详情
import { Details } from '@/api/details'
// 收藏文章
import { Collection, CancelFavorites } from '@/api/collection'
// 点赞
import { ArticleLikes, CancelArticleLikes } from '@/api/articleLikes'
// 关注
import { Follow, CancelFollow } from '@/api/follow'
import Comment from '@/components/comment/index.vue'
// 获取评论回复  对文章评论
import { comment, getComment, cancelThumbsUp, thumbsUp } from '@/api/comment'
export default {
  data() {
    return {
      content: '',
      DetailsArr: [],
      show: false,
      message: '',
      relativeTime: '',
      relativeTimes: '',
      showShare: false,
      commentArr: [],
      commentAr: [],
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ],
      loading: false,
      finished: false,
      list: []
    }
  },
  mounted() {
    console.log(this.$route.params.id)
  },
  created() {
    this.Details()
    this.Collection()
    this.comment()
  },
  methods: {
    // 文章详情
    async Details() {
      try {
        const res = await Details(this.$route.params.id)
        // console.log(res)
        this.DetailsArr = res.data.data
        this.content = res.data.data.content
        // console.log(this.DetailsArr)
        this.relativeTime = dayjs(this.DetailsArr.pubdate).fromNow()
      } catch (error) {
        console.log(error)
      }
    },
    // 收藏文章
    async Collection() {
      if (this.DetailsArr.is_collected === true) {
        await CancelFavorites(this.$route.params.id)
        this.DetailsArr.is_collected = false
        this.$toast.success('操作成功')
      } else if (this.DetailsArr.is_collected === false) {
        await Collection(this.$route.params.id)
        this.DetailsArr.is_collected = true
        this.$toast.success('操作成功')
      }
    },
    // 点赞
    async ArticleLikes1() {
      if (this.DetailsArr.attitude === -1) {
        await ArticleLikes(this.$route.params.id)
        this.DetailsArr.attitude = 1
      } else if (this.DetailsArr.attitude === 1) {
        await CancelArticleLikes(this.$route.params.id)
        this.DetailsArr.attitude = -1
      }
    },
    // 关注用户
    async Follow() {
      // this.Details(this.$route.params.id)
      // this.DetailsArr.is_followed = !this.DetailsArr.is_followed
      if (!this.DetailsArr.is_followed) {
        await Follow(this.DetailsArr.aut_id)
        // console.log(this.DetailsArr.aut_id)
        this.Details()
      } else {
        await CancelFollow(this.DetailsArr.aut_id)
        // console.log(this.DetailsArr.aut_id)
        this.Details()
      }
    },
    // 评论
    async comment() {
      try {
        const res = await comment('a', this.$route.params.id)
        console.log(res)
        this.commentArr = res.data.data.results
        this.commentAr = res.data.data
        // console.log(this.commentAr)
        console.log(this.commentArr)
      } catch (error) {
        console.log(error)
      }
    },
    // 点赞 取消点赞
    async thumbsUps(isliking, id) {
      // this.is_liking = !this.is_liking
      // console.log(id)
      console.log(isliking, id)
      if (!isliking) {
        try {
          const res = await thumbsUp(id)
          this.comment()
          console.log(res)
        } catch (error) {
          // console.log(error)
        }
      } else {
        try {
          const res = await cancelThumbsUp(id)
          this.comment()

          console.log(res)
        } catch (error) {
          // console.log(error)
        }
      }
    },
    // 对文章进行评论

    async release() {
      if (this.message.trim() === '') {
        this.$toast.fail('评论不能为空')
        this.show = false
      } else {
        try {
          const res = await getComment(this.DetailsArr.art_id, this.message)
          // console.log(res)
          this.$toast.success('评论成功', res)
          this.show = false
        } catch (error) {
          console.log(error)
        }
      }
      this.comment()
    },
    async onLoad() {
      const res = await comment('a', this.$route.params.id)
      // console.log(data)
      // this.list = res.data.data.
      this.commentArr.push(...res.data.data.results)

      if (this.list === null) {
        this.finished = true
      }
    },
    //
    onClickLeft() {
      // Toast('返回')
      this.$router.back()
    },
    showPopup() {
      this.show = true
    },
    onSelect(option) {
      Toast(option.name)
      this.showShare = false
    }
  },
  computed: {},
  components: {
    Comment
  }
}
</script>

<style lang="less" scoped>
// 导航
/deep/.van-nav-bar__content {
  background-color: #3296fa;
}
/deep/.van-nav-bar__title {
  color: #fff;
}
/deep/.van-nav-bar .van-icon {
  color: #fff;
}

// 标题
.title {
  // width: 95%;
  display: flex;
  margin: auto;
  h1 {
    font-size: 0.53333rem;
    padding: 0.66667rem 0.42667rem;
    margin: 0;
    color: #3a3a3a;
  }
}
// 用户
.user {
  width: 95%;
  height: 85px;
  display: flex;
  margin: auto;
  align-items: center;
  // justify-content: space-around;
  .left {
    width: 400px;
    display: flex;
    align-items: center;
    .left {
      width: 70px;
      height: 70px;
      // background-color: #333;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .right1 {
      width: 300px;
      // height: 70px;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 20px;
      margin: auto;
      .text1 {
        font-size: 0.32rem;
        color: #3a3a3a;
        margin: 0;
      }
      .text2 {
        font-size: 0.30667rem;
        color: #b7b7b7;
        margin: 0;
      }
    }
  }
  .right {
    width: 150px;
    // height:150px;
    // background: rgb(50, 150, 250);
    // border-color: rgb(50, 150, 250);
    border-radius: 40%;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    margin-left: 150px;
    height: 61px;
    .jia {
      font-size: 45px;
      color: #fff;
    }
    .guanz {
      font-size: 30px;
      color: #fff;
    }
    .van-button--round {
      height: 0.8rem;
      width: 181px;
      background: rgb(50, 150, 250);
      .van-button__text {
        color: #fff;
        font-size: 0.3rem;
      }
    }
  }
}
// 内容
.markdown-img1 {
  padding: 0.73333rem 0.42667rem;
  font-size: 0.21333rem;
  line-height: 1.5;
  color: #24292e;
  text-align: justify;
  img {
    max-width: 100%;
    box-sizing: initial;
    background-color: #fff;
  }
}
// 正文结束
.textEnd {
  height: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.42667rem 0;
  color: #969799;
  font-size: 0.37333rem;
  border-color: #ebedf0;
  border-style: solid;
  border-width: 0;
}
.textEnd1 {
  height: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.42667rem 0;
  color: #969799;
  font-size: 0.37333rem;
  border-color: #ebedf0;
  border-style: solid;
  border-width: 0;
  padding-bottom: 89px;
}
// 底部固定导航
.foot {
  height: 89px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  .foots {
    width: 95%;
    height: 89px;
    display: flex;
    margin: auto;
    // background-color: pink;
    align-items: center;
    justify-content: center;
    .left {
      width: 282px;
      height: 49px;
      // background-color: #333;
      /deep/.van-cell--clickable {
        border-radius: 40px;
        height: 52px;
        padding: 0 0.1rem;
        border: 0.02667rem solid #eee;
        color: #a7a7a7;
        .van-cell__value--alone {
          text-align: center;
          padding-left: 19px;
        }
        .van-cell__right-icon {
          color: #fff;
        }
      }
      .pinglun {
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
    }
    .right {
      margin-left: 59px;
      width: 330px;
      height: 40px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .aaa {
        .van-cell {
          padding: 0;
        }
      }
    }
  }
}
// 评论
.pingl {
  // width: 100px;
}
</style>
