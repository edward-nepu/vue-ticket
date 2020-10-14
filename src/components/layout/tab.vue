<template>
    <div class="breadcrumb">
        <span>{{ breadTitle }}</span>
        <ul class="tabs">
            <li v-for="item in menuData" :key="item.title">
                <i class="separator el-icon-caret-right"></i>
                <router-link v-if="item.path" :to="item.path">
                    {{ item.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'layout-tab',
    data () {
        return {
            breadTitle: '',
            menuData: []
        }
    },
    created () {
        this.breadTitle = this.$route.matched[0].meta.title;
        let fullTitle = this.$route.meta.fullTitle?this.$route.meta.fullTitle.split(' - '):[this.$route.meta.title];
        let fullPath = this.$route.path.slice(1).split('/');
        for (let i=0; i<fullTitle.length; i++) {
            this.menuData.push({
                title: fullTitle[i],
                path: `/${fullPath.slice(0, i + 1).join('/')}`
            });
        }
    },
    watch: {
        $route (to) {
            this.menuData = [];
            this.breadTitle = to.matched[0].meta.title;
            let fullTitle = to.meta.fullTitle?to.meta.fullTitle.split(' - '):[to.meta.title];
            let fullPath = to.path.slice(1).split('/');
            for (let i=0; i<fullTitle.length; i++) {
                this.menuData.push({
                    title: fullTitle[i],
                    path: `/${fullPath.slice(0, i + 1).join('/')}`
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .breadcrumb {
        display: flex;
        padding: 5px 15px;
        white-space: nowrap;
        box-sizing: border-box;
    }
    .tabs {
        display: flex;
        align-items: center;
        li {
            user-select: none;
            cursor: pointer;
            transition: all .1s;
            .separator {
                padding: 0 3px;
            }
            a {
                &:hover {
                    color: $color-409eff;
                }
            }
        }
        .router-link-exact-active {
            color: $color-409eff;
        }
    }
</style>