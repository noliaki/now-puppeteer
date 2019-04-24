<template>
  <div class="container mx-auto mt-20 mb-20">
    <textarea
      class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
      cols="30"
      rows="10"
      placeholder="input URL"
      v-model="inputText"
    ></textarea>
    <form class="w-full mt-2">
      <div class="md:flex md:items-center mb-6">
        <div class="w-48">
          <label
            class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >Basic auth User Name</label>
        </div>
        <div class="w-1/3">
          <input
            class="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"
            id="inline-full-name"
            type="text"
            placeholder="input Basic auth User Name"
            v-model="basicAuthUserName"
          >
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="w-48">
          <label
            class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-username"
          >Basic auth Password</label>
        </div>
        <div class="w-1/3">
          <input
            class="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"
            id="inline-username"
            type="text"
            placeholder="input Basic auth Password"
            v-model="basicAuthPassword"
          >
        </div>
      </div>
    </form>
    <div class="text-center mt-4">
      <button
        class="shadow bg-purple hover:bg-purple-light focus:shadow-outline focus:outline-none text-white py-2 px-20 rounded-full"
        :class="{'opacity-50 cursor-not-allowed': isFetching}"
        type="button"
        @click.prevent="onClick"
      >解 析</button>
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
      basicAuthUserName: '',
      basicAuthPassword: '',
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

      const body = {
        urls: this.urls
      }

      if (this.basicAuthUserName || this.basicAuthPassword) {
        body.basicAuth = {
          userName: this.basicAuthUserName,
          password: this.basicAuthPassword
        }
      }

      fetch('/api/analyze', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(json => {
          this.results = JSON.parse(JSON.stringify(json))
          this.isFetching = false
        })
        .catch(alert)
        .then(() => {
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
