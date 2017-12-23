<template>
  <div id="teacher">
    <el-row>
      <el-col :span="24">
        <el-button-group>
          <el-button type="primary">新增教师</el-button>
          <el-button>文件导入</el-button>
        </el-button-group>
        <el-button type="danger">删除</el-button>
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
    name: 'teacher',
    data() {
      return {
        table: {
          data: [{}],
          columns: [{
            label: '教工号',
            prop: 'no'
          }, {
            label: '姓名',
            prop: 'name'
          }, {
            label: '性别',
            prop: 'gender'
          }, {
            label: '系别',
            prop: 'department'
          }]
        }
      }
    }
  }
</script>
