<template>
  <div>
    <el-dialog
      title="添加子部门"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form :model="formData" :rules="formRules" label-width="120px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model.trim="formData.name" style="width:80%" placeholder="2-10个字符" />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model.trim="formData.code" style="width:80%" placeholder="2-10个字符" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" />
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model.trim="formData.introduce" style="width:80%" placeholder="1-100个字符" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button @click="$emit('closeDialog')">取消</el-button>
          <el-button type="primary">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
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
      const valid = this.treeNode.children.some(item => item.name === value)
      console.log(valid)
      if (valid) return callback(new Error('部门已存在'))
      callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        introduce: '',
        manager: '',
        pid: ''
      },
      formRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门名称要求2-10个字符', trigger: 'blur' },
          { validator: validName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门编码要求2-10个字符', trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 100, message: '部门介绍要求1-100个字符' }
        ]
      }
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped lang='scss'>

</style>
