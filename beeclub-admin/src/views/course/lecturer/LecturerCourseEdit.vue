<template>
  <div class="page-container">
    <div class="page-panel">
      <el-form
        :inline="false"
        size="mini"
        @submit.native.prevent
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="标题">
          <el-input placeholder="标题" v-model="form.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="副标题">
          <el-input placeholder="副标题" v-model="form.subTitle" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-hasPermission="'sysRole::create'" type="primary" size="mini">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="wangeditor" class="page-panel">
      <div ref="editorElem" style="text-align:left;"></div>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "lecturerCourseEdit",
  data() {
    return {
      id: null,
      editor: null,
      editorContent: "",
      form: {}
    };
  },
  methods: {
    goEdit(data) {
      this.$router.push({
        name: "lecturerCourseEdit",
        params: { id: data.id }
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
    console.log("lecturerCourseEdit");
    this.getParams();
    {
      this.editor = new E(this.$refs.editorElem); // 编辑器的事件，每次改变会获取其html内容
      this.editor.customConfig.onchange = html => {
        this.editorContent = html;
        this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
      };
      this.editor.customConfig.menus = [
        // 菜单配置
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "video", // 插入视频
        "code", // 插入代码
        "undo", // 撤销
        "redo" // 重复
      ];
      this.editor.create(); // 创建富文本实例作者：shenjianbo
    }
  }
};
</script>
