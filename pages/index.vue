<template>
  <div id="app" style="margin:0 auto">
    <el-header style="background-color: rgb(64, 158, 255);">
      <div v-if="!userName">
        <div class="login">
          <nuxt-link to="/users/login">登录</nuxt-link>
        </div>
        <div class="reg">
          <nuxt-link to="/users/register">注册</nuxt-link>
        </div>
      </div>
      <div v-else>
        <div class="reg">
          <a href="/indexCtr/loginOut">退出</a>
        </div>
        <div class="login">
          账号：{{userName}}
        </div>
      </div>
    </el-header>
    <el-aside width="15%" style="float:left">
      <el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        text-color="#2d2f33"
        router
        active-text-color="#409eff">
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">新浪新闻</span>
        </el-menu-item>
        <el-menu-item index="/two">
          <i class="el-icon-setting"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航五</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container style="float:left;width:85%">
      <nuxt-child/>
    </el-container>
    <onTop v-if="showTop"/>
  </div>
</template>

<script>
  import "~/assets/index.css";
  import onTop from '~/components/one-top'
  import axios from '~/plugins/axios.js';

  export default {
    name: 'app',
    async asyncData() {
      let {data} = await axios.post("indexCtr/searchUserInfo");
      if (data.code === "0000") {
        return {
          userName: data.userName
        }
      }
    },
    data() {
      return {
        showTop: false,
        userName: ''
      }
    },
    components: {
      onTop
    },
    mounted() {
      window.onscroll = () => {
        this.showTop = window.scrollY > 600;
      }
    }, methods: {
      handleSelect(key, keyPath) {
        // this.$router.push(keyPath[0])
      }
    }
  };
</script>

<style lang="scss">
  .login, .reg {
    line-height: 60px;
    float: right;
    padding-right: 20px;
    font-size: 18px;
    color: white;
    a {
      color: white;
    }
  }
</style>


