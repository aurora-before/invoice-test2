<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="发票抬头">
        <el-input
          v-model="formInline.headerInput"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.statusInput" placeholder="全部">
          <el-option label="全部" value=""></el-option>
          <el-option label="已审核,已开票" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="total-num">
      <div>
        总计金额:
        <span>{{ totalMoney }}元</span>
      </div>
      |
      <div>
        总开票数: <span>{{ totalNum }}笔</span>
      </div>
    </div>
    <el-table
      border
      :data="
        tableDataSearch.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )
      "
      :header-cell-style="{
        background: '#E9E9E9',
        color: '#555',
      }"
      :row-style="{ height: '30px' }"
      :max-height="400"
    >
      <el-table-column prop="invoice_header" label="发票抬头" width="140">
      </el-table-column>
      <el-table-column prop="invoice_number" label="税号" width="120">
      </el-table-column>
      <el-table-column prop="address" label="发票内容"> </el-table-column>
      <el-table-column prop="invoice_money" label="发票金额"> </el-table-column>
      <el-table-column prop="check_status" label="备注说明"></el-table-column>
      <el-table-column prop="invoice_status" label="状态">
        <template slot-scope="scope">
          {{ scope.row.check_status | checkStatusFormat }},{{
            scope.row.invoice_status | invoiceStatusFormat
          }}
        </template>
      </el-table-column>
      <el-table-column prop="createtime" label="最后操作日期">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <router-link :to="{ path: '/already1', query: { id: scope.row.id } }">
            <el-button type="text" size="small"> 查看 </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :currentPage="currentPage"
      :pageSize="pageSize"
      @paginationCurrent="currentChange"
      @paginationSize="sizeChange"
    />
  </div>
</template>

  <script>
import Pagination from "@/components/Pagination.vue";
export default {
  data() {
    return {
      sign: null,
      loginName: "aa",
      tableData: [],
      tableDataSearch: [],
      formInline: {
        headerInput: "",
        statusInput: "",
      },
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    totalMoney() {
      let totalMoney = 0;
      for (let i = 0; i < this.tableData.length; i++) {
        totalMoney += this.tableData[i].invoice_money;
      }
      return totalMoney;
    },
    totalNum() {
      return this.tableData.length;
    },
  },
  filters: {
    invoiceStatusFormat(val) {
      return val == 1 ? "未开票" : val == 2 ? "待开票" : "已开票";
    },
    checkStatusFormat(val) {
      return val == 1 ? "待审核" : "已审核";
    },
  },
  components: {
    Pagination,
  },
  methods: {
    onSubmit() {
      if (this.formInline.statusInput === "") {
        this.tableDataSearch = this.tableData.filter((item) => {
          return (
            item.invoice_header.indexOf(this.formInline.headerInput) !== -1
          );
        });
      } else if (this.formInline.headerInput === "") {
        this.tableDataSearch = this.tableData.filter((item) => {
          return (
            item.invoice_status.indexOf(this.formInline.statusInput) !== -1
          );
        });
      } else {
        this.tableDataSearch = this.tableData.filter((item) => {
          return (
            item.invoice_status.indexOf(this.formInline.statusInput) !== -1 &&
            item.invoice_header.indexOf(this.formInline.headerInput) !== -1
          );
        });
      }
    },
    currentChange(data) {
      this.currentPage = data.currentPage;
      let time = parseInt(new Date().getTime() / 1000) + ""; //获取10位时间戳
      this.invoicedList(time);
    },
    sizeChange(data) {
      this.pageSize = data.pageSize;
      let time = parseInt(new Date().getTime() / 1000) + ""; //获取10位时间戳
      this.invoicedList(time);
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
    async invoicedList(time) {
      let data1 = {
        page: this.currentPage,
        limit: this.pageSize,
        invoice_header: "",
      };

      await this.getSign(time, data1);
      let data = {
        page: this.currentPage,
        limit: this.pageSize,
        invoice_header: "",
        sign: this.sign,
        key: "c4ca4238a0b923820dcc509a6f75849b",
        timestamp: time,
      };
      this.$axios({
        method: "post",
        url: "https://wemall.minephone.com/Invoice/api/public/index.php/api/admin/invoicedList",
        data: data,
      }).then((result) => {
        this.tableData = result.data.data.list;
        this.tableDataSearch = result.data.data.list;
      });
    },
  },

  async mounted() {
    let time = parseInt(new Date().getTime() / 1000) + ""; //获取10位时间戳
    this.login(time);
    this.invoicedList(time);
  },
  updated() {
    window.onresize = () => {
      if (this.$refs.table && this.$refs.table.doLayout) {
        this.$refs.table.doLayout();
      }
    };
  },
};
</script>

<style>
.el-aside {
  color: #333;
  height: 100%;
  background-color: #3f3f3f;
  color: #979797;
}
.el-submenu__title {
  color: #979797 !important;
}
.el-submenu,
.el-menu-item {
  background-color: #3f3f3f;
  color: #979797 !important;
}
.el-form {
  background-color: #f7f7f7;
}
.el-form-item {
  margin-top: 22px;
  margin-left: 22px;
}
.el-container .is-vertical {
  height: 100vh;
}
.total-num {
  width: 100%;
  height: 50px;
  display: flex;
  line-height: 50px;
  font-size: 14px;
}
.total-num > div {
  width: 180px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.total-num > div > span {
  color: rgb(5, 158, 5);
}
.page {
  text-align: right;
  margin-top: 50px;
}
.el-table {
  width: 100%;

  display: flex;

  flex-direction: column;
}
.el-table__body-wrapper {
  flex: 1;
}
</style>
    