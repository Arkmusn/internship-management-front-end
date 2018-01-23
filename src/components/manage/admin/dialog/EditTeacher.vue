<template>
  <div id=EditTeacher>
    <el-dialog :visible.sync="visible"
               :before-close="close"
               width="300px"
               :title="title">
      <el-form label-position="right"
               size="small"
               label-width="60px">
        <el-form-item label="教工号">
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
        <el-form-item label="系别">
          <el-select v-model="form.department"
                     value-key="id"
                     clearable
                     filterable
                     placeholder="请选择">
            <el-option v-for="item in departments"
                       :key="item.id"
                       :value="item"
                       :label="item.name"></el-option>
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
    name: 'EditTeacher',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      teacher: {
        type: Object,
        default: () => {
          return {}
        }
      },
      title: {
        type: String,
        default: '编辑教师'
      }
    },
    mounted() {
      this.loadDepartment();
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
          department: {},
        },
        departments: [],
        buttons: [
          {
            label: '保存',
            type: 'primary',
            handler: () => {
              this.$axios({
                url: this.$api.teacher.url,
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
      loadDepartment() {
        this.$axios({
          url: this.$api.department.list,
          method: 'get',
        }).then(data => {
          this.departments = data;
        }).catch(err => {
        })
      }
    },
    watch: {
      teacher() {
        let id = this.teacher.id;
        if (id && id !== -1) {
          this.form = JSON.parse(JSON.stringify(this.teacher));
        }
        else {
          this.form = {
            id: -1,
            user: {
              username: ''
            },
            name: '',
            sex: false,
            department: {},
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
