<template>
  <div class="content">
    <div class="title">用户管理</div>
    <div class="content_box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.account" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.nickname" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="角色id">
          <el-input v-model="form.group_id" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input
            v-model="form.frozen_status"
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
      sign: "",
      form: {
        account: "",
        nickname: "",
        password: "",
        group_id: "",
        frozen_status: "",
      },
    };
  },
  methods: {
    onSubmit() {
      let time = parseInt(new Date().getTime() / 1000);
      this.$axios
        .post("/api/Apibase/getSign", {
          key: this.keyy,
          timestamp: time,
          account: this.form.account,
          nickname: this.form.nickname,
          password: this.form.password,
          group_id: this.form.group_id,
          frozen_status: this.form.frozen_status,
        })
        .then((res) => {
          this.sign = res.data.data;
          this.$axios
            .post("/api/user/addUser", {
              sign: this.sign,
              key: this.keyy,
              timestamp: time,
              account: this.form.account,
              nickname: this.form.nickname,
              password: this.form.password,
              group_id: this.form.group_id,
              frozen_status: this.form.frozen_status,
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

<style scoped>
.content {
  width: 350px;
}

.content_box {
  padding: 0 20px;
}

.el-form-item__label {
  text-align: left;
}

.content .el-input__inner {
  text-align: right;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 0px;
  width: 100%;
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
</style>