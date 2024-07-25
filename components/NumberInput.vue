<script setup lang="ts">
const inputModel = defineModel()
</script>

<template>
  <input
    v-model="inputModel" v-maska class="input"
    data-maska-tokens="A:[1-9]:multiple|B:[0-9]:multiple"
    data-maska="AB"
  >
</template>

<style scoped lang="scss">
.input {
  padding-top: 10px;
  padding-bottom: 11px;
  padding-inline: 11px;

  background: none;
  border: 1px solid $primary-border;
  border-radius: 4px;

  font-size: 14px;
  color: rgba(white, 40%);
  font-weight: 500;

  outline: none;

  &:focus-visible {
    border: 1px solid rgba(white, 40%);
  }

  &::placeholder {
    color: rgba(white, 40%);
    font-size: 14px;
  }
}
</style>
