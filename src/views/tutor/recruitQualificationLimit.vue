<template>
  <div class="app-container">
    <div class="table-container">
      <el-table
        :data="limitList"
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
          label="学院代码"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="学院名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
            label="招生额定数"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.limitNum" placeholder="请输入招生额定数"  style="width:200px"/>
            </template>
        </el-table-column>
        <el-table-column
            label="是否审核锁定"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-checkbox label="审核锁定" v-model="scope.row.isLock" />
            </template>
        </el-table-column>
       <el-table-column
          label="操作"
          align="center"
          color="black"
          width = "260"
        >
        <template slot-scope="scope">
          <el-button type="primary" @click="doSave(scope.$index)" >修改保存</el-button>
          <el-button type="primary" @click="doDelete(scope.row.limitId)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div align="center">
      <tr>
        <td>
        学院
        <el-select v-model="collegeId"  placeholder="请选择学院"  style="width: 30%;">
          <el-option
            v-for="item in collegeList"
            :key="item.collegeId"
            :label="item.collegeName"
            :value="item.collegeId">
          </el-option>
        </el-select>
          额定数
          <el-input v-model="limitNum" placeholder="请输入招生额定数"  style="width:100px"/>
          <el-button type="primary"  @click="doLimitAdd()">添加</el-button>
          <el-button>
            <a href="/downloads/tutor/recruitQualificationLimit.xls" >导入模板下载</a>
          </el-button>
          <fileupload
            url="/api/tutor/importTutorRecruitLimitData"
            :data="{'docType': xls }"
            accepttype=".xls"
            @successcallback="onSuccess"
            style="float: right"
            @preview="onPreview"
          >导入
          </fileupload>
        </td>
      </tr>
    </div>
  </div>
</template>

<script>
import { recruitQualificationLimit } from '@/api/tutor'
import { recruitQualificationLimitAdd } from '@/api/tutor'
import { recruitQualificationLimitSave } from '@/api/tutor'
import { recruitQualificationLimitDelete } from '@/api/tutor'
import fileupload from '../../components/upload/fileupload'

export default {
  name: 'recruitQualificationLimit',
  components: { fileupload },
  data() {
    return {
      collegeId:'',
      limitNum:'',
      collegeList:[],
      limitList:[],
   }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      recruitQualificationLimit({ 'session': document.cookie }).then(res => {
        this.collegeList = res.data.collegeList
        this.limitList = res.data.limitList
      })
    },
    doLimitAdd(){
      if(this.collegeId === 'undefined' || this.collegeId <= 0 || this.limitNum === 'undefined' || this.limitNum <=0){
        this.$message({
          message: '学院和限额为空，不能添加',
          type: 'success'
        });
      }else{
       recruitQualificationLimitAdd({ 'session': document.cookie, 'collegeId': this.collegeId, 'limitNum': this.limitNum}).then(res => {
         if(res.code === '0'){
          this.$message({
            message: '添加成功',
            type: 'success',
            offset: '10'
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
    },
    doSave(index){
      var limit = this.limitList[index];
      recruitQualificationLimitSave({ 'session': document.cookie, 'limitId': limit.limitId,'limitNum':limit.limitNum,'isLock':limit.isLock}).then(res => {
         this.$message({
           message: '保存成功',
           type: 'success',
           offset: '10'
         });
      })
    },
    doDelete(limitId){
      this.$confirm('确认删除招生限额吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        recruitQualificationLimitDelete({ 'session': document.cookie, 'limitId': limitId}).then(res => {
          this.dialogFormVisible = false
          if(res.code === '0'){
            this.$message({
              message: '删除成功',
              type: 'success',
              offset: '10'
            });
            this.fetchData()
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
          message: '已取消删除'
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
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
    },

  }
}
</script>
