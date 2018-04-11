<template>
  <div id="internship"
       class="flex-container main-box full-height">
    <el-row>
      <el-col :span="24">
        <el-button type="primary"
                   @click="openDialog({})">申请实习
        </el-button>
      </el-col>
    </el-row>
    <el-row class="table-box">
      <el-col :span="24"
              class="full-height">
        <el-table
          :data="table.data"
          border
          stripe>
          <el-table-column
            v-for="column in table.columns"
            :key="column.prop"
            :label="column.label"
            :prop="column.prop"
            :formatter="column.formatter">
          </el-table-column>
          <el-table-column label="操作"
                           width="250"
                           fixed="right">
            <template slot-scope="table">

              <!--编辑-->
              <el-button size="mini"
                         type="primary"
                         @click="openDialog(table.row)"
                         v-if="table.row.status==='CREATED'||table.row.status==='NOT_PASS'">编辑
              </el-button>

              <!--删除-->
              <el-popover placement="top"
                          trigger="click"
                          title="确认删除?"
                          v-model="table.row.deleteVisible"
                          v-if="table.row.status==='CREATED'||table.row.status==='NOT_PASS'">
                <el-form size="mini">
                  <el-form-item>
                    <el-button type="danger"
                               @click="deleteInternship([table.row])">确认
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

              <el-button size="mini"
                         type="primary"
                         @click="openReport(table.row)"

                         v-if="table.row.status!=='CREATED'&&table.row.status!=='NOT_PASS'">查看周报
              </el-button>

              <!--结束-->
              <el-button size="mini"
                         type="success"
                         @click="openFinish(table.row)"
                         v-if="table.row.status==='PROCESSING'">结束
              </el-button>
              <!--查看总结-->
              <el-button size="mini"
                         type="primary"
                         @click="openFinish(table.row, true)"
                         v-if="table.row.status==='FINISHED'||table.row.status==='END'">查看总结
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="pagination-box">
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
                     @close="closeDialog"></edit-internship>
    <finish-internship :visible="finish.visible"
                       :internship="finish.internship"
                       :finishFlag="finish.finishFlag"
                       @close="closeFinish"></finish-internship>
    <report-table :visible="report.visible"
                  :internship="report.internship"
                  @close="closeReport"></report-table>
  </div>
</template>

<script>
  import EditInternship from '../common/dialog/EditInternship'
  import FinishInternship from '../common/dialog/FinishInternship'
  import ReportTable from '../common/dialog/ReportTable'

  export default {
    name: 'internship',
    components: {
      'edit-internship': EditInternship,
      'finish-internship': FinishInternship,
      'report-table': ReportTable,
    },
    mounted() {
      this.loadInternshipData();
    },
    data() {
      return {
        table: {
          data: [],
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
                  case 'FINISHED':
                    return '待评分';
                    break;
                  case 'END':
                    return '已结束';
                    break;
                }
              },
            }, {
              label: '主题',
              prop: 'theme'
            }, {
              label: '实习单位',
              prop: 'companyName'
            }, {
              label: '起止时间',
              prop: 'date',
              formatter: row => row.startTime + ' - ' + row.endTime,
            }, {
              label: '指导教师',
              prop: 'teacher.name'
            }
          ]
        },
        dialog: {
          visible: false,
          internship: {},
        },
        finish: {
          visible: false,
          finishFlag: false,
          internship: {},
        },
        report: {
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
          url: this.$api.internship.url,
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
      deleteInternship(internships) {
        let _this = this;
        // 批量删除
        if (internships.length > 1) {
          this.$confirm('确定删除选中的实习申报书?', '提示', {
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
            url: _this.$api.internship.delete,
            method: 'post',
            data: internships.map(internship => internship.id),
          }).then(() => {
            _this.$message({
              type: 'success',
              message: '删除成功'
            });
            _this.loadInternshipData();
          }).catch(err => {
          })
        }
      },
      openFinish(internship, finishFlag) {
        this.finishFlag = !!finishFlag;
        this.finish.internship = internship;
        this.finish.visible = true;
      },
      closeFinish(success) {
        this.finish.visible = false;
        if (success) {
          this.loadInternshipData();
        }
      },
      openReport(internship) {
        this.report.internship = internship;
        this.report.visible = true;
      },
      closeReport(success) {
        if (success) {
          this.loadInternshipData();
        }
        this.report.visible = false;
      },
    },
  }
</script>

<style scoped>
  .main-box {
    flex-direction: column;
  }
  .table-box {
    flex-grow: 99;
  }
</style>
