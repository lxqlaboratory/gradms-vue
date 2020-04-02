<template>
    <div class="app-container">
      <div class="query-container">
        学期
        <el-select v-model="termId" placeholder="请选择学期"  style="width: 20%;" >
          <el-option
            v-for="item in termList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        校区
        <el-select v-model="campusNum" placeholder="请选择校区"  style="width: 20%;" @change="buildQuery">
          <el-option
            v-for="item in campusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        楼
        <el-select v-model="buildingId" placeholder="请选择楼"  style="width: 20%;" >
          <el-option
            v-for="item in buildingList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        教室
        <el-select v-model="roomId" placeholder="请选择教室"  style="width: 20%;" >
          <el-option
            v-for="item in roomList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" @click="doQuery" >查询</el-button>
      </div>
    </div>
</template>

<script>
  import { collegeWorkOutTeachingScheduleInit } from '@/api/coursenew'
  import { collegeWorkOutTeachingScheduleRoomList } from '@/api/coursenew'
export default {
    name: 'collegeWorkOutTeachingSchedule',
    data() {
    return {
      termId: '',
      termList: [],
      campusList: [],
      campusNum: '',
      buildingList: [],
      buildingId: '',
      roomList: [],
      roomId: '',
      scheduleList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
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
    doQuery(){

    },
    buildQuery(){
      collegeWorkOutTeachingScheduleRoomList({ 'session': document.cookie ,'termId':this.termId,'campusNum':this.campusNum}).then(res => {
        this.buildingList = res.data.buildingList
        this.buildingId = res.data.buildingId.toString()
        this.roomList = res.data.roomList
        this.roomId = res.data.roomId.toString()
        this.scheduleList = res.data.scheduleList
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
