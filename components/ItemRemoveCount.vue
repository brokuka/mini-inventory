<script setup lang="ts">
const props = defineProps<{
  itemCount: number
}>()

const emit = defineEmits<{
  cancel: []
  confirm: []
}>()

const isClickedRemove = defineModel<boolean>()
const count = defineModel<number>('count')

function onClickRemove() {
  if (props.itemCount > 1) {
    isClickedRemove.value = true
    return
  }

  emit('confirm')
}

function onCancelClick() {
  emit('cancel')
}

function onClickConfirm() {
  emit('confirm')
}
</script>

<template>
  <Transition name="fade-up">
    <div v-if="!isClickedRemove" class="wrapper-button_remove">
      <Line />

      <Button class="button_remove" variant="primary" size="base" @click="onClickRemove">
        Удалить предмет
      </Button>
    </div>

    <div v-else class="remove_count">
      <NumberInput v-model.number="count" placeholder="Введите количество" />

      <div class="button_group">
        <Button variant="white" size="sm" @click="onCancelClick">
          Отмена
        </Button>

        <Button size="sm" @click="onClickConfirm">
          Подтвердить
        </Button>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.wrapper-button_remove {
  width: 100%;
}

.button_remove {
  width: 100%;
  margin-top: 18px;
}

.remove_count {
  display: flex;
  flex-direction: column;
  gap: 11px;
  padding-top: 19px;
  padding-bottom: 19px;
  padding-inline: 20px;

  width: 100%;

  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;

  background-color: rgba(#262626, 60%);
  backdrop-filter: blur(16px);
  border-top: 1px solid $primary-border;
}

.button_group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
</style>
