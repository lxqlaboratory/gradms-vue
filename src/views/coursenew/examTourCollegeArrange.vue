<template>
  <div class="app-container">
    <div class="table-container">
      <el-table
        :data="tourList"
        border
        ref="multipleTable"
        @selection-change="handleSelectionChange">
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
          label="科目"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName }}
          </template>
        </el-table-column>
        <el-table-column
          label="主考老师"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.chiefExaminerId" placeholder="请选择">
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
          label="是否需要计算器"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isComputer" >
              </el-checkbox>
           </template>
        </el-table-column>
       <el-table-column
          label="是否需要计算器"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isScratchPaper"  ></el-checkbox>
           </template>
        </el-table-column>

        <el-table-column
          label="巡考人员"
          align="center"
          color="black"
        >
          <template slot-scope="scope" >
            <template v-for="item in scope.row.personList" >
              <el-button type="text" @click="deletePerson(scope.row.tourId,item.personId)" > {{ item.perName }}</el-button>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="添加人员"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.personId" placeholder="请选择">
              <el-option
                v-for="item in selectList"
                :key="item.personId"
                :label="item.perNumName"
                :value="item.personId">
              </el-option>
            </el-select>
            <el-button type="text" @click="addPerson(scope.row.tourId,scope.row.personId)" >添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div align="center">
      <el-button type="primary" @click="submitTableData">提交</el-button>
      <el-button type="primary" @click="submitTableData">考务人员联系方式</el-button>
      <el-button  type="primary" @click="getSelectTutorIds" >
        <div v-if="!tutorIds">导出考务人员联系方式</div>
        <div v-else>
        <a :href="serverAddres+'/api/coursenew/getNewCultivateExamAffairMaterialAffairContactPrintDataByTutorIds?tutorIds='+tutorIds" :download="affairContactFielName">导出考务人员联系方式</a>
        </div>
      </el-button>
    </div>
  </div>
</template>

<script>
import { newCultivateExamTourCollegeArrangeInit } from '@/api/coursenew'
import { newCultivateExamTourCollegeArrangePersonAdd } from '@/api/coursenew'
import { newCultivateExamTourCollegeArrangePersonDelete } from '@/api/coursenew'
import { newCultivateExamTourCollegeArrangeSubmit} from '@/api/coursenew'
export default {
  name: 'ExamTourCollegeArrange',
  data() {
    return {
      selectList: [],
      tourList: [],
      multipleSelection: [],
      serverAddres:'',
      tutorIds:'',
      affairContactFielName:'考务人员联系方式'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      newCultivateExamTourCollegeArrangeInit({ 'session': document.cookie }).then(res => {
        this.selectList = res.data.selectList
        this.tourList = res.data.tourList
      })
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    getSelectTutorIds(){
      this.$nextTick(() => {
      for(var i = 0; i < this.multipleSelection.length;i++){
        if(i===0) {
          this.tutorIds =  this.multipleSelection[0].tutorId.toString()
        }else{
          this.tutorIds = this.tutorIds + '-' + this.multipleSelection[i].tutorId.toString()
        }
      }
      })
    },

    addPerson(tourId,personId) {
      newCultivateExamTourCollegeArrangePersonAdd({ 'session': document.cookie ,'tourId': tourId ,'personId': personId }).then(res=>{
        if(res.code === '0'){
          this.$message({
            message: '添加成功',
            type: 'success'
          });
         this.fetchData()
        }else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      })
    },
    deletePerson(tourId,personId) {
      newCultivateExamTourCollegeArrangePersonDelete({ 'session': document.cookie ,'tourId': tourId ,'personId': personId }).then(res=>{
        if(res.code === '0'){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
         this.fetchData()
        }else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      })
    },
    submitTableData() {
      newCultivateExamTourCollegeArrangeSubmit({ 'session': document.cookie, 'tourList': this.tourList }).then(res => {
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

