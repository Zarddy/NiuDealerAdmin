import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SupplierList from '@/pages/supplier/List'
import AddSupplier from '@/pages/supplier/AddSupplier'
import PaymentList from '@/pages/supplier/PaymentList'
import AddPayment from '@/pages/supplier/AddPayment'
import LevelManagement from '@/pages/supplier/LevelManagement'

Vue.use(Router);
Vue.use(ElementUI);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LevelManagement',
      component: LevelManagement
    }
  ]
})
