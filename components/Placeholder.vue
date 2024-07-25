<template>
	<div class="placeholder">
		<Skeleton width="699" height="36" rounded="lg" />

		<button class="button_close" type="button">
			<Icon class="icon_close" name="material-symbols:close" />
		</button>
	</div>
</template>

<style scoped lang="scss">
.placeholder {
	margin-top: 24px;
	padding: 17px;

	border: 1px solid $primary-border;
	border-radius: 12px;

	position: relative;
}

.button_close {
	position: absolute;
	top: 7px;
	right: 7px;

	color: white;
}

.icon_close {
	width: 24px;
	height: 24px;
}
</style>
