<template>
  <div class="content">
    <div class="title">用户信息</div>
    <div style="padding: 0 20px">
      <el-form ref="form" :model="list" label-width="80px">
        <el-form-item label="账号id">
          <el-input v-model="list.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="list.account" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="list.nickname" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="list.password"
            placeholder="请填写"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="角色id">
          <el-input v-model="list.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input
            v-model="list.frozen_status"
            placeholder="1未冻结2已冻结"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
  <script>
export default {
  props: ["keyy"],
  name: "adduser",
  data() {
    return {
      list: [],
      sign: "",
    };
  },
  watch: {
    keyy: function (value) {
      console.log("keyy--->", value);
    },
  },
  created() {
    this.list = JSON.parse(this.$route.query.data);
  },
  methods: {
    onSubmit() {
      let time = parseInt(new Date().getTime() / 1000);
      this.$axios
        .post("/api/Apibase/getSign", {
          key: this.keyy,
          timestamp: time,
          id: this.list.id,
          account: this.list.account,
          nickname: this.list.nickname,
          password: this.list.password,
          group_id: this.list.id,
          frozen_status: this.list.frozen_status,
        })
        .then((res) => {
          this.sign = res.data.data;
          this.$axios
            .post("/api/user/editUser", {
              sign: this.sign,
              key: this.keyy,
              timestamp: time,
              id: this.list.id,
              account: this.list.account,
              nickname: this.list.nickname,
              password: this.list.password,
              group_id: this.list.id,
              frozen_status: this.list.frozen_status,
            })
            .then((res) => {
              if (res.data.code == 1) {
                this.$message({
                  message: res.data.msg,
                  type: "success",
                });
                this.$router.push("/useradministrate");
              } else {
                this.$message.error(res.data.msg);
              }
            });
        });
    },
  },
};
</script>
  
<style>
.content {
  width: 350px;
}

.el-form-item__label {
  text-align: left;
}

.title {
  height: 50px;
  background-color: #f7f7f7;
  line-height: 50px;
  font-size: 18px;
  padding: 0 20px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.content .el-input__inner {
  text-align: right;
  /* -webkit-appearance: none; */
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 0px;
  width: 100%;
}
</style>