<template>
  <div>
    <div class="search_add_func">
      <div>账号：</div>
      <div style="margin-left: 0">
        <el-input v-model="name" placeholder="请输入"></el-input>
      </div>
      <div>
        <span>时间：</span>
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
      </div>
      <div>
        <el-button type="primary">搜索</el-button>
        <el-button type="primary" @click="toAddPage">添加</el-button>
      </div>
    </div>
    <div>
      <el-table :data="userDate" border style="width: 100%">
        <el-table-column prop="account" label="账号"> </el-table-column>
        <el-table-column prop="nickname" label="姓名"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="frozen_status" label="状态"> </el-table-column>
        <el-table-column prop="createtime" label="注册日期"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="
                toEditPage(userDate[scope.$index], userDate[scope.$index].id)
              "
              type="text"
              size="small"
            >
              编辑 |
            </el-button>
            <el-button @click.native.prevent="" type="text" size="small">
              冻结 |
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(userDate[scope.$index].id)"
              type="text"
              size="small"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next,sizes,jumper"
        :total="pageTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "administrate",
  props: ["userList"],
  data() {
    return {
      pageTotal: 1,
      name: "",
      value1: "",
      userDate: [],
    };
  },
  watch: {
    userList: function (value) {
      this.userDate = value;
      this.pageTotal = this.userDate.length;
    },
  },
  methods: {
    toAddPage() {
      this.$router.push("/adduser");
    },
    toEditPage(data, id) {
      this.$router.push({
        path: "/edituser",
        query: {
          id: id,
          data: JSON.stringify(data),
        },
      });
    },
    deleteRow(id) {
      this.$emit("deleteId", id);
    },
  },
};
</script>

<style scoped>
.search_add_func {
  display: flex;
  /* align-items: center; */
  height: 80px;
  background-color: #f4f4f4;
  margin-bottom: 50px;
}

.search_add_func > div {
  display: flex;
  align-items: center;
  margin-left: 60px;
}

.page {
  float: right;
  margin-top: 25px;
}

.el-pagination__jump {
  margin-left: 0;
}
</style>