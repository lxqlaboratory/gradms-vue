<template>
  <div class="app-container">
    <div class="query-container">
      类别
      <el-select v-model="form.configId" placeholder="请选择配置类型" @change="doQuery()" class="filter-item" style="width: 20%;">
        <el-option
          v-for="item in configList"
          :key="item.cofigId"
          :label="item.configName"
          :value="item.configId">
        </el-option>
      </el-select>
    </div>
    <div>
    <table class="content">
      <tr>
        <td colspan="4" style="font-size: 16px;font-weight: bold;color: #304156 ">评阅配置信息</td>
      </tr>
      <tr>
        <td colspan="1" >评审名称</td>
        <td colspan="1">
          <el-input v-model="form.configName" placeholder="请输入评审名称" ></el-input>
        </td>
        <td colspan="1" >评阅类型</td>
        <td colspan="1"  >
          <span v-for="(item,index) in reviewTypes" :key="item.id" >
            <input v-model="form.reviewType" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index)" type="radio">
               {{item.label}}
          </span>
        </td>
      </tr>
      <tr>
        <td colspan="1" >学位授予进程</td>
        <td colspan="1">
          <el-select v-model="form.proId" placeholder="请选择学位授予进程" style="width: 100% ">
            <el-option
              v-for="item in proList"
              :key="item.proId"
              :label="item.proName"
              :value="item.proId">
            </el-option>
          </el-select>
        </td>
        <td colspan="1" >学生类型</td>
        <td colspan="1">
          <el-select v-model="form.stuTypes"  placeholder="请选择学生类型" style="width: 100%">
            <el-option
              v-for="item in stuTypesList"
              :key="item.stuTypes"
              :label="item.stuTypeNames"
              :value="item.stuTypes">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="1" >内审送审分数</td>
        <td colspan="1">
          <el-input v-model.number="form.inViewCount" placeholder="请输入内审送审分数" ></el-input>
        </td>
        <td colspan="1" >内审评阅费</td>
        <td colspan="1">
          <el-input v-model.number="form.inViewFee" placeholder="请输入内审评阅费" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >外审送审分数</td>
        <td colspan="1">
          <el-input v-model.number="form.outViewCount" placeholder="请输入外审送审分数" ></el-input>
        </td>
        <td colspan="1" >外审评阅费</td>
        <td colspan="1">
          <el-input v-model.number="form.outViewFee" placeholder="请输入外审评阅费" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >学生论文上传开始时间</td>
        <td colspan="1">
            <el-date-picker
              v-model="form.studentUploadStartTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择学生论文上传开始时间">
            </el-date-picker>
        </td>
        <td colspan="1" >学生论文上传结束时间</td>
        <td colspan="1">
            <el-date-picker
              v-model="form.studentUploadEndTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择学生论文上传结束时间">
            </el-date-picker>
        </td>
      </tr>
      <tr>
        <td colspan="1" >导师审核开始时间</td>
        <td colspan="1">
            <el-date-picker
              v-model="form.tutorCheckStartTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择导师审核开始时间">
            </el-date-picker>
        </td>
        <td colspan="1" >导师审核结束时间</td>
        <td colspan="1">
            <el-date-picker
              v-model="form.tutorCheckEndTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择导师审核结束时间">
            </el-date-picker>
        </td>
      </tr>
      <tr>
        <td colspan="1" >专家评阅开始时间</td>
        <td colspan="1">
            <el-date-picker
              v-model="form.expertViewStartTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择专家评阅开始时间">
            </el-date-picker>
        </td>
        <td colspan="1" >专家评阅结束时间</td>
        <td colspan="1">
            <el-date-picker
              v-model="form.expertViewEndTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择专家评阅结束时间">
            </el-date-picker>
        </td>
      </tr>
      <tr>
        <td colspan="1" >学生查看开始时间</td>
        <td colspan="1">
            <el-date-picker
              v-model="form.studentViewStartTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择专家评阅开始时间">
            </el-date-picker>
        </td>
        <td colspan="1" >学生查看结束时间</td>
        <td colspan="1">
            <el-date-picker
              v-model="form.studentViewEndTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择专家评阅结束时间">
            </el-date-picker>
        </td>
      </tr>
        <td>
          <el-checkbox label="是否需要导师审核" v-model="form.isTutorCheck" />
       </td>
        <td>
          <el-checkbox label="是否需要专家完善信息" v-model="form.isExpertInfoFill" />
       </td>
        <td colspan="2">
          <el-checkbox label="是否需要跨部门评审" v-model="form.isNotDepartment" />
       </td>
      <tr>
        <td colspan="1" >评阅说明</td>
        <td colspan="3">
          <el-input v-model="form.reviewDes" placeholder="请输入评阅说明" ></el-input>
        </td>
      </tr>
      <tr>
      </tr>
    </table>
    <div align="center">
      <el-button type="primary" @click="doAddnew()" >添加新的评审</el-button>
      <el-button type="primary" @click="submit" >修改保存</el-button>
    </div>
  </div>
  </div>
</template>

<script>
import { thesisReviewConfigManage } from '@/api/thesisreview'
import { thesisReviewConfigQuery } from '@/api/thesisreview'
import { thesisReviewConfigSubmit } from '@/api/thesisreview'
export default {
  name: 'thesisReviewConfigManage',
  data() {
    return {
      form: {
        configId:-1,
        proId:-1,
        configName:'',
        reviewType:'1',
	      stuTypes:'',
      	inViewCount:-1,
	      inViewFee:-1,
	      outViewCount:-1,
	      outViewFee:-1,
	      studentUploadStartTime:'',
	      studentUploadEndTime:'',
	      tutorCheckStartTime:'',
      	tutorCheckEndTime:'',
	      expertViewStartTime:'',
	      expertViewEndTime:'',
	      studentViewStartTime:'',
	      studentViewEndTime:'',
        reviewDes:'',
        inNotFax:0,
        outNotFax:0,
        distributeApi:'',
        isTutorCheck:false,
        isExpertInfoFill:false,
        isNotDepartment:false
      },
      reviewTypes:[
      {
        label: '正式评审',
        value:'1',
        isChecked: true,
      },
      {
        label: '论文预审',
        value:'2',
        isChecked: false,
      }
      ],
      proList:[],
      stuTypesList:[],
      configList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      thesisReviewConfigManage({ 'session': document.cookie }).then(res => {
        this.form = res.data.form
        this.stuTypesList = res.data.stuTypesList
        this.proList = res.data.proList
        this.configList = res.data.configList;
      })
    },
    doQuery() {
      thesisReviewConfigQuery({ 'session': document.cookie,'configId':this.configId}).then(res => {
        this.form = res.data.form
      })
    },
    doAddnew() {
      this.$confirm('确认要增加一个新的在线评审过程吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        thesisReviewConfigSubmit({'session': document.cookie , 'form': this.form,'isAdd':true
      }).then(res => {
         this.$message({
           message: '添加成功',
           type: 'success',
           offset: '10'
         });
         console.log(res.data)
          this.form.configId = res.data.configId
          this.configList = res.data.configList;
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消添加'
        });
      });
    },
    submit(){
      thesisReviewConfigSubmit({'session': document.cookie , 'form': this.form,'isAdd':false
      }).then(res => {
       if(res.code === '0'){
         this.$message({
           message: '提交成功',
           type: 'success',
           offset: '10'
         });
       }
      })
    },
    check(index) {
      // 先取消所有选中项
      this.reviewTypes.forEach((item) => {
        item.isChecked = false;
      });
      //再设置当前点击项选中
      this.form.reviewType = this.reviewTypes[index].value;
      // 设置值，以供传递
      this.reviewTypes[index].isChecked = true;
      console.log(this.form.reviewType);
    }
  }
}
</script>
