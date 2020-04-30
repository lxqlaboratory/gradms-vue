<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="8" style="font-size: 16px;font-weight: bold;color: #304156 ">团队申请信息</td>
      </tr>
      <tr>
        <td colspan="1" >团队名称</td>
        <td colspan="3">
          <el-input v-model="form.teamName" placeholder="请输入团队名称" ></el-input>
        </td>
        <td colspan="1" >责任导师</td>
        <td colspan="1">
          {{form.perNum}}-{{form.perName}}
        </td>
        <td colspan="1" >培养单位</td>
        <td colspan="1">
          {{form.collegeName}}
        </td>
      </tr>
      <tr>
        <td colspan="4">
             <tinymce v-model="form.des" :height="150" />
        </td>
      </tr>
    </table>
    <table class="headline">
          <tr><td  >团对成员列表</td></tr>
    </table>
      <el-table
        :data="applyList"
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
            {{ scope.row.proTechPositionCode}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          color="black"
         >
        <template slot-scope="scope">
          <el-button type="primary" @click="doPersonDelete(scope.row.teamPersonId)"  >删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <div align="center" >
        <tr>
          <td>
          申请类型
          <el-select v-model="applyType" @change="doMajorList()"   placeholder="请选择申请类型" style="width: 20%">
            <el-option
              v-for="item in applyTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          学院
          <el-select v-model="collegeId" @change="doMajorList()" placeholder="请选择学院" style="width: 20%">
            <el-option
              v-for="item in collegeList"
              :key="item.collegeId"
              :label="item.collegeName"
              :value="item.collegeId">
            </el-option>
          </el-select>
          专业
          <el-select v-model="majorId" placeholder="请选择专业" style="width: 20%">
            <el-option
              v-for="item in majorId"
              :key="item.majorId"
              :label="item.majorName"
              :value="item.majorId">
            </el-option>
          </el-select>
            <el-button type="primary" @click="doSave()" >保存</el-button>
            <el-button type="primary" @click="doPersonAdd()" >添加团队成员</el-button>
          </td>
        </tr>
      </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { recruitTeamApply } from '@/api/tutor'
import { recruitTeamApplySave } from '@/api/tutor'
import { recruitTeamApplyPersonSearch } from '@/api/tutor'
import { recruitTeamApplyPersonList } from '@/api/tutor'
import { recruitTeamApplyPersonAdd } from '@/api/tutor'
import { recruitTeamApplyPersonDelele } from '@/api/tutor'
export default {
  name: 'recruitTeamApply',
  components: { Tinymce },
  data() {
    return {
        form:{
            teamId:null,
            teamName:'',
            leaderId:'',
            leaderNum:'',
            leaderName:'',
            des:''
        },
        isCanEdit:true,
        isCanApply:true,
        personList:[],
     }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      recruitTeamApply({ 'session': document.cookie ,'personId': this.personId }).then(res => {
        this.isCanEdit = res.data.isCanEdit
        this.isCanApply = res.data.isCanApply
        this.form = res.data.form
        this.personList = res.data.personList
      })
    },
    doSave(){
      recruitTeamApplySave({'session': document.cookie , 'form': this.form
      }).then(res => {
       if(res.code === '0'){
         this.$message({
           message: '提交成功',
           type: 'success',
           offset: '10'
         });
         this.form.applyId= res.data
       }
      })
    },
    getPersonList(){
      recruitTeamApplyPersonList({'session': document.cookie 
      }).then(res => {
        this.applyList  = res.data;          
      })
    },
    doPersonAdd(){
      recruitTeamApplyPersonAdd({'session': document.cookie ,'applyId':this.form.applyId,'applyType': this.applyType, 'collegeId': this.collegeId,'majorId':this.majorId
      }).then(res => {
       if(res.code === '0'){
         this.$message({
           message: '提交成功',
           type: 'success',
           offset: '10'
         });
        this.getApplyList();
       }
      })
    },
    doPersonDelete(majorApplyId){
        this.$confirm('确认要删除已添加的掌声申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           recruitTeamApplyPersonDelete({'session': document.cookie , 'majorApplyId': majorApplyId}).then(res => {
            if(res.code === '0')
            {
              this.$message({
                message: "添加成功",
                type: 'sucess'
              });
              this.doGetApplyList();
            }else {
              this.$message({
                message: res.msg,
                type: 'warning'
              });
            }
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已删除分发'
          });
        });
    }
  }
}
</script>
