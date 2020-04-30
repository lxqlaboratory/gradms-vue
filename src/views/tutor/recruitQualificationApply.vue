<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="8" style="font-size: 16px;font-weight: bold;color: #304156 ">招生申请信息</td>
      </tr>
      <tr>
        <td colspan="1" >论文数</td>
        <td colspan="1">
          <el-input v-model.number="form.disserNum" placeholder="请输入论文数" ></el-input>
        </td>
        <td colspan="1" >专著数</td>
        <td colspan="1">
          <el-input v-model.number="form.bookNum" placeholder="请输入论文数" ></el-input>
        </td>
        <td colspan="1" >获奖数</td>
        <td colspan="1">
          <el-input v-model.number="form.rewardNum" placeholder="请输入论文数" ></el-input>
        </td>
        <td colspan="1" >专利数</td>
        <td colspan="1">
          <el-input v-model.number="form.patentNum" placeholder="请输入论文数" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >国家项目数</td>
        <td colspan="1">
          <el-input v-model.number="form.projectNum1" placeholder="请输入论文数" ></el-input>
        </td>
        <td colspan="1" >国家立项数</td>
        <td colspan="1">
          <el-input v-model.number="form.applyProjectNum1" placeholder="请输入论文数" ></el-input>
        </td>
        <td colspan="1" >省部项目数</td>
        <td colspan="1">
          <el-input v-model.number="form.projectNum2" placeholder="请输入论文数" ></el-input>
        </td>
        <td colspan="1" >省部立项数</td>
        <td colspan="1">
          <el-input v-model.number="form.applyProjectNum2" placeholder="请输入论文数" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >横向项目</td>
        <td colspan="1">
          <el-input v-model.number="form.projectNum3" placeholder="请输入论文数" ></el-input>
        </td>
        <td colspan="1" >总经费</td>
        <td colspan="1">
          <el-input v-model.number="form.projectFeeTotal" placeholder="请输入论文数" ></el-input>
        </td>
        <td colspan="1" >可支配经费</td>
        <td colspan="1">
          <el-input v-model.number="form.projectFeeBalance" placeholder="请输入论文数" ></el-input>
        </td>
        <td colspan="1" >初始申请博导</td>
        <td colspan="1" >初始申请硕导</td>
      </tr>
      <tr>
        <td colspan="1" >指导博士生数</td>
        <td colspan="1">
          <el-input v-model.number="form.doctorNum" placeholder="请输入论文数" ></el-input>
        </td>
        <td colspan="1" >指导硕士生数</td>
        <td colspan="1">
          <el-input v-model.number="form.masterNum" placeholder="请输入论文数" ></el-input>
        </td>
        <td colspan="1" >协助指导博士生数</td>
        <td colspan="1">
          <el-input v-model.number="form.assistDoctorNum" placeholder="请输入论文数" ></el-input>
        </td>
        <td colspan="1" >初始申请博导</td>
        <td colspan="1" >初始申请硕导</td>
      </tr>
    </table>
    <div align="center">
      <el-button type="primary" @click="submit" >数据统计</el-button>
      <el-button type="primary" @click="submit" >修改保存</el-button>
      <el-button type="primary" @click="submit" >下载简况表</el-button>
    </div>
    <table class="headline">
          <tr><td  >已申请招生专业列表</td></tr>
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
          label="申请类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.applyTypeName }}
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
          label="专业"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorName }}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.stateName}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          color="black"
         >
        <template slot-scope="scope">
          <el-button type="primary" @click="doMajorDelete(scope.row.majorApplyId)"  >删除</el-button>
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
              v-for="item in majorList"
              :key="item.majorId"
              :label="item.majorName"
              :value="item.majorId">
            </el-option>
          </el-select>
            <el-button type="primary" @click="doMajorAdd()" >添加招生专业</el-button>
          </td>
        </tr>
      </div>
  </div>
</template>

<script>
import { recruitQualificationApply } from '@/api/tutor'
import { recruitQualificationApplyMajorList } from '@/api/tutor'
import { recruitQualificationApplyApplyList } from '@/api/tutor'
import { recruitQualificationApplySave } from '@/api/tutor'
import { recruitQualificationApplyStatistics } from '@/api/tutor'
import { recruitQualificationApplyMajorAdd } from '@/api/tutor'
import { recruitQualificationApplyMajorDelete } from '@/api/tutor'
export default {
  name: 'recruitQualificationApply',
  data() {
    return {
      form: {
            applyId:null,
            isNewApply:false,
            disserNum:0,
            bookNum:0,
            patentNum:0,
            rewardNum:0,
            projectNum1:0, 
            projectNum2:0,
            projectNum3:0,
            applyProjectNum1:0, 
            applyProjectNum2:0,
            projectFeeTotal:0,
            projectFeeBalance:0, 
            doctorNum:0,
            masterNum:0,
            assistDoctorNum:0, 
            researchReview:0,
            achieName1:'',
            achieDate1:'',
            achieContent1:'', 
            achieName2:'',
            achieDate2:'',
            achieContent2:'', 
            achieName3:'',
            achieDate3:'',
            achieContent3:''
      },
      personId:this.$route.query.personId,
      isCanEdit:true,
      isCanApply:true,
      applyType:'11',
      collegeId:null,
      majorId:null,
      applyTypeList: [],
      collegeList:[],
      majorList:[],
      applyList:[],
      disserList:[],
      bookList:[],
      projectList:[],
      rewardList:[],
      patentList:[]
     }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      recruitQualificationApply({ 'session': document.cookie ,'personId': this.personId }).then(res => {
        this.isCanEdit = res.data.isCanEdit
        this.isCanApply = res.data.isCanApply
        this.applyType = res.data.applyType
        this.collegeId = res.data.collegeId
        this.majorId = res.data.majorId
        this.form  = res.data.form
        this.applyTypeList = res.data.applyTypeList
        this.collegeList = res.data.collegeList
        this.majorList = res.data.majorList
        this.applyList = res.data.applyList
        this.disserList = res.data.disserList
        this.bookList = res.data.bookList
        this.projectList = res.data.projectList
        this.rewardList = res.data.rewardList
        this.patentList = res.data.patentList
      })
    },
    doMajorList(){
      recruitQualificationApplyMajorList({'session': document.cookie , 'applyType': this.applyType, 'collegeId': this.collegeId 
      }).then(res => {
        this.majorId  = res.data.majorId;          
        this.majorList  = res.data.majorList;          
      })
    },
    doStatistics(){
      recruitQualificationApplySave({'session': document.cookie , 'form': this.form
      }).then(res => {
        this.form  = res.data;          
      })
    },
    doSave(){
      recruitQualificationApplySave({'session': document.cookie , 'form': this.form
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
    getApplyList(){
      recruitQualificationApplyApplyList({'session': document.cookie 
      }).then(res => {
        this.applyList  = res.data;          
      })
    },
    doMajorAdd(){
      recruitQualificationApplyMajorAdd({'session': document.cookie ,'applyId':this.form.applyId,'applyType': this.applyType, 'collegeId': this.collegeId,'majorId':this.majorId
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
    doMajorDelete(majorApplyId){
        this.$confirm('确认要删除已添加的掌声申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           recruitQualificationApplyDelete({'session': document.cookie , 'majorApplyId': majorApplyId}).then(res => {
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
