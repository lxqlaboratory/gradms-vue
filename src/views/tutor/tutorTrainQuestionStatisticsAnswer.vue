<template>
  <div class="app-container">
      <table class="content" >
        <tr>
          <td colspan="4" style="font-size: 16px; ">答卷详情</td>
        </tr>
        <tr>
          <td colspan="1" style="font-size: 16px;width: 30%">{{groupName}}</td>
          <td colspan="1" style="font-size: 16px;width: 10%" >题目数:{{questionNum}}</td>
          <td colspan="1" style="font-size: 16px;width: 10%" >正确数:{{okNum}}</td>
          <td colspan="1" style="font-size: 16px;width: 30%" >答题时间:{{startTime}}--{{endTime}}</td>
        </tr>
      </table>
      <el-table
        :data="answerList"
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
          label="题目"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.content }}
          </template>
        </el-table-column>
        <el-table-column
          label="标准答案"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.answersOK }}
          </template>
        </el-table-column>
        <el-table-column
          label="选择项"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.answers }}
          </template>
        </el-table-column>
        <el-table-column
          label="结果"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.answerCause }}
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import { tutorTrainQuestionStatisticsAnswer } from '@/api/tutor'
export default {
  name: 'tutorTrainQuestionStatisticsAnswer',
  data() {
    return {
        groupName: '',
        questionNum:'',
        okNum:0,
        startTime:'',
        endTime:'',
        answerList: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.groupName = this.$route.groupName
      tutorTrainQuestionStatisticsAnswer({ 'session': document.cookie, 'groupAnswerId':this.$route.query.groupAnswerId }).then(res => {
        this.questionNum = res.data.questionNum
        this.okNum = res.data.okNum
        this.startTime = res.data.startTime
        this.endTime = res.data.endTime
        this.answerList = res.data.answerList
      })
    },
  }
}
</script>
