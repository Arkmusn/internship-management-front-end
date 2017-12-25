<template>
  <div id="internship">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="editInternship">申请实习</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="table.data"
          border
          stripe>
          <el-table-column type="selection" fixed="left"></el-table-column>
          <el-table-column
            v-for="column in table.columns"
            :key="column.prop"
            :label="column.label"
            :prop="column.prop">
          </el-table-column>
          <el-table-column label="操作" width="250" fixed="right">
            <template slot-scope="table">
              <el-button size="mini" type="primary">编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
              <el-button size="mini" type="warning">重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <edit-dialog :visible="dialog.visible" @close="dialog.visible=false"></edit-dialog>
  </div>
</template>

<script>
  import EditInternship from './dialog/EditInternship'

  export default {
    name: 'internship',
    components: {
      'edit-dialog': EditInternship
    },
    data() {
      return {
        table: {
          data: [{}],
          columns: [{
            label: '状态',
            prop: 'status'
          }, {
            label: '主题',
            prop: 'theme'
          }, {
            label: '实习单位',
            prop: 'unit'
          }, {
            label: '起止时间',
            prop: 'date'
          }, {
            label: '指导教师',
            prop: 'teacher'
          }]
        },
        dialog: {
          visible: false
        }
      }
    },
    methods: {
      editInternship() {
        this.dialog.visible = true;
      }
    }
  }
</script>
