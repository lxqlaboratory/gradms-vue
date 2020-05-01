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
          label="申请类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.applyNames }}
          </template>
        </el-table-column>
       <el-table-column
          label="申请专业"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorNames }}
          </template>
        </el-table-column>
       <el-table-column
          label="审核通过数"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.passCount }}
          </template>
        </el-table-column>
       <el-table-column
          label="操作"
          align="center"
          color="black"
        >
        <template slot-scope="scope">
          <el-button type="primary" @click="doView(scope.row.applyId)" >查看详情</el-button>
          <el-button type="primary"   >
            <a :href="serverAddres+'/api/thesisreview/thesisReviewOnlineReviewPrint?reviewId='+scope.row.applyId" :download="scope.row.printName">简况表下载</a>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="审核"
        align="center"
        color="black"
        width="60"
        type="expand"
      >
        <template slot-scope="scope">
          <el-table
            border
            style="width: 100%;"
            :data="scope.row.mList"
          >
           <el-table-column
              label="申请类型"
              fixed="left"
              align="center"
              color="black"
            >
              <template slot-scope="scope">
                {{ scope.row.applyName }}
              </template>
            </el-table-column>
            <el-table-column
              label="申请专业"
              fixed="left"
              align="center"
              color="black"
            >
              <template slot-scope="scope">
                {{ scope.row.majorName }}
              </template>
            </el-table-column>
           <el-table-column
              label="状态"
              fixed="left"
              align="center"
              color="black"
            >
              <template slot-scope="scope">
                {{ scope.row.stateName }}
              </template>
            </el-table-column>
           <el-table-column
              label="操作"
              fixed="left"
              align="center"
              color="black"
            >
              <template slot-scope="scope">
                <el-button v-if="scope.row.state===0" type="primary" @click="doCheck(scope.row.majorApplyId,1)" >审核通过</el-button>
                <el-button v-if="scope.row.state===0" type="primary" @click="doCheck(scope.row.majorApplyId,2)" >审核不通过</el-button>
                <el-button v-if="scope.row.state!==0" type="primary" @click="doCheck(scope.row.majorApplyId,0)" >取消审核</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div align="center">
      <el-button  type="primary" @click="doCheckSelect(0)" >取消审核</el-button>
      <el-button  type="primary" @click="doCheckSelect(1)" >审核通过</el-button>
      <el-button  type="primary" @click="doCheckSelect(2)" >审核不通过</el-button>
      <el-button  type="primary" @click="doGetSelectApplyIds" >
        <a :href="serverAddres+'/api/coursenew/getNewCultivateExamAffairMaterialHandoverListPrintDataByAffairIds?affairIds='+applyIds" :download="handoverListFielName">导出试题交接单</a>
      </el-button>
      <el-button  type="primary" @click="doGetSelectApplyIds" >
        <a :href="serverAddres+'/api/coursenew/getNewCultivateExamAffairMaterialContactPrintDataByAffairIds?affairIds='+applyIds" :download="contactFielName">导出联系方式</a>
      </el-button>
    </div>
  </div>
</template>

<script>
import { recruitQualificationCheck } from '@/api/tutor'
import { recruitQualificationCheckSubmit } from '@/api/tutor'
import { recruitQualificationCheckSubmitSelect } from '@/api/tutor'


export default {
  name: 'recruitQualificationCheck',
  data() {
    return {
      applyList: [],
      multipleSelection:[],
      applyIds: '',
      handoverListFielName:'p.pdf',
      contactFielName:'f.pdf'
   }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      recruitQualificationCheck({ 'session': document.cookie }).then(res => {
        this.applyList = res.data
      })
    },
    selectionChange(val) {
        this.multipleSelection = val;
    },
    getSelectApplyIds(){
      this.applyIds = ''
      for(var i = 0; i < this.multipleSelection.length;i++){
        if(i===0) {
          this.applyIds =  this.multipleSelection[0].applyId.toString()
        }else{
          this.applyIds = this.applyIds + '-' + this.multipleSelection[i].applyId.toString()
        }
      }
    },
    doGetSelectApplyIds(){
      this.getSelectApplyIds();
      if(this.applyIds=== ''){
        this.$message({
          message: '选择不能为空',
          type: 'success'
        });
      }else{
        this.$refs.temp.click()
      }
    },
    doView(applyId){
      this.$router.push({ path: '/tutor/recruitQualificationApply', query: { applyId }})
    },
    doCheckSelect(state){
      this.getSelectApplyIds();
      if(this.applyIds=== ''){
        this.$message({
          message: '选择不能为空',
          type: 'success'
        });
      }else{
        recruitQualificationCheckSubmitSelect({ 'session': document.cookie, 'applyIds': this.applyIds, 'state': state
        }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '提交成功',
              type: 'success',
              offset: '10'
            })
            this.fetchData();
          }
        })
      }
    },
    doCheck(majorApplyId,state){
      recruitQualificationCheckSubmit({ 'session': document.cookie, 'majorApplyId': majorApplyId, 'state': state
      }).then(res => {
         if (res.code === '0') {
          this.$message({
            message: '提交成功',
            type: 'success',
            offset: '10'
          })
          this.fetchData();
        }
      })
    },
  }
}
</script>

