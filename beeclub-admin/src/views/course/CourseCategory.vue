<template>
    <div class="page-container">
        <div class="page-panel">
            <el-form :inline="true" size="mini" @submit.native.prevent>
                <el-form-item>
                    <el-input
                        placeholder="请输入内容"
                        v-on:keyup.enter.native="getTreeTable"
                        @clear="getTreeTable"
                        v-model="searchForm.keyword"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleAdd" type="primary" size="mini">添加</el-button>
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
                :header-row-style="{background:'#F5F5F6'}"
                :header-cell-style="{background:'#F5F5F6'}"
            >
                <el-table-column prop="name" label="类别名称"></el-table-column>
                <el-table-column prop="code" label="编码"></el-table-column>
                <el-table-column prop="priority" label="显示顺序"></el-table-column>
                <el-table-column prop="available" label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.available" @change="handleSwitchAvailable(scope.row,$event)"></el-switch>
                        <!-- active-color="#13ce66"
                        inactive-color="#ff4949"-->
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column fixed="right" label="操作" width="180">
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
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                @click="handleDelete(scope.row)"
                                circle
                                size="mini"
                            ></el-button>
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
                <el-form-item label="类别名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上级类别" :label-width="formLabelWidth">
                    <!-- <SelectTree
                        :props="treeSelectProps"
                        :value="form.pid"
                        :options="treeSelectData"
                        @getValue="getTreeSelectValue($event)"
                    />-->
                    <el-tree-select
                        :treeParams="selectTreeParams"
                        v-model="form.pid"
                        ref="treeSelect"
                    />
                </el-form-item>
                <el-form-item label="编码" :label-width="formLabelWidth">
                    <el-input v-model="form.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="显示顺序" :label-width="formLabelWidth">
                    <el-input-number v-model="form.priority" :min="1" :max="99" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
import SelectTree from "@/components/TreeSelect";
export default {
  name: "courseCategory",
  components: { SelectTree },
  computed: {
    ...mapState({
      treeTable: state => state.course.courseCategoryTreeTable,
      treeSelectData: state => state.course.allCourseCategoryTreeTable
    })
    // ,
    // selectTreeParams(){
    //     return {
    //         data: this.treeSelectData
    //     }
    // }
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
      formLabelWidth: "120px",
      //   treeSelectProps: {
      //     value: "id",
      //     label: "name",
      //     children: "children"
      //   },
      dialogFormVisible: false,
      searchForm: {
        keyword: ""
      },
      form: { priority: 1, pid: 0 }
    };
  },
  created() {
    this.getTreeTable();
    this.getAllCourseCategoryTreeTable();
  },
  methods: {
    changeSelectTreeData() {
      this.$store.dispatch("getAllCourseCategoryTreeTable", {}).then(data => {
        this.selectTreeParams.data = data;
        this.$refs.treeSelect.treeDataUpdateFun(
          [{ id: 0, name: "请选择" }].concat(data)
        );
      });
    },
    getAllCourseCategoryTreeTable() {
      this.$store.dispatch("getAllCourseCategoryTreeTable", {});
    },
    getTreeSelectValue(value) {
      this.form.pid = value ? value : 0;
    },
    getTreeTable() {
      this.$store.dispatch("getCourseCategoryTreeTable", this.searchForm);
    },
    showDialogFormVisible() {
      this.changeSelectTreeData();
      this.dialogFormVisible = true;
    },

    handleAdd(row) {
      this.form = { priority: 1, pid: row ? row.id : 0 };
      this.showDialogFormVisible();
    },
    handleEdit(row) {
      this.form = row;
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
            .dispatch("updateCourseCategoryAvailableById", { id: row.id, available: val })
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
      this.$confirm("此操作将永久删除课程类别, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("deleteCourseCategoryById", row.id)
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
    },
    handleSave() {
      if (!this.form.pid) {
        this.form.pid = 0;
      }
      this.form.children = undefined;
      this.$confirm("是否保存?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("saveCourseCategory", this.form).then(res => {
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.dialogFormVisible = false;
              this.getTreeTable();
            }
          });
        })
        .catch(error => {
          console.log(error);
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });

      console.log(this.form);
    }
  }
};
</script>

<style scoped>
.left-tree-container {
  margin-right: 10px;
}
.right-content-container {
  margin-left: 10px;
}
</style>
