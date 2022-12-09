<template>
  <el-table :data="list" border style="width: 100%">
    <el-table-column prop="title" label="角色"> </el-table-column>
    <el-table-column prop="rules" label="说明"> </el-table-column>
    <el-table-column prop="status" label="操作"> </el-table-column>
  </el-table>
</template>
  
<script>
export default {
  data() {
    return {
      sign: "",
      key: "c4ca4238a0b923820dcc509a6f75849b",
      timestamp: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      list: [],
    };
  },
  created() {
    let time = parseInt(new Date().getTime() / 1000);
    this.timestamp = time;
    this.$axios
      .post("/api/Apibase/getSign", {
        key: this.key,
        timestamp: this.timestamp,
        page: 1,
        limit: 10,
      })
      .then((res) => {
        this.sign = res.data.data;
        this.$axios
          .post("/api/user/roleList", {
            page: 1,
            limit: 10,
            sign: this.sign,
            timestamp: time,
            key: this.key,
          })
          .then((res) => {
            // console.log(res);
            this.list = res.data.data.list;
            console.log(this.list);
          });
      });
  },
};
</script>

<style>
</style>