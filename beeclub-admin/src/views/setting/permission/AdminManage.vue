<template>
  <div class="page-container">
    <div class="page-panel">
      <el-form :inline="true" size="mini" @submit.native.prevent>
        <el-form-item>
          <el-input
            placeholder="关键字"
            v-model="searchData.keyword"
            v-on:keyup.enter.native="getAdminPageList"
            @clear="getAdminPageList"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" v-on:click="getAdminPageList" type="primary ">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="page-panel">
      <el-table :data="adminPageList.list" border="" stripe style="width: 100%">
        <el-table-column type="selection" :selectable="(row,index) => row.editable" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="mobile" label="手机"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="loginTime" label="最近一次登录时间"></el-table-column>
        <el-table-column prop="available" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.available"
              :disabled="!scope.row.editable"
              @change="handleSwitchAvailable(scope.row,$event)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="角色" align="center">
          <template slot-scope="scope">
            <el-tooltip
              v-if="scope.row.id !== 1"
              class="item"
              effect="dark"
              content="分配角色"
              placement="top-end"
            >
              <el-button
                @click="handleRoleEdit(scope.row)"
                type="primary"
                icon="el-icon-menu"
                circle
                size="mini"
                :disabled="userInfo.id != 1"
              ></el-button>
            </el-tooltip>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="140" align="center">
          <template  slot-scope="scope">
            <el-tooltip v-if="scope.row.editable" class="item" effect="dark" content="编辑" placement="top-end">
              <el-button
                @click="handleEdit(scope.row)"
                type="warning"
                icon="el-icon-edit"
                circle
                size="mini"
              ></el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.editable" class="item" effect="dark" content="删除" placement="top-end">
              <el-button
                @click="handleDelete(scope.row)"
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
              ></el-button>
            </el-tooltip>
            <span v-else>-</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-page-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchData.page"
          :page-sizes="[10, 20]"
          :page-size="searchData.size"
          layout="total, prev, pager, next, sizes"
          :total="adminPageList.total"
          small
        ></el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="roleDialogVisible" width="580px" title="修改所属角色">
      <div>
        <el-transfer
          v-model="adminRolesVals"
          :data="listRolesByAvailable"
          :titles="['角色列表','拥有角色']"
          :props="{key:'id', label:'name'}"
        ></el-transfer>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleChangeRoles">保存</el-button>
        <el-button @click="roleDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "adminManage",
  computed: {
    ...mapState({
      adminPageList: state => state.sysSetting.adminPageList,
      userInfo: state => state.user.userInfo,
      listRolesByAvailable: state => state.sysSetting.listRolesByAvailable
    })
  },
  created() {
    this.getAdminPageList();
  },
  data() {
    return {
      tableData: [],
      searchData: {
        keyword: "",
        size: 10,
        page: 1
      },
      roleDialogVisible: false,
      adminRolesVals: [],
      rowAdminId: null
    };
  },
  methods: {
    handleSizeChange(size) {
      this.searchForm.size = size;
      this.getAdminPageList();
    },
    handleCurrentChange(page) {
      this.searchForm.page = page;
      this.getAdminPageList();
    },
    getAdminPageList() {
      this.$store.dispatch("adminPageList", this.searchData);
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
            .dispatch("switchAdminAvailable", { id: row.id, available: val })
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
    handleChangeRoles: function() {
      //
      this.$store
        .dispatch("changeAdminRoles", {
          adminId: this.rowAdminId,
          roleIds: this.adminRolesVals
        })
        .then(res => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.roleDialogVisible = false;
          }
        });
    },
    handleRoleEdit(row) {
      this.rowAdminId = row.id;
      this.$store.dispatch("listRolesByAvailable", { available: true });
      this.roleDialogVisible = true;
      this.adminRolesVals = [];
      this.$store
        .dispatch("getSysRoleIdsByAdminId", { adminId: this.rowAdminId })
        .then(data => {
          data.forEach(element => {
            this.adminRolesVals.push(element);
          });
        });
    },
    handleEdit(row){
      console.log(row)
    },
    handleDelete(row){
      console.log(row)
    }
  }
};
</script>

<style scoped>
</style>