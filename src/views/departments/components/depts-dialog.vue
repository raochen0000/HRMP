<template>
  <div>
    <el-dialog
      title="添加子部门"
      :visible="dialogVisible"
      width="40%"
      @close="closeDialog"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="120px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model.trim="formData.name" style="width:80%" placeholder="2-10个字符" />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model.trim="formData.code" style="width:80%" placeholder="2-10个字符" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getManagerList">
            <el-option
              v-for="item in managerList"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model.trim="formData.introduce" style="width:80%" placeholder="1-100个字符" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getDepartmentListAPI, addDepartmentAPI } from '@/api/department'
import { getEmployesAPI } from '@/api/employes'
export default {
  name: 'DeptsDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    treeNode: {
      type: Object,
      required: true
    }
  },
  data() {
    const validName = (rules, value, callback) => {
      if (!this.treeNode.children) return callback()
      const valid = this.treeNode.children.some(item => item.name === value)
      if (valid) return callback(new Error('部门已存在'))
      callback()
    }
    const validCode = async(rules, value, callback) => {
      const res = await getDepartmentListAPI()
      const valid = res.depts.some(item => item.code === value)
      if (valid) return callback(new Error('编码已存在'))
      callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        introduce: '',
        manager: ''
      },
      formRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门名称要求2-10个字符', trigger: 'blur' },
          { validator: validName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门编码要求2-10个字符', trigger: 'blur' },
          { validator: validCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 100, message: '部门介绍要求1-100个字符' }
        ]
      },
      managerList: []
    }
  },
  created() {},
  methods: {
    // 获取下拉选项框中的负责人列表
    async getManagerList() {
      const res = await getEmployesAPI()
      this.managerList = res
    },
    closeDialog() {
      this.$refs.formRef.resetFields()
      this.$emit('closeDialog')
    },
    submitForm() {
      this.$refs.formRef.validate(async(valid) => {
        if (valid) {
          // 新增子部门的pid为当前父级部门的id
          await addDepartmentAPI({ ...this.formData, pid: this.treeNode.id })
          this.closeDialog()
          this.$emit('updata')
          this.$message.success('添加新的子部门成功')
        } else {
          return this.$message.warning('请先填入必填项')
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>

</style>
