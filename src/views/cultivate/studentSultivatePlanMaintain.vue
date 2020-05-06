<template>
  <div class="app-container">
    <div v-show="showPublicCourse">
      <table class="content" style="width: 1000px;margin: 15px auto;">
        <tr>
          <td colspan="1">选课学期</td>
          <td colspan="1">
            <el-select v-model="PublicCourseForm.courseTerm" placeholder="2019－2020学年第1学期" style="width: 100%">
              <el-option
                v-for="item in courseTerm"
                :key="item.value"
                :label="item.label.zh"
                :value="item.value"
              />
            </el-select>
          </td>
          <td colspan="1">课程状态</td>
          <td colspan="1">
            <el-select v-model="PublicCourseForm.status" placeholder="主管部门审核通过" style="width: 100%">
              <el-option
                v-for="item in courseStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
        </tr>
        <tr>
          <td colspan="1">课程号</td>
          <td colspan="1">
            <el-input v-model="PublicCourseForm.courseNum" />
          </td>
          <td colspan="1">课程名</td>
          <td colspan="3">
            <el-input v-model="PublicCourseForm.courseName" />
          </td>
        </tr>
        <tr>
          <td colspan="1">课程属性</td>
          <td colspan="1">
            <el-select v-model="PublicCourseForm.attribute" placeholder="公共选修课" style="width: 100%">
              <el-option
                v-for="item in courseTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
        </tr>

      </table>
      <div align="center">
        <el-button type="primary" @click="publicCourseQuery">查询</el-button>
      </div>
      <div v-show="showPublicCourseQueryList" class="table-container">
        <el-table
          :data="publiccourseTermList"
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
            label="课程号"
            align="center"
            color="black"
            width="120"
          >
            <template slot-scope="scope">
              {{ scope.row.courseNum }}
            </template>
          </el-table-column>
          <el-table-column
            label="课程名"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="showDetile(scope.row.courseId)">{{ scope.row.courseName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="课程属性"
            align="center"
            color="black"
            width="150"
          >
            <template slot-scope="scope">
              {{ scope.row.courseAttribute }}
            </template>
          </el-table-column>
          <el-table-column
            label="学分"
            align="center"
            color="black"
            width="50"
          >
            <template slot-scope="scope">
              {{ scope.row.credit }}
            </template>
          </el-table-column>
          <el-table-column
            label="学时"
            align="center"
            color="black"
            width="50"
          >
            <template slot-scope="scope">
              {{ scope.row.classHour }}
            </template>
          </el-table-column>
          <el-table-column
            label="开课学期"
            align="center"
            color="black"
            width="100"
          >
            <template slot-scope="scope">
              {{ scope.row.termCodeName }}
            </template>
          </el-table-column>
          <el-table-column
            label="开课学院"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.collegeName }}
            </template>
          </el-table-column>
          <el-table-column
            label="考核方式"
            align="center"
            color="black"
            width="100"
          >
            <template slot-scope="scope">
              {{ scope.row.examTypeName }}
            </template>
          </el-table-column>
          <el-table-column
            label="负责人"
            align="center"
            color="black"
            width="100"
          >
            <template slot-scope="scope">
              {{ scope.row.managerName }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="planState"
            label="操作"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="addPublicCourse(scope.row.courseId)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-show="showAcrossCourse">
      <table class="content" style="width: 1000px;margin: 15px auto;">
        <tr>
          <td colspan="1">学院</td>
          <td colspan="1">
            <el-select v-model="AcrossCourseForm.collegeId" placeholder="请选择学院" style="width: 100%">
              <el-option
                v-for="item in AcrossCourseForm.collegeList"
                :key="item.value"
                :label="item.name.zh"
                :value="item.value"
              />
            </el-select>
          </td>
          <td colspan="1">选课学期</td>
          <td colspan="1">
            <el-select v-model="AcrossCourseForm.courseTerm" placeholder="2019－2020学年第1学期" style="width: 100%">
              <el-option
                v-for="item in courseTerm"
                :key="item.value"
                :label="item.label.zh"
                :value="item.value"
              />
            </el-select>
          </td>
        </tr>
        <tr>
          <td colspan="1">课程名</td>
          <td colspan="1">
            <el-input v-model="AcrossCourseForm.courseName" />
          </td>
          <td colspan="1">课程号</td>
          <td colspan="1">
            <el-input v-model="AcrossCourseForm.courseNum" />
          </td>
        </tr>
        <tr>
          <td colspan="1">课程状态</td>
          <td colspan="3">
            <el-select v-model="AcrossCourseForm.status" placeholder="主管部门审核通过" style="width: 100%">
              <el-option
                v-for="item in courseStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
        </tr>
      </table>
      <div align="center">
        <el-button type="primary" @click="AcrossCourseQuery">查询</el-button>
      </div>
      <div v-show="showAcrossCourseQueryList" class="table-container">
        <el-table
          :data="acrosscourseTermList"
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
            label="课程号"
            align="center"
            color="black"
            width="80"
          >
            <template slot-scope="scope">
              {{ scope.row.courseNum }}
            </template>
          </el-table-column>
          <el-table-column
            label="课程名"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="showDetile(scope.row.courseId)">{{ scope.row.courseName.zh }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="课程属性"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.courseAttribute.zh }}
            </template>
          </el-table-column>
          <el-table-column
            label="学分"
            align="center"
            color="black"
            width="50"
          >
            <template slot-scope="scope">
              {{ scope.row.credit }}
            </template>
          </el-table-column>
          <el-table-column
            label="学时"
            align="center"
            color="black"
            width="50"
          >
            <template slot-scope="scope">
              {{ scope.row.classHour }}
            </template>
          </el-table-column>
          <el-table-column
            label="开课学期"
            align="center"
            color="black"
            width="100"
          >
            <template slot-scope="scope">
              {{ scope.row.termCodeName.zh }}
            </template>
          </el-table-column>
          <el-table-column
            label="考核方式"
            align="center"
            color="black"
            width="100"
          >
            <template slot-scope="scope">
              {{ scope.row.examTypeName.zh }}
            </template>
          </el-table-column>
          <el-table-column
            label="负责人"
            align="center"
            color="black"
            width="100"
          >
            <template slot-scope="scope">
              {{ scope.row.managerName }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="planState"
            label="操作"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="addPublicCourse(scope.row.courseId)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-show="showDetile1">
      <table class="content">
        <tr>
          <td colspan="1">创建者</td>
          <td colspan="1">
            {{ detileForm.creatorName.zh }}
          </td>
          <td colspan="1">所属学院</td>
          <td colspan="1">
            {{ detileForm.collegeName }}
          </td>
          <td colspan="1">课程类别</td>
          <td colspan="1">
            {{ detileForm.courseAttribute.zh }}
          </td>
        </tr>
        <tr>
          <td colspan="1">课程名</td>
          <td colspan="1">
            {{ detileForm.courseName.zh }}
          </td>
          <td colspan="1">课程英文名</td>
          <td colspan="1">
            {{ detileForm.courseName.en }}
          </td>
          <td colspan="1">开课学院</td>
          <td colspan="1">
            {{ detileForm.collegeName }}
          </td>
        </tr>
        <tr>
          <td colspan="1">开课学期</td>
          <td colspan="1">
            {{ detileForm.termCode.zh }}
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
            {{ detileForm.courseAttribute.zh }}
          </td>
          <td colspan="1">教学方式</td>
          <td colspan="1">
            {{ detileForm.teachingWay.zh }}
          </td>
          <td colspan="1">授课语言</td>
          <td colspan="1">
            {{ detileForm.teachLanguage.zh }}
          </td>
        </tr>
        <tr>
          <td colspan="1">学期持续数</td>
          <td colspan="1">
            {{ detileForm.termCount }}
          </td>
          <td colspan="1">考试方式</td>
          <td colspan="1">
            {{ detileForm.examType.zh }}
          </td>
          <td colspan="1">成绩配置</td>
          <td colspan="1">
            {{ detileForm.achieveModelNum.zh }}
          </td>
        </tr>
        <tr>
          <td colspan="1">课程负责人</td>
          <td colspan="1">
            {{ detileForm.managerName.zh }}
          </td>
          <td colspan="1">面向学生类型</td>
          <td colspan="1">
            {{ detileForm.basicFaceCode.zh }}
          </td>
          <td colspan="1">申请课程类型	</td>
          <td colspan="1">
            {{ detileForm.manageDepartment }}
          </td>
        </tr>
        <!--<tr>-->
        <!--<td colspan="1">课程负责人</td>-->
        <!--<td colspan="5">-->
        <!--{{ detileForm.teachGroup }}-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td colspan="1">教材</td>-->
        <!--<td colspan="5">-->
        <!--{{ detileForm.book }}-->
        <!--</td>-->
        <!--</tr>-->
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
            {{ detileForm.briefIntroduction.zh }}
          </td>
        </tr>
        <tr>
          <td colspan="1" style="width: 15%">教学大纲</td>
          <td colspan="5">
            {{ detileForm.subSpec.zh }}
          </td>
        </tr>
        <tr>
          <td colspan="1">备注</td>
          <td colspan="5">
            {{ detileForm.remark }}
          </td>
        </tr>
        <tr>
          <td colspan="1">课程状态</td>
          <td colspan="1">
            {{ detileForm.courseState }}
          </td>
          <td colspan="1">学院意见</td>
          <td colspan="1">
            {{ detileForm.collegeCheckAdvice }}
          </td>
          <td colspan="1">研究生院意见</td>
          <td colspan="1">
            {{ detileForm.graduateCheckAdvice }}
          </td>
        </tr>
      </table>
      <div align="center">
        <el-button type="primary" size="mini" @click="return1()">返回</el-button>
      </div>
    </div>
    <table v-show="showMessage" class="headline">
      <tr><td><div style="color: red;text-align: left">{{ message }}</div></td></tr>
    </table>
    <div v-show="showCourseList11" class="table-container">
      <el-table
        :data="CourseList11"
        :span-method="objectSpanMethod1"
        border
        style="width: 100%;margin-top: -6px"
        size="mini"
      >
        <el-table-column
          label="类别"
          fixed="left"
          width="80"
          align="center"
          color="black"
        >
          <template>
            {{ '必修课' }}
          </template>
        </el-table-column>
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
          label="课程号"
          align="center"
          color="black"
          width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.courseNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="课程名"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="学分"
          align="center"
          color="black"
          width="50"
        >
          <template slot-scope="scope">
            {{ scope.row.credit }}
          </template>
        </el-table-column>
        <el-table-column
          label="开课学期"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.termName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="所属学院"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="是否公选课"
          align="center"
          color="black"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.courseAttribute }}
          </template>
        </el-table-column>
        <el-table-column
          label="教学任务"
          align="center"
          color="black"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.courseIndex }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="planState"
          label="操作"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="delete1(scope.row.planCourseId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="showCourseList12" class="table-container">
      <el-table
        :show-header="false"
        :data="CourseList12"
        :span-method="objectSpanMethod2"
        border
        style="width: 100%;margin-top:-6px;border-top: solid 0px"
        size="mini"
      >
        <el-table-column
          label=""
          fixed="left"
          width="80"
          align="center"
          color="black"
        >
          <template>
            {{ '选修课' }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
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
          label=""
          align="center"
          color="black"
          width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.courseNum }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
          width="50"
        >
          <template slot-scope="scope">
            {{ scope.row.credit }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.termName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.courseAttribute }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.courseIndex }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="planState"
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="delete1(scope.row.planCourseId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="showCourseList13" class="table-container">
      <el-table
        :show-header="false"
        :data="CourseList13"
        :span-method="objectSpanMethod3"
        border
        style="width: 100%;margin-top:-6px;border-top: solid 0px"
        size="mini"
      >
        <el-table-column
          label=""
          fixed="left"
          width="80"
          align="center"
          color="black"
        >
          <template>
            {{ '补修课' }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
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
          label=""
          align="center"
          color="black"
          width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.courseNum }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
          width="50"
        >
          <template slot-scope="scope">
            {{ scope.row.credit }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.termName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.courseAttribute }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.courseIndex }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="planState"
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="delete1(scope.row.planCourseId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <table v-show="showLesson" class="headline">
      <tr><td><div style="color: red;text-align: left">培养方案课程</div></td></tr>
    </table>
    <div v-show="showRequiredList1" class="table-container">
      <el-table
        :data="requiredList1"
        :span-method="objectSpanMethod4"
        border
        style="width: 100%;margin-top: -6px"
        size="mini"
      >
        <el-table-column
          label="类别"
          fixed="left"
          width="80"
          align="center"
          color="black"
        >
          <template>
            {{ '必修课' }}
          </template>
        </el-table-column>
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
          label="课程号"
          align="center"
          color="black"
          width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.courseNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="课程名"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="学分"
          align="center"
          color="black"
          width="50"
        >
          <template slot-scope="scope">
            {{ scope.row.credit }}
          </template>
        </el-table-column>
        <el-table-column
          label="开课学期"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseTerm.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="所属学院"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeNameOfCourse.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="是否公选课"
          align="center"
          color="black"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.isPubSelectCourse.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="add1(scope.row.courseNum)">增加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="showOptionalList1" class="table-container">
      <el-table
        :show-header="false"
        :data="optionalList1"
        :span-method="objectSpanMethod6"
        border
        style="width: 100%;margin-top:-6px;border-top: solid 0px"
        size="mini"
      >
        <el-table-column
          label="类别"
          fixed="left"
          width="80"
          align="center"
          color="black"
        >
          <template>
            {{ '选修课' }}
          </template>
        </el-table-column>
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
          label="课程号"
          align="center"
          color="black"
          width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.courseNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="课程名"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="学分"
          align="center"
          color="black"
          width="50"
        >
          <template slot-scope="scope">
            {{ scope.row.credit }}
          </template>
        </el-table-column>
        <el-table-column
          label="开课学期"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseTerm.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="所属学院"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeNameOfCourse.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="是否公选课"
          align="center"
          color="black"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.isPubSelectCourse.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="add1(scope.row.courseNum)">增加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="showBuxiuList1" class="table-container">
      <el-table
        :show-header="false"
        :data="buxiuList1"
        :span-method="objectSpanMethod5"
        border
        style="width: 100%;margin-top:-6px;border-top: solid 0px"
        size="mini"
      >
        <el-table-column
          label="类别"
          fixed="left"
          width="80"
          align="center"
          color="black"
        >
          <template>
            {{ '补修课' }}
          </template>
        </el-table-column>
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
          label="课程号"
          align="center"
          color="black"
          width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.courseNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="课程名"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="学分"
          align="center"
          color="black"
          width="50"
        >
          <template slot-scope="scope">
            {{ scope.row.credit }}
          </template>
        </el-table-column>
        <el-table-column
          label="开课学期"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseTerm.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="所属学院"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeNameOfCourse.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="是否公选课"
          align="center"
          color="black"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.isPubSelectCourse.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="add1(scope.row.courseNum)">增加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="tip" style="color: red;text-align: center">制定培养计划完毕，确保”培养计划课程“栏中课程无误后，无需提交，需联系导师审核通过后方可打印！</div>
    <div v-show="button1" align="center">
      <el-button type="primary" size="mini" @click="PublicCourse()">添加公共选修课</el-button>
      <el-button type="primary" size="mini" @click="AcrossCourse()">跨学院选课</el-button>
    </div>
  </div>
</template>

<script>
import { newPlanSelectCourse } from '@/api/cultivate'
import { studentSultivatePlanCourseDelete } from '@/api/cultivate'
import { studentSultivatePlanCourseAdd } from '@/api/cultivate'
import { acrossCourseQueryInit } from '@/api/cultivate'
import { publicCourseQueryDoQuery } from '@/api/cultivate'
import { newCultivateCourseDetail } from '@/api/cultivate'
import { newCultivateSelectPublicCourse } from '@/api/cultivate'
import { acrossCourseQueryDoQuery } from '@/api/cultivate'

export default {
  name: 'StudentSultivatePlanMaintainVue',
  data() {
    return {
      detileForm: {
        manageDepartment: '',
        courseState: '',
        remark: '',
        onComputerHour: '',
        teachingWay: {
          zh: ''
        },
        creatorName: {
          zh: ''
        },
        collegeName: '',
        courseType: '',
        courseName: {
          zh: '',
          en: ''
        },
        termCode: {
          zh: ''
        },
        teachingHour: '',
        credit: '',
        classHour: '',
        experimentHour: '',
        courseAttribute: {
          zh: ''
        },
        termCount: '',
        examType: {
          zh: ''
        },
        managerName: {
          zh: ''
        },
        basicFaceCode: {
          zh: ''
        },
        teachGroup: '',
        book: '',
        reference: '',
        preparatoryDemand: '',
        briefIntroduction: {
          zh: ''
        },
        subSpec: {
          zh: ''
        },
        collegeCheckAdvice: '',
        graduateCheckAdvice: '',
        achieveModelNum: {
          zh: ''
        },
        teachingWayCode: {
          zh: ''
        },
        teachLanguage: {
          zh: ''
        }
      },
      publiccourseTermList: [],
      acrosscourseTermList: [],
      PublicCourseForm: {
        courseNum: '',
        courseName: '',
        status: '主管部门审核通过',
        attribute: '公共选修课',
        courseTerm: '1'
      },
      AcrossCourseForm: {
        courseNum: '',
        courseName: '',
        status: '主管部门审核通过',
        courseTerm: '1',
        collegeList: [],
        collegeId: ''
      },
      courseTypeList: [
        {
          value: '选项1',
          label: '公共选修课'
        }
      ],
      courseStatus: [
        {
          value: '选项1',
          label: '主管部门审核通过'
        }
      ],
      showDetile1: false,
      showAcrossCourseQueryList: false,
      showPublicCourseQueryList: false,
      showPublicCourse: false,
      showAcrossCourse: false,
      button1: true,
      tip: true,
      planState: true,
      showCourseList11: false,
      showCourseList12: false,
      showCourseList13: false,
      showRequiredList1: false,
      showBuxiuList1: false,
      showOptionalList1: false,
      showMessage: false,
      showLesson: false,
      CourseList11: '', // 选的必修课
      CourseList12: '', // 选的选修课
      CourseList13: '', // 选的补修
      requiredList1: '', // 没选的必修
      buxiuList1: '', // 没选的补修
      optionalList1: '', // 没选的选秀
      message: '',
      courseTerm: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    return1() {
      this.showAcrossCourseQueryList = true
      this.showPublicCourseQueryList = true
      this.showDetile1 = false
    },
    showDetile(courseId) {
      newCultivateCourseDetail({ 'session': document.cookie, 'courseId': courseId }).then(res => {
        this.showPublicCourseQueryList = false
        this.showAcrossCourseQueryList = false
        this.showDetile1 = true
        this.detileForm = res.data
      })
    },
    addPublicCourse(courseId1) {
      newCultivateSelectPublicCourse({ 'session': document.cookie, 'courseId': courseId1 }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '添加成功',
            type: 'success',
            offset: '10'
          })
        }
        if (res.code === '1') {
          this.$message({
            message: res.msg,
            type: 'error',
            offset: '10'
          })
        }
      })
    },
    publicCourseQuery() {
      publicCourseQueryDoQuery({ 'session': document.cookie, 'classTerm': this.PublicCourseForm.courseTerm, 'courseNum': this.PublicCourseForm.courseNum, 'courseName': this.PublicCourseForm.courseName }).then(res => {
        if (res.code === '1') {
          this.$message({
            message: res.msg,
            type: 'error',
            offset: '10'
          })
        }
        this.showPublicCourseQueryList = false
        this.publiccourseTermList = res.data
        if (this.publiccourseTermList.length !== 0) {
          this.showPublicCourseQueryList = true
        }
      })
    },
    AcrossCourseQuery() {
      acrossCourseQueryDoQuery({ 'session': document.cookie, 'collegeId': this.AcrossCourseForm.collegeId, 'classTerm': this.AcrossCourseForm.courseTerm, 'courseNum': this.AcrossCourseForm.courseNum, 'courseName': this.AcrossCourseForm.courseName }).then(res => {
        if (res.code === '1') {
          this.$message({
            message: res.msg,
            type: 'error',
            offset: '10'
          })
        }
        this.showAcrossCourseQueryList = false
        this.acrosscourseTermList = res.data
        if (this.acrosscourseTermList.length !== 0) {
          this.showAcrossCourseQueryList = true
        }
      })
    },
    PublicCourse() {
      this.showCourseList11 = false
      this.showCourseList12 = false
      this.showCourseList13 = false
      this.showRequiredList1 = false
      this.showBuxiuList1 = false
      this.showOptionalList1 = false
      this.showLesson = false
      this.showMessage = false
      this.tip = false
      this.button1 = false
      this.showPublicCourse = true
      acrossCourseQueryInit({ 'session': document.cookie }).then(res => {
        this.courseTerm = res.data.courseTerm
      })
    },
    AcrossCourse() {
      this.showCourseList11 = false
      this.showCourseList12 = false
      this.showCourseList13 = false
      this.showRequiredList1 = false
      this.showBuxiuList1 = false
      this.showOptionalList1 = false
      this.showLesson = false
      this.showMessage = false
      this.tip = false
      this.button1 = false
      this.showAcrossCourse = true
      acrossCourseQueryInit({ 'session': document.cookie }).then(res => {
        this.courseTerm = res.data.courseTerm
        this.AcrossCourseForm.collegeList = res.data.collegeList
      })
    },
    fetchData() {
      this.showCourseList11 = false
      this.showCourseList12 = false
      this.showCourseList13 = false
      this.showRequiredList1 = false
      this.showBuxiuList1 = false
      this.showOptionalList1 = false
      this.showLesson = false
      this.showPublicCourse = false
      newPlanSelectCourse({ 'session': document.cookie }).then(res => {
        this.CourseList11 = res.data.planData.CourseList11
        this.CourseList12 = res.data.planData.CourseList12
        this.CourseList13 = res.data.planData.CourseList13

        if (res.data.planState === 1) {
          this.planState = false
        }

        if (this.CourseList11.length !== 0) {
          this.showCourseList11 = true
        }
        if (this.CourseList12.length !== 0) {
          this.showCourseList12 = true
        }
        if (this.CourseList13.length !== 0) {
          this.showCourseList13 = true
        }
        this.requiredList1 = res.data.schemeData.requiredList
        this.buxiuList1 = res.data.schemeData.buxiuList
        this.optionalList1 = res.data.schemeData.optionalList
        if (this.requiredList1.length !== 0) {
          this.showRequiredList1 = true
          this.showLesson = true
        }
        if (this.buxiuList1.length !== 0) {
          this.showBuxiuList1 = true
          this.showLesson = true
        }
        if (this.optionalList1.length !== 0) {
          this.showOptionalList1 = true
          this.showLesson = true
        }
        this.message = res.data.planData.message
        if (this.message.length !== 0) {
          this.showMessage = true
        }
      })
    },
    delete1(planCourseId) {
      studentSultivatePlanCourseDelete({ 'session': document.cookie, 'form': this.form, 'cultPlanId': planCourseId
      }).then(res => {
        if (res.code === '1') {
          this.$message({
            message: res.msg,
            type: 'error',
            offset: '10'
          })
        }
        if (res.code === '0') {
          this.$message({
            message: '删除成功',
            type: 'success',
            offset: '10'
          })
        }
        this.fetchData()
      })
    },
    add1(courseNum) {
      studentSultivatePlanCourseAdd({ 'session': document.cookie, 'form': this.form, 'courseNum': courseNum
      }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '添加成功',
            type: 'success',
            offset: '10'
          })
        }
        if (res.code === '1') {
          this.$message({
            message: res.msg,
            type: 'error',
            offset: '10'
          })
        }
        this.fetchData()
      })
    },
    objectSpanMethod1({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % this.CourseList11.length === 0) {
          return {
            rowspan: this.CourseList11.length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    objectSpanMethod2({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % this.CourseList12.length === 0) {
          return {
            rowspan: this.CourseList12.length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    objectSpanMethod3({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % this.CourseList13.length === 0) {
          return {
            rowspan: this.CourseList13.length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    objectSpanMethod4({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % this.requiredList1.length === 0) {
          return {
            rowspan: this.requiredList1.length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    objectSpanMethod5({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % this.buxiuList1.length === 0) {
          return {
            rowspan: this.buxiuList1.length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    objectSpanMethod6({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % this.optionalList1.length === 0) {
          return {
            rowspan: this.optionalList1.length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>
<style>
  * {
    margin: 0px;
    padding: 0px;
  }
</style>
