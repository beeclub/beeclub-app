<template>
  <div>
    <el-container>
      <el-button v-has="'sysPermission::add'" type="primary" size="size" @click="dialogVisible = true">新建</el-button>
    </el-container>
    <div>
      <el-table :data="tableData" style="width: 100%" border="" row-key="id">
        <el-table-column prop="name" label="权限名称" width="180"></el-table-column>
        <el-table-column prop="value" label="权限标识符"></el-table-column>
        <el-table-column prop="icon" label="权限图标"></el-table-column>
        <el-table-column prop="status" label="可用状态">
          <template slot-scope="scope">
            <span>{{scope.row.status === 1 ? '可用' : '不可用'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="uri" label="访问路径"></el-table-column>
        <el-table-column prop="type" label="资源类型">
          <template slot-scope="scope">
            <span>{{typeMap[scope.row.type]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="order" label="显示顺序"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-has="'/system/pc/menu/add'"
              type="primary"
              size="mini"
              icon="el-icon-circle-plus-outline"
            >添加{{typeof scope}}</el-button>
              <!-- @click="addSubMmenu(scope.row.id)" -->
            <el-button type="danger" size="mini">删除</el-button>
             <!-- @click="handleDelete(scope.row.id)"  -->
            <!-- <el-button
              v-has="'/system/pc/menu/view'"
              type="success"
              @click="handleEdit(scope.row.id)"
              size="mini"
            >编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="新建"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
    >
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="权限名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="权限标识符">
            <el-input v-model="form.value"></el-input>
          </el-form-item>
          <el-form-item label="权限图标">
            <el-input v-model="form.icon"></el-input>
          </el-form-item>
          <el-form-item label="可用状态">
            <el-switch v-model="form.status"></el-switch>
          </el-form-item>
          <el-form-item label="访问路径">
            <el-input v-model="form.uri"></el-input>
          </el-form-item>
          <el-form-item label="资源类型">
            <el-radio-group v-model="form.type">
              <el-radio :label="0">目录</el-radio>
              <el-radio :label="1">菜单</el-radio>
              <el-radio :label="2">按钮（接口绑定权限）</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="显示顺序">
            <el-input-number v-model="form.sort" :min="1" :max="1000" label="描述文字"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  

<script>
export default {
  name: "rescourceManage",
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      typeMap: {
        0: "目录",
        1: "菜单",
        2: "按钮（接口绑定权限）"
      },
      form: {
        id: "",
        pid: "",
        name: "",
        value: "",
        icon: "",
        type: 2,
        uri: "",
        status: true,
        sort: 0
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      console.log(this.form);
    }
  }
};
</script>