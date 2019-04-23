<template>
  <transition
    name="disclosure"
    @before-enter="beforeEnter"
    @enter="enter"
    @before-leave="beforeLeave"
    @leave="leave"
  >
    <div v-show="show" class="disclosure-content" ref="content">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean
    }
  },
  methods: {
    beforeEnter(el) {
      console.log('beforeEnter')
      el.style.height = '0'
    },
    enter(el) {
      console.log('enter')
      el.style.height = `${el.scrollHeight}px`
    },
    beforeLeave(el) {
      console.log('beforeLeave')
      el.style.height = `${el.scrollHeight}px`
      console.log(el.style.height)
    },
    leave(el) {
      console.log('leave')
      el.style.height = '0'
    }
  },
  mounted() {
    this.$refs.content.style.height = `${this.$refs.content.scrollHeight}px`
  }
}
</script>
<style scoped>
.disclosure-enter-active,
.disclosure-leave-active {
  overflow: hidden;
  transition: height 400ms ease;
}
</style>
