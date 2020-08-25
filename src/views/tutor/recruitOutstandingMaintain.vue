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
          label="出生年月"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.perBirthday }}
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
          width = "260"
        >
          <template slot-scope="scope">
            <el-button type="primary" @click="doDelete(scope.row.applyId)" >删除</el-button>
          </template>

      </el-table>
    </div>
    <div align="center">
      <tr>
        <td>
        人才姓名或工号
          <el-select  style="width:150px;"
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
          备注
            <el-input v-model="note" placeholder="请输入备注信息" style="width:150px" />
            <el-button type="primary"  @click="doAdd()">添加</el-button>
            <el-button>
            <a href="/downloads/tutor/outstandingTutorImport.xls" >导入模板下载</a>
            </el-button>
            <fileupload
              url="/api/tutor/importTutorOutstandingData"
              :data="{'docType': xls }"
              accepttype=".xls"
              @successcallback="onSuccess"
              @preview="onPreview"
            >导入人才信息
            </fileupload>
        </td>
      </tr>
    </div>
  </div>
</template>

<script>
import { recruitOutstandingMaintain } from '@/api/tutor'
import { recruitOutstandingMaintainAdd } from '@/api/tutor'
import { recruitOutstandingMaintainDelete } from '@/api/tutor'
import { getPersonNameMapListByPerNumName } from '@/api/personinfo'
import fileupload from '../../components/upload/fileupload'

export default {
    name: 'RecruitOutstandingMaintain',
    components: { fileupload },
    data() {
      return {
        personId: '',
        note:'',
        selectList:[],
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
          this.selectList = res.data.selectList
        })
      },
      getPersonList(numName) {
        if (numName !== '' && numName.length >= 2) {
          this.loading = true
          getPersonNameMapListByPerNumName({ 'session': document.cookie, 'numName': numName }).then(res => {
            this.selectList = res.data
            this.loading = false
          }).catch(() => {
          })
        }
      },
      doAdd() {
        if (this.personId === undefined || this.personId <= 0 ) {
          this.$message({
            message: '人员为空，不能添加',
            type: 'success'
          })
        } else {
          recruitOutstandingMaintainAdd({ 'session': document.cookie, 'personId': this.personId,'note':this.note }).then(res => {
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
      doDelete(applyId) {
        this.$confirm('确认删除人才吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          recruitOutstandingMaintainDelete({ 'session': document.cookie, 'applyId': applyId }).then(res => {
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
      },
      onPreview: function(file) {
      },
      onSuccess(res, file) {
          if(res.code === '0'){
            this.$message({
              message: '导入成功',
              type: 'success'
            });
            this.fetchData()
          }
          else{
            this.$alert( res.msg, '导入错误信息', {
            dangerouslyUseHTMLString: true
            });          
          }
      },

    }
  }
</script>