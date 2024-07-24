<script setup lang="ts">
import { type DraggableEvent, VueDraggable } from 'vue-draggable-plus'

const items = ref(Array(25).fill({
  id: 1,
  count: 4,
  order: 1,
  image: 'https://picsum.photos/54',
}, 0, 1).fill({
  id: 2,
  count: 2,
  order: 2,
  image: 'https://picsum.photos/53',
}, 1, 2))

// const lc = useLocalStorage('inventory/entities', items, { mergeDefaults: true })

// watchEffect(() => console.log('@lc', lc.value))

function onUpdate(e: DraggableEvent) {
  const swappedElement = items.value.find(item => item?.order === e.oldIndex as number + 1)
  const oldPlaceElement = items.value.find(item => item?.order === e.newIndex as number + 1)
  // swappedElement.order = e.newIndex as number + 1;

  if (!swappedElement)
    return

  console.log('@oldPlaceElement', oldPlaceElement)

  swappedElement.order = e.newIndex as number + 1

  console.log('@swappedElement', swappedElement)
// console.log('@oldPlaceElement', oldPlaceElement)
}

function onMove(e: DraggableEvent) {
  e.preventDefault()
  // console.log(e.preventDefault)
}

function onChoose(e: DraggableEvent) {
  const empty = Boolean(e.item.dataset.empty)

  console.log(e.item)

  // console.log(e.item.dataset.empty)
}

const filter = `[data-empty="true"]`
</script>

<template>
  <VueDraggable v-model="items" class="inventory" :filter @move="onMove" @choose="onChoose">
    <div v-for="slot in items" :key="slot" class="item" :data-empty="!slot">
      <div v-if="slot">
        <img :src="slot.image">
      </div>

      <span v-if="slot" class="item_count">{{ slot?.count }}</span>
    </div>
  </VueDraggable>
</template>

<style lang="scss" scoped>
.inventory {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 99px);

  border: 1px solid $primary-border;
  border-radius: 12px;

  .item:first-child {
    border-top-left-radius: 12px;
  }

  /* Последний элемент в первом ряду */
  .item:nth-child(5) {
    border-top-right-radius: 12px;
  }

  /* Первый элемент в последнем ряду */
  .item:nth-last-child(5) {
    border-bottom-left-radius: 12px;
  }

  /* Все элементы в последнем ряду */
  .item:nth-last-child(-n + 5) {
    box-shadow: inset -1px 0px 0px $primary-border;
  }

  /* Каждый последний элемент в ряду */
  .item:nth-child(5n) {
    box-shadow: inset 0px -1px 0px $primary-border;
  }

  /* Последний элемент в последнем ряду */
  .item:last-child {
    border-bottom-right-radius: 12px;
    box-shadow: none;
  }
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  box-shadow: inset -1px -1px 0px $primary-border;

  &:hover {
    background-color: #2f2f2f;
  }
}

.item_count {
  padding: 2px 4px;

  position: absolute;
  bottom: 0;
  right: 0;

  font-size: 10px;
  color: white;
  font-weight: 500;

  border: 1px solid $primary-border;
  border-top-left-radius: 6px;
}
</style>
