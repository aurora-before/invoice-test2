<template>
  <div class="page">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next, jumper"
      :total="1000"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: ["pageSize", "currentPage"],
  methods: {
    handleCurrentChange(val) {
      this.$emit("paginationCurrent", { currentPage: val });
    },
    handleSizeChange(val) {
      this.$emit("paginationSize", { pageSize: val });
    },
  },
};
</script>

<style scoped>
.page {
  text-align: right;
  margin-top: 50px;
}
</style>