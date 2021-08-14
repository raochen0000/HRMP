<template>
  <div class="row-container">
    <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
      <el-col :span="4">
        <span>{{ treedata.name }}</span>
      </el-col>
      <el-col :span="20">
        <el-row type="flex" justify="end">
          <!-- 负责人 -->
          <el-col :offset="12">{{ treedata.manager }}</el-col>
          <el-col>
            <!-- 操作下拉菜单 -->
            <el-dropdown @command="onDropdownCommand">
              <span>
                操作<i class="el-icon-arrow-down" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item command="edit">查看部门</el-dropdown-item>
                <el-dropdown-item command="del">删除部门</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { delOrganizeAPI } from '@/api/department'
export default {
  name: 'Row',
  props: {
    treedata: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  created() {},
  methods: {
    onDropdownCommand(command) {
      if (command === 'del') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await delOrganizeAPI(this.treedata.id)
          this.$emit('onDelete')
          this.$message.success('删除成功')
        })
      } else if (command === 'edit') {
        console.log('查看部门')
      } else if (command === 'add') {
        this.$emit('onAdd', this.treedata)
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.row-container {
    width: 100%;
}
</style>
