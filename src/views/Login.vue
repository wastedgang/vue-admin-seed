<template>
	<div class="login-page">
		<canvas id="meteor"></canvas>
		<div class="login-form">
			<div class="form-left">
				<div>
					<p style="font-size: 24px;">登录</p>
				</div>
				<div>
					<p>如果无账号请前往注册和已有账号忘记密码可申请重设密码</p>
				</div>
				<div class="btn-wrapper">
					<button style="margin-right:10px;" class="btn-login">注册账号</button>
					<button class="btn-login">忘记密码</button>
				</div>
			</div>
			<div class="form-right">
				<my-input @keyup.enter="onLogin" v-model="userinfo.name" icon="el-icon-user" placeholder="用户名" type="text" />
				<my-input @keyup.enter="onLogin" v-model="userinfo.password" icon="el-icon-key" placeholder="密码" type="password" />
				<div class="btn-submit">
					<button class="btn-login" @click="onLogin">登录</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { metetor } from "../assets/libs/ultis";

export default {
	data() {
		return {
			userinfo: {
				name: "",
				password: ""
			}
		};
	},
	methods: {
		drawMetetor() {
			let h = window.innerHeight;
			let w = window.innerWidth;
			let can = document.getElementById("meteor");
			can.width = w;
			can.height = h;
			let canContent = can.getContext("2d");
			metetor(w, h, canContent);
        },
        
		//提交登录
		onLogin() {
            let { name, password } = this.userinfo;
			if (!name || !password) {
                this.$message.warning('请输入用户名和密码');
                return;
			}
			// sessionStorage.setItem('userinfo',JSON.stringify(this.userinfo));
			this.$store.dispatch("userinfo.setUserinfo", this.userinfo);
			this.$router.push('/')
		}
	},
	mounted() {
		this.drawMetetor();
	}
};
</script>

<style scoped>
.login-page {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
}
#meteor {
	box-sizing: border-box;
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
}
.login-form {
	width: 600px;
	height: 400px;
	border-radius: 2px;
	box-shadow: 2px 2px 2px 1px rgba(0, 157, 255, 0.1);
	box-sizing: border-box;
	overflow: hidden;
	display: flex;
	justify-content: space-between;
}

.form-left {
	color: #fff;
	width: 45.5%;
	background: rgba(2, 20, 92, 0.8);
	height: 100%;
	box-sizing: border-box;
	text-align: left;
	padding: 40px 20px;
}
.form-right {
	width: 60%;
	background: rgba(2, 32, 58, 0.8);
	height: 100%;
	box-sizing: border-box;
	padding: 80px 20px;
}
.btn-wrapper {
	margin-top: 40px;
	box-sizing: border-box;
}

.btn-login {
	background: transparent;
	outline: none;
	padding: 3px 5px;
	border-radius: 2px;
	font-size: 13px;
	color: #fff;
	border: 1px solid #fff;
	transition: border 1s;
	transition: color 0.5s;
	-webkit-transition: border 1s;
	-webkit-transition: color 0.5s;
}
.btn-login:hover {
	color: rgb(43, 145, 255);
	border: 1px solid rgb(43, 145, 255);
}

.btn-submit {
	width: 100%;
}
.btn-submit .btn-login {
	width: 80%;
	margin-top: 20px;
}

.check-label {
	font-size: 12px;
	color: #fff;
	cursor: pointer;
}
.check-box:checked {
	border: none;
	background: transparent;
}
</style>