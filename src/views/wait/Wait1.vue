<template>
  <div class="main">
    <div class="info">
      <div class="info-title">开票信息</div>
      <div class="info-main">
        <div class="info-money">
          <div>开票金额：100元</div>
          <div>以电子发票进行开具</div>
        </div>
        <div class="info-content">
          <div class="info-item">
            <div>发票类型</div>
            <div>电子发票</div>
          </div>
          <div class="info-item">
            <div>抬头类型</div>
            <div>{{ info.invoice_type | format }}</div>
          </div>
          <div class="info-item">
            <div>发票抬头</div>
            <div>{{ info.invoice_header | format }}</div>
          </div>
          <div class="info-item">
            <div>税号</div>
            <div>{{ info.invoice_number | format }}</div>
          </div>
          <div class="info-item">
            <div>发票内容</div>
            <div>{{ info.invoice_content | format }}</div>
          </div>
          <div class="info-item">
            <div>发票金额</div>
            <div>{{ info.invoice_money | format }}元</div>
          </div>
          <div class="info-item">
            <div>备注说明</div>
            <div>{{ info.remark | format }}</div>
          </div>
          <div class="info-item">
            <div>注册地址</div>
            <div>{{ info.register_address | format }}</div>
          </div>
          <div class="info-item">
            <div>注册电话</div>
            <div>{{ info.register_phone | format }}</div>
          </div>
          <div class="info-item">
            <div>开户银行</div>
            <div>{{ info.bank | format }}</div>
          </div>
          <div class="info-item">
            <div>银行账号</div>
            <div>{{ info.bank_number | format }}</div>
          </div>
          <div class="info-item">
            <div>邮箱地址</div>
            <div>{{ info.email | format }}</div>
          </div>
          <div class="info-item">
            <div>手机号码</div>
            <div>{{ info.phone | format }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="file">
      <div class="file-title1">发票文件</div>
      <div class="file-link">
        <div>
          <div>下载链接：</div>
          <span>电子发票下载链接</span>
        </div>
        <div class="file-link-btn">
          <el-button type="primary" size="small">保存</el-button
          >
          <el-button type="primary" size="small">重置</el-button>
        </div>
      </div>
      <div class="file-title2">审核记录</div>
      <div class="opinion">
        <div>审核意见</div>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input
              v-model="remark"
              placeholder="请填写"
              id="opinion-input"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              id="opinion-btn"
              @click="invoiceExamine(info.id)"
              >退回</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="file-table">
        <el-table
          :data="tableInfo"
          :header-cell-style="{ background: '#E9E9E9', color: '#555' }"
        >
          <el-table-column prop="" label="操作人"> </el-table-column>
          <el-table-column prop="updatetime" label="操作时间">
          </el-table-column>
          <el-table-column prop="invoice_content" label="发票内容">
          </el-table-column>
          <el-table-column prop="invoice_money" label="发票金额">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      sign: null,
      id: null,
      remark: "",
      info: {},
      tableInfo: [],
    };
  },
  computed: {
    loginName() {
      return Cookie.get("username");
    },
    loginSwitch() {
      return Cookie.get("loginSwitch");
    },
  },
  filters: {
    format(val) {
      if (val == null || val == "") return "-";
      return val;
    },
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
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
    async invoiceDetail(time, id) {
      let data1 = {
        id: id,
      };

      await this.getSign(time, data1);
      let data = {
        id: id,
        sign: this.sign,
        key: "c4ca4238a0b923820dcc509a6f75849b",
        timestamp: time,
      };
      this.$axios({
        method: "post",
        url: "https://wemall.minephone.com/Invoice/api/public/index.php/api/admin/invoiceDetail",
        data: data,
      }).then((result) => {
        this.info = result.data.data;
        this.tableInfo.push(result.data.data);
      });
    },

    async invoiceExamine(id) {
      let time = parseInt(new Date().getTime() / 1000) + "";
      let data1 = {
        id: id,
        operator_id: 1,
        status: "return",
        remark: this.remark,
        invoice_number: this.info.invoice_number,
        invoice_content: this.info.invoice_content,
      };
      await this.getSign(time, data1);
      let data = {
        id: id,
        operator_id: 1,
        status: "return",
        remark: this.remark,
        invoice_number: this.info.invoice_number,
        invoice_content: this.info.invoice_content,
        sign: this.sign,
        key: "c4ca4238a0b923820dcc509a6f75849b",
        timestamp: time,
      };

      this.$axios({
        method: "post",
        url: "https://wemall.minephone.com/Invoice/api/public/index.php/api/admin/invoiceExamine",
        data: data,
      }).then((result) => {
        this.remark=""
         this.$router.go(-1);
      });
    },
  },

  async mounted() {
    let time = parseInt(new Date().getTime() / 1000) + ""; //获取10位时间戳
    await this.invoiceDetail(time, this.$route.query.id);
  },
};
</script>
  <style scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.info {
  width: 30%;
  /* height: 90%; */
  min-width: 400px;
  height: 700px;
  /* background: red; */

  margin-right: 30px;
}
.info-title {
  height: 50px;
  width: 100%;
  padding: 10px;
  border: 1px;
  box-sizing: border-box;
  background: #f7f7f7;
}
.info-main {
  height: 650px;
  width: 100%;
}
.info-money {
  width: 100%;
  height: 90px;
  padding: 20px;
  border: 1px;
  box-sizing: border-box;
}
.info-money > div:nth-child(1) {
  height: 30px;
  font-size: 18px;
  font-weight: bold;
}
.info-money > div:nth-child(2) {
  height: 20px;
  /* font-weight: bold; */
  color: #999999;
  font-size: 15px;
}
.info-content {
  width: 100%;
  height: 560px;
  padding: 20px;
  padding-top: 10px;
  padding-bottom: 0;
  border: 1px;
  box-sizing: border-box;
}
.info-item {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
}
.info-item:nth-of-type(12) {
  height: 50px;
}
.info-item:nth-of-type(13) {
  height: 50px;
}
.info-item > div:nth-child(1) {
  width: 80px;
  height: 100%;
}
.info-item > div:nth-child(2) {
  min-width: 280px;
  height: 100%;
  text-align: right;
}

.file {
  width: 60%;
  /* height: 90%; */
  min-width: 650px;
  height: 700px;
  /* background: red; */
}
.file-title1,
.file-title2 {
  height: 50px;
  width: 100%;
  padding: 10px;
  border: 1px;
  box-sizing: border-box;
  background: #f7f7f7;
}
.file-link {
  width: 100%;
  height: 150px;
  padding: 20px;
  border: 1px;
  box-sizing: border-box;
}
.file-link > div:nth-child(1) {
  display: flex;
}
.file-link > div:nth-child(1) > div:nth-child(1) {
  width: 15%;
}
.file-link span {
  color: #999999;
  font-size: 14px;
  display: inline-block;
  width: 85%;
  text-align: center;
}
.file-link-btn > button {
  width: 70px;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 5px;
  margin-top: 30px;
  margin-right: 15px;
  color: white;
}
.file-link-btn > button:nth-child(1) {
  background: #108ee9;
  font-size: 14px;
}
.file-link-btn > button:nth-child(2) {
  background: #66ccff;
  font-size: 14px;
}
.opinion {
  padding: 20px;
  width: 100%;
  height: 70px;
  border: 1px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.opinion > div:nth-child(1) {
  line-height: 30px;
}
.opinion .el-form {
  background: white;
  width: 250px;
  height: 30px;
  display: flex;
}
.el-form-item {
  height: 30px;
  line-height: 30px;
  margin: 0;
  margin-right: 10px;
}
.el-form-item__content {
  height: 30px;
  line-height: 30px;
}
.opinion /deep/ #opinion-input {
  width: 150px;
  height: 30px;
}
.opinion /deep/ #opinion-btn {
  width: 70px;
  height: 30px;
  line-height: 30px;
  padding: 0;
}
.file-table {
  width: 100%;
  padding: 20px;
  border: 1px;
  box-sizing: border-box;
}
</style>