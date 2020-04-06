<template>
  <div class="app-container">
    <div class="query-container">
      学期
      <el-select v-model="termId" placeholder="请选择学期" style="width: 20%;">
        <el-option
          v-for="item in termList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      校区
      <el-select v-model="campusNum" placeholder="请选择校区" style="width: 20%;" @change="buildQuery">
        <el-option
          v-for="item in campusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      楼
      <el-select v-model="buildingId" placeholder="请选择楼" style="width: 20%;" @change="rooMQuery">
        <el-option
          v-for="item in buildingList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      教室
      <el-select v-model="roomId" placeholder="请选择教室" style="width: 20%;">
        <el-option
          v-for="item in roomList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" @click="doQuery">查询</el-button>
    </div>

    <div class="schedule" aria-labelledby="schedule-heading">
      <span class="track-slot" aria-hidden="true" style="grid-column: track-1; grid-row: tracks;">周一</span>
      <span class="track-slot" aria-hidden="true" style="grid-column: track-2; grid-row: tracks;">周二</span>
      <span class="track-slot" aria-hidden="true" style="grid-column: track-3; grid-row: tracks;">周三</span>
      <span class="track-slot" aria-hidden="true" style="grid-column: track-4; grid-row: tracks;">周四</span>
      <span class="track-slot" aria-hidden="true" style="grid-column: track-5; grid-row: tracks;">周五</span>
      <span class="track-slot" aria-hidden="true" style="grid-column: track-6; grid-row: tracks;">周六</span>
      <span class="track-slot" aria-hidden="true" style="grid-column: track-7; grid-row: tracks;">周天</span>
      <h2 class="time-slot" style="grid-row: time-1;">第一节</h2>
      <h2 class="time-slot" style="grid-row: time-2;">第二节</h2>
      <h2 class="time-slot" style="grid-row: time-3;">第三节</h2>
      <h2 class="time-slot" style="grid-row: time-4;">第四节</h2>
      <h2 class="time-slot" style="grid-row: time-5;">第五节</h2>
      <h2 class="time-slot" style="grid-row: time-6;">第六节</h2>
      <h2 class="time-slot" style="grid-row: time-7;">第七节</h2>
      <h2 class="time-slot" style="grid-row: time-8;">第八节</h2>
      <h2 class="time-slot" style="grid-row: time-9;">第九节</h2>
      <h2 class="time-slot" style="grid-row: time-10;">第十节</h2>

      <div v-for="event in courseList" :key="event.id" :style="genStyleObject2(event)" class="session track-3" @click="addSection(event)">
        <h3 class="session-title" />
        <span class="session-time" />
        <span class="session-presenter" />
        <span class="session-presenter" />
      </div>

      <div v-for="event in scheduleList" :key="event.courseNum" :style="genStyleObject(event)" class="session track-2" @click="editSection(event)">
        <h3 class="session-title">{{ event.courseName }}</h3>
        <span class="session-time">{{ genWeekTime(event) }}</span>
        <span class="session-presenter">课程号：{{ event.courseNum }}</span>
        <span class="session-presenter">教师：{{ event.teaName }}</span>
      </div>
    </div>

    <el-dialog title="修改课程" style="text-align: center;"  :visible.sync="dialogFormVisible" width="35%">
      <el-form :model="section">
        <el-form-item label="课程名称" label-width="200px">
          <el-input v-model="section.courseName"  :disabled="true" />
        </el-form-item>
        <el-form-item label="课程开始节次" label-width="200px">
          <el-input v-model="section.SectionStart"  />
        </el-form-item>
        <el-form-item label="课程节数" label-width="200px">
          <el-input v-model="section.SectionCount"  />
        </el-form-item>
        <el-form-item label="星期几" label-width="200px">
          <el-input v-model="section.sectionDay" />
        </el-form-item>
        <el-form-item label="任课教师" label-width="200px">
          <el-select v-model="section.teaId" placeholder="请选择教师" style="width: 100%">
            <el-option
              v-for="item in teacherList"
              :key="item.teaId"
              :label="item.teaName"
              :value="item.teaId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modify">修 改</el-button>
        <el-button type="danger" @click="deleteSection">删 除</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>


      <el-dialog title="添加课程" style="text-align: center" :visible.sync="dialogFormAddVisible" width="35%">
        <el-form :model="sectionAdd">
          <el-form-item label="课程列表" label-width="200px">
            <el-select v-model="sectionAdd.taskId" placeholder="请选择课程" style="width: 100%" @change="getTeacherlist">
              <el-option
                v-for="item in taskList"
                :key="item.taskId"
                :label="item.taskName"
                :value="item.taskId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="课程开始节次" label-width="200px">
            <el-input v-model="sectionAdd.SectionStart"  />
          </el-form-item>
          <el-form-item label="课程节数" label-width="200px" >
            <el-input v-model="sectionAdd.SectionCount"  />
          </el-form-item>
          <el-form-item label="星期几" label-width="200px">
            <el-input v-model="sectionAdd.sectionDay"  />
          </el-form-item>
          <el-form-item label="起始周" label-width="200px">
            <el-input v-model="sectionAdd.weekStart"  />
          </el-form-item>
          <el-form-item label="周数" label-width="200px">
            <el-input v-model="sectionAdd.weekCount"  />
          </el-form-item>
          <el-form-item label="是否单双周" label-width="200px">
            <el-radio v-model="sectionAdd.isOddorEvenWeek" label="0" size="mini" border>单周</el-radio>
            <el-radio v-model="sectionAdd.isOddorEvenWeek" label="1"  size="mini"  border>双周</el-radio>
          </el-form-item>
          <el-form-item label="任课教师" label-width="200px">
            <el-select v-model="sectionAdd.teaId" placeholder="请选择教师" style="width: 100%">
              <el-option
                v-for="item in teacherList"
                :key="item.teaId"
                :label="item.teaName"
                :value="item.teaId"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveSectionAdd">添加</el-button>
          <el-button @click="dialogFormAddVisible = false">取 消</el-button>
        </div>


    </el-dialog>
  </div>
</template>

<script>
import { collegeWorkOutTeachingScheduleInit } from '@/api/coursenew'
import { collegeWorkOutTeachingScheduleRoomList } from '@/api/coursenew'
import { collegeWorkOutTeachingScheduleScheduleList } from '@/api/coursenew'
import { collegeWorkOutTeachingScheduleTeaList } from '@/api/coursenew'
import { collegeWorkOutTeachingScheduleSave } from '@/api/coursenew'
import { collegeWorkOutTeachingScheduleDelete } from '@/api/coursenew'
import { collegeWorkOutTeachingScheduleAdd } from '@/api/coursenew'
export default {
  name: 'CollegeWorkOutTeachingSchedule',
  data() {
    return {
      dialogFormVisible: false,
      dialogFormAddVisible: false,
      teacherList: [],
      taskList: [],
      termId: '',
      termList: [],
      campusList: [],
      campusNum: '',
      buildingList: [],
      buildingId: '',
      roomList: [],
      roomId: '',
      scheduleList: [],
      section:
        {
          courseIndex: '',
          isOddorEvenWeek: '',
          weekCount: '',
          SectionCount: '',
          roomId: '',
          termId: '',
          courseName: '',
          teaName: '',
          weekStart: '',
          courseNum: '',
          SectionStart: '',
          sectionDay: '',
          scheduleId: '',
          taskId: '',
          isCanEdit: '',
          teaId: ''
        },
      sectionAdd:
        {
          courseIndex: '',
          isOddorEvenWeek: '',
          weekCount: '',
          SectionCount: '',
          roomId: '',
          termId: '',
          courseName: '',
          teaName: '',
          weekStart: '',
          courseNum: '',
          SectionStart: '',
          sectionDay: '',
          scheduleId: '',
          taskId: '',
          isCanEdit: '',
          teaId: ''
        },
      courseList: [{
        id: 1,
        start: '1',
        count: '1',
        dayOfWeek: 1
      },
      {
        id: 2,
        start: '2',
        count: '1',
        dayOfWeek: 1
      },
      {
        id: 3,
        start: '3',
        count: '1',
        dayOfWeek: 1
      },
      {
        id: 4,
        start: '4',
        count: '1',
        dayOfWeek: 1
      },
      {
        id: 5,
        start: '5',
        count: '1',
        dayOfWeek: 1
      },
      {
        id: 6,
        start: '6',
        count: '1',
        dayOfWeek: 1
      },
      {
        id: 7,
        start: '7',
        count: '1',
        dayOfWeek: 1
      },
      {
        id: 8,
        start: '8',
        count: '1',
        dayOfWeek: 1
      },
      {
        id: 9,
        start: '9',
        count: '1',
        dayOfWeek: 1
      },
      {
        id: 10,
        start: '10',
        count: '1',
        dayOfWeek: 1
      },
      {
        id: 11,
        start: '1',
        count: '1',
        dayOfWeek: 2
      },
      {
        id: 12,
        start: '2',
        count: '1',
        dayOfWeek: 2
      },
      {
        id: 13,
        start: '3',
        count: '1',
        dayOfWeek: 2
      },
      {
        id: 14,
        start: '4',
        count: '1',
        dayOfWeek: 2
      },
      {
        id: 15,
        start: '5',
        count: '1',
        dayOfWeek: 2
      },
      {
        id: 16,
        start: '6',
        count: '1',
        dayOfWeek: 2
      },
      {
        id: 17,
        start: '7',
        count: '1',
        dayOfWeek: 2
      },
      {
        id: 18,
        start: '8',
        count: '1',
        dayOfWeek: 2
      },
      {
        id: 19,
        start: '9',
        count: '1',
        dayOfWeek: 2
      },
      {
        id: 20,
        start: '10',
        count: '1',
        dayOfWeek: 2
      },
      {
        id: 21,
        start: '1',
        count: '1',
        dayOfWeek: 3
      },
      {
        id: 22,
        start: '2',
        count: '1',
        dayOfWeek: 3
      },
      {
        id: 23,
        start: '3',
        count: '1',
        dayOfWeek: 3
      },
      {
        id: 24,
        start: '4',
        count: '1',
        dayOfWeek: 3
      },
      {
        id: 25,
        start: '5',
        count: '1',
        dayOfWeek: 3
      },
      {
        id: 26,
        start: '6',
        count: '1',
        dayOfWeek: 3
      },
      {
        id: 27,
        start: '7',
        count: '1',
        dayOfWeek: 3
      },
      {
        id: 28,
        start: '8',
        count: '1',
        dayOfWeek: 3
      },
      {
        id: 29,
        start: '9',
        count: '1',
        dayOfWeek: 3
      },
      {
        id: 30,
        start: '10',
        count: '1',
        dayOfWeek: 3
      }, {
        id: 31,
        start: '1',
        count: '1',
        dayOfWeek: 4
      },
      {
        id: 32,
        start: '2',
        count: '1',
        dayOfWeek: 4
      },
      {
        id: 33,
        start: '3',
        count: '1',
        dayOfWeek: 4
      },
      {
        id: 34,
        start: '4',
        count: '1',
        dayOfWeek: 4
      },
      {
        id: 35,
        start: '5',
        count: '1',
        dayOfWeek: 4
      },
      {
        id: 36,
        start: '6',
        count: '1',
        dayOfWeek: 4
      },
      {
        id: 37,
        start: '7',
        count: '1',
        dayOfWeek: 4
      },
      {
        id: 38,
        start: '8',
        count: '1',
        dayOfWeek: 4
      },
      {
        id: 39,
        start: '9',
        count: '1',
        dayOfWeek: 4
      },
      {
        id: 40,
        start: '10',
        count: '1',
        dayOfWeek: 4
      },
      {
        id: 41,
        start: '1',
        count: '1',
        dayOfWeek: 5
      },
      {
        id: 42,
        start: '2',
        count: '1',
        dayOfWeek: 5
      },
      {
        id: 43,
        start: '3',
        count: '1',
        dayOfWeek: 5
      },
      {
        id: 44,
        start: '4',
        count: '1',
        dayOfWeek: 5
      },
      {
        id: 45,
        start: '5',
        count: '1',
        dayOfWeek: 5
      },
      {
        id: 46,
        start: '6',
        count: '1',
        dayOfWeek: 5
      },
      {
        id: 47,
        start: '7',
        count: '1',
        dayOfWeek: 5
      },
      {
        id: 48,
        start: '8',
        count: '1',
        dayOfWeek: 5
      },
      {
        id: 49,
        start: '9',
        count: '1',
        dayOfWeek: 5
      },
      {
        id: 50,
        start: '10',
        count: '1',
        dayOfWeek: 5
      }, {
        id: 51,
        start: '1',
        count: '1',
        dayOfWeek: 6
      },
      {
        id: 52,
        start: '2',
        count: '1',
        dayOfWeek: 6
      },
      {
        id: 53,
        start: '3',
        count: '1',
        dayOfWeek: 6
      },
      {
        id: 54,
        start: '4',
        count: '1',
        dayOfWeek: 6
      },
      {
        id: 55,
        start: '5',
        count: '1',
        dayOfWeek: 6
      },
      {
        id: 56,
        start: '6',
        count: '1',
        dayOfWeek: 6
      },
      {
        id: 57,
        start: '7',
        count: '1',
        dayOfWeek: 6
      },
      {
        id: 58,
        start: '8',
        count: '1',
        dayOfWeek: 6
      },
      {
        id: 59,
        start: '9',
        count: '1',
        dayOfWeek: 6
      },
      {
        id: 60,
        start: '10',
        count: '1',
        dayOfWeek: 6
      }, {
        id: 61,
        start: '1',
        count: '1',
        dayOfWeek: 7
      },
      {
        id: 62,
        start: '2',
        count: '1',
        dayOfWeek: 7
      },
      {
        id: 63,
        start: '3',
        count: '1',
        dayOfWeek: 7
      },
      {
        id: 64,
        start: '4',
        count: '1',
        dayOfWeek: 7
      },
      {
        id: 65,
        start: '5',
        count: '1',
        dayOfWeek: 7
      },
      {
        id: 66,
        start: '6',
        count: '1',
        dayOfWeek: 7
      },
      {
        id: 67,
        start: '7',
        count: '1',
        dayOfWeek: 7
      },
      {
        id: 68,
        start: '8',
        count: '1',
        dayOfWeek: 7
      },
      {
        id: 69,
        start: '9',
        count: '1',
        dayOfWeek: 7
      },
      {
        id: 70,
        start: '10',
        count: '1',
        dayOfWeek: 7
      }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    genStyleObject2: (event) => {
      var star = parseInt(event.start) + parseInt(event.count)
      return {
        'grid-column': 'track-' + event.dayOfWeek,
        'grid-row': 'time-' + event.start + ' / time-' + star.toString()
      }
    },
    genStyleObject: (event) => {
      var star = event.SectionStart + event.SectionCount
      return {
        'grid-column': 'track-' + event.sectionDay.toString(),
        'grid-row': 'time-' + event.SectionStart.toString() + ' / time-' + star.toString()
      }
    },
    genWeekTime: (event)=> {
     var star = event.weekStart + event.weekCount - 1
     return '第' + event.weekStart.toString() + ' - ' + star.toString() + '周'
    },
    genClassTime: (event) => {
      var star = event.SectionStart + event.SectionCount - 1
      return '第' + event.SectionStart.toString() + ' - ' + star.toString() + '节'
    },
    fetchData() {
      collegeWorkOutTeachingScheduleInit({ 'session': document.cookie }).then(res => {
        this.termId = res.data.termId.toString()
        this.termList = res.data.termList
        this.campusList = res.data.campusList
        this.campusNum = res.data.campusNum.toString()
        this.buildingList = res.data.buildingList
        this.buildingId = res.data.buildingId.toString()
        this.roomList = res.data.roomList
        this.roomId = res.data.roomId.toString()
        this.scheduleList = res.data.scheduleList
      })
    },
    doQuery() {
      collegeWorkOutTeachingScheduleScheduleList({ 'session': document.cookie, 'termId': this.termId, 'roomId': this.roomId }).then(res => {
        this.scheduleList = res.data
      })
    },
    buildQuery() {
      collegeWorkOutTeachingScheduleRoomList({ 'session': document.cookie, 'termId': this.termId, 'campusNum': this.campusNum }).then(res => {
        this.buildingList = res.data.buildingList
        this.buildingId = res.data.buildingId.toString()
        this.roomList = res.data.roomList
        this.roomId = res.data.roomId.toString()
      })
    },
    rooMQuery() {
      collegeWorkOutTeachingScheduleRoomList({ 'session': document.cookie, 'buildingId': this.buildingId }).then(res => {
        this.roomList = res.data.roomList
        this.roomId = res.data.roomId.toString()
      })
    },
    getTeacherlist(){
      collegeWorkOutTeachingScheduleTeaList({ 'session': document.cookie, 'taskId': this.sectionAdd.taskId }).then(res => {
        this.teacherList = res.data
        this.sectionAdd.teaId = ''
      })
    },
    editSection(event) {
      collegeWorkOutTeachingScheduleTeaList({ 'session': document.cookie, 'taskId': event.taskId }).then(res => {
        this.dialogFormVisible = true
        this.section = event
        this.teacherList = res.data
      })
    },
    addSection(event){
      collegeWorkOutTeachingScheduleAdd({ 'session': document.cookie, 'termId': this.termId }).then(res => {
         this.dialogFormAddVisible = true
        this.sectionAdd.SectionStart = parseInt(event.start)
        this.sectionAdd.sectionDay = parseInt(event.dayOfWeek)
        this.sectionAdd.SectionCount = parseInt(event.count)
        this.taskList = res.data
      })
    },
    modify() {

      collegeWorkOutTeachingScheduleSave({ 'session': document.cookie, 'form': this.section}).then(res => {
        this.dialogFormVisible = false
        this.doQuery()
        if(res.code === '0'){
          this.$message({
            message: '修改成功',
            type: 'success',
            offset: '10'
          });
        }
      })
    },
    saveSectionAdd(){
      // dialogFormAddVisible = false
      this.sectionAdd.termId = this.termId
      this.sectionAdd.roomId = this.roomId
      collegeWorkOutTeachingScheduleSave({ 'session': document.cookie, 'form': this.sectionAdd}).then(res => {
        this.dialogFormAddVisible = false
        this.doQuery()
        if(res.code === '0'){
          this.$message({
            message: '添加成功',
            type: 'success',
            offset: '10'
          });
        }else {
          this.$message({
            message: '添加失败',
            type: 'warning'
          });
        }
      })
    },
    deleteSection(){
      this.$confirm('确认删除课程吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        collegeWorkOutTeachingScheduleDelete({ 'session': document.cookie, 'scheduleId': this.section.scheduleId}).then(res => {
          this.dialogFormVisible = false
          this.doQuery()
          if(res.code === '0'){
            this.$message({
              message: '删除成功',
              type: 'success',
              offset: '10'
            });
          }else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消删除'
        });
      });

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/calendar.css">
</style>
