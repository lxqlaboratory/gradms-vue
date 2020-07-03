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
          label="工号"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="学院"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="职称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="出生日期"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
            label="备注"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.note" placeholder="请输入备注"  style="width:200px"/>
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
          <el-button type="primary" @click="doDelete(scope.row.applyId)" >删除</el-button>
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
            <a href="/downloads/tutor/recruitOutstanding.xls" >导入模板下载</a>
          </el-button>
          <fileupload
            url="/api/tutor/importTutorOutstandingData"
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
import { recruitOutstandingMaintain } from '@/api/tutor'
import { recruitOutstandingMaintainAdd } from '@/api/tutor'
import { recruitOutstandingMaintainSave } from '@/api/tutor'
import { recruitOutstandingMaintainDelete } from '@/api/tutor'
import fileupload from '../../components/upload/fileupload'

export default {
  name: 'recruitOutstandingMaintain',
  components: { fileupload },
  data() {
    return {
      personId:'',
      outStandingDate:'',
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
      recruitOutstandingMaintain({ 'session': document.cookie }).then(res => {
        this.personList = res.data.personList
        this.outstandingList = res.data.outstandingList
      })
    },
    doLimitAdd(){
      if(this.personId === undefined || this.personId <= 0 ){
        this.$message({
          message: '人员为空，不能添加',
          type: 'success'
        });
      }else{
       recruitOutstandingMaintainAdd({ 'session': document.cookie, 'personId': this.personId,'outStandingDate':this.outStandingDate}).then(res => {
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
      recruitOutstandingMaintainSave({ 'session': document.cookie, 'limitId': limit.limitId,'limitNum':limit.limitNum,'isLock':limit.isLock}).then(res => {
         this.$message({
           message: '保存成功',
           type: 'success',
           offset: '10'
         });
      })
    },
    doDelete(applyId){
      this.$confirm('确认删除招生限额吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        recruitOutstandingMaintainDelete({ 'session': document.cookie, 'limitId': applyId}).then(res => {
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
