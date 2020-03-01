<template>
  <div class="app-container">
    <div class="table-container">
      <el-table
        :data="affairList"
        border
        style="width: 100%;"
        size="mini"
      >
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
          label="考务人员"
          align="center"
          color="black"
        >
          <template slot-scope="scope" >
            <template v-for="item in scope.row.personList" >
              <el-button type="text" @click="deletePerson(scope.row.affairId,item.personId)" size="mini">{{ item.perName }}</el-button>
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
      affairList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      newCultivateExamAffairArrangeInit({ 'session': document.cookie }).then(res => {
        this.selectList = res.data.selectList
        this.affairList = res.data.affairList
      })
    },
    addPerson(affairId,personId) {
      newCultivateExamAffairArrangePersonAdd({ 'session': document.cookie ,'affairId': affairId ,'personId': personId }).then(res=>{
        if(res.code == '0'){
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
        if(res.code == '0'){
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

