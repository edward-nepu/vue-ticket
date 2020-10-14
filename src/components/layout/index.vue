<template>
	<div class="wrapper-main">
        <Menus />
		<div class="content-main">
			<div class="tool-main">
				<tabs />
				<heads />
			</div>
			<div class="view-main">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
import Menus from './menu'
import heads from './head'
import tabs from './tab'
export default {
    name: 'layout-index',
	components: {
		Menus,
		heads,
		tabs
	},
	mounted () {
		this.setHt();
		// 监听浏览器窗口变化
		window.addEventListener('resize', () => {
			if (this.timer) clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.setHt();
			}, 500);
		}, false);
	},
	methods: {
		setHt () {
			let _wh = document.body.offsetHeight;
			let _h = document.querySelector('.tool-main').getBoundingClientRect().height;
			document.querySelector('.view-main').style.height = `${_wh - _h}px`;
		}
	}
}
</script>

<style lang="scss" scoped>
	.wrapper-main {
		display: flex;
		height: 100vh;
	}
	.content-main {
		overflow: hidden;
        flex: 1;
	}
	.tool-main {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 15px 0;
        border-bottom: 1px solid $color-ccc;
        box-sizing: border-box;;
	}
	.view-main {
		border: 10px solid $color-f1f1f1;
		box-sizing: border-box;
		-webkit-overflow-scrolling: touch;
    }
</style>