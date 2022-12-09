<template>
  <div class="main" v-if="statistics">
    <div class="main1">
      <div class="main1-head">
        <div class="title1">实时统计</div>
      </div>
      <div class="content1">
        <el-row :gutter="10">
          <el-col :span="4"
            ><div class="grid-content">
              <div>
                {{ statistics.real_data_statistics.total_invoiced }}
              </div>
              <div>开票总数</div>
            </div></el-col
          >
          <el-col :span="4"
            ><div class="grid-content">
              <div>
                {{ statistics.real_data_statistics.total_invoiced_amount }}
              </div>
              <div>开票总额</div>
            </div></el-col
          >
          <el-col :span="4"
            ><div class="grid-content">
              <div>
                {{ statistics.real_data_statistics.reviewed_number }}
              </div>
              <div>待审核数</div>
            </div></el-col
          >
          <el-col :span="4"
            ><div class="grid-content">
              <div>
                {{ statistics.real_data_statistics.reviewed_amount }}
              </div>
              <div>待审核金额</div>
            </div></el-col
          >
          <el-col :span="4"
            ><div class="grid-content">
              <div>
                {{ statistics.real_data_statistics.invoiced_number }}
              </div>
              <div>已开票数</div>
            </div></el-col
          >
          <el-col :span="4"
            ><div class="grid-content">
              <div>
                {{ statistics.real_data_statistics.invoiced_amount }}
              </div>
              <div>已开票金额</div>
            </div></el-col
          >
        </el-row>
      </div>
    </div>
    <div class="main1">
      <div class="main2-head">
        <div class="title1">开票统计</div>
        <div class="head-type">
          <div @click="todayTime()">今日</div>
          <div @click="weekTime()">本周</div>
          <div @click="monthTime()">本月</div>
        </div>
        <div class="date">
          <el-date-picker
            v-model="statisticsDate"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="content1">
        <el-row :gutter="10">
          <el-col :span="4"
            ><div class="grid-content">
              <div>
                {{ statistics.slot_data_statistics.total_invoiced }}
              </div>
              <div>开票总数</div>
            </div></el-col
          >
          <el-col :span="4"
            ><div class="grid-content">
              <div>
                {{ statistics.slot_data_statistics.total_invoiced_amount }}
              </div>
              <div>开票总额</div>
            </div></el-col
          >
        </el-row>
      </div>
    </div>
    <div class="main2">
      <div class="main2-head">
        <div class="title1">开票趋势</div>

        <div class="date">
          <el-date-picker
            v-model="trendDate"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="content3">
        <div class="report-wrap">
          <div
            id="report"
            ref="myChart"
            style="width: 100%; height: 270px"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      statisticsDate: [
        "Tue Oct 11 2022 00:00:00 GMT+0800 (中国标准时间)",
        "Tue Nov 15 2022 23:59:59 GMT+0800 (中国标准时间)",
      ],
      trendDate: [
        "Tue Oct 11 2022 00:00:00 GMT+0800 (中国标准时间)",
        "Tue Nov 15 2022 23:59:59 GMT+0800 (中国标准时间)",
      ],
      statisticsTime: [],
      trendTime: [],
      beginTime: null,
      endTime: null,
      today: "",
      week: [],
      sign: null,
      loginName: null,
      formInline: {
        user: "",
      },
      statistics: "",
      value1: "",
      charts: "",
      score: "100",
      source: [
      ],
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    async getTime(dateArr, dateTime) {
      let dateBegin = new Date(dateArr[0]);
      let beginYear = dateBegin.getFullYear();
      let beginMonth = dateBegin.getMonth() + 1;
      beginMonth = beginMonth < 10 ? "0" + beginMonth : beginMonth;
      let beginDate = dateBegin.getDate();
      beginDate = beginDate < 10 ? "0" + beginDate : beginDate;
      let beginTime = beginYear + "-" + beginMonth + "-" + beginDate;
      let dateEnd = new Date(dateArr[1]);
      let endYear = dateEnd.getFullYear();
      let endMonth = dateEnd.getMonth() + 1;
      endMonth = endMonth < 10 ? "0" + endMonth : endMonth;
      let endDate = dateEnd.getDate();
      endDate = endDate < 10 ? "0" + endDate : endDate;
      let endTime = endYear + "-" + endMonth + "-" + endDate;
      dateTime[0] = beginTime;
      dateTime[1] = endTime;
    },
    todayTime() {
      this.$set(this.statisticsDate, 0, new Date().toString());
      this.$set(this.statisticsDate, 1, new Date().toString());
    },
    weekTime() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let week = date.getDay();
      let thisWeekStartDate = new Date(year, month, day - week + 1);
      let thisWeekEndDate = new Date(year, month + 1, day - week + 7);
      this.$set(this.statisticsDate, 0, thisWeekStartDate);
      this.$set(this.statisticsDate, 1, thisWeekEndDate);
    },
    monthTime() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let thisMonthStartDate = new Date(year, month, 1);
      let thisMonthEndDate = new Date(year, month + 1, 0);
      this.$set(this.statisticsDate, 0, thisMonthStartDate);
      this.$set(this.statisticsDate, 1, thisMonthEndDate);
    },
    async getSign(time, data2) {
      let data = data2;
      data["key"] = "c4ca4238a0b923820dcc509a6f75849b";
      data["timestamp"] = time;
      await this.$axios({
        method: "post",
        url: "https://wemall.minephone.com/Invoice/api/public/index.php/api/Apibase/getSign",
        data: data,
      }).then((result) => {
        this.sign = result.data.data;
      });
    },
    async login(time) {
      let data1 = {
        account: "admin",
        password: "123456",
        type: "admin",
      };

      await this.getSign(time, data1);
      let data = {
        account: "admin",
        password: "123456",
        type: "admin",
        sign: this.sign,
        key: "c4ca4238a0b923820dcc509a6f75849b",
        timestamp: time,
      };
      this.$axios({
        method: "post",
        url: "https://wemall.minephone.com/Invoice/api/public/index.php/api/login/Login",
        data: data,
      }).then((result) => {
        this.loginName = result.data.data.nickname;
      });
    },
    async dataStatistics(time) {
      let data1 = {
        statistics_start_time: this.statisticsTime[0],
        statistics_end_time: this.statisticsTime[1],
        trend_start_time: this.trendTime[0],
        trend_end_time: this.trendTime[1],
      };
      await this.getSign(time, data1);
      let data = {
        statistics_start_time: this.statisticsTime[0],
        statistics_end_time: this.statisticsTime[1],
        trend_start_time: this.trendTime[0],
        trend_end_time: this.trendTime[1],
        sign: this.sign,
        key: "c4ca4238a0b923820dcc509a6f75849b",
        timestamp: time,
      };
      this.$axios({
        method: "post",
        url: "https://wemall.minephone.com/Invoice/api/public/index.php/api/admin/dataStatistics",
        data: data,
      }).then((result) => {
        this.statistics = result.data.data;
        this.source = result.data.data.trend_data_statistics;
      });
    },
    change() {
      this.source = [
        { time: "2021-10-11", total: 9, total_money: 110 },
        { time: "2022-150-12", total: 9, total_money: 110 },
        { time: "2022-10-13", total: 9, total_money: 110 },
        { time: "2022-10-12", total: 9, total_money: 110 },
        { time: "2022-10-13", total: 9, total_money: 110 },
      ];
    },
    draw() {
      let newPromise = new Promise((resolve) => {
        if(!this.echarts)
        resolve();
      });
      newPromise.then(() => {
        this.charts = echarts.init(this.$refs.myChart);
        this.charts.setOption({
          legend: {
            textStyle: {
              //图例字体大小
              fontSize: 10,
            },
            icon: "circle",
            //图例大小
            itemHeight: 10,
            itemWidth: 10,
            //图例滚动显示
            type: "scroll",
            //图例位置
            left: 550,
            top: 0,
            bottom: 30,
          },
          tooltip: {},
          dataset: {
            source: this.source, //连接数据
          },
          xAxis: { type: "category" },
          yAxis: {
            axisLine: {
              show: true,
            },
            axisTick: {
              show: true,
            },
            splitLine: {
              show: false,
            },
          },
          grid: { bottom: 30 },
          series: [
            {
              name: "开票总数",
              type: "bar", //表示这个是柱状图
              label: {
                show: true,
                position: "top",
              },
              barCategoryGap: "5%",
              barWidth: 10,
              itemStyle: { color: "#49a9ee" }, //定义颜色
              tooltip: {
                formatter: (params) => {
                  return ` ${params.name.slice(0, 3)} <br/>
                         ${params.seriesName}:${params.value.total}`;
                },
              },
            },
            {
              name: "开票总额",
              type: "bar",
              label: {
                show: true,
                position: "top",
              },
              barCategoryGap: "5%",
              barWidth: 10,
              itemStyle: { color: "#98D87D" },
              tooltip: {
                formatter: (params) => {
                  return ` ${params.name} <br/>
                         ${params.seriesName}:${params.value.total_money}`;
                },
              },
            },
          ],
        });
      });
    },
  },
  watch: {
    statisticsDate: {
      handler: function () {
        let time = parseInt(new Date().getTime() / 1000) + "";
        this.getTime(this.statisticsDate, this.statisticsTime);
        this.getTime(this.trendDate, this.trendTime);
        this.dataStatistics(time);
        setTimeout(() => {
          this.$nextTick(function () {
            this.charts.dispose();
            this.draw();
          });
        }, 500);
      },
      deep: true,
    },
    trendDate: {
      handler: function () {
        let time = parseInt(new Date().getTime() / 1000) + "";
        this.getTime(this.statisticsDate, this.statisticsTime);
        this.getTime(this.trendDate, this.trendTime);
        this.dataStatistics(time);
        setTimeout(() => {
          this.$nextTick(function () {
            this.charts.dispose();
            this.draw();
          });
        }, 500);
      },
      deep: true,
    },
  },

  async mounted() {
    let time = parseInt(new Date().getTime() / 1000) + ""; //获取10位时间戳
    await this.login(time);
    await this.getTime(this.statisticsDate, this.statisticsTime);
    await this.getTime(this.trendDate, this.trendTime);
    await this.dataStatistics(time);
    setTimeout(() => {
      this.$nextTick(function () {
        this.draw();
      });
    }, 500);
  },
};
</script>
    <style scoped>
.el-header {
  min-width: 1200px;
}
.el-main {
  min-width: 1200px;
  box-sizing: border-box;
}
.main {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  min-height: 740px;
  border: 1px;
  box-sizing: border-box;
}
.main1 {
  border: 1px;
  width: 100%;
  height: 210px;
  padding-left: 20px;
  /* padding-right: 20px; */
}
.main1-head {
  min-width: 1100px;
}
.title1 {
  width: 120px;
  height: 35px;
  text-align: center;
  color: #49a9ee;
  position: relative;
}
.title1:after {
  content: "";
  display: block;
  width: 120px;
  height: 3px;
  background: #49a9ee;
  position: absolute;
  bottom: 0;
}
.content1 {
  display: flex;
  min-width: 1100px;
  height: 150px;
  margin-top: 30px;
}
.el-row {
  min-width: 1100px;
  height: 150px;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 140px;
}
.grid-content > div:nth-child(1) {
  height: 45px;
  font-size: 25px;
  color: #4e73df;
  text-align: center;
}
.grid-content > div:nth-child(2) {
  height: 40px;
  text-align: center;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
/deep/ .el-range-separator {
  line-height: 22px !important;
}
/deep/ .el-range__close-icon {
  line-height: 22px !important;
}
.main2 {
  border: 1px;
  width: 100%;
  padding-left: 20px;
  /* padding-right: 20px; */
}
.main2-head {
  min-width: 1100px;
  display: flex;
}
.head-type {
  width: 130px;
  height: 35px;
  display: flex;
  font-size: 14px;
  text-align: center;
  line-height: 35px;
  justify-content: space-around;
  margin-left: 10px;
}
.head-type > div {
  cursor: pointer;
}
.date {
  width: 400px;
}
/deep/ .el-date-editor {
  height: 30px;
  margin-left: 20px;
}
/deep/ .el-date-editor input {
  height: 28px;
}
/deep/ .el-date-editor .el-input__prefix {
  right: -180px;
}
/deep/ .el-date-editor .el-range__icon {
  line-height: 22px !important;
}
.content3 {
  display: flex;
  width: 100%;
  min-width: 1100px;
  height: 300px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.report-wrap {
  width: 90%;
  min-width: 1100px;
  height: 280px;
  border: 1px solid rgb(211, 208, 208);
  display: flex;
  justify-content: center;
}
</style>