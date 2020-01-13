<template>
  <div class="page-container">
    <div class="page-panel">
      <el-form :inline="false" size="mini" @submit.native.prevent>
        <el-form-item>
          <router-link :to="{path:'/lecturerCourseEdit',name:'lecturerCourseEdit', params:{id:0}}" class="nofound-gohome">
            <el-button size="mini" type="primary" icon="el-icon-s-home">新增课程</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-col :span="8" v-for="(course, index) in courseList" :key="index" :offset="0">
        <el-card :body-style="{ margin:'8px',padding: '6px' }">
          <!-- style="width: 100px; height: 100px" -->
          <h3>{{course.title}}</h3>
          <el-image :src="course.img" :preview-src-list="[course.img]"></el-image>
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
            </div>
          </div>
          <div class="text-right">
            <el-button type="text" class="button" @click.native.prevent="goEdit(course)">编辑</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "lecturerCourseEdit",
  data() {
    return {
      currentDate: new Date(),
      courseList: [
        {
          id: 1,
          title: "课程标题",
          img:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          onSale: true,
          auditStatus: "pass"
        },
        {
          id: 1,
          title: "课程标题",
          img:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          onSale: true,
          auditStatus: "pass"
        }
      ]
    };
  },
  methods: {
    goEdit(data) {
      this.$router.push({
        name: "lecturerCourseEdit",
        params: { id: data.id }
      });
    }
  }
};
</script>
