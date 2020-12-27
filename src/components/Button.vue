<template>
  <button
    class="button rounded -text-sm -uppercase text-white px-3 py-1 duration-300 focus:outline-none"
    :class="buttonClass"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    active: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    buttonClass() {
      return this.active
        ? "bg-blue-500"
        : "bg-gray-500 opacity-50 hover:opacity-100";
    },
  },
};
</script>

<style>
</style>