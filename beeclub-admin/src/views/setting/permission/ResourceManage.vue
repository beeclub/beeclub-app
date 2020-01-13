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
          <el-button
            v-hasPermission="'sysResource::create'"
            @click="handleAdd"
            type="primary"
            size="mini"
          >添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="page-panel">
      <el-table
        :data="treeTable"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border=""
        :default-expand-all="false"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="name" label="资源名称"></el-table-column>
        <el-table-column prop="type" label="资源类型">
          <template slot-scope="scope">
            <el-tag
              size="mini"
              :type="resType[scope.row.type].type"
            >{{resType[scope.row.type].text}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="permission" label="权限字符串"></el-table-column>
        <el-table-column prop="uri" label="访问路径"></el-table-column>
        <el-table-column prop="icon" label="资源图标">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="priority" label="显示顺序"></el-table-column>
        <el-table-column prop="available" label="是否可用">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.available" @change="handleSwitchAvailable(scope.row,$event)"></el-switch>
            <!-- active-color="#13ce66"
            inactive-color="#ff4949"-->
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-tooltip
              :hasPermission="'sysResource::create'"
              class="item"
              effect="dark"
              content="新增"
              placement="top-end"
            >
              <el-button
                @click="handleAdd(scope.row)"
                type="info"
                icon="el-icon-document-add"
                circle
                size="mini"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              :hasPermission="'sysResource::update'"
              class="item"
              effect="dark"
              content="编辑"
              placement="top-end"
            >
              <el-button
                @click="handleEdit(scope.row)"
                type="warning"
                icon="el-icon-edit"
                circle
                size="mini"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              :hasPermission="'sysResource::delete'"
              class="item"
              effect="dark"
              content="删除"
              placement="top-end"
            >
              <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form">
        <el-form-item label="资源名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="上级资源" :label-width="formLabelWidth">
          <!-- <SelectTree
            :props="props"
            :value="form.pid"
            :options="treeTable"
            @getValue="getValue($event)"
          />-->
          <el-tree-select :treeParams="selectTreeParams" v-model="form.pid" ref="treeSelect"/>
          <!-- :value="valueId"
            :clearable="isClearable"
          :accordion="isAccordion"-->
        </el-form-item>
        <el-form-item label="资源类型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type">
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限字符串" :label-width="formLabelWidth">
          <el-input v-model="form.permission" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="访问路径" :label-width="formLabelWidth">
          <el-input v-model="form.uri" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源图标" :label-width="formLabelWidth">
          <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" :label-width="formLabelWidth">
          <el-input-number v-model="form.priority" :min="1" :max="99" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="是否可用" :label-width="formLabelWidth">
          <el-switch v-model="form.available"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  

<script>
import SelectTree from "@/components/TreeSelect";
import { mapState } from "vuex";
export default {
  name: "rescourceManage",
  components: { SelectTree },
  computed: {
    ...mapState({
      treeTable: state => state.sysSetting.treeTableData
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
      form: {
        id: null,
        pid: null,
        name: "",
        type: 1,
        permission: "",
        icon: "",
        uri: "",
        priority: 1,
        available: true
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      // isClearable: true, // 可清空（可选）
      // isAccordion: true, // 可收起（可选）
      // valueId: 0, // 初始ID（可选）
      resType: {
        0: { type: "info", text: "目录" },
        1: { type: "success", text: "菜单" },
        2: { type: "primary", text: "按钮" }
      },
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
    changeSelectTreeData() {
      this.$store.dispatch("treeTable",{}).then(data => {
        this.selectTreeParams.data = data
        this.$refs.treeSelect.treeDataUpdateFun([{id:0, name:'请选择'}].concat(data));
      });
    },
    showDialogFormVisible(){
      this.changeSelectTreeData();
      this.dialogFormVisible = true;
    }
    ,
    getTreeTable() {
      this.$store.dispatch("treeTable");
    },
    // getValue(value) {
    //   this.form.pid = value ? value : 0;
    //   console.log(value);
    // },
    submit() {
      console.log(this.form);
      var _this = this;
      this.form.children = undefined;
      this.$store.dispatch("saveResource", this.form).then(() => {
        _this.dialogFormVisible = false;
        _this.getTreeTable();
      });
    },
    handleEdit(row) {
      this.form = row;
      this.showDialogFormVisible();
    },
    handleAdd(row) {
      this.form = {
        pid: row ? row.id : 0,
        type: 1,
        priority: 1,
        available: true
      };
      this.showDialogFormVisible();
    },
    handleSwitchAvailable(row, val){
      this.$confirm(
        "此操作" + (val ? "启用【" : "禁用【") + row.name + "】, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$store
            .dispatch("updateSysResourceAvailableById", { id: row.id, available: val })
            .then(response => {
              if (response.code == 0) {
                this.$message({
                  type: "success",
                  message: (val ? "启用" : "禁用") + "成功!"
                });
              }
            })
            .catch(eror => {
              row.available = !val;
            });
        })
        .catch(() => {
          row.available = !val;
        });

      return true;
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除【'+ row.name +'】, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("deleteSysResourceById", row.id)
            .then(data => {
              if (data.code == 0) {
                this.$message({
                  type: "success",
                  message: "已删除"
                });
                this.getTreeTable();
              }
            });
        })
        .catch(error => {
          console.log(error);
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>