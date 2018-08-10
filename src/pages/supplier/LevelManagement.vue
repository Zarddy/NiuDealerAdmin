<!--供应商管理-等级管理-->
<template>
  <div class="supplier-level-management">

    <el-row style="text-align: right;">
      <el-button type="success" size="small">新增</el-button>
    </el-row>

    <el-table
      ref="multipleTable"
      :data="records"
      tooltip-effect="dark"
      size="medium">

      <el-table-column prop="id" label="ID" width="60">
      </el-table-column>

      <el-table-column prop="name" label="级别名称" width="100">
      </el-table-column>

      <el-table-column prop="limitProducts" label="可上传商品数量" width="150">
      </el-table-column>

      <el-table-column prop="limitSuppliers" label="可发展经销商数量" width="150">
      </el-table-column>

      <el-table-column label="期限" width="60">
        <template slot-scope="scope">{{ scope.row.year }}年</template>
      </el-table-column>

      <el-table-column prop="price" label="价格" width="100">
      </el-table-column>

      <el-table-column prop="discount" label="折扣价" width="100">
      </el-table-column>

      <el-table-column prop="startDate" label="折扣开始时间" width="120">
      </el-table-column>

      <el-table-column prop="endDate" label="折扣结束时间" width="120">
      </el-table-column>

      <el-table-column label="状态" width="60">
        <template slot-scope="scope"><span v-if="scope.row.state">开售</span><span v-else>停售</span></template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button @click="editRecord(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="changeState(scope.row)" type="text" size="small">
            <span v-if="scope.row.state">停售</span><span v-else>开售</span>
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <!--底部控制栏-->
    <div class="bottom-tools">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="this.records.length">
      </el-pagination>
    </div>




    <div class="detail">

      <h3>供应商等级</h3>

      <el-form :model="detailForm" ref="detailForm" label-width="150px"
               label-position="right" size="small">

        <el-form-item label="级别名称" prop="name">
          <el-input placeholder="请输入供应商级别名称" v-model="detailForm.name" type="text"></el-input>
        </el-form-item>

        <el-form-item label="可上传商品数量" prop="limitProducts">
          <el-input placeholder="请输入可上传商品数量" v-model="detailForm.limitProducts" type="number" min="0"></el-input>
        </el-form-item>

        <el-form-item label="可发展经销商数量" prop="limitSuppliers">
          <el-input placeholder="请输入可发展经销商数量" v-model="detailForm.limitSuppliers" type="number" min="0"></el-input>
        </el-form-item>

        <el-form-item label="期限" prop="year">
          <el-col :span="6">
            <el-input placeholder="请输入期限" v-model="detailForm.year" type="number" min="0"></el-input>
          </el-col>

          <el-col :span="4">
            <el-select v-model="detailForm.channel" placeholder="请选择单位">
              <el-option label="年" value="0"></el-option>
              <el-option label="月" value="1"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="价格">
          <el-input placeholder="请输入价格" v-model="detailForm.price" type="number" min="0">
            <template slot="suffix"><span style="margin-right: 10px">元</span></template>
          </el-input>
        </el-form-item>

        <el-form-item label="折扣价">
          <el-input placeholder="请输入折扣价" v-model="detailForm.discount" type="number" min="0">
            <template slot="suffix"><span style="margin-right: 10px">元</span></template>
          </el-input>
        </el-form-item>

        <el-form-item label="折扣时间">
          <template>
            <el-col :span="8">
              <el-date-picker type="date" placeholder="选择日期" v-model="detailForm.startDate"></el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-date-picker type="date" placeholder="选择日期" v-model="detailForm.endDate"></el-date-picker>
            </el-col>
          </template>
        </el-form-item>

        <el-form-item label="状态">
          <el-radio v-model="detailForm.state" label="1">开售</el-radio>
          <el-radio v-model="detailForm.state" label="0">停售</el-radio>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="detailForm.remark" placeholder="请填写备注" type="textarea" rows="5"></el-input>
        </el-form-item>

        <el-form-item>
          <el-col :span="16" align="center">
            <el-button type="primary" style="width: 120px" @click="submitForm(detailForm)">保存</el-button>
          </el-col>
        </el-form-item>

      </el-form>

    </div>

  </div>
</template>

<script>
  export default {
    name: "LevelManagement",
    data() {
      return {
        records: [ // TODO 等级记录
          {
            id: '001',
            name: '超级VIP', // 级别名称
            limitProducts: 100, // 可上传商品数量
            limitSuppliers: 300, // 可发展经销商数量
            year: 1, // 期限
            price: 5000, // 单价
            discount: 4000, // 折扣价
            startDate: '2018-08-01', // 折扣开始时间
            endDate: '2019-07-31', // 折扣结束时间
            state: 1, // 状态
            remark: '年中大促' // 备注
          },
          {
            id: '002',
            name: '钻石VIP',
            limitProducts: 200,
            limitSuppliers: 500,
            year: 2,
            price: 10000,
            discount: 9000,
            startDate: '2018-08-01',
            endDate: '2019-07-31',
            state: 0, // 状态
            remark: '年中大促' // 备注
          }
        ],
        detailForm: {
          name: '', // 级别名称
          limitProducts: 0, // 可上传商品数量
          limitSuppliers: 0, // 可发展经销商数量
          year: 0, // 期限
          price: 0, // 价格
          discount: 0, // 折扣价
          startDate: '', // 折扣开始日期
          endDate: '', // 折扣结束日期
          state: '1', // 销售状态
          remark: '' // 备注
        }
      }
    },
    methods: {
      editRecord(record) { // TODO 修改记录
        ;
      },
      changeState(record) { // TODO 修改记录状态，停售或开售
        ;
      },
      submitForm(form) { // TODO 提交表单
        ;
      }
    }
  }
</script>

<style scoped>
  .bottom-tools {
    margin: 15px;
    text-align: right;
  }
  .detail {
    margin-top: 100px;
  }
</style>
