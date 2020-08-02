<template>
  <div class="app-container">
      <div class="query-container">
        学位授予时间
        <el-select v-model="stuTypeCode" @change="changeMajor" placeholder="请选择学位授予时间"  style="width: 8%;">
          <el-option
            v-for="item in stuTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        学生类型
        <el-select v-model="stuTypeCode" placeholder="请选择学生类型"  style="width: 12%;">
          <el-option
            v-for="item in stuTypes"
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
            label="专业"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.stuTypeName }}
            </template>
          </el-table-column>
        <el-table-column
            label="操作"
            align="center"
            color="black"
            width="300"
        >
            <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.reviewState==='提交'"  >
                <a :href="serverAddres+'/api/thesisreview/thesisReviewOnlineReviewPrint?reviewId='+scope.row.reviewId" :download="scope.row.printName">评阅表下载</a>
            </el-button>
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
          >学生卷内目录
          </fileupload>
          <el-button type="primary" @click="submitTableData">补录卷内目录</el-button>
          <el-button type="primary" @click="clearTutor">打印卷卷内目录</el-button>
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
      degreeDate:'',
      stuTypeCode:'',
      stuTypes:[
        {
          value:'01',
          label:'博士',
        },
        {
          value:'02',
          label:'硕士',
        },
        {
          value:'03',
          label:'在职工程硕士',
        },
        {
          value:'04',
          label:'同等学历硕士',
        }
      ],
      degreeDateList:[],
      studentList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      degreeArchivesVolumnContent({ 'session': document.cookie }).then(res => {
        this.degreeDateList = res.data
      })
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
