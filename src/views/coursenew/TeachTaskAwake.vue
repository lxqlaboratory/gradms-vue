<template>
  <div class="app-container">
    <div>
      <div class="table-container">
        <el-table
          :data="datalist"
          border
          style="width: 100%;"
          size="mini"
        >
          <!--<el-table-column-->
          <!--label="序号"-->
          <!--fixed="left"-->
          <!--width="50"-->
          <!--align="center"-->
          <!--color="black"-->
          <!--&gt;-->
          <!--<template slot-scope="scope">-->
          <!--{{ scope.$index+1 }}-->
          <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column
            label="课程号"
            align="center"
            color="black"
            width="120"
          >
            <template slot-scope="scope">
              {{ scope.row.courseNum }}
            </template>
          </el-table-column>
          <el-table-column
            label="课程名"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.courseName }}
            </template>
          </el-table-column>
          <el-table-column
            label="学期"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.term }}
            </template>
          </el-table-column>
          <el-table-column
            label="原因"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.input" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div align="center">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { getTeachTaskAwakeInfoInit } from '@/api/coursenew'
import { teachTaskAwakeInfoSubmit } from '@/api/coursenew'
export default {
  data() {
    return {
      datalist: [],
      squashed: {
        courseId: '',
        input: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getTeachTaskAwakeInfoInit({ 'session': document.cookie }).then(res => {
        this.datalist = res.data.arr
      })
    },
    submit() {
      teachTaskAwakeInfoSubmit({ 'session': document.cookie, 'squashed': this.datalist }).then(res => {
        if (res.code === '1') {
          this.$message({
            message: res.msg,
            type: 'error',
            offset: '10'
          })
        }
        if (res.code === '0') {
          this.$message({
            message: '提交成功',
            type: 'success',
            offset: '10'
          })
        }
      })
    }
  }
}
</script>

