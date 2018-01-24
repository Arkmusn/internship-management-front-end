<template>
  <div id="EditStudent">
    <el-dialog :visible.sync="visible"
               :before-close="close"
               width="300px"
               :title="title">
      <el-form label-position="right"
               size="small"
               label-width="60px">
        <el-form-item label="学号">
          <el-input v-model="form.user.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-switch v-model="form.sex"
                     inactive-text="男"
                     inactive-color="#409EFF"
                     active-text="女"
                     active-color="#df99c9"></el-switch>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="form.classInfo"
                     value-key="id"
                     clearable
                     filterable
                     placeholder="请选择">
            <el-option-group v-for="department in departments"
                             :key="department.id"
                             :label="department.name">
              <el-option v-for="item in department.classInfo"
                         :key="item.id"
                         :label="item.name"
                         :value="item"></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button v-for="button in buttons"
                   :key="button.label"
                   :type="button.type"
                   @click="button.handler">
          {{ button.label }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'EditStudent',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      student: {
        type: Object,
        default: () => {
          return {}
        }
      },
      title: {
        type: String,
        default: '编辑学生'
      }
    },
    mounted() {
      this.loadClassInfo();
    },
    data() {
      return {
        form: {
          id: -1,
          user: {
            username: ''
          },
          name: '',
          sex: false,
          classInfo: {
            department: {},
          },
        },
        departments: [],
        buttons: [
          {
            label: '保存',
            type: 'primary',
            handler: () => {
              this.$axios({
                url: this.$api.student.url,
                method: 'post',
                data: this.form
              }).then(data => {
                this.$message({
                  type: 'success',
                  message: '保存成功',
                });
                this.close(true);
              }).catch(err => {
                this.$message({
                  type: 'error',
                  message: '保存失败'
                })
              })
            }
          },
          {
            label: '继续添加',
            handler: () => {
              this.$axios({
                url: this.$api.student.url,
                method: 'post',
                data: this.form
              }).then(data => {
                this.$message({
                  type: 'success',
                  message: '保存成功',
                });
                this.form = {
                  id: -1,
                  user: {
                    username: ''
                  },
                  name: '',
                  sex: false,
                  classInfo: {
                    department: {},
                  },
                }
              }).catch(err => {
                this.$message({
                  type: 'error',
                  message: '保存失败'
                })
              })
            }
          },
          {
            label: '取消',
            handler: () => {
              this.close();
            }
          },
        ]
      }
    },
    methods: {
      close(refresh) {
        this.$emit('close', refresh);
      },
      loadClassInfo() {
        this.$axios({
          url: this.$api.classInfo.list,
          method: 'get',
        }).then(data => {
          let departmentMap = new Map();
          for (let classInfo of data) {
            let department = classInfo.department;

            if (!departmentMap.has(department.id)) {
              departmentMap.set(department.id, department);
              department.classInfo = [classInfo];
              this.departments.push(department);
            }
            else {
              departmentMap.get(department.id).classInfo.push(classInfo);
            }
            delete classInfo.department;
          }
        }).catch(err => {
        })
      }
    },
    watch: {
      student() {
        let id = this.student.id;
        if (id && id !== -1) {
          this.form = JSON.parse(JSON.stringify(this.student));
        }
        else {
          this.form = {
            id: -1,
            user: {
              username: ''
            },
            name: '',
            sex: false,
            classInfo: {
              department: {},
            },
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
