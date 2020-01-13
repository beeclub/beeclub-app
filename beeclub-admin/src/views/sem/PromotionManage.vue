<template>
    <div class="page-container">
        <div class="page-panel">
            <el-form :inline="true" size="mini" @submit.native.prevent>
                <el-form-item>
                    <el-input
                        placeholder="关键字"
                        v-model="searchData.keyword"
                        v-on:keyup.enter.native="getSemPromotionPageList"
                        @clear="getSemPromotionPageList"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        v-hasPermission="'sysRole::create'"
                        @click="addEdit"
                        type="primary"
                        size="mini"
                    >新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-panel">
            <el-table :data="semPromotionPageList.list" border="">
                <el-table-column prop="title" label="标题" align="center"></el-table-column>
                <el-table-column prop="module" label="标题" align="center"></el-table-column>
                <el-table-column prop="url" label="地址" align="center">
                    <template slot-scope="scope">
                        <el-link :href="scope.row.url" type="info" target="_blank">{{scope.row.url}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="img" label="图片" align="center">
                    <template slot-scope="scope">
                        <!-- <img :src="scope.row.img" min-width="70" height="70"> -->
                        <el-image
                            :src="scope.row.img"
                            :preview-src-list="[scope.row.img]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="target" label="目标" align="center"></el-table-column>
                <el-table-column prop="priority" label="显示顺序" align="center"></el-table-column>
                <el-table-column prop="gmtUpdate" label="最后修改时间" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.onSale"
                            @change="handleSwitchAvailable(scope.row,$event)"
                            disabled
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="140" align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                            <el-button
                                @click="handleEdit(scope.row)"
                                type="warning"
                                icon="el-icon-edit"
                                circle
                                size="mini"
                                disabled
                            ></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
                            <el-button
                            disabled
                                @click="handleDelete(scope.row)"
                                type="danger"
                                icon="el-icon-delete"
                                circle
                                size="mini"
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-page-right">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="searchData.page"
                    :page-sizes="[10,20]"
                    :page-size="searchData.size"
                    layout="total, prev, pager, next, sizes"
                    :total="semPromotionPageList.total"
                ></el-pagination>
            </div>
            <!-- "total, sizes, prev, pager, next, jumper" -->
        </div>
        <el-dialog :visible.sync="editDialogVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="角色名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input type="textarea" v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="是否可用">
                    <el-switch v-model="form.available"></el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="editDialogVisible = false">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "promotionManage",
  computed: {
    ...mapState({
      semPromotionPageList: state => state.sem.semPromotionPageList
    })
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 0,
      editDialogVisible: false,
      tableData: [],
      form: {
        id: null,
        name: "",
        description: "",
        available: true
      },
      searchData: {
        size: 10,
        page: 1,
        keyword: ""
      }
    };
  },
  created() {
    // this.queryTable();
    this.getSemPromotionPageList();
  },
  methods: {
    handleCurrentChange: function(page) {
      console.log(arguments);
      this.searchData.page = page;
      this.getSemPromotionPageList();
    },
    handleSizeChange: function(size) {
      this.searchData.size = size;
      this.getSemPromotionPageList();
    },
    getSemPromotionPageList() {
      //{size:this.searchData.size, page:this.searchData.page}
      this.$store
        .dispatch("semPromotionPageList", this.searchData)
        .then(data => {});
    },
    onSubmit() {
      console.log("submit!");
      const _this = this;
      const data = this.form;
      this.$store.dispatch("saveRole", data).then(() => {
        _this.editDialogVisible = false;
        _this.getRolePageList();
      });
    },
    addEdit() {
      this.form = {
        id: null,
        name: "",
        description: "",
        available: true
      };
      this.editDialogVisible = true;
    },
    handleEdit(data) {
      this.form = data;
      this.editDialogVisible = true;
      console.log(data);
    },
    handleDelete(data) {
      var _this = this;
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log("then");
          this.$store.dispatch("deleteRoleById", data.id).then(data => {
            console.log(1);
            if (data.code == 0) {
              this.$message({
                type: "success",
                message: "已删除"
              });
              _this.getRolePageList();
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
    handleSwitchAvailable(row, val) {
      this.$confirm(
        "此操作" + (val ? "启用" : "禁用") + row.name + ", 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$store
            .dispatch("switchRoleAvailable", { id: row.id, available: val })
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
    }
  }
};
</script>