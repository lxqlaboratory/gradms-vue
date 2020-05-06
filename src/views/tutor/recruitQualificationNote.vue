<template>
  <div class="app-container">
    <div >
      <table class="content" >
        <tr>
          <td colspan="1"  >特殊类型</td>
          <td colspan="1"  >
            <el-select v-model="outstandingType" placeholder="请选择申请类型"   >
              <el-option
                v-for="item in outstandingTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
        </tr>
        <tr>
          <td colspan="1" >合作导师</td>
          <td colspan="1"   >
            <el-select v-model="coPersonId" filterable placeholder="请选择兼职博导的合作老师">
                <el-option
                  v-for="item in coPersonList"
                  :key="item.personId"
                  :label="item.perName"
                  :value="item.personId"
                />
            </el-select>
          </td>
        </tr>
        <tr>
          <td colspan="1" >备注</td>
          <td colspan="1"  >
            <el-input v-model="note"  placeholder="请输入人才，兼职外其他备注"    />
          </td>
        </tr>
      </table>
    </div>
    <div align="center"  >
        <el-button  type="primary" @click="doSubmit">提交</el-button>
        <el-button  type="primary" @click="doEmpty">清空</el-button>
        <el-button  type="primary" @click="doReturn">返回</el-button>
    </div>
  </div>
</template>

<script>
import { recruitQualificationNote } from '@/api/tutor'
import { recruitQualificationNoteSubmit } from '@/api/tutor'
import { recruitQualificationNoteEmpty } from '@/api/tutor'
export default {
  name: 'recruitQualificationNote',
  data() {
    return {
      applyId:null,
      coPersonId: null,
      outstandingType:'',
      note: '',
      outstandingTypeList: [],
      coPersonList:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.applyId = this.$route.query.applyId 
      recruitQualificationNote({ 'session': document.cookie, 'applyId':this.applyId}).then(res => {
        this.coPersonId = res.data.coPersonId
        this.outstandingType = res.data.outstandingType
        this.note = res.data.note
        this.outstandingTypeList = res.data.outstandingTypeList
        this.coPersonList = res.data.coPersonList
      })
    },
    doSubmit() {
      recruitQualificationNoteSubmit({ 'session': document.cookie, 'applyId':this.applyId, 'coPersonId':this.coPersonId, 'outstandingType':this.outstandingType, 'note':this.note }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '提交成功',
            type: 'success',
            offset: '10'
          })
        }
      })
    },
    doEmpty() {
      recruitQualificationNoteEmpty({ 'session': document.cookie, 'applyId': this.applyId, 
      }).then(res => {
          this.$message({
            message: '设置成功',
            type: 'success',
            offset: '10'
          })
        this.coPersonId = null
        this.outstandingType = null
        this.note = ''
      })
    },
    doReturn() {
      this.$router.push({ path: '/tutor/recruitQualificationCheck'})
    }
  }
}
</script>
