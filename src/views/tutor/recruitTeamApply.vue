<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="8" style="font-size: 16px;font-weight: bold;color: #304156 ">团队申请信息</td>
      </tr>
      <tr>
        <td colspan="1" width="10%" >团队名称</td>
        <td colspan="1" width="30%">
          <el-input v-model="form.teamName" placeholder="请输入团队名称" ></el-input>
        </td>
        <td colspan="1" width="10%" >责任导师</td>
        <td colspan="1" width="20%" >
          {{form.perNum}}-{{form.leaderName}}
        </td>
        <td colspan="1" width="10%" >培养单位</td>
        <td colspan="1" width="20%" >
          {{form.collegeName}}
        </td>
      </tr>
      <tr>
        <td colspan="6">
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
            <el-button type="primary" @click="doSave()" >保存</el-button>
            <el-select
                v-model="personId"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="请输入姓名或工号"
                :remote-method="getPersonList"
                :loading="loading"
                >
                <el-option
                    v-for="item in selectList"
                    :key="item.personId"
                    :label="item.perName"
                    :value="item.personId"
                />
                </el-select>
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
import { getPersonNameMapListByPerNumName } from '@/api/personinfo'
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
            leaderName:'',
            collegeName:'',
            des:''
        },
        isCanEdit:true,
        isCanApply:true,
        personId:null,
        selectList:[],
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
    getTeamPersonList() {
      recruitTeamApplyPersonList({ 'session': document.cookie ,'teamId': this.form.teamId }).then(res => {
        this.personList = res.data
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
    getPersonList(numName) {
      if (numName !== '' && numName.length >= 2) {
        this.loading = true
        getPersonNameMapListByPerNumName({ 'session': document.cookie, 'numName': numName }).then(res => {
          this.selectList = res.data
            console.log(this.selectList);
        })
        setTimeout(() => {
          this.loading = false
        }, 200)
      } else {
        this.selectList = []
      }
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
              this.getApplyList();
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
