<template>
	<div class="menu-main">
		<div class="menu-logo">
            <router-link v-if="!isCollapse" to="/application">工单系统</router-link>
			<img v-else src="@/assets/logo.png">
		</div>
        <el-menu 
			class="menu-list" 
			:default-active="menuActive" 
			@select="menuSelect">
            <el-submenu v-for="item in menuData" :key="item.path" :index="item.path">
                <template slot="title">
                    <i :class="item.meta.icon"></i>
                    <span>{{ item.meta.title }}</span>
                </template>
                <el-menu-item v-for="el in item.child" :key="el.path" :index="el.path" >{{ el.meta.title }}</el-menu-item>
            </el-submenu>
        </el-menu>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'layout-menu',
	data() {
		return {
			isCollapse: false,
			menuActive: '',
            menuData: []
		}
	},
	computed: {
		...mapGetters([
			'mapMenuShowRoutes',
		])
	},
	created () {
		this.menuData = this.mapMenuShowRoutes;
		this.menuActive = sessionStorage.getItem('menuActive');
		// 监听浏览器前进后退
		window.addEventListener('popstate', () => {
			this.menuActive = this.$route.path;
			sessionStorage.setItem('menuActive', this.menuActive);
		}, false);
	},
	methods: {
		menuSelect (path) {
			if (path !== this.$route.path) {
				this.menuActive = path;
				this.$router.push(path);
				sessionStorage.setItem('menuActive', this.menuActive);
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.menu-main {
        overflow-x: hidden;
        flex-shrink: 0;
        width: 180px;
        background: $color-2b3647;
	}
	.menu-logo {
		display: flex;
		align-items: center;
		justify-content: center;
        flex-shrink: 0;
		height: 40px;
		a {
            width: 100%;
			color: $color-a0abbf;
            font-size: 14px;
            line-height: 40px;
            text-align: center;
		}
		img {
			width: 30px;
			height: 30px;
			border-radius: 5px;
		}
    }
</style>