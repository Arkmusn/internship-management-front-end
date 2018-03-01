<template>
  <div id="student">
    <el-row>
      <el-col :span="24">
        <el-button-group>
          <el-button type="primary"
                     @click="openDialog({})">新增学生
          </el-button>
          <el-button>文件导入</el-button>
        </el-button-group>
        <el-button type="danger"
                   :disabled="table.selected.length === 0"
                   @click="deleteStudent(table.selected)">删除
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          ref="table-student"
          :data="table.data"
          border
          stripe
          @selection-change="selectionChange"
          @row-click="rowClick">
          <el-table-column type="selection"
                           fixed="left"></el-table-column>
          <el-table-column
            v-for="column in table.columns"
            :key="column.prop"
            :label="column.label"
            :prop="column.prop"
            :formatter="column.formatter"></el-table-column>
          <el-table-column label="操作"
                           width="250"
                           fixed="right">
            <template slot-scope="table">
              <el-button size="mini"
                         type="primary"
                         @click="openDialog(table.row)">编辑
              </el-button>

              <el-popover placement="top"
                          trigger="click"
                          title="确认删除?"
                          v-model="table.row.deleteVisible">
                <el-form size="mini">
                  <el-form-item>
                    <el-button type="danger"
                               @click="deleteStudent([table.row])">确认
                    </el-button>
                    <el-button @click="table.row.deleteVisible=false">取消</el-button>
                  </el-form-item>
                </el-form>
                <el-button size="mini"
                           type="danger"
                           slot="reference"
                           @click="table.row.deleteVisible=true">删除
                </el-button>
              </el-popover>

              <el-popover trigger="click"
                          placement="top"
                          title="重置密码"
                          v-model="table.row.resetPasswordVisible">
                <el-form size="mini">
                  <el-form-item>
                    <el-input v-model="table.row.newPassword"
                              placeholder="请输入新密码"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary"
                               @click="resetPassword(table.row)">提交
                    </el-button>
                    <el-button @click="table.row.resetPasswordVisible=false">取消</el-button>
                  </el-form-item>
                </el-form>
                <el-button slot="reference"
                           size="mini"
                           type="warning"
                           @click="table.row.resetPasswordVisible=true">重置密码
                </el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-pagination background
                       :total="pagination.total"
                       :page-size="pagination.size"
                       :page-sizes="pagination.sizes"
                       :current-page="pagination.page"
                       @size-change="loadStudentData"
                       @current-change="loadStudentData"></el-pagination>
      </el-col>
    </el-row>
    <edit-student :visible="dialog.visible"
                  :student="dialog.student"
                  @close="closeDialog">
    </edit-student>
  </div>
</template>

<script>
  import EditStudent from './dialog/EditStudent'

  export default {
    name: 'student',
    components: {
      'edit-student': EditStudent
    },
    mounted() {
      this.loadStudentData();
    },
    data() {
      return {
        table: {
          data: [{}],
          selected: [],
          columns: [
            {
              label: '学号',
              prop: 'user.username'
            },
            {
              label: '姓名',
              prop: 'name'
            },
            {
              label: '性别',
              prop: 'sex',
              formatter: row => {
                if (row.sex)
                  return '女';
                else
                  return '男';
              }
            },
            {
              label: '班级',
              prop: 'class.name'
            },
            {
              label: '系别',
              prop: 'class.department.name'
            }
          ]
        },
        dialog: {
          visible: false,
          teacher: {},
        },
        pagination: {
          page: 1,
          size: 10,
          sizes: [10, 20, 50, 100],
          total: 0
        }
      }
    },
    methods: {
      loadStudentData() {
        this.$axios({
          url: this.$api.student.url,
          methods: 'get',
          params: {
            page: this.pagination.page,
            size: this.pagination.size,
          }
        }).then(data => {
          this.table.data = data.content;
          this.updatePagination(data, this.pagination);
        }).catch(err => {

        })
      },
      updatePagination(data, pagination) {
        pagination.size = data.size;
        pagination.total = data.totalElements;
      },
      selectionChange(selected) {
        this.table.selected = selected;
      },
      rowClick(row) {
        this.$refs['table-student'].toggleRowSelection(row);
      },
      deleteStudent(students) {
        let _this = this;
        // 批量删除
        if (students.length > 1) {
          this.$confirm('确定删除选中的学生?', '提示', {
            type: 'warning'
          }).then(deleteRequest).catch(() => {
          })
        }
        // 单个删除
        else {
          deleteRequest();
        }

        function deleteRequest() {
          _this.$axios({
            url: _this.$api.student.delete,
            method: 'post',
            data: students.map(student => {
              return student.id
            }),
          }).then(() => {
            _this.$message({
              type: 'success',
              message: '删除成功'
            });
            _this.loadStudentData();
          }).catch(err => {
          })
        }
      },
      resetPassword(student) {
        this.$axios({
          url: this.$api.student.resetPassword,
          method: 'post',
          data: {
            id: student.id,
            newPassword: student.newPassword
          }
        }).then(() => {
          this.$message({type: 'success', message: '重置密码成功'});
          student.resetPasswordVisible = false;
        }).catch(() => {
        })
      },
      openDialog(student) {
        this.dialog.student = student;
        this.dialog.visible = true;
      },
      closeDialog(success) {
        if (success) {
          this.loadStudentData();
        }
        this.dialog.visible = false;
      },
    },
  };
</script>
