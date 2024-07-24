<script setup lang="ts">
defineProps<{
  width: number | string
  height: number | string
	rounded: "sm" | "base" | "lg"
}>()
</script>

<template>
  <div class="skeleton_block" :data-rounded="rounded" :style="{ width: `${width}px`, height: `${height}px` }" />
</template>

<style scoped lang="scss">
.skeleton_block {
  background: linear-gradient(90deg, #3c3c3c 0%, #444444 51%, #333333 100%);
}

.skeleton_block[data-rounded="sm"] {
	border-radius: 4px;
}

.skeleton_block[data-rounded="base"] {
	border-radius: 8px;
}

.skeleton_block[data-rounded="lg"] {
	border-radius: 12px;
}
</style>
