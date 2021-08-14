<template>
  <div class="app-container">
    <el-card class="tree-card">
      <!-- 用了一个行列布局 -->
      <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
        <el-col>
          <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="4">
          <el-row type="flex" justify="end">
            <!-- 两个内容 -->
            <el-col>负责人</el-col>
            <el-col>
              <!-- 下拉菜单 element -->
              <el-dropdown>
                <span>
                  操作<i class="el-icon-arrow-down" />
                </span>
                <!-- 下拉菜单 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 树形结构 -->
      <el-tree :data="treeData" @node-click="handleNodeClick">
        <el-row slot-scope="{ data }" type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col>
            <span>{{ data.name }}</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>{{ data.manager }}</el-col>
              <el-col>
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import { getDepartmentListAPI } from '@/api/department'
import { listToTree } from '@/utils'
export default {
  name: 'Departments',
  data() {
    return {
      treeData: []
    }
  },

  created() {
    this.getDepartmentList()
  },

  methods: {
    handleNodeClick() {
      return
    },
    async getDepartmentList() {
      const res = await getDepartmentListAPI()
      console.log(res.depts)
      this.treeData = listToTree(res.depts, '')
    }
  }
}
</script>

<style scoped lang='scss'>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
.el-row {
  width: 100%;
}
</style>
