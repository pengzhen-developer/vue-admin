<template>
  <div class="container">
    <div class="main">
      <div class="left">
        <div class="sys-logo">
          <span class="sys-en-name">
            <span>{{ title }}</span>
          </span>
        </div>
        <div class="sys-name">
          <span class="letter">{{ subTitle }}</span>
        </div>
      </div>
      <div class="right">
        <div class="login-title">
          <span>系统登录</span>
        </div>
        <div class="login-form">
          <el-form ref="form" :model="view.model" :rules="view.rules" @submit.native.prevent @keyup.enter.native="signIn">
            <el-form-item class="sign-input" prop="userName">
              <el-input autofocus v-model.trim="view.model.userName" placeholder="User Name" prefix-icon="fa-user-o" size="large"></el-input>
            </el-form-item>
            <el-form-item class="sign-input" prop="password">
              <el-input v-model.trim="view.model.password" type="password" placeholder="Password" prefix-icon="fa-key" size="large"></el-input>
            </el-form-item>
            <el-form-item style="text-align:center;">
              <el-button class="sign-btn" @click="signIn" round size="large">登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>建议使用Chrome等现代浏览器, 建议使用1920 * 1080分辨率 </p>
    </div>
  </div>
</template>

<script>
import { user } from './type'

export default {
  data() {
    return {
      title: kindo.config.title,
      subTitle: kindo.config.subTitle,

      config: {
        api: {
          signIn: kindo.config.api.upms + 'user/login/signIn'
        }
      },

      view: {
        model: {
          userName: '',
          password: ''
        },
        rules: {
          userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        }
      }
    }
  },

  created() {
    const userInfo = kindo.cache.get(user.USER_INFO)

    if (userInfo) {
      this.view.model.userName = userInfo.loginNo
    }
  },

  methods: {
    signIn() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const param = {
            loginNo: this.view.model.userName,
            pwd: kindo.util.md5(this.view.model.password),
            rememberMe: 1
          }

          this.$http.post(this.config.api.signIn, param).then(res => {
            const userInfo = res.data
            kindo.cache.set(user.USER_INFO, userInfo, 'local')

            // 跳转首页
            this.$router.push('/')
          })
        }
      })
    },

    reset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
.container {
  position: absolute;
  background: #f0f2f5;
  min-width: 900px;
  min-height: 500px;
  width: 100%;
  height: 100%;
  background-image: url(assets/img/bg.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.main {
  width: 870px;
  height: 447px;
  margin: 0 auto;
  box-shadow: 1px 1px 20px 7px rgba(4, 3, 3, 0.1);
  top: 50%;
  position: relative;
  margin-top: -226.5px;
}

.main .left {
  background-image: url(assets/img/bg.svg);
  background-repeat: round;
  float: left;
  width: 61.8%;
  height: 100%;
  text-align: center;
}

.main .right {
  background: #fff;
  float: right;
  width: 38.2%;
  height: 100%;
}

.sys-logo {
  margin: 80px 20px;
  height: 60px;
  line-height: 60px;
}

.sys-logo img {
  height: 60px;
}

.sys-en-name {
  vertical-align: text-bottom;
  margin: 0 24px;
  font-size: 32px;
  color: #2cadff;
  text-shadow: 0 0 1px #666;
  font-weight: 100;
}

.letter {
  display: inline-block;
  position: relative;
  color: #00b4f1;
  transform-style: preserve-3d;
  perspective: 400;
  z-index: 1;
}
.letter:before,
.letter:after {
  position: absolute;
  content: attr(data-letter);
  transform-origin: top left;
  top: 0;
  left: 0;
}
.letter,
.letter:before,
.letter:after {
  transition: all 0.3s ease-in-out;
}
.letter:before {
  text-shadow: -1px 0px 1px rgba(255, 255, 255, 0.8), 1px 0px 1px rgba(0, 0, 0, 0.8);
  z-index: 3;
  transform: rotateX(0deg) rotateY(-15deg) rotateZ(0deg);
}
.letter:after {
  color: rgba(0, 0, 0, 0.11);
  z-index: 2;
  transform: scale(1.08, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 1deg);
}
.letter:hover:before {
  color: #fafafa;
  transform: rotateX(0deg) rotateY(-40deg) rotateZ(0deg);
}
.letter:hover:after {
  transform: scale(1.08, 1) rotateX(0deg) rotateY(40deg) rotateZ(0deg) skew(0deg, 22deg);
}

.sys-name {
  text-align: center;
  margin: 0 20px;
  font-size: 30px;
  color: #2cadff;
  text-shadow: 0 0 1px #666;
  letter-spacing: 1px;
  font-weight: 100;
}

.login-title {
  margin: 80px 60px 40px;
}

.login-title span {
  text-align: left;
  font-size: 18px;
  color: #90949a;
  letter-spacing: 5px;
  text-shadow: 0 0 1px #f7eeee;
  padding: 0px;
}

.login-form {
  margin: 0 60px;
}

.login-form .sign-input {
  margin-bottom: 48px;
}

.login-form .sign-btn {
  width: 65%;
  background: linear-gradient(to right, #7683ea, #46c6d5);
  color: white;
}

.footer {
  position: absolute;
  width: 100%;
  bottom: 10px;
  text-align: center;
}
</style>
