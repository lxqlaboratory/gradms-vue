<template>
  <div class="app-container">
    <div class="table-headline">
      <table class="headline">
        <tr><td>论文列表</td></tr>
      </table>
      <el-table
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
    <div class="table-headline">
      <table class="headline">
        <tr><td>专著列表</td></tr>
      </table>
      <el-table
        :data="bookList"
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
          label="著作名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.bookName }}
          </template>
        </el-table-column>
        <el-table-column
          label="著作类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.bookType }}
          </template>
        </el-table-column>
        <el-table-column
          label="出版社"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.publishUnit }}
          </template>
        </el-table-column>
        <el-table-column
          label="出版时间"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.publishDate }}
          </template>
        </el-table-column>
        <el-table-column
          label="字数"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.wordCount }}
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
    <div class="table-headline">
      <table class="headline">
        <tr><td>项目列表</td></tr>
      </table>
      <el-table
        :data="projectList"
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
          label="项目名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectName }}
          </template>
        </el-table-column>
        <el-table-column
          label="项目类别"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectType }}
          </template>
        </el-table-column>
        <el-table-column
          label="项目等级"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.ranking }}
          </template>
        </el-table-column>
        <el-table-column
          label="项目经费"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectFee }}
          </template>
        </el-table-column>
        <el-table-column
          label="批准部门"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectSource }}
          </template>
        </el-table-column>
        <el-table-column
          label="项目时间"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectTime }}
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
    <div class="table-headline">
      <table class="headline">
        <tr><td>奖励列表</td></tr>
      </table>
      <el-table
        :data="rewardList"
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
          label="奖励项目名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.rewardProjectName }}
          </template>
        </el-table-column>
        <el-table-column
          label="奖励名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.rewardName }}
          </template>
        </el-table-column>
        <el-table-column
          label="奖励级别"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.rewardGrade }}
          </template>
        </el-table-column>
        <el-table-column
          label="奖励等级"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.rewardLevle }}
          </template>
        </el-table-column>
        <el-table-column
          label="奖励年度"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.rewardYear }}
          </template>
        </el-table-column>
        <el-table-column
          label="颁奖部门"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.rewardDepartment }}
          </template>
        </el-table-column>
        <el-table-column
          label="证书时间"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.certificateDate }}
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
    <div class="table-headline">
      <table class="headline">
        <tr><td>专利列表</td></tr>
      </table>
      <el-table
        :data="patentList"
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
          label="专利名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.patentName }}
          </template>
        </el-table-column>
        <el-table-column
          label="专利类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.patentType }}
          </template>
        </el-table-column>
        <el-table-column
          label="申请时间"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.applyDate }}
          </template>
        </el-table-column>
        <el-table-column
          label="授权时间"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.authoriDate }}
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
    <div  align="center">
      <el-button v-if="existAttach" type="primary">
        <a :href="serverAddres+'/api/tutor/getTutorRecruitAchievementListByApplyId?personId='+personId" :download="achievementFielName">下载成果附件PDF</a>
      </el-button>
      <el-button type="primary" @click="doExport">成果列表导出</el-button>
    </div>
  </div>
</template>

<script>
  import { parseTime } from '@/utils'
import { tutorRecruitAchievementList } from '@/api/tutor'
export default {
  name: 'TutorRecruitAchievementList',
  data() {
    return {
      personId: '',
      existAttach: false,
      dirsserList: [],
      bookList: [],
      projectList: [],
      rewardList: [],
      patentList: [],
      achievementFielName: '',
      achievementExclName: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.personId = this.$route.query.personId
      tutorRecruitAchievementList({ 'session': document.cookie, 'personId': this.personId }).then(res => {
        this.disserList = res.data.disserList
        this.bookList = res.data.bookList
        this.projectList = res.data.projectList
        this.rewardList = res.data.rewardList
        this.patentList = res.data.patentList
        this.existAttach = res.data.existAttach
        this.achievementFielName = res.data.achievementFielName
        this.achievementExclName = res.data.achievementExclName
      })
    },
    doExport() {
      var excelDatas = [
        {
          tHeader: ['论文名称', '刊物名称','收录情况','影响因子','发表时间','刊物级别','作者位次'], // sheet表一头部
          filterVal: ['disserName','publishUnit','include','impactFactor','publishTime','ranking','orderName'], // 表一的数据字段
          tableDatas: this.disserList, // 表一的整体json数据
          sheetName: '论文'// 表一的sheet名字
        },
        {
          tHeader: ['著作名称', '著作类型','出版社','出版时间','字数','位次'],
          filterVal: ['bookName','bookType','publishUnit','publishDate','wordCount','orderName'],
          tableDatas: this.bookList,
          sheetName: '专著'
        },
        {
          tHeader: ['项目名称','项目类别','项目等级','项目经费','批准部门','项目时间','作者位次'],
          filterVal: ['projectName','projectType','ranking','projectFee','projectSource','projectTime','orderName'],
          tableDatas: this.projectList,
          sheetName: '项目'
        },
        {
          tHeader: ['奖励项目名称','奖励名称','奖励级别','奖励等级','奖励年度','颁奖部门','证书时间','作者位次'],
          filterVal: ['rewardProjectName','rewardName','rewardGrade','rewardLevle','rewardYear','rewardDepartment','certificateDate','orderName'],
          tableDatas: this.rewardList,
          sheetName: '奖励'
        },
        {
          tHeader: ['专利名称','专利类型','申请时间','授权时间','作者位次'],
          filterVal: ['patentName','patentType','applyDate','authoriDate','orderName'],
          tableDatas: this.patentList,
          sheetName: '专利'
        }
      ]

      this.json2excel(excelDatas, this.achievementExclName, true, 'xlsx')
    },
    json2excel(tableJson, filenames, autowidth, bookTypes) {
      var that = this
      import('@/vendor/ExportMoreExcels').then(excel => {
        var tHeader = []
        var dataArr = []
        var sheetnames = []
        for (var i in tableJson) {
          tHeader.push(tableJson[i].tHeader)
          dataArr.push(that.formatJson(tableJson[i].filterVal, tableJson[i].tableDatas))
          sheetnames.push(tableJson[i].sheetName)
        }
        excel.export_json_to_excel({
          header: tHeader,
          data: dataArr,
          sheetname: sheetnames,
          filename: filenames,
          autoWidth: autowidth,
          bookType: bookTypes
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style scoped>
</style>
