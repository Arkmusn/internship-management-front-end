<template>
  <div id="internship">
    <el-row>
      <el-col :span="24">
        <el-button type="primary"
                   @click="openDialog({})">申请实习
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
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
              <el-button size="mini"
                         type="primary"
                         @click="openDialog(table.row)"
                         v-if="table.row.status==='CREATED'||table.row.status==='NOT_PASS'">编辑
              </el-button>
              <el-button size="mini"
                         type="danger"
                         v-if="table.row.status==='CREATED'||table.row.status==='NOT_PASS'">删除
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
    <edit-internship :visible="dialog.visible"
                     :internship="dialog.internship"
                     @close="closeDialog"></edit-internship>
  </div>
</template>

<script>
  import EditInternship from './dialog/EditInternship'

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
                  case 'FINISH':
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
              formatter: row => row.startTime.toString() + ' - ' + row.endTime.toString(),
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
      updatePagination(data, pagination) {
        pagination.size = data.size;
        pagination.total = data.totalElements;
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
    },
  }
</script>
