<template>
  <div class="app-container">
    <div class="query-container">
      学期
      <el-select v-model="termId" placeholder="请选择学期" style="width: 20%;" @change="getTasklist" >
        <el-option
          v-for="item in termList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" @click="doQuery">查询</el-button>
    </div>
  <div class="app-container">
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

      <div v-for="event in courseList" :key="event.id" :style="genStyleObject2(event)" class="session track-3">
        <h3 class="session-title" />
        <span class="session-time" />
        <span class="session-presenter" />
        <span class="session-presenter" />
      </div>

      <div v-for="event in scheduleList" :key="event.courseNum" :style="genStyleObject(event)" class="session track-1"  >
        <span class="session-presenterc" style="color: #1f2d3d">{{ event.courseName}}({{ event.courseIndex}})</span>
        <span class="session-presenterc" style="color: #1f2d3d">{{ event.teaName }}</span>
        <span class="session-presenterc" style="color: #1f2d3d">{{ event.roomName }}</span>
        <span class="session-presenterc" style="color: #1f2d3d">{{ genWeekTime(event) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { studentViewTeachingSchedule } from '@/api/coursenew'
import { studentViewTeachingScheduleQuery } from '@/api/coursenew'
export default {
  name: 'studentViewTeachingSchedule',
  data() {
    return {
      scheduleList: [],
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
      ],
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
      var star = event.sectionStart + event.sectionCount
      return {
        'grid-column': 'track-' + event.sectionDay.toString(),
        'grid-row': 'time-' + event.sectionStart.toString() + ' / time-' + star.toString()
      }
    },
    genWeekTime: (event)=> {
     var star = event.weekStart + event.weekCount - 1
     return '第' + event.weekStart.toString() + ' - ' + star.toString() + '周'
    },
    genClassTime: (event) => {
      var star = event.sectionStart + event.sectionCount - 1
      return '第' + event.sectionStart.toString() + ' - ' + star.toString() + '节'
    },
    fetchData() {
      studentViewTeachingSchedule({ 'session': document.cookie }).then(res => {
        this.termId = res.data.termId
        this.termList = res.data.termList
        this.scheduleList = res.data.scheduleList
        console.log(this.scheduleList)
      })
    },
    doQuery() {
      studentViewTeachingScheduleQuery({ 'session': document.cookie, 'termId': this.termId }).then(res => {
        this.scheduleList = res.data
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/calendar.css">
</style>

