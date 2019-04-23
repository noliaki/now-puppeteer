<template>
  <div class="mt-12" v-if="responses && responses.length">
    <h3>
      <button type="button" @click.prevent="showData = !showData">
        Response
        <span class="text-xs">(except for 2XX response)</span>
      </button>
    </h3>
    <div class="pt-4">
      <disclosure :show="showData">
        <div
          class="w-full text-left border"
          v-for="(response, index) in responses"
          :class="{'mt-4': index !== 0}"
          :key="'response-' + index"
        >
          <div
            v-for="(val, key, index) in response"
            :key="key"
            class="flex"
            :class="{'border-t': index !== 0, 'bg-red-lighter': key !== 'headers' && !sameHost(val)}"
          >
            <div
              class="p-2 font-mono text-xs text-purple-dark whitespace-no-wrap w-32 flex-no-shrink"
            >{{ key }}</div>
            <div
              class="p-2 font-mono text-xs text-blue-dark flex-grow"
              style="word-break: break-all"
              v-if="key !== 'headers'"
            >{{ val }}</div>
            <div v-else>
              <div class="flex" v-for="(hVal, hKey, index) in val" :key="'header-' + index">
                <div class="p-2 font-mono text-xs text-purple-dark w-32 flex-no-shrink">{{ hKey }}</div>
                <div
                  class="p-2 font-mono text-xs text-blue-dark flex-grow"
                  style="word-break: break-all"
                >{{ hVal }}</div>
              </div>
            </div>
          </div>
        </div>
      </disclosure>
    </div>
  </div>
</template>
<script>
import disclosure from './Disclusure'

export default {
  components: {
    disclosure
  },
  props: {
    responses: {
      type: Array
    },
    hostName: {
      type: String
    }
  },
  data() {
    return {
      showData: true
    }
  },
  methods: {
    sameHost(val) {
      if (!this.validURL(val)) {
        return true
      }

      try {
        const url = new URL(val)
        return url.hostname === this.hostName
      } catch (error) {
        return true
      }
    },
    validURL(urlString) {
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' +
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
          '((\\d{1,3}\\.){3}\\d{1,3}))' +
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
          '(\\?[;&a-z\\d%_.~+=-]*)?' +
          '(\\#[-a-z\\d_]*)?$',
        'i'
      )

      return pattern.test(urlString)
    }
  }
}
</script>
