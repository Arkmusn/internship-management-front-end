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
        <el-button type="danger">删除</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table
          :data="table.data"
          border
          stripe
          @selection-change="selectionChange">
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
              <el-button size="mini"
                         type="danger"
                         @click="deleteTeacher([table.row])">删除
              </el-button>
              <el-button size="mini"
                         type="warning"
                         @click="resetPassword(table.row)">重置密码
              </el-button>
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
              formatter: (row) => {
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
      selectionChange(selection) {
        console.log(selection);
      },
      updatePagination(data, pagination) {
        pagination.size = data.size;
        pagination.total = data.totalElements;
      },
      deleteTeacher(teachers) {
        let _this = this;
        // 批量删除
        if (teachers.length > 1) {
          this.$confirm('确定删除选中的教师', '提示', {
            type: 'warning'
          }).then(deleteRequest).catch()
        }
        // 单个删除
        else {
          this.$confirm(`确定删除教师'${teachers[0].name}'?`, '提示', {
            type: 'warning'
          }).then(deleteRequest).catch();
        }

        function deleteRequest() {
          _this.$axios({
            url: _this.$api.teacher.delete,
            method: 'post',
            data: teachers.map(teacher => {
              return teacher.id
            }),
          }).then(() => {
            _this.$message({
              type: 'info',
              message: '删除成功'
            })
          }).catch(err => {
          })
        }
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
