<template>
  <div class="app-container">
    <table class="content" align="left">
      <tr>
        <td style="font-size: 16px;color: red;text-align:left; ">
          申请说明:<br>
          &nbsp;&nbsp;1.点击下载论文，可以下载学生论<br>
          &nbsp;&nbsp;2.点击评阅，可以填写评阅意见，保存后可以继续修改，选择提交按钮则不能在进行修改，只可以下下载评阅书。
        </td>
      </tr>
    </table>
    <div >
      <table class="content" >
        <tr>
          <td colspan="10" style="font-size: 16px;font-weight: bold;color: #304156 ">招生申请信息</td>
        </tr>
        <tr>
          <td colspan="1">申请类型</td>
          <td colspan="1">
            <el-select v-model="form.applyKind" placeholder="请选择申请类型"   >
              <el-option
                v-for="item in applyKindList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
          <td colspan="1">性别</td>
          <td colspan="1">
            <el-select v-model="form.genderCode" placeholder="请选择性别"   >
              <el-option
                v-for="item in gender"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
          <td colspan="1">出生年月</td>
          <td colspan="1">
            <el-date-picker
              v-model="form.perBirthDay"
              size="mini"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期时间"
            />
          </td>
          <td colspan="1">职称</td>
          <td colspan="1">
            <el-select v-model="form.proTechPositionCode" placeholder="请选择申请类型"   >
              <el-option
                v-for="item in proTechPositionCodeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
          <td colspan="1">博导时间</td>
          <td colspan="1">
            <el-date-picker
              v-model="form.doctorTutorTime"
              size="mini"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期时间"
            />
          </td>
        </tr>
        <tr>
          <td colspan="1"  >论文数</td>
          <td colspan="1" >
            <el-input v-model.number="form.disserNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入论文数"   style="width:50p;" />
          </td>
          <td colspan="1">专著数</td>
          <td colspan="1"  >  
            <el-input v-model.number="form.bookNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入专著数" style="width:50px;" />
          </td>
          <td colspan="1">获奖数</td>
          <td colspan="1"  width = "%5" >
            <el-input v-model.number="form.rewardNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入获奖数"/>
          </td>
          <td colspan="1">专利数</td>
          <td colspan="1" width = "%5" >
            <el-input v-model.number="form.patentNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入专利数"/>
          </td>
          <td colspan="1">国家项目数</td>
          <td colspan="1">
            <el-input v-model.number="form.projectNum1" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入国家项目数" />
          </td>
        </tr>
        <tr>
          <td colspan="1">国家立项数</td>
          <td colspan="1">
            <el-input v-model.number="form.applyProjectNum1" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入国家立项数"/>
          </td>
          <td colspan="1">省部项目数</td>
          <td colspan="1">
            <el-input v-model.number="form.projectNum2" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入省部项目数"/>
          </td>
          <td colspan="1">省部立项数</td>
          <td colspan="1">
            <el-input v-model.number="form.applyProjectNum2" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入省部立项数"/>
          </td>
          <td colspan="1">横向项目</td>
          <td colspan="1">
            <el-input v-model.number="form.projectNum3" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入横向项目数"/>
          </td>
          <td colspan="1">总经费</td>
          <td colspan="1">
            <el-input v-model="form.projectFeeTotal" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入总经费数"/>
          </td>
          </tr>
          <tr>
          <td colspan="1">可支配经费</td>
          <td colspan="1">
            <el-input v-model="form.projectFeeBalance" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入可支配经费数"/>
          </td>
          <td colspan="1">指导博士生数</td>
          <td colspan="1">
            <el-input v-model.number="form.doctorNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入指导博士生数"/>
          </td>
          <td colspan="1">指导硕士生数</td>
          <td colspan="1">
            <el-input v-model.number="form.masterNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入指导硕士生数"/>
          </td>
          <td colspan="1">协助指导博士生数</td>
          <td colspan="3">
            <el-input v-model.number="form.assistDoctorNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入协助指导博士生数"/>
          </td>
        </tr>
        <tr>
          <td colspan="1">成果一名称</td>
          <td colspan="6">
            <el-input v-model="form.achieName1" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入成果一名称"/>
          </td>
          <td colspan="1">日期</td>
          <td colspan="2">
            <el-input v-model="form.achieDate1"  placeholder="请输入成果一日期"/>
          </td>
        </tr>
        <tr>
          <td colspan="10">
            <textarea  placeholder="成果一介绍" maxlength="1000"  v-model="form.achieContent1" style="width: 100%;height:80px"    />
          </td>
        </tr>
        <tr>
          <td colspan="1">成果二名称</td>
          <td colspan="6">
            <el-input v-model="form.achieName1" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入成果二名称"/>
          </td>
          <td colspan="1">日期</td>
          <td colspan="2">
            <el-input v-model="form.achieDate1"  placeholder="请输入成果二日期"/>
          </td>
        </tr>
        <tr>
          <td colspan="10">
            <textarea  placeholder="成果二介绍" maxlength="1000"  v-model="form.achieContent1" style="width: 100%;height:80px"    />
          </td>
        </tr>
        <tr>
          <td colspan="1">成果三名称</td>
          <td colspan="6">
            <el-input v-model="form.achieName1" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入成果三日期"/>
          </td>
          <td colspan="1">日期</td>
          <td colspan="2">
            <el-input v-model="form.achieDate1"  placeholder="请输入成果三日期"/>
          </td>
        </tr>
        <tr>
          <td colspan="10">
            <textarea  placeholder="成果三介绍" maxlength="1000"  v-model="form.achieContent1" style="width: 100%;height:80px"    />
          </td>
        </tr>
      </table>
    </div>
    <div align="center"  >
        <fileupload 
          url="/api/thesisreview/thesisReviewOnlineReviewThesisUpload"
          :data="{'docType': pdf,'thesisId':form.applyId}"
          accepttype=".pdf"
          @successcallback="onSuccess"
          style="float: right"
          @preview="onPreview"
        >附件上传
        </fileupload>
        <el-button  type="primary" @click="Statistics">数据统计</el-button>
        <el-button  type="primary" @click="doSave">修改保存</el-button>
    </div>
    <table class="headline">
      <tr><td>已申请招生专业列表</td></tr>
    </table>
      <el-table
        :data="applyList"
        border
        style="width: 100%;margin-top: -6px"
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
            {{ scope.row.stateName }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          color="black"
          v-if='isCanEdit'
        >
          <template slot-scope="scope">
            <el-button type="primary"  @click="doMajorDelete(scope.row.majorApplyId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    <div  align="center">
      <tr>
        <td>
          申请类型
          <el-select v-model="applyType" placeholder="请选择申请类型" style="width: 20%"  @change="doMajorList()">
            <el-option
              v-for="item in applyTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          学院
          <el-select v-model="collegeId" placeholder="请选择学院" style="width: 20%"  @change="doMajorList()">
            <el-option
              v-for="item in collegeList"
              :key="item.collegeId"
              :label="item.collegeName"
              :value="item.collegeId"
            />
          </el-select>
          专业
          <el-select v-model="majorId" placeholder="请选择专业" style="width: 20%" >
            <el-option
              v-for="item in majorList"
              :key="item.majorId"
              :label="item.majorName"
              :value="item.majorId"
            />
          </el-select>
          <el-button type="primary"  @click="doMajorAdd()">添加招生专业</el-button>
          <el-button type="primary" @click="submit">下载简况表</el-button>
        </td>
      </tr>
    </div>
  </div>
</template>

<script>
import { recruitQualificationApply } from '@/api/tutor'
import { recruitQualificationApplySave } from '@/api/tutor'
import { recruitQualificationApplyMajorList } from '@/api/tutor'
import { recruitQualificationApplyApplyList } from '@/api/tutor'
import { recruitQualificationApplyStatistics } from '@/api/tutor'
import { recruitQualificationApplyMajorAdd } from '@/api/tutor'
import { recruitQualificationApplyMajorDelete } from '@/api/tutor'
export default {
  name: 'RecruitQualificationApply',
  data() {
    return {
      form: {
        applyId: null,
        recruitType:'',
        applyKind: '',
        genderCode:'',
        perBirthDay:'',
        proTechPositionCode:'',
        doctorTutorTime:'',
        disserNum: 0,
        bookNum: 0,
        patentNum: 0,
        rewardNum: 0,
        projectNum1: 0,
        projectNum2: 0,
        projectNum3: 0,
        applyProjectNum1: 0,
        applyProjectNum2: 0,
        projectFeeTotal: 0,
        projectFeeBalance: 0,
        doctorNum: 0,
        masterNum: 0,
        assistDoctorNum: 0,
        researchReview: 0,
        achieName1: '',
        achieDate1: '',
        achieContent1: '',
        achieName2: '',
        achieDate2: '',
        achieContent2: '',
        achieName3: '',
        achieDate3: '',
        achieContent3: ''
      },
      personId: this.$route.query.applyId,
      isCanEdit: false,
      applyType: '11',
      collegeId: null,
      majorId: null,
      applyKindList: [],
      proTechPositionCode:[],
      applyTypeList: [],
      collegeList: [],
      majorList: [],
      applyList: [],
      disserList: [],
      bookList: [],
      projectList: [],
      rewardList: [],
      patentList: [],
      gender:[
          {
            value: '1',
            label: '男'
          }, {
            value: '2',
            label: '女'
          }
        ],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    test1() { // 回显checkbox
    },
    Statistics() {
      recruitQualificationApplyStatistics({ 'session': document.cookie }).then(res => {
        this.form.disserNum = res.data.disserNum
        this.form.bookNum = res.data.bookNum
        this.form.patentNum = res.data.patentNum
        this.form.rewardNum = res.data.rewardNum
        this.form.projectNum1 = res.data.projectNum1
        this.form.projectNum2 = res.data.projectNum2
        this.form.projectNum3 = res.data.projectNum3
        this.form.applyProjectNum1 = res.data.applyProjectNum1
        this.form.projectFeeTotal = res.data.projectFeeTotal
      })
    },
    fetchData() {
      this.getApplyList() // 申请列表
      recruitQualificationApply({ 'session': document.cookie, 'personId': this.personId }).then(res => {
        this.isCanEdit = res.data.isCanEdit
        this.isCanApply = res.data.isCanApply
        this.applyType = res.data.applyType
        this.collegeId = res.data.collegeId
        this.majorId = res.data.majorId
        this.form = res.data.form
        this.applyKindList = res.data.applyKindList
        this.applyTypeList = res.data.applyTypeList
        this.collegeList = res.data.collegeList
        this.majorList = res.data.majorList
        this.applyList = res.data.applyList;
      })
    },
    doMajorList() {
      recruitQualificationApplyMajorList({ 'session': document.cookie, 'applyType': this.applyType, 'collegeId': this.collegeId
      }).then(res => {
        this.majorId = res.data.majorId
        this.majorList = res.data.majorList
      })
    },
    doStatistics() {
      recruitQualificationApplyStatistics({ 'session': document.cookie, 'form': this.form
      }).then(res => {
        this.form = res.data
      })
    },
    doSave() { // 保存修改
      recruitQualificationApplySave({ 'session': document.cookie, 'form': this.form
      }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '提交成功',
            type: 'success',
            offset: '10'
          })
          this.form.applyId = res.data
        }
      })
    },
    getApplyList() { // 申请专业列表
      recruitQualificationApplyApplyList({ 'session': document.cookie
      }).then(res => {
        this.applyList = res.data
      })
    },
    doMajorAdd() { // 添加申请专业
      recruitQualificationApplyMajorAdd({ 'session': document.cookie, 'applyId': this.form.applyId, 'applyType': this.applyType, 'collegeId': this.collegeId, 'majorId': this.majorId
      }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '提交成功',
            type: 'success',
            offset: '10'
          })
          this.getApplyList()
        }
        if (res.code === '1') {
          this.$message({
            message: res.msg,
            type: 'error',
            offset: '10'
          })
          this.getApplyList()
        }
      })
    },
    doMajorDelete(majorApplyId) { // 删除申请专业
      this.$confirm('确认要删除已添加的掌声申请吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        recruitQualificationApplyMajorDelete({ 'session': document.cookie, 'majorApplyId': majorApplyId }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '删除成功',
              type: 'sucess'
            })
            this.getApplyList()
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已删除分发'
        })
      })
    },
    onPreview: function(file) {
    },
    onSuccess(res, file) {
        if(res.code === '0'){
          this.$message({
            message: '上传成功，请下载检查一下文件是否可以打开',
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
