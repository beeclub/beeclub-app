<template>
  <div class="page-container">
    <div class="page-panel">
      <el-form :inline="true" size="mini" @submit.native.prevent>
        <el-form-item>
          <el-input
            placeholder="请输入内容"
            v-on:keyup.enter.native="getTreeTable"
            @clear="getTreeTable"
            v-model="keyWord"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="page-panel">
      <el-table
        :data="treeTable"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :default-expand-all="false"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :header-cell-style="{backgroundColor:'#f5f5f5'}"
      >
        <el-table-column prop="name" label="组织名称"></el-table-column>
        <el-table-column prop="organType" label="组织类型">
          <template slot-scope="scope">
            <span>{{organTypeMap[scope.row.type]}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
  

<script>
import SelectTree from "@/components/TreeSelect";
import { mapState } from "vuex";
export default {
  name: "organization",
  components: { SelectTree },
  computed: {
    ...mapState({
      treeTable: state => state.organization.treeTable,
      organTypeList: state => state.configuration.organTypeList,
      organTypeMap: state => state.configuration.organTypeMap
    }),
    optionData() {
      let cloneData = JSON.parse(JSON.stringify(this.list)); // 对源数据深度克隆
      return cloneData.filter(father => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(child => father.id == child.parentId); // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
        return father.parentId == 0; //返回第一层
      });
    }
  },
  created() {
    this.getTreeTable();
  },
  data() {
    return {
      selectTreeParams: {
        "check-strictly": true,
        "default-expand-all": true,
        "expand-on-click-node": false,
        clickParent: true,
        filterable: true,
        data: [],
        props: {
          children: "children",
          label: "name",
          //   disabled: "disabled",
          value: "id"
        }
      },
      keyWord: "",

      formLabelWidth: "120px",
      props: {
        // 配置项（必选）
        value: "id",
        label: "name",
        children: "children"
        // disabled:true
      }
    };
  },
  methods: {
    // changeSelectTreeData() {
    //   this.$store.dispatch("treeTable",{}).then(data => {
    //     this.selectTreeParams.data = data
    //     this.$refs.treeSelect.treeDataUpdateFun([{id:0, name:'请选择'}].concat(data));
    //   });
    // },
    // showDialogFormVisible(){
    //   this.changeSelectTreeData();
    //   this.dialogFormVisible = true;
    // }
    // ,
    getTreeTable() {
      this.$store.dispatch("organization/treeTable");
    }
  }
};
</script>