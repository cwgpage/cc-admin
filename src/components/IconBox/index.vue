<script setup lang="ts">
const { icon } = defineProps<{
  icon: string
}>()
</script>

<template>
  <div class="icon-wrap">
    <i class="iconfont" :class="icon" />
  </div>
</template>

<style scoped lang="scss">
.icon-wrap {
}
</style>
