<script setup>
const SMALL_SKELETONS_GROUP = [155, 190, 170, 160, 140]
</script>

<template>
  <div class="info">
    <img class="info_image" weight="208" height="240" src="/public/info_placeholder.webp" alt="Inventory placeholder">

    <div class="skeletons">
      <Skeleton width="190" height="26" rounded="base" />

      <div class="skeleton_group">
        <Skeleton v-for="skeleton in SMALL_SKELETONS_GROUP" :key="skeleton" :width="skeleton" height="10" rounded="sm" />
      </div>

      <Skeleton width="80" height="10" rounded="sm" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 17px 13px;

  border: 1px solid $primary-border;
  border-radius: 12px;
}

.info_image {
  border-radius: 8px;
}

.skeletons {
  display: flex;
  flex-direction: column;
  gap: 24px;
	align-items: center;
}

.skeleton_group {
	display: flex;
	flex-direction: column;
	gap: 16px;
	align-items: center;
}
</style>
