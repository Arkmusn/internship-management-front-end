<template>
  <div id="announcement">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-form label-position="top">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="可见角色">
            <el-select v-model="form.roles" multiple placeholder="请选择">
              <el-option
                v-for="role in roles"
                :key="role.value"
                :label="role.label"
                :value="role.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="正文">
            <!--TODO 富文本插件-->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'announcement',
    data() {
      return {
        form: {
          title: '',
          roles: []
        },
        roles: [{
          label: '教师',
          value: 'teacher'
        }, {
          label: '学生',
          value: 'student'
        }]
      }
    }
  }
</script>
