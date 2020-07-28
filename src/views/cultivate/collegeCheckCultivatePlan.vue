<template>
  <div class="app-container">
      <div class="query-container" >
        学生类型
        <el-select v-model="stuTypeCode"  placeholder="请选择学生类型" @change="getMajor()" style="width: 15%;">
          <el-option
            v-for="item in stuTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        专业
        <el-select v-model.number="majorId"  placeholder="请选择专业"  style="width: 15%;">
          <el-option
            v-for="item in majorList"
            :key="item.majorId"
            :label="item.majorName"
            :value="item.majorId">
          </el-option>
        </el-select>
        年级
        <el-select v-model="grade"  placeholder="请选择年级"  style="width: 10%;">
          <el-option
            v-for="item in gradeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        学号
         <el-input v-model="perNum" placeholder="请输入学号"  style="width: 10%;" />
        姓名
        <el-input v-model="perName" placeholder="请输入姓名"  style="width: 8%;" />
        <el-button  type="primary" @click="doQuery()"  >查询</el-button>
      </div>
    <div class="table-container">
      <el-table
        :data="dataList"
        border
        ref="multipleTable"
        @selection-change="selectionChange">
        style="width: 100%;"
        size="mini"
      >
      <el-table-column
        type="selection"
        :selectable="checkboxInit"
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
          label="学生类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.stuTypeName }}
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
          label="年级"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.grade }}
          </template>
        </el-table-column>
        <el-table-column
          label="培养方案"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="showScheme(scope.row.schemeId)"> {{ scope.row.schemeName }}</el-button>
            {{ scope.row.schemeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="必修课学分"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.degreeCredit }}
          </template>
        </el-table-column>
        <el-table-column
          label="课程总学分"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseCredit }}
          </template>
        </el-table-column>
       <el-table-column
          label="导师审核状态"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.tutorCheckState }}
          </template>
      </el-table-column>
       <el-table-column
          label="学院审核状态"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeCheckState }}
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
          label="操作"
          align="center"
          color="black"
        >
        <template slot-scope="scope">
            <el-button type="text" size="mini" @click="showPlan(scope.row.personId)"> 查看培养计划</el-button>
          </template>
        </el-table-column>
    </el-table>
    </div>
    <div align="center">
      <el-button  type="primary" @click="checkPass(1)" >审核通过</el-button>
      <el-button  type="primary" @click="checkPass(2)" >审核不通过</el-button>
  </div>
</template>

<script>
import { collegeCheckCultivatePlan } from '@/api/cultivate'
import { collegeCheckCultivatePlanMajor } from '@/api/cultivate'
import { collegeCheckCultivatePlanQuery } from '@/api/cultivate'
import { collegeCheckCultivatePlanCheck } from '@/api/cultivate'
export default {
    name:'collegeCheckCultivatePlan',
  data() {
    return {
        serverAddres:'',
      stuTypeCode:'',
      majorId: '',
      grade:'',
      perNum: '',
      perName: '',
      multipleSelection: [],
      stuTypeList:[],
      gradeList:[],
      majorList: [],
      dataList: [],
     }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      collegeCheckCultivatePlan({ 'session': document.cookie }).then(res => {
        this.gradeList = res.data.gradeList
        this.stuTypeList = res.data.stuTypeList
        this.majorList = res.data.majorList
      })
    },
    getMajor() {
      collegeCheckCultivatePlanMajor({ 'session': document.cookie,'stuTypeCode':this.stuTypeCode }).then(res => {
        this.majorList = res.data
      })
    },
    doQuery() {
      collegeCheckCultivatePlanQuery({ 'session': document.cookie,'stuTypeCode':this.stuTypeCode, 'majorId': this.majorId,'grade':this.grade, 'perNum': this.perNum, 'perName':this.perName}).then(res => {
        this.dataList = res.data
      })
    },
    selectionChange(val) {
        this.multipleSelection = val;
    },
    checkboxInit(row,index){
    　　if (row.isCanCheck)
    　　　　return 1;//可勾选
    　　else
    　　　　return 0;//不可勾选
    },
    checkPass(state){
        var personIds="";
        var i
        for(i = 0; i< this.multipleSelection.length;i++) {
            if(this.multipleSelection[i].isCanCheck)  {
                if(personIds==="") {
                    personIds = this.multipleSelection[i].personId.toString();
                }else {
                    personIds = personIds +"-" +this.multipleSelection[i].personId.toString();
                }
            }
        }
      if(personIds === "" ){
        this.$message({
          message: "没有选中可以审核的学生，不能审核",
          type: 'wanring'
        });
      }else{
        collegeCheckCultivatePlanCheck({ 'session': document.cookie, 'personIds': personIds, 'state': state}).then(res => {
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
    showPlan(personId) {
          window.location.href = this.serverAddres+ '/cultivatenew/newCultivate_selectCourseShow.do?personId=' + personId
    },
    showScheme(schemeId) {
          window.location.href = this.serverAddres+ '/cultivatenew/newCultivate_showCultivate.do?cultivateId=' + schemeId
    },

  }
}
</script>

