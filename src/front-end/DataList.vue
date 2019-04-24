<template>
  <div class="mt-6" :class="{'-active': showData}" v-if="dataList && dataList.length">
    <h3 class="flex">
      <button type="button" @click.prevent="showData = !showData" class="flex-no-shrink">
        <span class="icon">
          <span class="icon-line"></span>
          <span class="icon-line"></span>
        </span>
        <slot name="heading">Heading</slot>
      </button>
      <input
        type="text"
        v-model="filterText"
        placeholder="filter"
        class="ml-auto shadow appearance-none border rounded max-w-xs py-2 px-3 text-sm text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
      >
    </h3>
    <div class="pt-4">
      <disclosure :show="showData">
        <div
          class="w-full text-left border"
          v-for="(item, index) in filterdData"
          :class="{'mt-4': index !== 0}"
          :key="'meta-' + index"
        >
          <div
            v-for="(val, key, index) in item"
            :key="key"
            class="flex"
            :class="{'border-t': index !== 0, 'bg-red-lighter': !sameHostName(val)}"
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
              <div
                class="flex"
                v-for="(hVal, hKey, index) in val"
                :key="'header-' + index"
                :class="{'bg-red-lighter': !sameHostName(hVal)}"
              >
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
    dataList: {
      type: Array
    },
    hostName: {
      type: String
    }
  },
  data() {
    return {
      showData: true,
      filterText: ''
    }
  },
  computed: {
    filterdData() {
      if (!this.filterText) {
        return this.dataList
      }

      const pattern = new RegExp(this.filterText, 'i')
      return this.dataList.filter(item => pattern.test(JSON.stringify(item)))
    }
  },
  methods: {
    sameHostName(val) {
      try {
        const url = new URL(val)
        if (!url.hostname.includes('.')) {
          return true
        }
        return url.hostname === this.hostName
      } catch (error) {
        return true
      }
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
  transition: transform 300ms ease;
}

.icon-line:first-child {
  transform: rotate(90deg);
}

.-active .icon-line {
  transform: rotate(180deg);
}

.bg-red-lighter > * {
  color: #3b0d0c !important;
}
</style>
