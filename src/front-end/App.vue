<template>
  <div class="container mx-auto mt-20 mb-20">
    <textarea
      class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
      cols="30"
      rows="10"
      placeholder="input URL"
      v-model="inputText"
    ></textarea>
    <div class="text-center mt-4">
      <button
        class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-10 rounded-full mx-auto tracking-wide shadow-md"
        :class="{'opacity-50 cursor-not-allowed': isFetching}"
        type="button"
        @click.prevent="onClick"
      >解析</button>
    </div>
    <div v-show="isFetching" class="mt-4">
      <div class="loading mx-auto"></div>
    </div>
    <div v-if="results.length" class="mt-20">
      <h1 class="text-center mb-20 border-b">Result</h1>
      <result
        v-for="(result, index) in results"
        :result="result"
        :key="index"
        :class="{'mt-32': index !== 0}"
      ></result>
    </div>
  </div>
</template>
<script>
import result from './Result'

export default {
  components: {
    result
  },
  data() {
    return {
      inputText: '',
      results: [],
      isFetching: false
    }
  },
  computed: {
    urls() {
      return this.inputText
        .replace(/\r\n/gm, '\n')
        .replace(/\r/gm, '\n')
        .split(/\n/)
        .filter(url => url)
    }
  },
  methods: {
    onClick() {
      if (this.isFetching) {
        return
      }

      this.isFetching = true
      this.results = []

      fetch('/api/analyze', {
        method: 'POST',
        body: JSON.stringify({
          urls: this.urls
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(json => {
          this.results = json
          this.isFetching = false
        })
        .catch(error => {
          this.isFetching = false
        })
    }
  }
}
</script>
<style>
.loading {
  border-top: 5px solid #f3ebff;
  border-right: 5px solid #794acf;
  border-bottom: 5px solid #794acf;
  border-left: 5px solid #794acf;
  animation: rotation 0.7s linear 0s infinite normal forwards;
  border-radius: 50px;
  width: 50px;
  height: 50px;
}

@keyframes rotation {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
