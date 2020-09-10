<template>
    <div v-if="!item.hidden" class="sidebar-menu-wrapper">
        <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
            <template v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
                <el-menu-item :index="resolvePath(onlyOneChild.path)" class='single-menu-item'>
                   <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
                </el-menu-item>
            </template>
        </template>

        <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body class="submenu-style"> 
            <template slot="title">
                <div class="icon-left" ><item :icon="item.meta.icon||(item.meta&&item.meta.icon)" :title="item.meta.title" /></div>
            </template>
            <sidebar-item
                v-for="child in item.children"
                :key="child.path"
                :is-nest="true"
                :item="child"
                :base-path="resolvePath(child.path)"
                class="submenu-child-desc"
            />
        </el-submenu>
    </div>
</template>

<script>
import path from 'path'
import Item from './Item'


export default {
    name: 'SidebarItem',
    components: { Item },
    props: {
        item: {
                type: Object,
                required: true
            },  
                basePath: {
                type: String,
                default: ''
            }
    },
    data() {
        this.onlyOneChild = null
        return  {}
    },
    methods:{
        hasOneShowingChild(children = [], parent) {
            const showingChildren = children.filter(item => {
                if (item.hidden) {
                    return false
                } else {
                this.onlyOneChild = item
                    return true
                }
            })
       
            if (showingChildren.length === 1) {
                return true
            }

            if (showingChildren.length === 0) {
                this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
                return true
            }

            return false
        },
        resolvePath(routePath) {
            return path.resolve(this.basePath, routePath)
        }
    },
}
</script>

<style>
    .submenu-style .el-submenu__title{
        height: 42px;
        line-height: 42px;
        text-align: left;
        font-size: 14px;
        background-color: transparent;
        padding-left: 30px !important;
        color : #575757;
    }
    .submenu-style .el-submenu__title:focus, .submenu-style .el-submenu__title:hover > span {
        transition:all .3s;
        color: #000000 ;
    }
    .submenu-style .el-submenu__title:focus, .submenu-style .el-submenu__title:hover > .single-menu-item i {
        color: #3f9ce8 !important;
        transition:all .3s;
    }
    .sidebar-menu-wrapper .el-submenu.is-opened >.el-submenu__title span {
        color: #000000 ;
    }
    .sidebar-menu-wrapper .el-submenu .el-submenu__title .icon-left span {
        height: 100% !important;
        margin-top:2px;
    }
    .sidebar-menu-wrapper .el-submenu .el-submenu__title i {
        padding-top:2px;
    }
    .sidebar-menu-wrapper .el-submenu .el-submenu__title .icon-left i {
        padding-bottom: 6px;
    }
    .sidebar-menu-wrapper .el-submenu.is-opened >.el-submenu__title i{
        color: #000000;
        transition:all .3s;
    }
    .sidebar-menu-wrapper .el-submenu.is-opened > .el-submenu__title .icon-left i {
        color: #3f9ce8;
    }
    .sidebar-menu-wrapper .el-submenu:hover > .el-submenu__title .icon-left i{
        color: #3f9ce8;
        transition:all .3s;
    }
    .sidebar-menu-wrapper .el-submenu:hover > .el-submenu__title .icon-left span{
        color: #000000;
        transition:all .3s;
    }
    .sidebar-menu-wrapper .el-submenu .el-submenu__title .icon-left span {
        padding:0 4px;
    }
</style>

<style scoped>
    .menu-logo{ 
        height: 68px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .sidebar-menu-wrapper .single-menu-item {
        display: flex;
        align-items: center;
        height: 42px;
        line-height: 42px;
        color : #575757;
        font-size: 14px;
        background-color: transparent;
        padding-left: 30px !important;
    }
    .sidebar-menu-wrapper .submenu-style .single-menu-item {
        background-color:#f0f2f5;
        padding-left: 64px !important;
    }
    .sidebar-menu-wrapper .single-menu-item span {
        padding-top:3px;
    }
    
    .sidebar-menu-wrapper .single-menu-item:hover > span {
        transition:all .3s;
        color: #000000;
    }
    .sidebar-menu-wrapper .single-menu-item i {
        margin-right: 10px;
    }
    .sidebar-menu-wrapper .single-menu-item:hover > i {
        transition:all .3s;
        color: #3f9ce8;
    }
    .sidebar-menu-wrapper .single-menu-item.is-active > span {
        color: #000000;
    }
    .sidebar-menu-wrapper .single-menu-item.is-active > i {
        color: #3f9ce8;
    }
</style>