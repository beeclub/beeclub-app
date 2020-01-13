<template>
  <div class="page-container">
    <div class="page-panel">
      <!-- <el-steps :active="active" finish-status="finish" simple>
        <el-step title="课程信息" icon="el-icon-edit"></el-step>
        <el-step title="价格" icon="el-icon-edit"></el-step>
        <el-step title="装修" icon="el-icon-picture"></el-step>
      </el-steps>-->
      <div>
        <h3>基本信息</h3>
        <div>
          <el-form @submit.native.prevent label-width="120px">
            <el-form-item label="课程类别" required>
              <!-- @change="handleChange" -->
              <el-cascader
                v-model="courseForm.category"
                style="width:50%;"
                :props="{value:'id',label:'name'}"
                :options="courseCategoryTree"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="标题" required>
              <el-input placeholder="标题" v-model="courseForm.title" clearable style="width:60%;"></el-input>
            </el-form-item>
            <el-form-item label="副标题标题" required>
              <el-input placeholder="副标题标题" v-model="courseForm.subhead" clearable></el-input>
            </el-form-item>
            <el-form-item label="描述" required>
              <el-input placeholder="描述" type="textarea" v-model="courseForm.description" clearable></el-input>
            </el-form-item>
            <el-form-item label="课程图片" required>
              <!-- drag -->
              <el-upload
                class="upload-demo"
                :action="uploadUrl"
                :headers="uploadHeaders"
                :file-list="fileList"
                :on-success="handleUploadSuccess"
                list-type="picture"
                :limit="fileLimitNum"
                :on-exceed="handleUploadExceed"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">点击上传图片
                  <!-- <div v-if="courseForm.thumb">
                    <img :src="courseForm.thumb" class="uploaded-img" alt="" srcset="">
                  </div>
                  <div v-else>
                    将文件拖到此处，或
                    <em>点击上传</em>
                  </div>-->
                </div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb,最多{{fileLimitNum}}个文件</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <el-divider></el-divider>
      </div>
      <div>
        <h3>属性</h3>
        <el-form @submit.native.prevent label-width="120px" :inline="true">
          <el-form-item label="时长" required>
            <el-input placeholder="时长" v-model="courseForm.duration" clearable :min="0.75" style="width:200px;">
              <template slot="append">h</template>
            </el-input>
          </el-form-item>
          <el-form-item label="周期" required>
            <el-input-number v-model="courseForm.perid"></el-input-number>
          </el-form-item>
          <el-form-item label="周期类型" required>
            <el-select v-model="courseForm.periodType" placeholder="请选择">
              <el-option
                v-for="item in periodTypeList"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上线时间" required>
            <el-date-picker v-model="courseForm.onlineTime" type="datetime" placeholder="上线时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="排序" required>
            <el-input-number v-model="courseForm.sort" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="标签">
            <el-select
              v-model="courseForm.tags"
              multiple
              filterable
              allow-create
              placeholder="请选择标签"
            >
              <el-option
                v-for="tag in tags"
                :key="tag"
                :label="tag"
                :value="tag"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度等级" required>
            <el-rate
              v-model="courseForm.difficultyLevel"
              show-text
              :texts="['入门','简单','中等','高级','大师']"
            ></el-rate>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
      </div>
      <div>
        <h3>价格</h3>
        <div>
          <el-form @submit.native.prevent label-width="120px" :inline="true">
            <el-form-item label="是否免费">
              <el-switch v-model="courseForm.price.free"></el-switch>
            </el-form-item>
            <el-form-item label="原始价格" :required="!courseForm.price.free">
              <el-input-number v-model="courseForm.price.originPrice" :min="0" placeholder="原始价格" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="折扣价格">
              <el-input-number v-model="courseForm.price.disacountPrice" :min="0" placeholder="折扣价格" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="折扣比例">
              <el-input-number v-model="courseForm.price.disacountRatio" :min="0" :max="100"></el-input-number>
            </el-form-item>
          </el-form>
        </div>
        <el-divider></el-divider>
      </div>
      <div class="edit-container">
        <h3>课程详情</h3>
        <div ref="editor" style="text-align:left;"></div>
      </div>
    </div>
    <div class="page-panel">
      <div class="text-center">
        <el-button type="primary" @click="submitHandle">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";

import { getToken, removeToken } from "@/utils/auth";
import { config } from "@/utils/config";
import { mapState } from "vuex";
export default {
  name: "courseMasterEdit",
  computed: {
    ...mapState({
      courseCategoryTree: state => state.course.courseCategoryTreeTable,
      periodTypeList: state => state.configuration.periodTypeList,
      tags: state => state.configuration.courseTags
    })
  },
  data() {
    return {
      fileLimitNum: 1,
      uploadHeaders: {
        token: getToken()
      },
      // active: 1,
      fileList: [],
      uploadUrl: config.baseURL + "/api/v1/upload/course",
      courseForm: {
        thumb: "",
        duration: 0.75,
        perid: 1,
        periodType: "month",
        price: {
          free: true,
          originPrice: "",
          disacountPrice: "",
          disacountRatio: 100
        },
        decoration: {
          content: "",
          imgs: []
        },
        sort: 1,
        tags: []
      },
      editor: null,
      isUpdate: false
    };
  },
  methods: {
    
    handleUploadExceed(files, fileList) {
      this.$message("图片超过了" + this.fileLimitNum + "个数量限制");
    },
    handleUploadSuccess(response, file, fileList) {
      this.courseForm.thumb = file.response.data;
      console.log(this.courseForm.thumb);
    },
    submitHandle() {
      console.log(this.courseForm);
      // return;
      this.$store.dispatch("courseMaster/save", this.courseForm).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.$message("保存成功");
          this.$store.dispatch("closeNav", { name: "courseMasterEdit" });
          this.$router.replace("/courseMaster");
        }
      });
    },
    getParams() {
      this.id = this.$route.params.id;
      console.log(this.id);
    },
    catchData(content) {
      console.log(content);
    }
  },
  mounted() {
    

    {
      var editor = new E(this.$refs.editor);
      editor.customConfig.uploadImgShowBase64 = true;
      // editor.customConfig.uploadImgServer = '/upload';
      editor.customConfig.onchange = html => {
        // this.editorContent = html;
        this.courseForm.decoration.content = html;
        this.catchData(this.editorContent);
      };
      editor.create();
      // editor.txt.html(this.courseForm.decoration || '');
      this.editor = editor;
      
      // this.editor = new E(this.$refs.editorElem); // 编辑器的事件，每次改变会获取其html内容
      // this.editor.customConfig.onchange = html => {
      //   this.editorContent = html;
      //   // this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
      // };
      // // this.editor.customConfig.menus = [
      // //   // 菜单配置
      // //   "head", // 标题
      // //   "bold", // 粗体
      // //   "fontSize", // 字号
      // //   "fontName", // 字体
      // //   "italic", // 斜体
      // //   "underline", // 下划线
      // //   "strikeThrough", // 删除线
      // //   "foreColor", // 文字颜色
      // //   "backColor", // 背景颜色
      // //   "link", // 插入链接
      // //   "list", // 列表
      // //   "justify", // 对齐方式
      // //   "quote", // 引用
      // //   "emoticon", // 表情
      // //   "image", // 插入图片
      // //   "table", // 表格
      // //   "video", // 插入视频
      // //   "code", // 插入代码
      // //   "undo", // 撤销
      // //   "redo" // 重复
      // // ];
      // this.editor.create(); // 创建富文本实例作者：shenjianbo
      // console.log(this.editor.customConfig)
    }
    this.$store.dispatch("getCourseCategoryTreeTable", {});
    console.log(this.$route)
    var id = this.$route.params.id;
    if(id){
      //处理查询
      this.isUpdate = true;
      this.$store.dispatch("courseMaster/getCourseDatail", id).then(res => {
        if(res.code == 0|| res.data){
          this.courseForm = res.data;
          editor.txt.html(this.courseForm.decoration.content || '<p></p>');
        }else{
          this.$message("未找到课程");
        }
      });
    }

  }
};
</script>

<style>
.w-e-text-container {
  /* height: 400px !important; */
  min-height: 400px !important;
  max-height: 700px !important;
}
.uploaded-img {
  position: relative;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}
</style>
