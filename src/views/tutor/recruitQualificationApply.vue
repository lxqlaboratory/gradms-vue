<template>
  <div class="app-container">
    <table class="content" align="left">
      <tr>
        <td style="font-size: 16px;color: red;text-align:left; ">
          友情提示：建议使用谷歌浏览器chrome,windows自带浏览器Microsoft Edge,360浏览器请选用极速模式<br>
          申请说明:<br>
          &nbsp;&nbsp;1.请首先在申请论文、专著、项目、奖励、专利维护功能中把本次招生申请需要的成果维护好，再进行招生资格认证申请。<br>
          &nbsp;&nbsp;2.点击数据统计按钮后系统自动统计近五年的成果项目、指导学生数，可在此基础上进行编辑修改，协助指导学生数和可支配经费需教师自己维护。<br>
          &nbsp;&nbsp;3.请首先维护好申请信息，点击保存后在添加招生专业，除新申请博导，博导时间为空，其他信息都不可以为空。<br>
          &nbsp;&nbsp;4.申请所在学院审核通过后，所有的成果信息和申请信息不可维护，请老师在学院审核前进行信息维护。<br>
          &nbsp;&nbsp;5.本次申请老师根据实际情况选择申请曾招收博导、新申请博导、曾招收硕导、新申请硕导，认定博导则同时认定为硕导。<br>
          &nbsp;&nbsp;6.老师可以将辅助资料打包为.zip文件，作为附件上传系统，学院可以下载查询。
        </td>
      </tr>
    </table>
    <div >
      <table class="content" >
        <tr>
          <td colspan="10" style="font-size: 16px;font-weight: bold;color: #304156 ">招生申请信息</td>
        </tr>
        <tr>
          <td colspan="1" style="width: 10%">申请类型</td>
          <td colspan="1" style="width: 10%" v-if="isCanEdit" >
            <el-select v-model="form.applyKind" placeholder="请选择申请类型"   >
              <el-option
                v-for="item in applyKindList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
          <td colspan="1" style="width: 12%" v-else >
          {{form.applyKindName}}
          </td>
          <td colspan="1" style="width: 10%">性别</td>
          <td colspan="1" style="width: 8%" v-if="isCanEdit" >
            <el-select v-model="form.genderCode" placeholder="请选择性别"   >
              <el-option
                v-for="item in gender"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
          <td colspan="1" style="width: 8%" v-else >
            {{form.genderName}}
          </td>
          <td colspan="1" style="width: 12%">出生年月</td>
          <td colspan="1" style="width: 12%" v-if="isCanEdit">
            <el-date-picker
              v-model="form.perBirthday"
              size="mini"
              type="date"
              style="width: 95%"
              value-format="yyyy-MM-dd"
              placeholder="选择出生日期"
            />
          </td>
          <td colspan="1" style="width: 8%" v-else >
            {{form.perBirthday}}
          </td>
          <td colspan="1" style="width: 12%">职称</td>
          <td colspan="1" style="width: 10%" v-if="isCanEdit">
            <el-select v-model="form.proTechPositionCode" placeholder="请选择申请类型"   >
              <el-option
                v-for="item in proTechPositionCodeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
          <td colspan="1" style="width: 10%" v-else >
            {{form.proTechPositionName}}
          </td>
          <td colspan="1" style="width: 10%">博导时间</td>
          <td colspan="1"  v-if="isCanEdit">
            <el-date-picker
              v-model="form.doctorTutorTime"
              size="mini"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期时间"
            />
          </td>
          <td colspan="1"  v-else >
            {{form.doctorTutorTimeStr}}
          </td>
        </tr>
        <tr>
          <td colspan="1"  >论文数</td>
          <td colspan="1" v-if="isCanEdit"  >
            <el-input v-model.number="form.disserNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入论文数"    />
          </td>
          <td colspan="1" v-else  >
            {{form.disserNum}}
          </td>
          <td colspan="1">专著数</td>
          <td colspan="1" v-if="isCanEdit" >
            <el-input v-model.number="form.bookNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入专著数"  />
          </td>
          <td colspan="1" v-else  >
            {{form.bookNum}}
          </td>
          <td colspan="1">获奖数</td>
          <td colspan="1"    v-if="isCanEdit" >
            <el-input v-model.number="form.rewardNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入获奖数"/>
          </td>
          <td colspan="1" v-else  >
            {{form.rewardNum}}
          </td>
          <td colspan="1">专利数</td>
          <td colspan="1"  v-if="isCanEdit">
            <el-input v-model.number="form.patentNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入专利数"/>
          </td>
          <td colspan="1" v-else  >
            {{form.patentNum}}
          </td>
          <td colspan="1">国家项目数</td>
          <td colspan="1" v-if="isCanEdit">
            <el-input v-model.number="form.projectNum1" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入国家项目数" />
          </td>
          <td colspan="1" v-else  >
            {{form.projectNum1}}
          </td>
        </tr>
        <tr>
          <td colspan="1">国家立项数</td>
          <td colspan="1"  v-if="isCanEdit">
            <el-input v-model.number="form.applyProjectNum1" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入国家立项数"/>
          </td>
          <td colspan="1" v-else  >
            {{form.applyProjectNum1}}
          </td>
          <td colspan="1">省部项目数</td>
          <td colspan="1" v-if="isCanEdit">
            <el-input v-model.number="form.projectNum2" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入省部项目数"/>
          </td>
          <td colspan="1" v-else  >
            {{form.projectNum2}}
          </td>
          <td colspan="1">省部立项数</td>
          <td colspan="1" v-if="isCanEdit">
            <el-input v-model.number="form.applyProjectNum2" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入省部立项数"/>
          </td>
          <td colspan="1" v-else  >
            {{form.applyProjectNum2}}
          </td>
          <td colspan="1">横向项目</td>
          <td colspan="1" v-if="isCanEdit">
            <el-input v-model.number="form.projectNum3" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入横向项目数"/>
          </td>
          <td colspan="1" v-else  >
            {{form.projectNum3}}
          </td>
          <td colspan="1">总经费</td>
          <td colspan="1" v-if="isCanEdit">
            <el-input v-model="form.projectFeeTotal" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入总经费数"/>
          </td>
          <td colspan="1" v-else  >
            {{form.projectFeeTotal}}
          </td>
          </tr>
          <tr>
          <td colspan="1">可支配经费</td>
          <td colspan="1" v-if="isCanEdit">
            <el-input v-model="form.projectFeeBalance" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入可支配经费数"/>
          </td>
            <td colspan="1" v-else  >
              {{form.projectFeeBalance}}
            </td>
          <td colspan="1">指导博士生数</td>
          <td colspan="1" v-if="isCanEdit">
            <el-input v-model.number="form.doctorNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入指导博士生数"/>
          </td>
            <td colspan="1" v-else  >
              {{form.doctorNum}}
            </td>
          <td colspan="1">指导硕士生数</td>
          <td colspan="1" v-if="isCanEdit">
            <el-input v-model.number="form.masterNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入指导硕士生数"/>
          </td>
            <td colspan="1" v-else  >
              {{form.masterNum}}
            </td>
          <td colspan="1">协助指导博士生数</td>
          <td colspan="3" v-if="isCanEdit">
            <el-input v-model.number="form.assistDoctorNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入协助指导博士生数"/>
          </td>
            <td colspan="3" v-else  >
              {{form.assistDoctorNum}}
            </td>
        </tr>
        <tr v-if="form.applyKind==='DN'">
          <td colspan="10" v-if="isCanEdit">
            <textarea  placeholder="本人主要研究方向及学术贡献：" maxlength="1000"  v-model="form.researchReview" style="width: 100%;height:80px"    />
          </td>
          <td colspan="10" v-else >
            <textarea  placeholder="本人主要研究方向及学术贡献：" maxlength="1000"  v-model="form.researchReview" style="width: 100%;height:80px"   readonly />
          </td>
        </tr>
        <tr  v-if="form.applyKind==='DN'">
          <td colspan="1">成果名称</td>
          <td colspan="6" v-if="isCanEdit" >
            <el-input v-model="form.achieName1"  placeholder="请输入成果一名称"/>
          </td>
          <td colspan="6" v-else >
            {{form.achieName1}}
          </td>
          <td colspan="1">完成日期</td>
          <td colspan="2" v-if="isCanEdit" >
            <el-input v-model="form.achieDate1"  placeholder="请输入成果一日期"/>
          </td>
          <td colspan="2" v-else >
            {{form.achieDate1}}
          </td>
        </tr>
        <tr v-if="form.applyKind==='DN'">
          <td colspan="10" v-if="isCanEdit">
            <textarea  placeholder="近五年代表性科研成果简介之一：" maxlength="1000"  v-model="form.achieContent1" style="width: 100%;height:80px"    />
          </td>
          <td colspan="10" v-else >
            <textarea  placeholder="近五年代表性科研成果简介之一：" maxlength="1000"  v-model="form.achieContent1" style="width: 100%;height:80px"   readonly />
          </td>
        </tr>
        <tr  v-if="form.applyKind==='DN'">
          <td colspan="1">成果名称</td>
          <td colspan="6" v-if="isCanEdit" >
            <el-input v-model="form.achieName2"  placeholder="请输入成果二名称"/>
          </td>
          <td colspan="6" v-else >
            {{form.achieName2}}
          </td>
          <td colspan="1">完成日期</td>
          <td colspan="2" v-if="isCanEdit" >
            <el-input v-model="form.achieDate2"  placeholder="请输入成果二日期"/>
          </td>
          <td colspan="2" v-else >
            {{form.achieDate2}}
          </td>
        </tr>
        <tr v-if="form.applyKind==='DN'">
          <td colspan="10" v-if="isCanEdit">
            <textarea  placeholder="近五年代表性科研成果简介之二：" maxlength="1000"  v-model="form.achieContent2" style="width: 100%;height:80px"    />
          </td>
          <td colspan="10" v-else >
            <textarea  placeholder="近五年代表性科研成果简介之二：" maxlength="1000"  v-model="form.achieContent2" style="width: 100%;height:80px"   readonly />
          </td>
        </tr>
        <tr  v-if="form.applyKind==='DN'">
          <td colspan="1">成果名称</td>
          <td colspan="6" v-if="isCanEdit" >
            <el-input v-model="form.achieName3"  placeholder="请输入成果三名称"/>
          </td>
          <td colspan="6" v-else >
            {{form.achieName3}}
          </td>
          <td colspan="1">完成日期</td>
          <td colspan="2" v-if="isCanEdit" >
            <el-input v-model="form.achieDate3"  placeholder="请输入成果三日期"/>
          </td>
          <td colspan="2" v-else >
            {{form.achieDate1}}
          </td>
        </tr>
        <tr v-if="form.applyKind==='DN'">
          <td colspan="10" v-if="isCanEdit">
            <textarea  placeholder="近五年代表性科研成果简介之三：" maxlength="1000"  v-model="form.achieContent3" style="width: 100%;height:80px"    />
          </td>
          <td colspan="10" v-else >
            <textarea  placeholder="近五年代表性科研成果简介之三：" maxlength="1000"  v-model="form.achieContent3" style="width: 100%;height:80px"   readonly />
          </td>
        </tr>
      </table>
    </div>
    <div align="center" v-if="isCanEdit" >
        <el-button  type="primary" @click="doStatistics">数据统计</el-button>
        <el-button  type="primary" @click="doSave" :disabled="isDisable" >修改保存</el-button>
      <fileupload
        url="/api/tutor/recruitQualificationAttachUpload"
        :data="{'docType': zip,'applyId':form.applyId}"
        accepttype=".zip"
        @successcallback="onSuccess"
        @preview="onPreview"
      >附件上传
      </fileupload>
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
            {{ scope.row.checkedName }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          color="black"
          v-if='isCanApply'
        >
          <template slot-scope="scope" v-if="!scope.row.isChecked">
            <el-button type="primary"  @click="doMajorDelete(scope.row.majorApplyId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    <div  align="center" v-if='isCanApply' >
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
          <el-button type="primary"  v-if="form.applyId > 0" >
            <a :href="serverAddres+'/api/tutor/getTutorRecruitQualificationPrintData?applyId='+form.applyId" :download="applyTableName">下载简况表</a>
          </el-button>
        </td>
      </tr>
    </div>
  </div>
</template>

<script>
import fileupload from '../../components/upload/fileupload'
import { recruitQualificationApply } from '@/api/tutor'
import { recruitQualificationApplySave } from '@/api/tutor'
import { recruitQualificationApplyMajorList } from '@/api/tutor'
import { recruitQualificationApplyApplyList } from '@/api/tutor'
import { recruitQualificationApplyStatistics } from '@/api/tutor'
import { recruitQualificationApplyMajorAdd } from '@/api/tutor'
import { recruitQualificationApplyMajorDelete } from '@/api/tutor'
export default {
  name: 'RecruitQualificationApply',
  components: { fileupload },
  data() {
    return {
      form: {
        applyId: null,
        recruitType:'',
        applyKind: '',
        genderCode:'',
        perBirthday:'',
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
        researchReview:'',
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
      isDisable: false,
      serverAddres:'',
      isCanEdit: false,
      isCanApply:true,
      applyType: '11',
      collegeId: null,
      majorId: null,
      applyKindList: [],
      proTechPositionCodeList:[],
      applyTypeList: [],
      collegeList: [],
      majorList: [],
      applyList: [],
      disserList: [],
      bookList: [],
      projectList: [],
      rewardList: [],
      patentList: [],
      applyTableName:'简况表.pdf',
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
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      recruitQualificationApply({ 'session': document.cookie, 'applyId':this.$route.query.applyId }).then(res => {
        this.isCanEdit = res.data.isCanEdit
        this.isCanApply = res.data.isCanApply
        this.applyType = res.data.applyType
        this.collegeId = res.data.collegeId
        this.majorId = res.data.majorId
        this.form = res.data.form
        this.proTechPositionCodeList = res.data.proTechPositionCodeList
        this.applyKindList = res.data.applyKindList
        this.applyTypeList = res.data.applyTypeList
        this.collegeList = res.data.collegeList
        this.majorList = res.data.majorList
        this.applyList = res.data.applyList;
      })
    },
    doStatistics() {
      recruitQualificationApplyStatistics({ 'session': document.cookie,'form':this.form }).then(res => {
        this.form = res.data
      })
    },
    doMajorList() {
      recruitQualificationApplyMajorList({ 'session': document.cookie, 'applyType': this.applyType, 'collegeId': this.collegeId
      }).then(res => {
        this.majorId = res.data.majorId
        this.majorList = res.data.majorList
      })
    },
    doSave() { // 保存修改
        if(this.form.genderCode === undefined ||this.form.perBirthday === undefined || this.form.proTechPositionCode=== undefined || this.form.applyKind==='D' && this.form.doctorTutorTime=== undefined ) {
           this.$message({
            message: '性别，出生日期，职称，博导时间不能为空',
            type: 'warning',
            offset: '10'
          })
        }else {
          this.isDisable = true
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
            setTimeout(() =>{
              this.isDisable = false
              },1000);
          })
        }
    },
    getApplyList() { // 申请专业列表
      recruitQualificationApplyApplyList({ 'session': document.cookie,'applyId':this.form.applyId
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
            message: '上传成功',
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
