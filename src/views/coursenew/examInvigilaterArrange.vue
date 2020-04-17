<template>
  <div class="app-container">

    <a  style="position: fixed;z-index:-1;top: 0;left: 0;"  ref="temp" :href="serverAddres+'/api/coursenew/getNewCultivateExamTaskStudentTablePDFDataByExamIds?examIds='+examIds" :download="studentTableFileName"></a>
    <div class="table-container">
      <el-table
        :data="examList"
        ref="multipleTable"
        @selection-change="handleSelectionChange">
        border
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
          width="70"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="考试日期"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.examDate }}
          </template>
        </el-table-column>
        <el-table-column
          label="校区"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.campusName }}
          </template>
        </el-table-column>
        <el-table-column
          label="考场"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.examNo }}
          </template>
        </el-table-column>
        <el-table-column
          label="科目"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName }}
          </template>
        </el-table-column>
        <el-table-column
          label="教室"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.roomName }}
          </template>
        </el-table-column>
        <el-table-column
          label="监考老师1"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.invigilater1" placeholder="请选择">
              <el-option
                v-for="item in selectList"
                :key="item.personId"
                :label="item.perNumName"
                :value="item.personId">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="监考老师2"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.invigilater2" placeholder="请选择">
              <el-option
                v-for="item in selectList"
                :key="item.personId"
                :label="item.perNumName"
                :value="item.personId">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div align="center">
      <el-button type="primary" @click="submitTableData">保存提交</el-button>
      <el-button  type="primary" >
        <a :href="serverAddres+'/downloads/coursenew/examRulesResponsibilities.pdf'">下载考场规则、监考人员职责</a>
      </el-button>
      <el-button  type="primary" @click="getSelectExamIds" >
        <a :href="serverAddres+'/api/coursenew/getNewCultivateExamTaskStudentTablePDFDataByExamIds?examIds='+examIds" :download="doorFielName">导出考生名单</a>
      </el-button>
      <el-button  type="primary" @click="getSelectExamIds" >
        <a :href="serverAddres+'/api/coursenew/getNewCultivateExamTaskDoorStuckPDFDataByExamIds?examIds='+examIds" :download="doorFielName">导出考场门贴</a>
      </el-button>
      <el-button  type="primary" @click="getSelectExamIds" >
        <a :href="serverAddres+'/api/coursenew/getNewCultivateExamAffairMaterialRecordPrintDataByExamIds?examIds='+examIds" :download="recordFielName">导出考场记录表</a>
      </el-button>
    </div>
  </div>
</template>

<script>
import { newCultivateExamInvigilaterArrangeInit } from '@/api/coursenew'
import { newCultivateExamInvigilaterArrangeSubmit } from '@/api/coursenew'
export default {
  name: 'ExamInvigilaterArrange',
  data() {
    return {
      examList: [],
      selectList: [],
      multipleSelection: [],
      serverAddres:'',
      examIds: '',
      studentTableFileName:'考生名单.pdf',
      doorFielName:'考场门贴.pdf',
      recordFielName:'考场记录.pdf'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      newCultivateExamInvigilaterArrangeInit({ 'session': document.cookie }).then(res => {
        this.examList = res.data.examList
        this.selectList = res.data.selectList
      })
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    getSelectExamIds(){
        this.examIds= ''
      for(var i = 0; i < this.multipleSelection.length;i++){
        if(i===0) {
          this.examIds =  this.multipleSelection[0].examId.toString()
        }else{
          this.examIds = this.examIds + '-' + this.multipleSelection[i].examId.toString()
        }
      }
      if(this.examIds=== ''){
        this.$message({
          message: '选择不能为空',
          type: 'success'
        });
      }else{
        this.$refs.temp.click()
      }
    },
    submitTableData() {
      newCultivateExamInvigilaterArrangeSubmit({ 'session': document.cookie, 'examList': this.multipleSelection }).then(res => {
        console.log(res);
        if(res.code === '0'){
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.fetchData()
        }
        else{
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      })
    }
  }
}
</script>

