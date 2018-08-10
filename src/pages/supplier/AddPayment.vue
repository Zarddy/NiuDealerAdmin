<!--供应商管理-新增缴费记录-->
<template>
  <div class="supplier-add-payment">

    <el-form :model="detailForm" ref="detailForm" label-width="120px"
             label-position="right" size="medium">

      <el-form-item label="供应商" prop="company">
        <el-input placeholder="请输入供应商ID或名称进行搜索" v-model="keyword">
          <template slot="append"><el-button icon="el-icon-search"></el-button></template>
        </el-input>

        <el-select v-model="detailForm.company" placeholder="请选择开通渠道">
          <el-option v-for="company in companyOptions" :key="company" :label="company" :value="company">
            <template>
              <div class="name">{{ company }}</div>
              <span class="addr">{{ company }}</span>
            </template>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="购买级别">
        <el-radio v-model="detailForm.level" label="1">超级VIP</el-radio>
        <el-radio v-model="detailForm.level" label="2">钻石VIP</el-radio>
      </el-form-item>

      <el-form-item label="生效日期">
        <template>
          <el-col :span="8">
            <el-date-picker type="date" placeholder="选择日期" v-model="detailForm.startDate"></el-date-picker>
          </el-col>
          <el-col :span="8">
            <el-date-picker type="date" placeholder="选择日期" v-model="detailForm.endDate"></el-date-picker>
          </el-col>
        </template>
      </el-form-item>

      <el-form-item label="缴费日期">
        <el-date-picker type="date" placeholder="选择日期" v-model="detailForm.payDate"></el-date-picker>
      </el-form-item>

      <el-form-item label="缴费金额">
        <el-col :span="10">
          <el-input placeholder="请输入缴费金额" v-model="detailForm.fee" type="number" min="0">
            <template slot="suffix"><span style="margin-right: 10px">元</span></template>
          </el-input>
        </el-col>

        <el-col :span="8">
          已优惠<span class="price">X</span>元
        </el-col>
      </el-form-item>

      <el-form-item label="缴费渠道" prop="channel">
        <el-select v-model="detailForm.channel" placeholder="请选择开通渠道">
          <el-option label="自行注册" value="0"></el-option>
          <el-option label="管理员添加" value="1"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="缴费凭证">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="detailForm.imageUrl" :src="detailForm.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="收银员" prop="company">
        <el-input placeholder="请输入收银员名称" v-model="detailForm.seller" type="text"></el-input>
      </el-form-item>

      <el-form-item>
        <el-col :span="16" align="center">
          <el-button type="primary" style="width: 120px" @click="submitForm(detailForm)">保存</el-button>
        </el-col>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  export default {
    name: "AddPayment",
    data() {
      return {
        keyword: '', // 搜索输入框，供应商ID或名称
        detailForm: {
          company: '', // 供应商企业名
          level: 0, // 购买级别
          startDate: '', // 生效日期
          endDate: '', // 生效日期
          payDate: '', // 缴费日期
          fee: 0, // 缴费金额
          channel: '', // 缴费渠道
          seller: '', // 收银员
          imageUrl: '' // 缴费凭证
        },
        companyOptions: [
          "中山开元灯饰有限公司",
          "中山琪朗灯饰有限公司",
          "中山宝辉灯饰有限公司"
        ]
      }
    },
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      handleAvatarSuccess(res, file) { // TODO 头像上传成功
        this.logoUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) { // TODO 头像上传之前
        let isJPG = file.type === 'image/jpeg';
        let isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submitForm(form) { // TODO 提交表单

      }
    }
  }
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .price {
    color: red;
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 160px;
    height: 90px;
    display: inline-block;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
  .avatar {
    width: 160px;
    height: 90px;
    display: block;
  }
</style>
