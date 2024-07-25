<script setup lang="ts">
const emit = defineEmits<{
  remove: [Item]
}>()

const SKELETON_GROUP = [211, 211, 211, 180, 80]

const item = defineModel<Item | null>()
const modalRef = ref(null)
const isClickedRemove = ref(false)
const toRemoveCount = ref()

function onModalClose() {
  item.value = null
  isClickedRemove.value = false
}

onClickOutside(modalRef, onModalClose)

function toRemove() {
  if (!item.value)
    return

  emit('remove', item.value)
  item.value = null

  onCancelRemove()
  toRemoveCount.value = undefined
}

function onCancelRemove() {
  isClickedRemove.value = false
}

function onConfirmRemove() {
  if (!item.value?.count)
    return

  if (item.value.count === 1) {
    toRemove()
    return
  }

  if (!toRemoveCount.value)
    return

  /* Снимаем нужно количество */
  item.value.count -= toRemoveCount.value

  /* Если вдруг количество которое отнимаем больше чем у самого предмета */
  if (item.value.count < 1) {
    toRemove()
    return
  }

  onCancelRemove()
  toRemoveCount.value = undefined
}
</script>

<template>
  <Teleport to=".grid">
    <Transition name="fade">
      <div v-if="item" ref="modalRef" class="drawer">
        <button class="button_close" type="button" @click="onModalClose">
          <Icon class="icon_close" name="material-symbols:close" />
        </button>

        <div class="drawer_content">
          <img class="item_image" :src="item.image" width="130" height="130" alt="Item image">

          <Line />

          <div class="skeletons">
            <Skeleton rounded="base" width="211" height="30" />

            <div class="skeleton_group">
              <Skeleton
                v-for="(skeleton, index) in SKELETON_GROUP" :key="skeleton + index" height="10"
                :width="skeleton" rounded="sm"
              />
            </div>
          </div>

          <ItemRemoveCount v-model="isClickedRemove" v-model:count="toRemoveCount" :item-count="item.count" @cancel="onCancelRemove" @confirm="onConfirmRemove" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.drawer {
  padding-top: 54px;
  padding-bottom: 13px;
  padding-inline: 17px;

  position: absolute;
  top: 0;
  right: 0;
  z-index: 9999;

  width: 250px;
  height: 100%;

  border: 1px solid $primary-border;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  background-color: rgba(#262626, 50%);
  backdrop-filter: blur(16px);
}

.drawer_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  color: white;
}

.icon_close {
  width: 24px;
  height: 24px;
}

.button_close {
  display: inline-flex;
  padding: 2px;

  position: absolute;
  top: 7px;
  right: 8px;

  color: white;
}

.item_image {
  margin-bottom: 30px;
}

.skeletons {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
  margin-bottom: 24px;
}

.skeleton_group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}
</style>
