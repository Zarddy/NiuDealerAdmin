<!--供应商管理-新增供应商-->
<template>
  <div class="supplier-add">

    <h2>新增供应商</h2>

    <h3>基本资料</h3>

    <el-form :model="detailForm" ref="detailForm" label-width="120px"
             class="filter-ruleForm" label-position="right" size="medium">

      <el-form-item label="公司名称" prop="company" required>
        <el-input v-model="detailForm.company" placeholder="请输入公司名称"></el-input>
      </el-form-item>

      <el-form-item label="联系人" prop="contact" required>
        <el-input v-model="detailForm.contact" placeholder="请输入联系人名称"></el-input>
      </el-form-item>

      <el-form-item label="联系电话" prop="联系电话" required>
        <el-input v-model="detailForm.phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>

      <el-form-item label="设置原始密码" prop="password" required>
        <el-input v-model="detailForm.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword" required>
        <el-input v-model="detailForm.confirmPassword" placeholder="再次输入密码" type="password"></el-input>
      </el-form-item>

      <el-form-item label="使用期限" required>
        <el-col :span="11">
          <el-form-item prop="startDate">
            <el-date-picker type="date" placeholder="选择开始日期" v-model="detailForm.startDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2" style="text-align: center">—</el-col>
        <el-col :span="11">
          <el-form-item prop="endDate">
            <el-date-picker type="date" placeholder="选择结束日期" v-model="detailForm.endDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <h3>企业资料</h3>

    </el-form>

  </div>
</template>

<script>
  export default {
    name: "AddSupplier",
    data() {
      return {
        detailForm: {
          company: '', // 公司名称
          contact: '', // 联系人名称
          phone: '', // 联系电话
          password: '', // 原始密码
          confirmPassword: '', // 确认密码
          startDate: '', // 使用期限 - 开始日期
          endDate: '' // 使用期限 - 结束日期
        }
      }
    }
  }
</script>

<style scoped>

</style>
