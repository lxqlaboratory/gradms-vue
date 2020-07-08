<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="6" style="font-size: 16px;font-weight: bold;color: #304156 ">培养方案信息</td>
      </tr>
      <tr>
        <td colspan="1">方案名称</td>
        <td colspan="1">
          <el-input v-model="form.schemeName" placeholder="请输入方案名称" />
        </td>
        <td colspan="1">学生类型</td>
        <td colspan="1">
          <el-select v-model="form.stuTypeCode" placeholder="请选择学生类型" @change="onStuTypeChange()" style="width: 100%">
            <el-option
              v-for="item in stuTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </td>
        <td colspan="1">所属专业</td>
        <td colspan="1">
          <el-select v-model="form.majorId" placeholder="请选择所属专业" style="width: 100%">
            <el-option
              v-for="item in majorList"
              :key="item.majorId"
              :label="item.majorName"
              :value="item.majorId"
            />
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="1" style="width: 10%">起始时间</td>
        <td colspan="1" >
          <el-date-picker
            v-model="form.startTime"
            size="mini"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间"
          />
        </td>
          <td colspan="1">必修学分</td>
        <td colspan="1">
          <el-input v-model="form.compulsoryCredit" placeholder="请输入必修学分" />
        </td>
        <td colspan="1">总学分</td>
        <td colspan="1">
          <el-input v-model="form.totalCredit" placeholder="请输入总学分" />
        </td>
      </tr>
      <tr>
        <td  colspan="6" style="text-align: left;width: 100%;" >培养目标</td>
      </tr>
      <tr>
        <td  colspan="6">
            <textarea placeholder="请输入培养目标" maxlength="1000"  v-model="form.goal" style="width: 100%;height:60px"/>
        </td>
      </tr>
      <tr>
        <td style="text-align: left;width: 100%;" colspan="6" >研究生方向/领域简介</td>
      </tr>
      <tr>
        <td colspan="6">
            <textarea placeholder="请输入研究生方向/领域简介" maxlength="1000"  v-model="form.direction" style="width: 100%;height:60px"/>

        </td>
      </tr>
      <tr>
        <td style="text-align: left;width: 100%;" colspan="6" >培养方式</td>
      </tr>
      <tr>
        <td colspan="6">
            <textarea placeholder="请输入学习年限" maxlength="1000"  v-model="form.culWay" style="width: 100%;height:60px"/>

        </td>
      </tr>
      <tr>
        <td style="text-align: left;width: 100%;" colspan="6" >学习年限</td>
      </tr>
      <tr>
        <td colspan="6">
            <textarea placeholder="请输入学习年限" maxlength="1000"  v-model="form.studyYears" style="width: 100%;height:60px"/>

        </td>
      </tr>
      <tr>
        <td style="text-align: left;width: 100%;" colspan="6" >应修总学分与课程设置</td>
      </tr>
      <tr>
        <td colspan="6">
            <textarea placeholder="请输入应修总学分与课程设置" maxlength="1000"  v-model="form.creditReq" style="width: 100%;height:60px"/>

        </td>
      </tr>
      <tr v-for="item in sessionList"  >
        <td  colspan="1" style="text-align: left">
          <el-checkbox  v-model.number="item.isSelect" >
          前沿讲座<br>
            2.0学分
          </el-checkbox>
        </td>
        <td colspan="5"  >
          <textarea placeholder="请输入培养环节" maxlength="1000"  v-model="item.content" style="width: 100%;height:60px"/>

        </td>
      </tr>
      <tr v-if="isProMaster" >
        <td style="text-align: left;width: 100%;" colspan="6" >专业实习</td>
      </tr>
      <tr  v-if="isProMaster" >
        <td colspan="6">
            <textarea placeholder="请输入专业实习" maxlength="1000"  v-model="form.practice" style="width: 100%;height:60px"/>

        </td>
      </tr>
      <tr>
        <td style="text-align: left;width: 100%;" colspan="6" >中期考核</td>
      </tr>
      <tr>
        <td colspan="6">
            <textarea placeholder="请输入中期考核" maxlength="1000"  v-model="form.middleCheck" style="width: 100%;height:60px"/>

        </td>
      </tr>
      <tr>
        <td style="text-align: left;width: 100%;" colspan="6"> 科学研究与学位论文</td>
      </tr>
      <tr>
        <td colspan="6">
            <textarea placeholder="请输入科学研究与学位论文" maxlength="1000"  v-model="form.thesis" style="width: 100%;height:60px"/>

        </td>
      </tr>
      <tr>
        <td style="text-align: left;width: 100%;" colspan="6"> 毕业及学位授予</td>
      </tr>
      <tr>
        <td colspan="6">
            <textarea placeholder="请输入毕业及学位授予" maxlength="1000"  v-model="form.gradDegree" style="width: 100%;height:60px"/>

        </td>
      </tr>
      <tr>
        <td style="text-align: left;width: 100%;" colspan="6">参考文献</td>
      </tr>
      <tr>
        <td colspan="6">
            <textarea placeholder="请输入参考文献" maxlength="1000"  v-model="form.literature" style="width: 100%;height:60px"/>

        </td>
      </tr>
      <tr>
        <td style="text-align: left;width: 100%;" colspan="6">备注</td>
      </tr>
      <tr>
        <td colspan="6">
            <textarea placeholder="请输入备注" maxlength="1000"  v-model="form.remark" style="width: 100%;height:60px"/>

        </td>
      </tr>

    </table>

    <div align="center">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { newCultivateSchemeInsert } from '@/api/cultivate'
import { newCultivateSchemeStuTypeChange } from '@/api/cultivate'
import { newCultivateSchemeSubmit } from '@/api/cultivate'
export default {
  name: 'newCultivateSchemeInsert',
  data() {
    return {
      form: {
        majorId: '',
        schemeName: '',
        stuTypeCode: '',
        startTime:'',
        compulsoryCredit: '',
        totalCredit: '',
        goal:'',
        direction:'',
        studyYears:'',
        practice:'',
        middleCheck:'',
        thesis:'',
        gradDegree:'',
        literature:'',
        note:''
      },
      schemeId:'',
      stuTypeList: [],
      majorList: [],
      sessionList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
        this.schemeId = this.$route.query.schemeId
      newCultivateSchemeInsert({ 'session': document.cookie, 'schemeId': this.schemeId }).then(res => {
        this.form = res.data.form
        this.stuTypeList = res.data.stuTypeList
        this.majorList = res.data.majorList
        this.sessionList = res.data.sessionList
      })
    },
    onStuTypeChange() {
      newCultivateSchemeStuTypeChange({ 'session': document.cookie, 'stuTypeCode':this.form.stuTypeCode }).then(res => {
        this.majorList = res.data.majorList
        this.sessionList = res.data.sessionList
      })
    },

    submit() {
      if(this.form.stuTypeCode === 'undefied' || this.form.stuTypeCode===''){
          this.$message({
            message: '请选择学生类别',
            type: 'warning',
            offset: '10'
          })
			}else if(this.form.majorId === 'undefied' || this.form.majorId <0){
          this.$message({
            message: '请选择所属专业！',
            type: 'warning',
            offset: '10'
          })
			}else if(this.form.shemeName === 'undefied' || this.form.shemeName ===''){
          this.$message({
            message: '请输入培养方案名称！',
            type: 'warning',
            offset: '10'
          })
			}else if(this.form.startTime === 'undefied' || this.form.startTime===''){
          this.$message({
            message: '请输方案入开始时间！',
            type: 'warning',
            offset: '10'
          })
			}else {
        newCultivateSchemeSubmit({ 'session': document.cookie, 'schemeId': this.schemeId,'form': this.form,'sessionList':this.sessionList
        }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '提交成功',
              type: 'success',
              offset: '10'
            })
            this.schemeId = res.data;
          }
        })
      }
    },
  }
}
</script>
<style lang="scss">
  .el-checkbox {
    color: #333333;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-right: 30px;
  .el-checkbox__input {
    cursor: pointer;
    outline: 0;
    line-height: 1;
    vertical-align: 15px;
  }
  }
</style>
