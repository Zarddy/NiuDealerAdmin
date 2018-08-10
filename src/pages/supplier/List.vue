<!--供应商列表-->
<template>
  <div class="supplier-list">

    <!--顶部筛选输入框-->
    <el-row>

      <el-form :model="filterForm" ref="filterForm" label-width="80px"
               class="filter-ruleForm" :inline="true" size="mini">

        <el-form-item prop="name">
          <el-input v-model="filterForm.name" placeholder="请输入公司名称"></el-input>
        </el-form-item>

        <el-form-item prop="state">
          <el-select v-model="filterForm.state" placeholder="请选择状态">
            <el-option label="待审核" value="0"></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="到期" value="2"></el-option>
            <el-option label="停止" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="账号开通日期范围" prop="startDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="filterForm.startDate" style="width: 100%;"></el-date-picker>
        </el-form-item>

        <el-form-item label="账号到期日期范围" prop="endDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="filterForm.endDate" style="width: 100%;"></el-date-picker>
        </el-form-item>

        <el-form-item label="开通渠道" prop="channel">
          <el-select v-model="filterForm.channel" placeholder="请选择开通渠道">
            <el-option label="自行注册" value="0"></el-option>
            <el-option label="管理员添加" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitFilterForm(filterForm)">筛选</el-button>
        </el-form-item>

      </el-form>

    </el-row>

    <!--表格主体-->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange">

      <el-table-column
        fixed="left"
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column prop="id" label="ID" width="80"
                       fixed="left">
      </el-table-column>

      <el-table-column prop="company" label="公司名称" width="200">
      </el-table-column>

      <el-table-column prop="contact" label="联系人" width="100">
      </el-table-column>

      <el-table-column prop="phone" label="联系电话" width="120">
      </el-table-column>

      <el-table-column prop="state" label="状态" width="60">
      </el-table-column>

      <el-table-column prop="level" label="级别" width="80">
      </el-table-column>

      <el-table-column
        label="开通日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.startDate }}</template>
      </el-table-column>

      <el-table-column
        label="账户到期日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.endDate }}</template>
      </el-table-column>

      <el-table-column prop="channel" label="开通渠道" width="100" show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button @click="editRecord(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="changeState(scope.row)" type="text" size="small">停止</el-button>
          <el-button @click="restPassword(scope.row)" type="text" size="small">重置密码</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!--底部控制栏-->
    <el-row class="bottom-tools">

      <el-col :span="12">
        <el-button size="medium" type="success">停止</el-button>
        <el-button size="medium" type="success">审核</el-button>
        <el-button size="medium" type="success">恢复正常</el-button>
      </el-col>

      <el-col :span="12"></el-col>

      <el-col :span="12">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="35">
        </el-pagination>
      </el-col>

    </el-row>

  </div>
</template>

<script>
  export default {
    name: "List",
    components: {},
    data() {
      return {
        tableData: [{
          id: "007", // id
          company: '中山开元灯饰有限公司', // 公司名称
          contact: '张三', // 联系人
          phone: '13800138000', // 联系电话
          state: 1, // 状态
          level: '超级VIP', // 级别
          startDate: '2018-03-30', // 开通日期
          endDate: '2019-03-30', // 账户到期日期
          channel: '自行注册', // 开通渠道
        },
          {
            id: "008", // id
            company: '中山飞科照明有限公司', // 公司名称
            contact: '李四', // 联系人
            phone: '13800138000', // 联系电话
            state: 1, // 状态
            level: '超级VIP', // 级别
            startDate: '2018-03-30', // 开通日期
            endDate: '2019-03-30', // 账户到期日期
            channel: '管理员添加(admin)', // 开通渠道
          },
          {
            id: "009", // id
            company: '中山欧普照明有限公司', // 公司名称
            contact: '梁山', // 联系人
            phone: '13800138000', // 联系电话
            state: 0, // 状态
            level: '钻石VIP', // 级别
            startDate: '2018-03-30', // 开通日期
            endDate: '2019-03-30', // 账户到期日期
            channel: '自行注册', // 开通渠道
          },
          {
            id: "010", // id
            company: '古镇飞利浦照明有限公司', // 公司名称
            contact: '刘华强', // 联系人
            phone: '13800138000', // 联系电话
            state: 1, // 状态
            level: '钻石VIP', // 级别
            startDate: '-', // 开通日期
            endDate: '-', // 账户到期日期
            channel: '自行注册', // 开通渠道
          }],
        multipleSelection: [],
        filterForm: {
          name: '', // 公司姓名
          state: '', // 状态
          startDate: '', // 账号开通日期
          endDate: '', // 账号到期日期
          channel: '' // 开通渠道
        }
      }
    },
    methods: {
      handleSelectionChange: function (val) { // 点击多选按钮
        this.multipleSelection = val;
      },
      editRecord: function (val) { // 修改记录
        console.log("editRecord: " + val.id);
      },
      changeState: function (val) { // 修改状态（待审核，正常，到期，停止）
        console.log("changeState: " + val.id);
      },
      restPassword: function (val) { // 重置密码
        console.log("restPassword: " + val.id);
      },
      submitFilterForm: function (form) { // 提交筛选表单
        console.log("submitFilterForm: " + form.startDate + "endDate: " + form.endDate);
      }
    }
  }
</script>

<style scoped>
  .supplier-list {
  }
  .filter-ruleForm label {
    font-size: 12px;
    line-height: 20px;
  }
  .bottom-tools {
    margin: 20px;
  }
</style>
