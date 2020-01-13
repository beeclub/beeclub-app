

<template>
    <div class="page-container">
        <div class="page-panel">
            <el-form :inline="true" size="mini" @submit.native.prevent>
                <el-form-item>
                    <el-input placeholder="关键字" v-model="searchData.keyword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" type="primary ">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-panel">
            <el-row :gutter="10">
                <el-col :xs="24" :sm="10" :md="8" :lg="6" :xl="4">
                    <div class="tree-container">
                        <el-tree :data="organTreeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="14" :md="16" :lg="18" :xl="20">
                    <div>
                        <div>
                            <el-table :data="employeTableData.list" border="" stripe style="width: 100%">
                                <el-table-column prop="id" label="id"></el-table-column>
                            </el-table>
                        </div>
                        <div class="table-page-right">
                            <!-- @size-change="handleSizeChange"
                                @current-change="handleCurrentChange" -->
                            <el-pagination
                                :current-page="employeTableData.page"
                                :page-sizes="[10, 20]"
                                :page-size="employeTableData.size"
                                layout="total, prev, pager, next, sizes"
                                :total="employeTableData.total"
                                small
                            ></el-pagination>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "organization",
  computed: {
    ...mapState({
      organTreeData: state => state.organization.treeTable
      // organTypeList: state => state.configuration.organTypeList,
      // organTypeMap: state => state.configuration.organTypeMap
    })
  },
  created(){
    this.$store.dispatch("organization/treeTable");
  },
  data() {
    return {
      searchData: {
        keyword: ""
      },
      employeTableData: {
        list: [],
        size:10,
        page:1,
        total:0
      },
      defaultProps: {
        children: "children",
        label: "name",
        content: "this"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>

<style scoped>

</style>
