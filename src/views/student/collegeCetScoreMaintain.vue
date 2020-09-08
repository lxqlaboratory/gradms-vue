<template>
  <div class="app-container">
      <div class="query-container" >
        专业
        <el-select v-model.number="majorId"  placeholder="请选择专业"  style="width: 15%;">
          <el-option
            v-for="item in majorList"
            :key="item.majorId"
            :label="item.majorName"
            :value="item.majorId">
          </el-option>
        </el-select>
        学号
         <el-input v-model="perNum" placeholder="请输入学号"  style="width: 15%;" />
        姓名
        <el-input v-model="perNum" placeholder="请输入姓名"  style="width: 15%;" />
        <el-button  type="primary" @click="doQuery()"  >查询</el-button>
      </div>
    <div class="table-container">
      <el-table
        :data="scoreList"
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
          label="学号"
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
          label="专业"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorName }}
          </template>
        </el-table-column>
        <el-table-column
          label="四级成绩"
          align="center"
          color="black"
          width= "120"
        >
          <template slot-scope="scope">
             <el-input v-model.number="scope.row.cet4"   style="width: 95%;" />
          </template>
        </el-table-column>
       <el-table-column
          label="六级成绩"
          align="center"
          color="black"
          width= "120"
        >
          <template slot-scope="scope">
             <el-input v-model.number="scope.row.cet6"   style="width: 95%;" />
          </template>
        </el-table-column>
       <el-table-column
          label="审核时间"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.cetCheckTime }}
          </template>
      </el-table-column>
    </el-table>
    </div>
    <div align="center">
      <el-button  type="primary" @click="doSubmit" >提交保存</el-button>
  </div>
</template>

<script>
import { collegeCetScoreMaintain } from '@/api/student'
import { collegeCetScoreMaintainSubmit } from '@/api/student'
export default {
  data() {
    return {
      majorId: -1,
      perNum: '',
      perName: '',
      multipleSelection: [],
      majorList: [],
      scoreList: [],
     }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      collegeCetScoreMaintain({ 'session': document.cookie }).then(res => {
        this.majorList = res.data.majorList
        this.scoreList = res.data.scoreList
      })
    },
    doQuery() {
      collegeCetScoreMaintain({ 'session': document.cookie, 'majorId': this.majorId, 'perNum': this.perNum, 'perName':this.perName}).then(res => {
        this.scoreList = res.data.scoreList
      })
    },
    selectionChange(val) {
        this.multipleSelection = val;
    },
    doSubmit(){
      if(this.multipleSelection === 'undefined' || this.multipleSelection.length=== 0){
        this.$message({
          message: '选择不能为空',
          type: 'success'
        });
      }else{
        collegeCetScoreMaintainSubmit({ 'session': document.cookie, 'scoreList': this.multipleSelection}).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '提交成功',
              type: 'success',
              offset: '10'
            })
            this.doQuery();
          }
        })
      }
    },  

  }
}
</script>

