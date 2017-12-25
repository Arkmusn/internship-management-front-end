<template>
  <div id="internship">
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
            :prop="column.prop"></el-table-column>
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
  </div>
</template>

<script>
  export default {
    name: 'internship',
    data() {
      return {
        table: {
          data: [{}],
          columns: [{
            label: '状态',
            prop: 'status'
          }, {
            label: '学号',
            prop: 'no'
          }, {
            label: '姓名',
            prop: 'name'
          }, {
            label: '班级',
            prop: 'class'
          }, {
            label: '起止时间',
            prop: 'date'
          }]
        }
      }
    }
  }
</script>
