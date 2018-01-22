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
          stripe>
          <el-table-column type="selection"
                           fixed="left"></el-table-column>
          <el-table-column
            v-for="column in table.columns"
            :key="column.prop"
            :label="column.label"
            :prop="column.prop"></el-table-column>
          <el-table-column label="操作"
                           width="250"
                           fixed="right">
            <template slot-scope="table">
              <el-button size="mini"
                         type="primary">编辑
              </el-button>
              <el-button size="mini"
                         type="danger">删除
              </el-button>
              <el-button size="mini"
                         type="warning">重置密码
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
                       :current-page="pagination.page"></el-pagination>
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
              prop: 'no'
            },
            {
              label: '姓名',
              prop: 'name'
            },
            {
              label: '性别',
              prop: 'gender'
            },
            {
              label: '系别',
              prop: 'department'
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
            page: 1,
            size: 10,
          }
        }).then(data => {
          this.table.data = data;
        }).catch(err => {
          console.log(err);
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
