<template>
  <div v-if="result">
    <h3 class="bg-grey p-2 rounded">{{ result.pageUrl }}</h3>
    <meta-result :metas="result.meta" :host-name="hostName"></meta-result>
    <response-result :responses="result.responseError" :host-name="hostName"></response-result>
  </div>
</template>
<script>
import metaResult from './Meta'
import responseResult from './Responce'
// import Url from 'url-parse'

export default {
  components: {
    metaResult,
    responseResult
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
