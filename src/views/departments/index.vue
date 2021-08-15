<template>
  <div class="app-container">
    <el-card class="tree-card">
      <!-- 用了一个行列布局 -->
      <Row :treedata="company" @onAdd="addDepartment" />
      <!-- 树形结构 -->
      <el-tree :data="treeData">
        <template slot-scope="{ data }">
          <Row :treedata="data" @onDelete="getDepartmentList" @onAdd="addDepartment" />
        </template>
      </el-tree>
    </el-card>
    <!-- 添加部门弹出层 -->
    <DeptsDialog
      :dialog-visible="addDialogVisible"
      :tree-node="treeNode"
      @closeDialog="addDialogVisible = false"
      @updata="getDepartmentList"
    />
  </div>
</template>

<script>
import { getDepartmentListAPI } from '@/api/department'
import { listToTree } from '@/utils'
import Row from './components/row.vue'
import DeptsDialog from './components/depts-dialog.vue'
export default {
  name: 'Departments',
  components: {
    Row,
    DeptsDialog
  },
  data() {
    return {
      // 组织树形数据
      treeData: [],
      // 公司信息
      company: {
        name: '',
        manager: '负责人',
        isRoot: true
      },
      addDialogVisible: false,
      treeNode: {}
    }
  },
  created() {
    this.getDepartmentList()
  },

  methods: {
    // 获取组织结构数据
    async getDepartmentList() {
      const res = await getDepartmentListAPI()
      this.company.name = res.companyName
      this.treeData = listToTree(res.depts, '')
      this.company.children = this.treeData
    },
    // 添加新的子部门
    addDepartment(val) {
      this.addDialogVisible = true
      this.treeNode = val
    }
  }
}
</script>

<style scoped lang='scss'>
.tree-card {
  padding: 30px 40px;
  font-size:14px;
}
</style>
