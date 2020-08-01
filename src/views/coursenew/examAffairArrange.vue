<template>
  <div class="app-container">
    <div class="table-container">
      <el-table
        :data="affairList"
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
          label="考务人员"
          align="center"
          color="black"
        >
          <template slot-scope="scope" >
            <template v-for="item in scope.row.personList" >
              <el-button type="text" @click="deletePerson(scope.row.affairId,item.personId)" >{{ item.perName }}</el-button>
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
            <el-button type="text" @click="addPerson(scope.row.affairId,scope.row.personId)" size="mini">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div align="center">
      <el-button  type="primary" @click="getSelectAffairIds" >
        <a :href="serverAddres+'/api/coursenew/getNewCultivateExamAffairMaterialHandoverListPrintDataByAffairIds?affairIds='+affairIds" :download="handoverListFielName">导出试题交接单</a>
      </el-button>
      <el-button  type="primary" @click="getSelectAffairIds" >
        <a :href="serverAddres+'/api/coursenew/getNewCultivateExamAffairMaterialContactPrintDataByAffairIds?affairIds='+affairIds" :download="contactFielName">导出联系方式</a>
      </el-button>
    </div>
  </div>
</template>

<script>
import { newCultivateExamAffairArrangeInit } from '@/api/coursenew'
import { newCultivateExamAffairArrangePersonAdd } from '@/api/coursenew'
import { newCultivateExamAffairArrangePersonDelete } from '@/api/coursenew'
export default {
  name: 'ExamAffairArrange',
  data() {
    return {
      selectList: [],
      affairList: [],
      multipleSelection:[],
      affairIds: '',
      handoverListFielName:'试题交接单.pdf',
      contactFielName:'联系方式.pdf',
      serverAddres:'',
   }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      newCultivateExamAffairArrangeInit({ 'session': document.cookie }).then(res => {
        this.selectList = res.data.selectList
        this.affairList = res.data.affairList
      })
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    getSelectAffairIds(){
      this.affairIds = ''
      for(var i = 0; i < this.multipleSelection.length;i++){
        if(i===0) {
          this.affairIds =  this.multipleSelection[0].affairId.toString()
        }else{
          this.affairIds = this.affairIds + '-' + this.multipleSelection[i].affairId.toString()
        }
      }
      if(this.affairIds=== ''){
        this.$message({
          message: '选择不能为空',
          type: 'success'
        });
      }else{
        this.$refs.temp.click()
      }
    },
    addPerson(affairId,personId) {
      newCultivateExamAffairArrangePersonAdd({ 'session': document.cookie ,'affairId': affairId ,'personId': personId }).then(res=>{
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
    deletePerson(affairId,personId) {
      newCultivateExamAffairArrangePersonDelete({ 'session': document.cookie ,'affairId': affairId ,'personId': personId }).then(res=>{
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
    }
  }
}
</script>

