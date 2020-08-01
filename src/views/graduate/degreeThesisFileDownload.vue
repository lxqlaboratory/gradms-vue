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
          label="论文题目"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.thesisName }}
          </template>
        </el-table-column>
        <el-table-column
          label="评阅论文下载"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.reviewFileId > 0" >
              <el-button   type="primary"   >
                  <a :href="serverAddres+'/api/attachment/downloadAttachmentFile?attachId='+scope.row.reviewFileId" :download="scope.row.reviewFileName">{{scope.row.reviewFileLabel}}</a>
              </el-button>
            </span>
            <span v-else >
              {{scope.row.reviewFileLabel}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="查重论文下载"
          align="center"
          color="black"
        >
        <template v-if="scope.row.checkFileId !== 0" slot-scope="scope">
            <el-button type="primary"   >
                <a :href="serverAddres+'/api/attachment/downloadAttachmentFile?attachId='+scope.row.checkFileId" :download="scope.row.checkFileName">{{scope.row.checkFileLabel}}</a>
            </el-button>
          </template>
          <template v-if="scope.row.checkFileId === 0" slot-scope="scope">
            {{ scope.row.checkFileLabel }}
          </template>
        </el-table-column>
       <el-table-column
          label="学位论文下载"
          align="center"
          color="black"
        >
          <template v-if="scope.row.degreeFileId !== 0" slot-scope="scope">
            <el-button type="primary"   >
                <a :href="serverAddres+'/api/attachment/downloadAttachmentFile?attachId='+scope.row.degreeFileId" :download="scope.row.degreeFileName">{{scope.row.degreeFileLabel}}</a>
            </el-button>
          </template>
          <template v-if="scope.row.degreeFileId === 0" slot-scope="scope">
            {{ scope.row.degreeFileLabel }}
          </template>
      </el-table-column>
    </el-table>
    </div>
    <div align="center">
          <el-button  type="primary" @click="getSelectPersonIds(1)" >
            <a :href="serverAddres+'/api/graduate/degreeThesisFileDownloadBat?type=1&personIds='+personIds" :download="reviewFileName">批量下载评阅论文</a>
          </el-button>
          <el-button  type="primary" @click="getSelectPersonIds(2)" >
            <a :href="serverAddres+'/api/graduate/degreeThesisFileDownloadBat?type=2&personIds='+personIds" :download="checkFileName">批量下载查重论文</a>
          </el-button>
          <el-button  type="primary" @click="getSelectPersonIds(3)" >
            <a :href="serverAddres+'/api/graduate/degreeThesisFileDownloadBat?type=3&personIds='+personIds" :download="degreeFileName">批量下载学位论文</a>
          </el-button>
  </div>
</template>

<script>
import { degreeThesisFileDownload } from '@/api/graduate'
import { degreeThesisFileDownloadMajor } from '@/api/graduate'
import { degreeThesisFileDownloadQuery } from '@/api/graduate'
export default {
  name:'degreeThesisFileDownload',
  data() {
    return {
      serverAddres:'',
      stuTypeCode:'',
      majorId: '',
      perNum: '',
      perName: '',
      personIds:'',
      multipleSelection: [],
      stuTypeList:[],
      majorList: [],
      dataList: [],
      reviewFileName:'评阅论文.zip',
      checkFileName:'查重论文.zip',
      degreeFileName:'学位论文.zip',
     }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      degreeThesisFileDownload({ 'session': document.cookie }).then(res => {
        this.stuTypeList = res.data.stuTypeList
        this.majorList = res.data.majorList
        this.dataList = res.data.dataList
      })
    },
    getMajor() {
      degreeThesisFileDownloadMajor({ 'session': document.cookie,'stuTypeCode':this.stuTypeCode }).then(res => {
        this.majorList = res.data
      })
    },
    doQuery() {
      degreeThesisFileDownloadQuery({ 'session': document.cookie,'stuTypeCode':this.stuTypeCode, 'majorId': this.majorId, 'perNum': this.perNum, 'perName':this.perName}).then(res => {
        this.dataList = res.data
      })
    },
    selectionChange(val) {
        this.multipleSelection = val;
    },
    getSelectPersonIds(type){
      this.personIds = ''
      for(var i = 0; i < this.multipleSelection.length;i++){
          if(type===1 && this.multipleSelection[i].reviewFileId > 0 ||
           type===2 && this.multipleSelection[i].checkFileId > 0 || 
           type===3 && this.multipleSelection[i].degreeFileId > 0 ) {
            if(this.personIds==='') {
              this.personIds =  this.multipleSelection[i].personId.toString()
            }else{
              this.personIds = this.personIds + '-' + this.multipleSelection[i].personId.toString()
            }
          }
      }
      console.log(this.personIds);
      if(this.personIds=== ''){
        this.$message({
          message: '选择可下载的文件为空, 下载失败',
          type: 'success'
        });
      }else{
        this.$refs.temp.click()
      }
    },
  }
}
</script>
