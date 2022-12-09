<template>
  <div id="app">
    <div v-if="$route.meta.keepAlive">
      <el-container style="height: 100vh; border: 1px">
        <Aside />
        <el-container style="height: 100vh">
          <el-header style="font-size: 12px">
            <div
              style="
                min-width: 234px;
                text-align: left;
                display: flex;
                align-items: center;
              "
            >
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }"
                  >一级菜单</el-breadcrumb-item
                >
                <el-breadcrumb-item
                  ><a href="/">二级菜单</a></el-breadcrumb-item
                >
                <el-breadcrumb-item>当前页面</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="header-right">
              <div class="help">
                <i class="el-icon-question"></i>
                <span>帮助</span>
              </div>
              <div class="login-info">
                <div class="profile">
                  <img src="@/assets/profile.png" alt="" />
                </div>
                <div class="login-name" v-show="!loginSwitch">登录</div>
                <div class="login-name" v-show="loginSwitch">
                  {{ loginName }}
                </div>
                <div class="leave" @click="leave">退出登录</div>
              </div>
            </div>
          </el-header>
          <el-main>
            <router-view
              :userList="userList"
              :keyy="key"
              @deleteId="deleteId"
            ></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Aside from "./components/Aside.vue";
import Cookie from "js-cookie";

export default {
  name: "App",
  data() {
    return {
      key: "c4ca4238a0b923820dcc509a6f75849b",
      timestamp: "",
      sign: "",
      userList: [],
    };
  },
  watch: {
    $route(to, from) {
      window.location.reload();
    },
  },
  computed: {
    loginName() {
      return Cookie.get("username");
    },
    loginSwitch() {
      return Cookie.get("loginSwitch");
    },
  },
  mounted() {
    // 时间戳
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
          .post("/api/user/userList", {
            page: 1,
            limit: 10,
            sign: this.sign,
            timestamp: time,
            key: this.key,
          })
          .then((res) => {
            this.userList = res.data.data.list;
          });
      });
  },
  methods: {
    leave() {
      Cookie.remove("username");
      Cookie.remove("loginSwitch");
      Cookie.remove("loginId");
      location.reload();
    },
    deleteId(id) {
      let time = parseInt(new Date().getTime() / 1000);
      this.timestamp = time;
      this.did = id;
      this.$axios
        .post("/api/Apibase/getSign", {
          key: this.key,
          timestamp: this.timestamp,
          id: this.did,
        })
        .then((res) => {
          this.sign = res.data.data;
          this.$axios
            .post("/api/user/deleteUser", {
              sign: this.sign,
              key: this.key,
              timestamp: this.timestamp,
              id: this.did,
            })
            .then((res) => {
              if (res.data.code == 1) {
                this.$message({
                  message: res.data.msg,
                  type: "success",
                });
                window.location.reload();
              } else {
                this.$message.error(res.data.msg);
              }
            });
        });
    },
  },
  components: {
    Aside,
  },
};
</script>

<style>
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: #999 !important;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  font-weight: bolder !important;
  font-size: large !important;
  color: black !important;
  line-height: 12px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

html,
body,
#app,
.el-container {
  height: 100%;
  background-color: #f4f4f4;
}
.el-header {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
}
.header-right {
  width: 210px;
  height: 60px;
  display: flex;
  font-size: 14px;
  color: #999;
  justify-content: space-between;
}
.help {
  width: 50px;
  height: 60px;
  text-align: center;
}
.login-info {
  width: 150px;
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
}

.login-name {
  width: 110px;
  height: 50px;
  line-height: 50px;
}
.leave {
  opacity: 0;
  position: absolute;
  width: 110px;
  height: 40px;
  line-height: 40px;
  background: white;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  text-align: center;
  top: 60px;
}
.leave:hover {
  color: #409eff;
}
.login-info:hover .leave {
  opacity: 1;
  transition: all 1s;
  cursor: pointer;
}

.profile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.profile > img {
  min-width: 100%;
  height: 100%;
}
a {
  text-decoration: none;
}

.el-main {
  background: white;
  margin: 20px;
}
</style>
