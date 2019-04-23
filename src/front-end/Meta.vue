<template>
  <div class="mt-5" v-if="metas && metas.length" :class="{'-active': showData}">
    <h3>
      <button type="button" @click.prevent="showData = !showData">
        <span class="icon">
          <span class="icon-line"></span>
          <span class="icon-line"></span>
        </span>
        meta
      </button>
    </h3>
    <div class="pt-4">
      <disclosure :show="showData">
        <div
          class="w-full text-left border"
          v-for="(meta, index) in metas"
          :class="{'mt-4': index !== 0}"
          :key="'meta-' + index"
        >
          <div
            v-for="(val, key, index) in meta"
            :key="key"
            class="flex"
            :class="{'border-t': index !== 0, 'bg-red': !sameHost(val)}"
          >
            <div
              class="p-2 font-mono text-xs text-purple-dark whitespace-no-wrap w-32 flex-no-shrink"
            >{{ key }}</div>
            <div
              class="p-2 font-mono text-xs text-blue-dark flex-grow"
              style="word-break: break-all"
            >{{ val }}</div>
          </div>
        </div>
      </disclosure>
    </div>
  </div>
</template>
<script>
import disclosure from './Disclusure'
import Url from 'url-parse'

export default {
  components: {
    disclosure
  },
  data() {
    return {
      showData: true
    }
  },
  props: {
    metas: {
      type: Array
    },
    hostName: {
      type: String
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
<style scoped>
.icon {
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: middle;
  border: 1px solid #606f7b;
}

.icon-line {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  display: block;
  width: 80%;
  height: 2px;
  margin: -1px auto 0;
  border-radius: 999em;
  background-color: #606f7b;
}

.icon-line:first-child {
  transition: transform 300ms ease;
  transform: rotate(90deg);
}

.-active .icon-line:first-child {
  transform: rotate(0);
}
</style>
