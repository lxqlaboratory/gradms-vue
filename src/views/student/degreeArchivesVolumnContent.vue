<template>
  <div class="app-container">
      <div class="query-container">
        学位授予时间
        <el-select v-model="degreeDate"  placeholder="请选择学位授予时间"  style="width: 8%;">
          <el-option
            v-for="item in dateList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        学生类型
        <el-select v-model="stuTypeCode" placeholder="请选择学生类型"  style="width: 12%;">
          <el-option
            v-for="item in stuTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" @click="doQuery" >查询</el-button>
      </div>
      <div class="table-container">
        <el-table
          :data="studentList"
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
            width="70"
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
              {{ scope.row.stuType }}
            </template>
          </el-table-column>
        <el-table-column
            label="操作"
            align="center"
            color="black"
        >
            <template slot-scope="scope">
              <el-button type="primary" @click="doEdit(scope.row.personId)">编辑</el-button>
              <el-button type="primary" @click="doPrint(scope.row.personId)">打印</el-button>
            </template>
        </el-table>
      </div>
    <div class="buttonCenter"  >
          <el-button>
          <a href="/downloads/student/degreeArchivesVolumnContent.xls" >导入模板下载</a>
          </el-button>
          <fileupload
            url="/api/student/importDegreeDegreeArchivesVolumnContent"
            :data="{'docType': xls }"
            accepttype=".xls"
            @successcallback="onSuccess"
            @preview="onPreview"
          >导入学生卷内目录
          </fileupload>
          <el-button type="primary" @click="doAdd">补录卷内目录</el-button>
          <el-button type="primary" @click="selectPrint">打印卷内目录</el-button>
    </div>
  </div>
</template>
Init
<script>
import { degreeArchivesVolumnContent } from '@/api/student'
import { degreeArchivesVolumnContentQuery} from '@/api/student'
import fileupload from '../../components/upload/fileupload'
export default {
  name: 'degreeArchivesVolumnContent',
  components: { fileupload },
  data() {
    return {
      serverAddres:'',
      degreeDate:'',
      stuTypeCode:'',
      dateList:[],
      stuTypeList:[],
      studentList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      degreeArchivesVolumnContent({ 'session': document.cookie }).then(res => {
        this.dateList = res.data.dateList
        this.stuTypeList = res.data.stuTypeList
      })
    },
    selectionChange(val) {
        this.multipleSelection = val;
    },
    doEdit(personId){
          window.location.href = this.serverAddres+ '/archives/archives_initPrintInfo.do?personId=' + personId
    },
    doPrint(personId){
          window.location.href = this.serverAddres+ '/archives/archives_printLetter.do?exportName=archivesPrint&&exportType=1094&&doctype=pdf&&fileName=juanneimulu.pdf&personId='+personId
    },
    doAdd(){
          window.location.href = this.serverAddres+ '/archives/archives_initAddInfo.do?degreeDate="+degreeDate='+this.degreeDate
    },
    selectPrint(){
      var personIds= ''
      for(var i = 0; i < this.multipleSelection.length;i++){
        if(i===0) {
          personIds =  this.multipleSelection[0].personId
        }else{
          personIds = personIds + '-' + this.multipleSelection[i].personId
        }
      }
      
      if(personIds=== ''){
        this.$message({
          message: '选择不能为空',
          type: 'success'
        });
      }else{
          window.location.href = this.serverAddres+ '/archives/archives_printLetter.do?exportName=archivesPrint&&exportType=1094&&doctype=pdf&&fileName=juanneimulu.pdf&personIds='+personIds
      }
    },
    doQuery(){
      degreeArchivesVolumnContentQuery({ 'session': document.cookie, 'stuTypeCode': this.stuTypeCode,
        'degreeDate': this.degreeDate
      }).then(res => {
        this.studentList = res.data
      })
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
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }

    },

  }
}
</script>

<style scoped>
</style>
