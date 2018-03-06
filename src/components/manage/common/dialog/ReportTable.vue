<template>
  <div id=ReportTable>
    <el-dialog :visible.sync="visible"
               :before-close="close"
               :title="title">
      <el-row>
        <el-col :span="24">

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table ref="table-report"
                    :data="table.data"
                    border
                    stripe>
            <el-table-column type="index"
                             label="周数"></el-table-column>
            <el-table-column
              v-for="column in table.columns"
              :key="column.prop"
              :label="column.label"
              :prop="column.prop"
              :formatter="column.formatter"></el-table-column>
            <el-table-column label="操作"
                             width="100px"
                             fixed="right">
              <template slot-scope="table">
                <el-button size="mini"
                           type="primary"
                           @click="openDialog(table.row)">编辑
                </el-button>
                <el-button size="mini"
                           type="primary"
                           @click="openDialog(table.row)"
                           :disabled="!table.row.status||table.row.status===0"
                           v-if="type==='teacher'">详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button v-for="button in buttons"
                   :key="button.label"
                   :type="button.type"
                   @click="button.handler">{{ button.label }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Moment from 'moment'

  export default {
    name: 'ReportTable',
    props: {
      title: {
        type: String,
        default: '周报',
      },
      visible: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'student',
      },
      internship: {
        type: Object,
        default: () => {
          return {};
        }
      },
    },
    data() {
      return {
        table: {
          data: [],
          week: 1,
          columns: [
            {
              label: '状态',
              formatter: row => {
                let status = row.status;
                if (status && status === 1)
                  return '已提交';
                else
                  return '未提交';
              },
            },
            {
              label: '时间',
              prop: 'time',
            },
          ],
        },
        buttons: [
          {
            label: '取消',
            handler: () => {
              this.close();
            }
          }
        ],
        time: [],
      }
    },
    methods: {
      close(refresh) {
        this.$emit('close', refresh);
      },
      timeRange() {
        let arr = [];
        let start = Moment(this.internship.startTime);
        let end = Moment(this.internship.endTime);
        let low = start.clone();
        let high = null;
        let count = 0;
        while (low.isSameOrBefore(end) && ++count < 50) {
          high = low.clone().day(6);
          if (high.isBefore(end)) {
            arr.push(low.format('MM-DD') + ' - ' + high.format('MM-DD'));
          }
          else {
            arr.push(low.format('MM-DD') + ' - ' + end.format('MM-DD'));
          }
          low.day(7);
        }
        for (let item of arr) {
          this.table.data.push({time: item});
        }
        this.time = arr;
      },
    },
    watch: {
      internship() {
        let id = this.internship.id;
        if (id && id !== -1) {
          this.timeRange();
        }
        else {
        }
      },
    },
  }
</script>

<style scoped>

</style>
