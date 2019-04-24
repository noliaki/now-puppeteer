<template>
  <div v-if="result">
    <h3 class="bg-grey p-2 rounded">{{ result.pageUrl }}</h3>
    <div class="mt-2 text-center bg-grey-dark img-wrapper">
      <img :src="screenShotUrl" :alt="result.pageUrl" class="max-w-full">
    </div>
    <data-list :dataList="result.meta" :host-name="hostName">
      <template v-slot:heading>meta</template>
    </data-list>
    <data-list :dataList="result.responseError" :host-name="hostName">
      <template v-slot:heading>
        Response
        <span class="text-xs">(except for 2XX response)</span>
      </template>
    </data-list>
  </div>
</template>
<script>
import dataList from './DataList'

export default {
  components: {
    dataList
  },
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  computed: {
    screenShotUrl() {
      return `/api/screenshot/?url=${encodeURIComponent(this.result.pageUrl)}`
    },
    hostName() {
      const url = new URL(this.result.pageUrl)
      console.log(url)
      return url.hostname
    }
  }
}
</script>
<style scoped>
.img-wrapper {
  position: relative;
}

.img-wrapper::after {
  content: '';
  display: block;
  width: 100%;
  height: 0;
  padding-top: 66.66666%;
}

.img-wrapper::before {
  content: '';
  display: block;
  width: 40px;
  height: 40px;
  border-top: 4px solid #8795a1;
  border-right: 4px solid #3d4852;
  border-bottom: 4px solid #3d4852;
  border-left: 4px solid #3d4852;
  border-radius: 40px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  animation: rotation 700ms linear 0s infinite normal forwards;
}

.img-wrapper > img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
