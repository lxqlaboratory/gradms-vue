<template>
  <div class="app-container">
      <div class="query-container">
        学生类型
        <el-select v-model="stuTypeCode" @change="changeMajor" placeholder="请选择学生类型"  style="width: 8%;">
          <el-option
            v-for="item in stuTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        专业
        <el-select v-model="majorId" placeholder="请选择专业"  style="width: 12%;">
          <el-option
            v-for="item in majorList"
            :key="item.majorId"
            :label="item.majorName"
            :value="item.majorId">
          </el-option>
        </el-select>
        年级
        <el-select v-model="grade" placeholder="请选择年级"  style="width: 8%;">
          <el-option
            v-for="item in gradeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        学号
        <el-input v-model="perNum" placeholder="请输入学号" style="width: 10%;"  />
        姓名
        <el-input v-model="perName" placeholder="请输入姓名" style="width: 10%;"  />
        <el-button type="primary" @click="doQuery" >查询</el-button>
      </div>
      <div class="table-container">
        <el-table
          :data="studentList"
          border
          style="width: 100%;"
          size="mini"
        >
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
            width="120"
          >
            <template slot-scope="scope">
              {{ scope.row.perNum }}
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            align="center"
            color="black"
            width="70"
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
          label="导师"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-select v-if="scope.row.isDoctor === true " v-model="scope.row.tutorId" placeholder="请选择">
              <el-option
                v-for="item in doctorTutorList"
                :key="item.personId"
                :label="item.perNumName"
                :value="item.personId">
              </el-option>
            </el-select>
            <el-select v-else v-model="scope.row.tutorId" placeholder="请选择">
              <el-option
                v-for="item in masterTutorList"
                :key="item.personId"
                :label="item.perNumName"
                :value="item.personId">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="合作导师一"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-select v-if="scope.row.isDoctor === true " v-model="scope.row.tutorId1" placeholder="请选择">
              <el-option
                v-for="item in doctorTutorList"
                :key="item.personId"
                :label="item.perNumName"
                :value="item.personId">
              </el-option>
            </el-select>
            <el-select v-else v-model="scope.row.tutorId1" placeholder="请选择">
              <el-option
                v-for="item in masterTutorList"
                :key="item.personId"
                :label="item.perNumName"
                :value="item.personId">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="合作导师二"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-select v-if="scope.row.isDoctor === true " v-model="scope.row.tutorId2" placeholder="请选择">
              <el-option
                v-for="item in doctorTutorList"
                :key="item.personId"
                :label="item.perNumName"
                :value="item.personId">
              </el-option>
            </el-select>
            <el-select v-else v-model="scope.row.tutorId2" placeholder="请选择">
              <el-option
                v-for="item in masterTutorList"
                :key="item.personId"
                :label="item.perNumName"
                :value="item.personId">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        </el-table>
      </div>
    <div class="buttonCenter"  >
          <el-button type="primary" @click="submitTableData">提交</el-button>
          <el-button>
          <a href="/downloads/tutor/tutuorAndStuInfoList.xls" >导入模板下载</a>
          </el-button>
          <fileupload
            url="/api/tutor/importDegreeCollegeStuAndTutorData"
            :data="{'docType': xls }"
            accepttype=".xls"
            @successcallback="onSuccess"
            @preview="onPreview"
          >学生导师关系导入
          </fileupload>
          <el-button type="primary" @click="clearTutor">清空学生导师</el-button>
    </div>
  </div>
</template>
Init
<script>
import { collegeMaintainStudentTutorInit } from '@/api/tutor'
import { collegeMaintainStudentTutorMajor} from '@/api/tutor'
import { collegeMaintainStudentTutorQuery} from '@/api/tutor'
import { collegeMaintainStudentTutorSubmit} from '@/api/tutor'
import {collegeMaintainStudentTutorClear } from '@/api/tutor'
import fileupload from '../../components/upload/fileupload'
export default {
  name: 'CollegeMaintainStudentTutor',
  components: { fileupload },
  data() {
    return {
      stuTypeCode:'',
      majorId:-1,
      grade:'',
      perNum:'',
      perName:'',
      stuTypeList:[],
      gradeList:[],
      majorList:[],
      doctorTutorList:[],
      masterTutorList:[],
      studentList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      collegeMaintainStudentTutorInit({ 'session': document.cookie }).then(res => {
        this.studentList = res.data.studentList
        this.stuTypeList = res.data.stuTypeList
        this.gradeList = res.data.gradeList
        this.majorList = res.data.majorList
        this.doctorTutorList = res.data.doctorTutorList
        this.masterTutorList=res.data.masterTutorList
      })
    },
    doQuery(){
      collegeMaintainStudentTutorQuery({ 'session': document.cookie, 'stuTypeCode': this.stuTypeCode,
        'grade': this.grade, 'majorId': this.majorId, 'perNum': this.perNum, 'perName': this.perName
      }).then(res => {
        this.studentList = res.data
      })
    },
    changeMajor(){
      collegeMaintainStudentTutorMajor({ 'session': document.cookie, 'stuTypeCode': this.stuTypeCode
      }).then(res => {
        this.majorList = res.data
      })
    },
    submitTableData() {
      collegeMaintainStudentTutorSubmit({ 'session': document.cookie, 'studentList': this.studentList }).then(res => {
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
    },
    clearTutor() {
      this.$confirm('确认清除学生的导师吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        collegeMaintainStudentTutorClear({ 'session': document.cookie, 'studentList': this.studentList }).then(res => {
          if(res.code === '0'){
            this.$message({
              message: '清除成功',
              type: 'success',
              offset: '10'
            });
            this.doQuery()
          }else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消清楚'
        });
      });
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

<style scoped>
</style>
