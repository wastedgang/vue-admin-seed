<template>
    <div class="header-page">
        <div class="header-left">
            <div class="hover-active" @click="changeSidebarDisplay">
                <i :class="iconClass"></i>
            </div>
        </div>
        <div class="header-right">
            <el-dropdown trigger="click">
                <div class="hover-user-active">
                    <div>用户名<i class="el-icon-arrow-down"/></div>
                </div>
                <el-dropdown-menu slot="dropdown" class="user-dropdown-menu">
                    <el-dropdown-item @click.native="logout" icon="el-icon-back" ><span class="desc">退出登录</span></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            iconClass:'el-icon-s-fold',
            isChangeFold: false
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("userinfo.setUserinfo", {});
            this.$router.push('/login');
        },
        changeSidebarDisplay() {
            this.isChangeFold = !this.isChangeFold
            if(this.isChangeFold) {
                this.iconClass = 'el-icon-s-unfold'
            } else {
                this.iconClass = 'el-icon-s-fold'
            }
            this.$emit('changeSidebarDisplay')
        }
    }
}
</script>

<style scoped>
.header-page {
    height: 68px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.hover-active {
    width: 30px;
    height: 30px;
    text-align: center;
    padding: 5px;
    border-radius: 50%;
    line-height: 34px;
    font-size: 18px;
    color: #333;
}

.hover-active:hover {
    transition:all .2s;
    background-color: #d1d7e1;
}

.hover-user-active {
    height: 34px;
    padding: 0 14px;
    display: flex;
    align-items: center;
    margin-right: 5px;
    border-radius: 17px;
}
.hover-user-active:hover {
    transition:all .2s;
    background-color: #d1d7e1;
}
</style>