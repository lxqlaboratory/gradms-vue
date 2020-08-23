<template>
  <div class="app-container">
    <div class="table-container">
      <el-table
        :data="outgoingList"
        border
        style="width: 100%;"
        size="mini"
      >
        <el-table-column
          label="工号"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.personId }}
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.perName }}
          </template>
        </el-table-column>
        <el-table-column
          label="学院"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="职称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.teaDuty }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          color="black"
          width = "260"
        >
          <template slot-scope="scope">
            <el-button type="primary" @click="doDelete(scope.row.personId)" >删除</el-button>
          </template>

      </el-table>
    </div>
    <div align="center">
      <tr>
        <td>
          添加人才工号
          <el-input v-model="perNum" placeholder="请输入工号" style="width:100px" />
          <el-button type="primary" @click="talentAdd()">添加</el-button>
        </td>
      </tr>
    </div>
  </div>
</template>

<script>
import { recruitOutstandingMaintain } from '@/api/tutor'
import { recruitOutstandingMaintainAdd } from '@/api/tutor'
import { recruitOutstandingMaintainDelete } from '@/api/tutor'

export default {
    name: 'RecruitOutstandingMaintain',
    data() {
      return {
        personId: '',
        perName: '',
        collegeName: '',
        teaDuty: '',
        perNum: '',
        outgoingList: []
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        recruitOutstandingMaintain({ 'session': document.cookie }).then(res => {
          this.outgoingList = res.data.outgoingList
          this.personId = res.data.personId
        })
      },
      talentAdd() {
        if (this.perNum === 'undefined') {
          this.$message({
            message: '人员为空，不能添加',
            type: 'success'
          })
        } else {
          recruitOutstandingMaintainAdd({ 'session': document.cookie, 'perNum': this.perNum }).then(res => {
            if (res.code === '0') {
              this.$message({
                message: '添加成功',
                type: 'success',
                offset: '10'
              })
              this.fetchData()
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          })
        }
      },
      doDelete(personId) {
        this.$confirm('确认删除人才吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          recruitOutstandingMaintainDelete({ 'session': document.cookie, 'personId': personId }).then(res => {
            this.dialogFormVisible = false
            if (res.code === '0') {
              this.$message({
                message: '删除成功',
                type: 'success',
                offset: '10'
              })
              this.fetchData()
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '已取消删除'
          })
        })
      }

    }
  }
</script>