<template>
  <div id="internship">
    <el-row>
      <el-col :span="24">
        <el-button type="primary"
                   :disabled="table.selected.length === 0"
                   @click="audit(table.selected)">审核
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          ref="table-internship"
          :data="table.data"
          border
          stripe
          @selection-change="selectionChange"
          @row-click="rowClick">
          <el-table-column type="selection"
                           :selectable="isSelectable"
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
                         @click="openDialog(table.row)"
                         v-if="table.row.status==='CREATED'">审核
              </el-button>
              <el-popover placement="top"
                          trigger="click"
                          title="确认打回?"
                          v-model="table.row.rejectVisible"
                          v-if="table.row.status==='CREATED'">
                <el-form size="mini">
                  <el-form-item>
                    <el-button type="danger"
                               @click="reject([table.row])">确认
                    </el-button>
                    <el-button @click="table.row.rejectVisible=false">取消</el-button>
                  </el-form-item>
                </el-form>
                <el-button size="mini"
                           type="danger"
                           slot="reference"
                           @click="table.row.rejectVisible=true">打回
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
                       :current-page="pagination.page"></el-pagination>
      </el-col>
    </el-row>
    <edit-internship :visible="dialog.visible"
                     :internship="dialog.internship"
                     type="teacher"
                     @audit="audit"
                     @close="closeDialog"></edit-internship>
  </div>
</template>

<script>
  import EditInternship from '../common/dialog/EditInternship'

  export default {
    name: 'internship',
    components: {
      'edit-internship': EditInternship,
    },
    mounted() {
      this.loadInternshipData();
    },
    data() {
      return {
        table: {
          data: [{}],
          selected: [],
          columns: [
            {
              label: '状态',
              prop: 'status',
              formatter: row => {
                const status = row.status;
                switch (status) {
                  case 'CREATED':
                    return '待审核';
                    break;
                  case 'PROCESSING':
                    return '进行中';
                    break;
                  case 'NOT_PASS':
                    return '未通过';
                    break;
                  case 'FINISH':
                    return '已结束';
                    break;
                }
              },
            }, {
              label: '学号',
              prop: 'student.user.username'
            }, {
              label: '姓名',
              prop: 'student.name'
            }, {
              label: '班级',
              prop: 'student.classInfo.name'
            }, {
              label: '起止时间',
              prop: 'date',
              formatter: row => row.startTime + ' - ' + row.endTime,
            }
          ]
        },
        dialog: {
          visible: false,
          internship: {},
        },
        pagination: {
          page: 1,
          size: 10,
          sizes: [10, 20, 50, 100],
          total: 0
        },
      }
    },
    methods: {
      loadInternshipData() {
        this.$axios({
          url: this.$api.teacher.listIntern,
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
      updatePagination(page, pagination) {
        pagination.size = page.size;
        pagination.total = page.totalElements;
      },
      selectionChange(selected) {
        this.table.selected = selected;
      },
      rowClick(row) {
        if (this.isSelectable(row))
          this.$refs['table-internship'].toggleRowSelection(row);
      },
      openDialog(internship) {
        this.dialog.internship = internship;
        this.dialog.visible = true;
      },
      closeDialog(success) {
        if (success) {
          this.loadInternshipData();
        }
        this.dialog.visible = false;
      },
      isSelectable(row) {
        return row.status === 'CREATED';
      },
      audit(internships) {
        let _this = this;
        if (internships.length > 1) {
          this.$confirm('确定审核通过已选定的申报书吗?', '提示', {
            type: 'warning'
          }).then(auditRequest).catch(() => {
          })
        }
        else {
          auditRequest();
        }

        function auditRequest() {
          _this.$axios({
            url: _this.$api.internship.audit,
            method: 'post',
            data: internships.map(internship => internship.id)
          }).then(() => {
            _this.$message({
              type: 'success',
              message: '审核完成',
            });
            _this.loadInternshipData();
          }).catch(err => {
          })
        }
      },
      reject(internships) {
        let _this = this;
        if (internships.length > 1) {
          this.$confirm('确定打回已选定的申报书吗?', '提示', {
            type: 'warning'
          }).then(deleteRequest).catch(() => {
          })
        }
        else {
          deleteRequest();
        }

        function deleteRequest() {
          _this.$axios({
            url: _this.$api.internship.reject,
            method: 'post',
            data: internships.map(internship => internship.id),
          }).then(() => {
            _this.$message({
              type: 'success',
              message: '已打回申报书'
            });
            _this.loadInternshipData();
          }).catch(err => {
          })
        }
      },
    },
  }
</script>
