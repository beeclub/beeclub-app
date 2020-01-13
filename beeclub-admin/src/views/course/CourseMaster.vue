<template>
    <div class="page-container">
        <div class="page-panel">
            <el-form :inline="true" @submit.native.prevent>
                <el-form-item>
                    <router-link
                        :to="{path:'/courseMasterEdit',name:'courseMasterEdit', params:{id:0}}"
                        class="nofound-gohome"
                    >
                        <el-button size="mini" type="primary" icon="el-icon-s-home">发布课程</el-button>
                    </router-link>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-panel">
            <el-table :data="coursePageData.list" border style="width: 100%" :header-cell-style="{background:'#F5F5F6'}">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="subhead" label="副标题"></el-table-column>
                <el-table-column prop="descrption" label="描述"></el-table-column>
                <el-table-column prop="onlineTime"  :formatter="dateFormat" label="上线时间"></el-table-column>
                <el-table-column prop="courseStatus" label="状态"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        type="text"
                            @click.native.prevent="goEdit(scope.row)"
                        >编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-page-right">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="searchForm.page"
                    :page-sizes="[10, 20]"
                    :page-size="searchForm.size"
                    layout="total, prev, pager, next, sizes"
                    :total="coursePageData.total"
                    small
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import moment from 'moment';
export default {
  name: "courseMaster",
  computed: {
    ...mapState({
      coursePageData: state => state.courseMaster.coursePageData
    })
  },
  data() {
    return {
      searchForm: {
        size: 10,
        page: 1
      }
    };
  },
  mounted() {
    this.getCoursePageData();
  },
  methods: {
    dateFormat: function(row, column, index){
       var date = row[column.property];
        if(date == undefined){return ''};
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
    },
    handleSizeChange(size) {
      this.searchForm.size = size;
      this.getCoursePageData();
    },
    handleCurrentChange(page) {
      this.searchForm.page = page;
      this.getCoursePageData();
    },
    getCoursePageData() {
      this.$store.dispatch("courseMaster/coursePageData", this.searchForm);
    },
    goEdit(course) {
      this.$router.push({
        name: "courseMasterEdit",
        params: { id: course.id }
      });
    }
  }
};
</script>
