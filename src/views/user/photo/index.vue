<template>
  <div class="photo">
    <div><img class="img" :src="photos" ref="img" /></div>
    <div class="bottom">
      <div class="left" @click="$emit('cancel')">取消</div>
      <div class="right" @click="success">完成</div>
    </div>
  </div>
</template>

<script>
import { editPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  props: {
    photos: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {
      cropper: null
    }
  },
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    success() {
      // console.log(this.cropper.getData())
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        // console.log(blob)
        const formData = new FormData()
        formData.append('photo', blob)

        const { data } = await editPhoto(formData)
        console.log(data)
        this.$emit('cancel')
        this.$emit('updatePhoto', data.data.photo)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.photo {
  background-color: #000;
  width: 100%;
  height: 100%;
  display: flex;
}
.img {
  max-width: 100%;
  display: block;
}
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  .left {
    width: 90px;
    height: 90px;
    font-size: 30px;
    display: flex;
    justify-content: content;
    align-items: center;
    color: #fff;
  }
  .right {
    width: 90px;
    height: 90px;
    font-size: 30px;
    display: flex;
    justify-content: content;
    align-items: center;
    color: #fff;
  }
}
</style>
