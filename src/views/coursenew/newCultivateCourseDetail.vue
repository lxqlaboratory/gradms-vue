<template>
  <div class="app-container">
    <table class="content"   >
        <tr>
          <td colspan="1">课程号</td>
          <td colspan="1">
            {{ detileForm.courseNum }}
          </td>
          <td colspan="1">所属学院</td>
          <td colspan="1">
            {{ detileForm.collegeName }}
          </td>
          <td colspan="1">课程类别</td>
          <td colspan="1">
            {{ detileForm.courseAttribute }}
          </td>
        </tr>
        <tr>
          <td colspan="1">课程名</td>
          <td colspan="1">
            {{ detileForm.courseName }}
          </td>
          <td colspan="1">课程英文名</td>
          <td colspan="1">
            {{ detileForm.courseNameEn }}
          </td>
          <td colspan="1">开课学院</td>
          <td colspan="1">
            {{ detileForm.collegeName }}
          </td>
        </tr>
        <tr>
          <td colspan="1">开课学期</td>
          <td colspan="1">
            {{ detileForm.termCode }}
          </td>
          <td colspan="1">总学时</td>
          <td colspan="1">
            {{ detileForm.classHour }}
          </td>
          <td colspan="1">学分</td>
          <td colspan="1">
            {{ detileForm.credit }}
          </td>
        </tr>
        <tr>
          <td colspan="1">讲课学时</td>
          <td colspan="1">
            {{ detileForm.teachingHour }}
          </td>
          <td colspan="1">实验课学时</td>
          <td colspan="1">
            {{ detileForm.experimentHour }}
          </td>
          <td colspan="1">上机学时</td>
          <td colspan="1">
            {{ detileForm.onComputerHour }}
          </td>
        </tr>
        <tr>
          <td colspan="1">课程属性</td>
          <td colspan="1">
            {{ detileForm.courseAttribute }}
          </td>
          <td colspan="1">教学方式</td>
          <td colspan="1">
            {{ detileForm.teachingWay }}
          </td>
          <td colspan="1">授课语言</td>
          <td colspan="1">
            {{ detileForm.teachLanguage }}
          </td>
        </tr>
        <tr>
          <td colspan="1">学期持续数</td>
          <td colspan="1">
            {{ detileForm.termCount }}
          </td>
          <td colspan="1">考试方式</td>
          <td colspan="1">
            {{ detileForm.examType }}
          </td>
          <td colspan="1">成绩配置</td>
          <td colspan="1">
            {{ detileForm.achieveModelNum }}
          </td>
        </tr>
        <tr>
          <td colspan="1">课程负责人</td>
          <td colspan="1">
            {{ detileForm.managerName }}
          </td>
          <td colspan="1">面向学生类型</td>
          <td colspan="1">
            {{ detileForm.basicFaceCode }}
          </td>
          <td colspan="1">课程负责人</td>
          <td colspan="1">
            {{ detileForm.teachGroup }}
          </td>
        </tr>
        <tr>
          <td colspan="1">教材</td>
          <td colspan="5">
            {{ detileForm.book }}
          </td>
        </tr>
        <tr>
          <td colspan="1">教材主页</td>
          <td colspan="5" />
        </tr>
        <tr>
          <td colspan="1">参考书目</td>
          <td colspan="5">
            {{ detileForm.reference }}
          </td>
        </tr>
        <tr>
          <td colspan="1">预修要求</td>
          <td colspan="5">
            {{ detileForm.preparatoryDemand }}
          </td>
        </tr>
        <tr>
          <td colspan="1">课程说明</td>
          <td colspan="5">
            {{ detileForm.briefIntroduction }}
          </td>
        </tr>
        <tr>
          <td colspan="1" style="width: 15%">教学大纲</td>
          <td colspan="5">
            {{ detileForm.subSpec }}
          </td>
        </tr>
        <tr>
          <td colspan="1">备注</td>
          <td colspan="5">
            {{ detileForm.remark }}
          </td>
        </tr>
    </table>
  </div>
</template>

<script>
import { newCultivateCourseDetail } from '@/api/coursenew'
export default {
  name: 'newCultivateCourseDetail',
   data() {
    return {
        detileForm:{
        courseState: '',
        remark: '',
        onComputerHour: '',
        teachingWay:'',
        courseNum:'', 
        collegeName: '',
        courseType: '',
        courseName: '',
        termCode: '',
        teachingHour: '',
        credit: '',
        classHour: '',
        experimentHour: '',
        courseAttribute: '',
        termCount: '',
        examType: '',
        managerName: '',
        basicFaceCode: '',
        teachGroup: '',
        book: '',
        reference: '',
        preparatoryDemand: '',
        briefIntroduction: '',
        subSpec:'', 
        collegeCheckAdvice: '',
        graduateCheckAdvice: '',
        achieveModelNum: '',
        teachingWayCode: '',
        teachLanguage: ''
        },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      newCultivateCourseDetail({ 'session': document.cookie ,'courseId': this.$route.query.courseId }).then(res => {
        this.detileForm = res.data
      })
    }
  }
}
</script>
