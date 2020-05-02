<template>
  <div class="app-container">
    <table class="content"  align="left">
      <tr>
        <td  style="font-size: 16px;color: red;text-align:left; ">
          审核说明:<br>
          &nbsp;&nbsp;1.点击下载论文，可以下载学生论<br>
          &nbsp;&nbsp;2.点击评阅，可以填写评阅意见，保存后可以继续修改，选择提交按钮则不能在进行修改，只可以下下载评阅书。
          
        </td>
      </tr>
    </table>
    <table class="content">
      <tr>
        <td colspan="8" style="font-size: 16px;font-weight: bold;color: #304156 ">招生申请信息</td>
      </tr>
      <tr>
        <td colspan="1">论文数</td>
        <td colspan="1">
          <el-input v-model.number="form.disserNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入论文数" :disabled="isCanEdit" />
        </td>
        <td colspan="1">专著数</td>
        <td colspan="1">
          <el-input v-model.number="form.bookNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入专著数" :disabled="isCanEdit" />
        </td>
        <td colspan="1">获奖数</td>
        <td colspan="1">
          <el-input v-model.number="form.rewardNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入获奖数" :disabled="isCanEdit" />
        </td>
        <td colspan="1">专利数</td>
        <td colspan="1">
          <el-input v-model.number="form.patentNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入专利数" :disabled="isCanEdit" />
        </td>
      </tr>
      <tr>
        <td colspan="1">国家项目数</td>
        <td colspan="1">
          <el-input v-model.number="form.projectNum1" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入国家项目数" :disabled="isCanEdit" />
        </td>
        <td colspan="1">国家立项数</td>
        <td colspan="1">
          <el-input v-model.number="form.applyProjectNum1" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入国家立项数" :disabled="isCanEdit" />
        </td>
        <td colspan="1">省部项目数</td>
        <td colspan="1">
          <el-input v-model.number="form.projectNum2" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入省部项目数" :disabled="isCanEdit" />
        </td>
        <td colspan="1">省部立项数</td>
        <td colspan="1">
          <el-input v-model.number="form.applyProjectNum2" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入省部立项数" :disabled="isCanEdit" />
        </td>
      </tr>
      <tr>
        <td colspan="1">横向项目</td>
        <td colspan="1">
          <el-input v-model.number="form.projectNum3" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入横向项目数" :disabled="isCanEdit" />
        </td>
        <td colspan="1">总经费</td>
        <td colspan="1">
          <el-input v-model="form.projectFeeTotal" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入总经费数" :disabled="isCanEdit" />
        </td>
        <td colspan="1">可支配经费</td>
        <td colspan="1">
          <el-input v-model="form.projectFeeBalance" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入可支配经费数" :disabled="isCanEdit" />
        </td>
        <td colspan="1">初始申请硕导</td>
        <td colspan="1">
          <el-checkbox-group v-model="isNewMaster" @change="test1">
            <!--              <el-checkbox v-for="item in systemRubroList" :key="item.filterKey" :label="item.label" >{{item.label}}</el-checkbox>-->
            <el-checkbox v-model="isNewMaster" :disabled="isCanEdit" label="1">初始申请硕导</el-checkbox>
          </el-checkbox-group>        </td>
      </tr>
      <tr>
        <td colspan="1">指导博士生数</td>
        <td colspan="1">
          <el-input v-model.number="form.doctorNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入指导博士生数" :disabled="isCanEdit" />
        </td>
        <td colspan="1">指导硕士生数</td>
        <td colspan="1">
          <el-input v-model.number="form.masterNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入指导硕士生数" :disabled="isCanEdit" />
        </td>
        <td colspan="1">协助指导博士生数</td>
        <td colspan="1">
          <el-input v-model.number="form.assistDoctorNum" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入协助指导博士生数" :disabled="isCanEdit" />
        </td>
        <td colspan="1">初始申请博导</td>
        <td colspan="1">
          <el-checkbox-group v-model="isNewDoctor" @change="test1">
            <!--              <el-checkbox v-for="item in systemRubroList" :key="item.filterKey" :label="item.label" >{{item.label}}</el-checkbox>-->
            <el-checkbox v-model="isNewDoctor" :disabled="isCanEdit" label="1">初始申请博导</el-checkbox>
          </el-checkbox-group>
        </td>
      </tr>
    </table>
    <div align="center">
      <el-button type="primary" @click="Statistics">数据统计</el-button>
      <el-button type="primary" :disabled="isCanEdit" @click="doSave">修改保存</el-button>
      <el-button type="primary" @click="submit">下载简况表</el-button>
      <el-button type="primary" @click="show1">展示成果</el-button>
    </div>
    <table class="headline">
      <tr><td>已申请招生专业列表</td></tr>
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
          {{ scope.row.stateName }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          <el-button type="primary" :disabled="isCanEdit" @click="doMajorDelete(scope.row.majorApplyId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="center">
      <tr>
        <td>
          申请类型
          <el-select v-model="applyType" placeholder="请选择申请类型" style="width: 20%" :disabled="isCanEdit" @change="doMajorList()">
            <el-option
              v-for="item in applyTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          学院
          <el-select v-model="collegeId" placeholder="请选择学院" style="width: 20%" :disabled="isCanEdit" @change="doMajorList()">
            <el-option
              v-for="item in collegeList"
              :key="item.collegeId"
              :label="item.collegeName"
              :value="item.collegeId"
            />
          </el-select>
          专业
          <el-select v-model="majorId" placeholder="请选择专业" style="width: 20%" :disabled="isCanEdit">
            <el-option
              v-for="item in majorList"
              :key="item.majorId"
              :label="item.majorName"
              :value="item.majorId"
            />
          </el-select>
          <el-button type="primary" :disabled="isCanEdit" @click="doMajorAdd()">添加招生专业</el-button>
        </td>
      </tr>
    </div>
    <div v-show="showChengGuo" align="center">
      <table class="headline">
        <tr><td>已选择论文列表</td></tr>
      </table>
      <el-table
        ref="multipleTable"
        :data="disserList"
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
          label="论文名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.disserName }}
          </template>
        </el-table-column>
        <el-table-column
          label="刊物名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.publishUnit }}
          </template>
        </el-table-column>
        <el-table-column
          label="收录情况"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.include }}
          </template>
        </el-table-column>
        <el-table-column
          label="影响因子"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.impactFactor }}
          </template>
        </el-table-column>
        <el-table-column
          label="发表时间"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.publishTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="刊物级别"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.ranking }}
          </template>
        </el-table-column>
        <el-table-column
          label="作者位次"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.orderName }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { recruitQualificationApply } from '@/api/tutor'
import { recruitDisserMaintain } from '@/api/tutor'
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
      showChengGuo: false,
      disserNum: '',
      form: {
        isNewDoctor: '',
        isNewMaster: '',
        applyId: null,
        isNewApply: false,
        disserNum: '',
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
      personId: this.$route.query.personId,
      isCanEdit: true,
      isCanApply: true,
      applyType: '11',
      collegeId: null,
      majorId: null,
      applyTypeList: [],
      collegeList: [],
      majorList: [],
      applyList: [],
      disserList: [],
      bookList: [],
      projectList: [],
      rewardList: [],
      patentList: [],
      isNewMaster: '',
      isNewDoctor: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    show1() { // 展示成果 关闭展示成果
      if (this.showChengGuo === true) { this.showChengGuo = false } else { this.showChengGuo = true }
    },
    test1() { // 回显checkbox
      if (this.isNewMaster === true) {
        this.form.isNewMaster = 1
      } else {
        this.form.isNewMaster = 0
      }
      if (this.isNewDoctor === true) {
        this.form.isNewDoctor = 1
      } else {
        this.form.isNewDoctor = 0
      }
    },
    getDisser() { // 获取论文列表
      recruitDisserMaintain({ 'session': document.cookie }).then(res => {
        this.disserList = res.data.dataList
        this.sourceList = res.data.sourceList
        this.isCanModify = res.data.isCanModify
      })
    },
    Statistics() {
      recruitQualificationApplyStatistics({ 'session': document.cookie }).then(res => {

      })
    },
    fetchData() {
      this.getApplyList() // 申请列表
      recruitQualificationApply({ 'session': document.cookie, 'personId': this.personId }).then(res => {
        this.isCanEdit = res.data.isCanEdit
        // disable与iscanedit的true表达意思相反
        this.isCanEdit = !this.isCanEdit
        this.isCanApply = res.data.isCanApply
        this.applyType = res.data.applyType
        this.collegeId = res.data.collegeId
        this.majorId = res.data.majorId
        this.form = res.data.form
        if (res.data.form.isNewDoctor === 1) {
          this.isNewDoctor = true
        } else {
          this.isNewDoctor = false
        }
        if (res.data.form.isNewMaster === 1) {
          this.isNewMaster = true
        } else {
          this.isNewMaster = false
        }
        this.applyTypeList = res.data.applyTypeList
        this.collegeList = res.data.collegeList
        this.majorList = res.data.majorList
        this.bookList = res.data.bookList
        this.projectList = res.data.projectList
        this.rewardList = res.data.rewardList
        this.patentList = res.data.patentList
      })
      this.getDisser()
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
    }
  }
}
</script>
