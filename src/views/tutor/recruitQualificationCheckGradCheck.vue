<template>
  <div class="app-container">
    <div class="table-container">
      <el-table
        :data="applyList"
        border
        ref="multipleTable"
        @selection-change="selectionChange">
        style="width: 100%;"
        size="mini"
      >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
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
          label="职称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.age }}
          </template>
          <template slot-scope="scope">
            {{ scope.row.proTechPosition }}
          </template>
        </el-table-column>
        <el-table-column
          label="最后学位"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.age }}
          </template>
          <template slot-scope="scope">
            {{ scope.row.lastDegree }}
          </template>
        </el-table-column>
        <el-table-column
          label="博导时间"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.age }}
          </template>
          <template slot-scope="scope">
            {{ scope.row.doctorTutorTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="年龄"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.age }}
          </template>
        </el-table-column>
       <el-table-column
          label="申请类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.applyNames }}
          </template>
        </el-table-column>
       <el-table-column
          label="专业代码"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorNums }}
          </template>
        </el-table-column>
       <el-table-column
          label="专业名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorNames }}
          </template>
        </el-table-column>
       <el-table-column
          label="备注"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.note }}
          </template>
        </el-table-column>
       <el-table-column
          label="审核状态"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.checkStateName }}
          </template>
        </el-table-column>
       <el-table-column
          label="操作"
          align="center"
          color="black"
        >
        <template slot-scope="scope">
          <el-button type="primary" @click="doView(scope.row.applyId)" >详情</el-button>
          <el-button type="primary" @click="doViewAchievement(scope.row.personId)" >成果</el-button>          
          <el-button type="primary"   >
            <a :href="serverAddres+'/api/tutor/getTutorRecruitQualificationPrintData?applyId='+scope.row.applyId" :download="scope.row.applyTableName">简况表</a>
          </el-button>
          <el-button  type="primary" v-if="scope.row.attachId > 0" >
                <a :href="serverAddres+'/api/tutor/recruitQualificationAttachDownload?attachId='+scope.row.attachId" :download="scope.row.attachFileName">附件</a>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div align="center">
      <el-button  type="primary" @click="doCheckSelect(0)" >取消审核</el-button>
      <el-button  type="primary" @click="doCheckSelect(1)" >审核通过</el-button>
      <el-button  type="primary" @click="doCheckSelect(2)" >审核不通过</el-button>
    </div>
  </div>
</template>

<script>
import XlsxPopulate from 'xlsx-populate';
import { saveAs } from 'file-saver';
import { recruitQualificationCheckGradCheck } from '@/api/tutor'
import { recruitQualificationCheckSubmitSelectGrad } from '@/api/tutor'

export default {
  name: 'recruitQualificationCheckGrad',
  data() {
    return {
      serverAddres:'',
      multipleSelection:[],
      collegeId:'',
      applyList:[],
   }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.collegeId = this.$route.query.collegeId
      this.serverAddres = this.GLOBAL.servicePort
      recruitQualificationCheckGradCheck({ 'session': document.cookie, 'collegeId':this.collegeId }).then(res => {
        this.applyList = res.data
      })
    },
    doQuery() {
      recruitQualificationCheckGradCheck({ 'session': document.cookie, 'collegeId':this.collegeId }).then(res => {
        this.applyList = res.data
      })
    },

    selectionChange(val) {
        this.multipleSelection = val;
    },
    doView(applyId){
      this.$router.push({ path: '/tutor/recruitQualificationApply', query: { applyId }})
    },
    doViewAchievement(personId){
      this.$router.push({ path: '/tutor/tutorRecruitAchievementList', query: { personId }})
    },
    doCheckSelect(state){
      var applyIds = ''
      for(var i = 0; i < this.multipleSelection.length;i++){
        if(i===0) {
          applyIds =  this.multipleSelection[0].applyId.toString()
        }else{
          applyIds = applyIds + '-' + this.multipleSelection[i].applyId.toString()
        }
      }
      if(applyIds=== ''){
        this.$message({
          message: '选择不能为空',
          type: 'success'
        });
      }else{
        console.log(applyIds)
        recruitQualificationCheckSubmitSelectGrad({ 'session': document.cookie, 'applyIds': applyIds, 'state': state
        }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '提交成功',
              type: 'success',
              offset: '10'
            })
            this.getApplyList();
          }
        })
      }
    },
    doCheck(majorApplyId,state){
      recruitQualificationCheckSubmitGrad({ 'session': document.cookie, 'majorApplyId': majorApplyId, 'state': state
      }).then(res => {
         if (res.code === '0') {
          this.$message({
            message: '提交成功',
            type: 'success',
            offset: '10'
          })
          this.doQuery();
        }
      })
    },
  }
}
</script>

