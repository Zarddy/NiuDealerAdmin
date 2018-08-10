<!--供应商管理-缴费记录-->
<template>
  <div class="supplier-payment-list">

    <!--顶部筛选输入框-->
    <el-row>

      <el-form :model="filterForm" ref="filterForm"
               class="filter-ruleForm" :inline="true" size="mini">

        <el-form-item label="日期范围" prop="startDate">
          <template>
            <el-col :span="8">
              <el-date-picker type="date" placeholder="选择日期" v-model="filterForm.startDate" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-date-picker type="date" placeholder="选择日期" v-model="filterForm.endDate" style="width: 100%;"></el-date-picker>
            </el-col>
          </template>
        </el-form-item>

        <el-form-item prop="channel">
          <el-select v-model="filterForm.channel" placeholder="请选择开通渠道">
            <el-option label="自行注册" value="0"></el-option>
            <el-option label="管理员添加" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="seller">
          <el-input v-model="filterForm.seller" placeholder="请输入收银员名称"></el-input>
        </el-form-item>

        <el-form-item prop="company">
          <el-input v-model="filterForm.company" placeholder="请输入公司名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitFilterForm(filterForm)">筛选</el-button>
        </el-form-item>

      </el-form>

    </el-row>

    <el-table
      ref="paymentRecords"
      :data="paymentRecords"
      tooltip-effect="dark">

      <el-table-column prop="id" label="序号" width="80">
      </el-table-column>

      <el-table-column prop="date" label="缴费日期" width="130">
      </el-table-column>

      <el-table-column prop="amount" label="缴费金额（元）" width="150">
      </el-table-column>

      <el-table-column prop="channel" label="缴费渠道" width="160">
      </el-table-column>

      <el-table-column label="缴费凭证" width="200">
        <template slot-scope="scope">
          <img v-if="scope.row.image" :src="scope.row.image" style="width: 160px; height: 90px"/>
        </template>
      </el-table-column>

      <el-table-column prop="seller" label="收银员" width="120">
      </el-table-column>

    </el-table>

    <el-row class="bottom-tools">
      <el-col :span="16">
        合计总缴费金额：<span class="total">10000元</span>，其中<span class="channel">在线|微信支付5000元</span>；<span class="red-text">线下支付5000元</span>

      </el-col>
      <el-col :span="8">
        <el-button type="primary" size="small">导出excel</el-button>
        <el-button type="primary" size="small">新增缴费记录</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "PaymentList",
    data() {
      return {
        paymentRecords: [
          {
            id: '001', // 序号
            date: '2018-07-03', // 缴费日期
            amount: '5000', // 缴费金额
            channel: '在线|微信支付', // 渠道
            image: '', // 缴费凭证
            seller: '李思思' // 收银员
          },
          {
            id: '001', // 序号
            date: '2018-07-06', // 缴费日期
            amount: '3000', // 缴费金额
            channel: '线下|现金支付', // 渠道
            image: '', // 缴费凭证
            seller: '' // 收银员
          }
        ], // 缴费记录

        filterForm: {
          company: '', // 公司姓名
          state: '', // 状态
          startDate: '', // 账号开通日期
          endDate: '', // 账号到期日期
          channel: '', // 开通渠道
          seller: '' // 收银员
        }
      }
    }
  }
</script>

<style scoped>
  .red-text {
    color: red;
  }
  .total {
    color: red;
    font-style: italic;
    font-weight: bold;
  }
  .channel {
    color: red;
    text-decoration-line: underline;
  }
  .bottom-tools {
    margin: 15px;
    font-size: 14px;
  }
</style>
