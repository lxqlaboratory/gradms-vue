<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="8" style="font-size: 16px;font-weight: bold;color: #304156 ">团队申请信息</td>
      </tr>
      <tr>
        <td colspan="1" width="10%">团队名称</td>
        <td colspan="1" width="30%">
          <el-input v-model="form.teamName" placeholder="请输入团队名称" />
        </td>
        <td colspan="1" width="10%">责任导师</td>
        <td colspan="1" width="20%">
          {{ form.leaderNum }}-{{ form.leaderName }}
        </td>
        <td colspan="1" width="10%">培养单位</td>
        <td colspan="1" width="20%">
          {{ form.collegeName }}
        </td>
      </tr>
      <tr>
        <td colspan="6" >团队介绍</td>
      </tr>
      <tr>
        <td colspan="6">
          <tinymce v-model="form.des" :height="150" />
        </td>
      </tr>
    </table>
    <table class="headline">
      <tr><td>团对成员列表</td></tr>
    </table>
    <el-table
      :data="personList"
      border
      style="width: 100%;"
      size="mini"
    >
      <el-table-column
        label="序号"
        fixed="left"
        width="50"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="工号"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.perNum }}
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
          {{ scope.row.proTechPositionCode }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          <el-button type="primary" @click="doPersonDelete(scope.row.teamPersonId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="center">
      <tr>
        <td>
          <el-button type="primary" @click="doSave()">保存</el-button>
          <el-select  style="width:300px;"
            v-model="personId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入姓名或工号"
            :remote-method="getPersonList"
            :loading="loading"
          >
            <el-option
              v-for="item in selectList"
              :key="item.personId"
              :label="item.perName"
              :value="item.personId"
            />
          </el-select>
          <el-button type="primary" @click="doPersonAdd()">添加团队成员</el-button>
        </td>
      </tr>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { recruitTeamApply } from '@/api/tutor'
import { recruitTeamApplySave } from '@/api/tutor'
import { getPersonNameMapListByPerNumName } from '@/api/personinfo'
import { recruitTeamApplyPersonList } from '@/api/tutor'
import { recruitTeamApplyPersonAdd } from '@/api/tutor'
import { recruitTeamApplyPersonDelete } from '@/api/tutor'
export default {
  name: 'RecruitTeamApply',
  components: { Tinymce },
  data() {
    return {
      form: {
        teamId: null,
        teamName: '',
        leaderNum: '',
        leaderName: '',
        collegeName: '',
        des: ''
      },
      loading: false,
      isCanEdit: true,
      isCanApply: true,
      personId: '',
      selectList: [],
      list: [],
      stats: [],
      personList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      recruitTeamApply({ 'session': document.cookie, 'personId': this.personId }).then(res => {
        this.isCanEdit = res.data.isCanEdit
        this.isCanApply = res.data.isCanApply
        this.form = res.data.form
        this.personList = res.data.personList
      })
    },
    getTeamPersonList() {
      recruitTeamApplyPersonList({ 'session': document.cookie, 'teamId': this.form.teamId }).then(res => {
        this.personList = res.data
      })
    },

    doSave() {
      recruitTeamApplySave({ 'session': document.cookie, 'form': this.form
      }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '提交成功',
            type: 'success',
            offset: '10'
          })
          this.form.teamId = res.data
        }
      })
    },
    getPersonList(numName) {
      if (numName !== '' && numName.length >= 2) {
        this.loading = true
        getPersonNameMapListByPerNumName({ 'session': document.cookie, 'numName': numName }).then(res => {
          this.selectList = res.data
          console.log(this.selectList)
          this.loading = false
        }).catch(() => {
        })
      }
    },
    doPersonAdd() {
      if(this.form.teamId == undefined) {
          this.$message({
            message: '首先保存团队信息在添加团队成员',
            type: 'success',
            offset: '10'
          })
      }else if(this.personId == undefined) {
          this.$message({
            message: '没有选择老师，不能添加',
            type: 'success',
            offset: '10'
          })
      }else{
        recruitTeamApplyPersonAdd({ 'session': document.cookie, 'teamId': this.form.teamId, 'personId': this.personId
        }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '添加成功',
              type: 'success',
              offset: '10'
            })
            this.getTeamPersonList()
          }else{
            this.$message({
              message: res.msg,
              type: 'warning',
              offset: '10'
            })
          }
        })
        }
    },
    doPersonDelete(teamPersonId) {
      this.$confirm('确认要删除已添加的团队程序成员吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(teamPersonId);
        recruitTeamApplyPersonDelete({ 'session': document.cookie, 'teamPersonId': teamPersonId }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '删除成功',
              type: 'sucess'
            })
            this.getTeamPersonList()
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
