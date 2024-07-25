<template>
	<div class="page">
		<div class="container">
			<div class="grid">
				<InventoryInfo />
				<Inventory/>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.page {
	display: grid;
	place-items: center;
	min-height: 100vh;
	padding-top: 20px;
	padding-bottom: 20px;

	background-color: #1D1D1D;
}

.grid {
	display: grid;
	grid-template-columns: 236px 525px;
	gap: 24px;

	position: relative;

	height: 497px;

	overflow: hidden;
}
</style>
