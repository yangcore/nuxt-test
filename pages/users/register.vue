<template>
  <div class="body">
    <div class="main">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="checkAccount">
          <el-input type="text" v-model="ruleForm2.checkAccount" auto-complete="off" name="userName"/>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" name="pass"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios.js';
  import {Message} from "element-ui";

  export default {
    name: "register",
    data() {
      var account = (rule, value, callback) => {
        if (value === "") {
          callback(new Error('请输入账号'));
        } else {
          if (this.ruleForm2.checkAccount !== "") {
            if (/^[a-zA-Z0-9_-]{4,16}/.test(value)) {
              callback();
            } else {
              callback(new Error('账号规定4到16位（字母，数字，下划线，减号）'));
            }
          }
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!((/[a-zA-Z]/.test(value)) &&
            (/[0-9]/.test(value)) &&
            (/[0-9a-zA-Z]{6,12}/.test(value)) &&
            (!/\s/.test(value)))
        ) {
          callback(new Error('密码应为6-12位字母和数字组合'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          checkAccount: '',
          checkPass: ''
        },
        rules2: {
          checkAccount: [
            {validator: account, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      };
    },
    mounted() {
      document.getElementsByClassName('body')[0].style.height = document.documentElement.clientHeight + 'px';
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              method: "post",
              url: "/registerCtr/regist",
              data: {
                userName: this.ruleForm2.checkAccount,
                pass: this.ruleForm2.checkPass
              }
            }).then((res) => {
              if (res.data.code === "0000") {
                this.$router.push('/');
              } else if (res.data.code === "1001") {
                Message({
                  message: res.data.msg,
                  type: 'warning'
                });
              }
            }).catch((err) => {
              Message({
                message: err.toString(),
                type: 'error'
              });
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped lang="scss">
  .body {
    padding-top: 10%;
    background-size: 100%;
    background-image: url("~/assets/img/bg.8ca8122d44fc9a0f7b04.png");
  }

  .main {
    width: 500px;
    margin: 0 auto;
    padding: 40px 40px 30px 0;
    background: white;
    overflow: hidden;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
    box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
