<template>
  <div>
    <div class="history">
      <div>搜索历史</div>
      <div @click="dele" v-if="isDele"><van-icon name="delete-o" /></div>
      <div v-if="!isDele" class="isaaa">
        <div @click="quanbudele">全部删除</div>
        <div @click="dele">完成</div>
      </div>
    </div>
    <div>
      <div>
        <div class="history" v-for="(item, index) in resultsArr" :key="index">
          {{ item }}
          <div v-if="!isDele" @click="dangedele(index)">
            <van-icon name="cross" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resultsArr: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      isDele: true,
      resultsarr: []
    }
  },
  methods: {
    dele() {
      this.isDele = !this.isDele
    },
    quanbudele() {
      this.$emit('quanbudele')
    },
    dangedele(index) {
      this.$emit('dangedele', index)
    }
  }
}
</script>

<style lang="less" scoped>
.history {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  padding: 0.26667rem 0.42667rem;
  overflow: hidden;
  color: #323233;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  background-color: #fff;
  .isaaa {
    display: flex;
    justify-content: space-between;
    width: 200px;
  }
}
.history1 {
  display: flex;
  flex-direction: column;

  justify-content: space-between;
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
