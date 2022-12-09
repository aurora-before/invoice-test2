<template>
  <el-aside width="200px">
    <div class="aside-logo">
      <div>LOGO</div>
    </div>
    <el-menu
      :default-openeds="['1', '2', '3', '4']"
      :default-active="$route.path"
      active-text-color="red"
      router
    >
      <el-submenu index="1">
        <template slot="title">
          <router-link to="/wait">
            <i class="el-icon-s-order"></i>待开票</router-link
          ></template
        >
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <router-link to="/already"
            ><i class="el-icon-s-order"></i>已开票</router-link
          ></template
        >
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <router-link to="/statistics"
            ><i class="el-icon-s-order"></i>开票统计</router-link
          ></template
        >
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-menu"></i>系统管理</template>
        <el-menu-item index="/useradministrate">用户管理</el-menu-item>
        <el-menu-item index="/roleadministrate">角色管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
</script>
<style>
html,
body {
  margin: 0;
  height: 100%;
}
.el-aside {
  color: #333;
  height: 100%;
  background-color: #3f3f3f;
  color: #979797;
}
.menu {
  height: 100%;
}

.el-submenu__title {
  color: #979797 !important;
}
.el-submenu__title a {
  color: #979797 !important;
}
.el-submenu,
.el-menu-item {
  width: 100%;
  background-color: #3f3f3f;
  color: #979797 !important;
}
.el-submenu {
  width: 200px;
}
.aside-logo {
  width: 100%;
  height: 75px;
  padding: 20px;
  border: 1px;
  box-sizing: border-box;
}
.aside-logo > div {
  width: 100%;
  height: 35px;
  background: #979797;
  border-radius: 5px;
  color: white;
  text-align: center;
  line-height: 35px;
  font-size: 12px;
}
</style>
