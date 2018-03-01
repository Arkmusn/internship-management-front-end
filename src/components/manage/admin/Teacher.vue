<template>
  <div id="teacher">
    <el-row>
      <el-col>
        <el-button-group>
          <el-button type="primary"
                     @click="openDialog({})">新增教师
          </el-button>
          <el-button>文件导入</el-button>
        </el-button-group>
        <el-button type="danger"
                   :disabled="table.selected.length === 0"
                   @click="deleteTeacher(table.selected)">删除
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table
          ref="table-teacher"
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
                               @click="deleteTeacher([table.row])">确认
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
                       @size-change="loadTeacherData"
                       @current-change="loadTeacherData"></el-pagination>
      </el-col>
    </el-row>
    <edit-teacher :visible="dialog.visible"
                  :teacher="dialog.teacher"
                  @close="closeDialog">
    </edit-teacher>
  </div>
</template>

<script>
  import EditTeacher from './dialog/EditTeacher'

  export default {
    name: 'teacher',
    components: {
      'edit-teacher': EditTeacher
    },
    mounted() {
      this.loadTeacherData();
    },
    data() {
      return {
        table: {
          data: [{}],
          selected: [],
          columns: [
            {
              label: '教工号',
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
              label: '系别',
              prop: 'department.name'
            },
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
      loadTeacherData() {
        this.$axios({
          url: this.$api.teacher.url,
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
      selectionChange(selected) {
        this.table.selected = selected;
      },
      rowClick(row) {
        this.$refs['table-teacher'].toggleRowSelection(row);
      },
      updatePagination(data, pagination) {
        pagination.size = data.size;
        pagination.total = data.totalElements;
      },
      deleteTeacher(teachers) {
        let _this = this;
        // 批量删除
        if (teachers.length > 1) {
          this.$confirm('确定删除选中的教师?', '提示', {
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
            url: _this.$api.teacher.delete,
            method: 'post',
            data: teachers.map(teacher => teacher.id),
          }).then(() => {
            _this.$message({
              type: 'success',
              message: '删除成功'
            });
            _this.loadTeacherData();
          }).catch(err => {
          })
        }
      },
      resetPassword(teacher) {
        this.$axios({
          url: this.$api.teacher.resetPassword,
          method: 'post',
          data: {
            id: teacher.id,
            newPassword: teacher.newPassword
          }
        }).then(() => {
          this.$message({type: 'success', message: '重置密码成功'});
          teacher.resetPasswordVisible = false;
        }).catch(() => {
        })
      },
      openDialog(teacher) {
        this.dialog.teacher = teacher;
        this.dialog.visible = true;
      },
      closeDialog(success) {
        if (success) {
          this.loadTeacherData();
        }
        this.dialog.visible = false;
      },
    },
  }
</script>
