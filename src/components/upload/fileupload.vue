<template>
  <div>
    <el-upload
      style="margin-left: 3px;"
      :action="baseUrl+url"
      :multiple="false"
      :data="data"
      :show-file-list="true"
      :accept="accepttype"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-remove="remove"
      :limit="limitnum"
      :on-preview="onPreview"
    >
      <el-button size="small" class="styleBtn">
        <slot />
      </el-button>
      <div slot="tip" class="el-upload__tip">{{ remarks }}</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'Fileupload',
  props: {
    limitnum: {
      type: Number,
      default: function() {
        return 1
      }
    },
    accepttype: {
      type: String,
      default: function() {
        return ''
      }
    },
    data: {
      type: Object,
      default: function() {
        return ''
      }
    },
    url: {
      type: String,
      default: function() {
        return ''
      }
    },
    remarks: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API
    }
  },
  methods: {
    onPreview: function(file) {
      this.$emit('preview', file)
    },
    remove: function(file) {
      console.log(file)
    },
    uploadSuccess(response, file, fileList) {
      this.$emit('successcallback', response, file)
    },
    uploadError(err, file, fileList) {
      console.log(err)
      this.$message({
        type: 'error',
        message: '上传失败，请检查网络'
      })
    }
  }
}
</script>

<style scoped>
  .styleBtn{
    background-color:transparent;
    color: #336699;
    border:  1px solid rgb(64,158,255);
    padding: 7px 6px;
    margin-left: 0px !important;
  }

</style>
