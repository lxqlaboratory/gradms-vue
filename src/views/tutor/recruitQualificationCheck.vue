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
          label="申请专业"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.applyTypes }}
          </template>
        </el-table-column>
       <el-table-column
          label="操作"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.applyTypes }}
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
import { recruitQualificationCheck } from '@/api/coursenew'
import { recruitQualificationCheckSubmit } from '@/api/coursenew'
export default {
  name: 'recruitQualificationCheck',
  data() {
    return {
      selectList: [],
      affairList: [],
      multipleSelection:[],
      affairIds: '',
      handoverListFielName:'试题交接单.pdf',
      contactFielName:'联系方式.pdf',
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
      affairIds = ''
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

