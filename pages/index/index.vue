<template>
  <div class="news">
    <div style="padding-left:20px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="汇总榜" name="first"/>
        <el-tab-pane label="新闻榜" name="second"/>
        <el-tab-pane label="证券榜" name="third"/>
        <el-tab-pane label="理财榜" name="fourth"/>
      </el-tabs>
      <div class="query-form">
        <el-form ref="form">
          <el-form-item label="按日期筛选新闻">
            <el-date-picker
              @change="changedata"
              v-model="pickValue"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              default-value="2017-12-28">
            </el-date-picker>
            <el-button type="primary" style="margin-left:20px" @click="filterBydate" :disabled="disabled">
              确认
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-main>
      <div v-if="arrs">
        <h1 v-html="arrs.title"></h1>
        <div v-html="arrs.news">
        </div>
      </div>
      <div v-else>
        <p class="empty">暂无数据</p>
      </div>
      <el-pagination
        v-if="arrs && total>0"
        background
        layout="prev, pager, next , jumper"
        :total="total" style="float:right" :page-size="1"
        :current-page.sync="currentPage" @current-change="handleCurrentChange">
      </el-pagination>
    </el-main>
  </div>
</template>

<script>
  import axios from '~/plugins/axios.js';
  import {Loading, Message} from "element-ui";

  export default {
    name: "news",
    async asyncData() {
      let {data} = await axios.get("newCtr/find", {
        params: {
          page: 1,
          pageSize: 1,
          type: 1
        }
      });
      return {
        arrs: data.data,
        total: data.totalPage
      }
    },
    data() {
      return {
        arrs: {},
        total: 0,
        activeName: "first",
        type: 1,
        currentPage: 1,
        pickValue: "",
        disabled: true
      };
    },
    methods: {
      changedata(val) {
        if (!val) {
          this.start(1, 1, this.type);
          this.currentPage = 1;
        }
      },
      start(current, pageSize, type) {
        let loadingInstance = Loading.service();
        axios.get("newCtr/find", {
          params: {
            page: current,
            pageSize: pageSize,
            type: type,
            startDate: this.pickValue ? this.pickValue[0] : null,
            endDate: this.pickValue ? this.pickValue[1] : null
          }
        })
          .then(response => {
            loadingInstance.close();
            let data = response.data;
            this.arrs = data.data;
            this.total = data.totalPage;
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleCurrentChange(val) {
        window.scrollTo(0, 0);
        this.start(val, 1, this.type);
      },
      handleClick(tab, event) {
        this.currentPage = 1;
        this.pickValue = "";
        this.type = Number(tab.index) + 1;
        this.start(1, 1, Number(tab.index) + 1);
      },
      filterBydate() {
        if (this.pickValue.length > 1) {
          let _this = this;
          const start = () => {
            return new Promise(function (rel, rej) {
              _this.start(1, 1, _this.type);
              _this.currentPage = 1;
              rel();
            });
          };
          start().then(() => {
            Message({
              message: "恭喜你，筛选成功",
              type: "success"
            });
          });
        }
      }
    },
    watch: {
      pickValue(e) {
        this.disabled = !(e && e.length > 1);
      }
    }
  };
</script>
