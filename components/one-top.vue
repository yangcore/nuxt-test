<template>
  <div>
    <div class="page-component-up" @click="goTop"><i class="el-icon-caret-top"></i></div>
  </div>
</template>
<script>
  export default {
    name: "one-top",
    data() {
      return {};
    },
    created() {
    },
    components: {},
    computed: {},
    mounted() {
    },
    methods: {
      goTop() {
        window.scrollTo(0, 0);
      }
    }
  };
</script>
<style scoped>
  .page-component-up {
    background-color: #fff;
    position: fixed;
    right: 100px;
    bottom: 150px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  }

  .page-component-up i {
    color: #409eff;
    display: block;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
  }
</style>

