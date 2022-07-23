<template>
  <div>
    <div class="comment">
      <div class="left"></div>
      <div class="count"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
// 评论区域
.comment {
  width: 90%;
  height: 236px;
  background-color: #333;
  display: flex;
  margin: auto;
  .left {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background-color: #fff;
  }
  .count {
    width: 7rem;
    background-color: #fff;
  }
}
</style>
