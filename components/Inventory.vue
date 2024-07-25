<script setup lang="ts">
const ARRAY_SIZE = 25

const filledArray = Array.from({ length: ARRAY_SIZE }, (_, i) => {
  const newObj = {} as Item
  newObj.id = i + 1
  newObj.order = i

  return newObj
}).fill({
  id: 1,
  order: 0,
  count: 4,
  image: '/item/green.svg',
}, 0, 1).fill({
  id: 2,
  order: 1,
  count: 1,
  image: '/item/brown.svg',
}, 1, 2).fill({
  id: 3,
  order: 2,
  count: 5,
  image: '/item/purple.svg',
}, 2, 3)

const items = ref(filledArray)
const lc = useLocalStorage('inventory/entities', items, { writeDefaults: false })

function swapItemsById(id1: number, id2: number) {
  const index1 = items.value.findIndex(item => item.id === id1)
  const index2 = items.value.findIndex(item => item.id === id2)

  if (index1 !== -1 && index2 !== -1) {
    [items.value[index1], items.value[index2]] = [items.value[index2], items.value[index1]]
  }
};

function onStartDrag(e: DragEvent, item: Item) {
  if (!item?.count)
    return false

  e.dataTransfer?.setData('id', `${item.id}`)
}

function onDrop(e: DragEvent & { target: HTMLElement }) {
  const id = e.dataTransfer?.getData('id')

  if (!id) {
    return false
  }

  const data = items.value.find(item => item.id === +id)
  const previousElement = document.querySelector(`[data-order="${data?.order}"]`)

  const targetElement = e.target
  const targetOrder = targetElement?.getAttribute('data-order')

  if (!targetOrder)
    return

  const targetData = items.value.find(item => item.order === +targetOrder)

  if (!targetData)
    return false

  if (data && targetOrder && previousElement) {
    swapItemsById(data.id, targetData.id)
  }
}

const modal = ref<Item | null>(null)
function onClickItem(item: Item) {
  if (!item.count)
    return

  modal.value = item
}

function onItemRemove(toRemoveItem: Item) {
  toRemoveItem.image = undefined
  toRemoveItem.count = undefined
}
</script>

<template>
  <div class="inventory">
    <ClientOnly>
      <div
        v-for="item in lc" :key="item.id" class="item" :data-empty="!item.count" :draggable="!!item?.image"
        :data-order="item.order" :class="{ block: modal }" @dragstart.stop="onStartDrag($event, item)" @drop="onDrop"
        @dragover.prevent @dragenter.prevent @click="onClickItem(item)"
      >
        <div v-if="item.image">
          <div>
            <img width="54" height="54" :src="item.image" alt="Item image">
          </div>

          <span v-if="item.count && item.count > 1" class="item_count">{{ item?.count }}</span>
        </div>
      </div>

      <template #fallback>
        <div class="fallback">
          <Icon class="spinner" name="svg-spinners:3-dots-move" />
        </div>
      </template>

      <Teleport to=".grid">
        <ItemInfo v-model="modal" @remove="onItemRemove" />
      </Teleport>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.inventory {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);

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

    overflow: hidden;
  }
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  user-select: none;

  box-shadow: inset -1px -1px 0px $primary-border;

  &:hover {
    background-color: #2f2f2f;
    cursor: pointer;
  }

  &.block {
    pointer-events: none;
  }
}

.item[data-empty='true'] {
  cursor: auto;
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

.fallback {
  display: grid;
  place-items: center;

  grid-column: 1 / -1;
  grid-row: 1 / -1;
}

.spinner {
  width: 120px;
  height: 120px;

  color: $primary-border;
}
</style>
