import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import {getCorrectDateTime, maxDate} from '@/libs/helper'
Vue.prototype.getCorrectDateTime = getCorrectDateTime

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faPhone,
  faPerson,
  faPlus,
  faPen,
  faFile,
  faFolder,
  faIdCard,
  faCalendar,
  faLocationDot,
  faBuildingColumns,
  faCreditCard,
  faLaptopHouse,
  faCircleCheck,
  faCloudArrowUp,
  faTimes,
  faChartSimple,
  faCircleXmark,
  faFileLines,
  faListCheck,
  faMessage,
  faTrash,
  faPeopleCarryBox,
  faArrowsRotate,
  faGear,
  faRightFromBracket,
  faBell,
  faPenToSquare,
  faFileInvoice,
  faFileInvoiceDollar,
  faUser,
  faUsers,
  faCalculator,
  faTruckField,
  faTicket,
  faInfo,
  faTimeline,
  faEnvelope,
  faPersonDigging,
  faUserClock,
  faClock,
  faMoneyCheckDollar,
  faUserTie,
  faTableCellsLarge,
  faComments,
  faCircleInfo,
  faReceipt,
  faStar,
  faCartShopping,
  faClockRotateLeft,
  faHandHoldingDollar,
} from '@fortawesome/free-solid-svg-icons'

library.add( 
  faPhone,
  faPerson,
  faPlus,
  faPen,
  faFile,
  faFolder,
  faIdCard,
  faCalendar,
  faLocationDot,
  faBuildingColumns,
  faCreditCard,
  faLaptopHouse,
  faCircleCheck,
  faCloudArrowUp,
  faTimes,
  faChartSimple,
  faCircleXmark,
  faFileLines,
  faListCheck,
  faMessage,
  faTrash,
  faPeopleCarryBox,
  faArrowsRotate,
  faGear,
  faRightFromBracket,
  faBell,
  faPenToSquare,
  faFileInvoice,
  faFileInvoiceDollar,
  faUser,
  faUsers,
  faCalculator,
  faTruckField,
  faTicket,
  faInfo,
  faTimeline,
  faEnvelope,
  faPersonDigging,
  faUserClock,
  faClock,
  faMoneyCheckDollar,
  faUserTie,
  faTableCellsLarge,
  faComments,
  faCircleInfo,
  faReceipt,
  faStar,
  faCartShopping,
  faClockRotateLeft,
  faHandHoldingDollar,
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
import '@/libs/acl'
import '@/libs/sweet-alerts'

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(ElementUI, {locale})

// Composition API
Vue.use(VueCompositionAPI)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
