<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary'
  size?: 'base'
}>(), {
  variant: 'primary',
  size: 'base',
})
</script>

<template>
  <button class="button" :data-variant="variant" :data-size="size">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.button {
  border-radius: 8px;

  font-size: 14px;

  transition: all 0.2s ease;
}

.button:disabled:hover {
	cursor: not-allowed
}

.button[data-variant='primary'] {
  background-color: $red;

  &:hover,
  &:focus-visible,
  &:active {
    background-color: $red-hover;
  }
}

.button[data-variant='white'] {
  background-color: white;
  color: black;

  &:hover,
  &:focus-visible,
  &:active {
    background-color: darken(white, 15%);
  }
}

.button[data-size='base'] {
  padding: 9px;
}

.button[data-size='sm'] {
  padding: 8px 15px;
}
</style>
