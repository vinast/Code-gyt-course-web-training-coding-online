import BaseButton from '../components/Button/BaseButton.vue'
import BaseInput from '../components/DataInput/BaseInput.vue'
import hidePassword from '../components/icons/hidePassword.vue'
import showPassword from '../components/icons/showPassword.vue'
import SuccessAlert from '../components/Alert/SuccessAlert.vue'
import ErrorAlert from '../components/Alert/ErrorAlert.vue'
import CardTable from '../components/ResponsiveTable/CardTable.vue'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import LoadingSpin from '../components/loading/spiner.vue';
import Transition from '../components/Transition/Transition.vue'


// partial
import Navbar from '../components/Navbar/Navbar.vue'
import MenuItems from '../components/Menu/MenuItems.vue'

// icon
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faHouse, faBars, faXmark, faBook, faBookBookmark, faWallet  } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faHouse, faBars, faXmark,faBook, faBookBookmark, faWallet  )


export default app =>{
    // icon
    app.component('font-awesome-icon', FontAwesomeIcon)

    app.component('base-button', BaseButton)
    app.component('base-input', BaseInput)
    app.component('hide-pass', hidePassword)
    app.component('show-pass', showPassword)
    app.component('nav-bar', Navbar)
    app.component('menu-items', MenuItems)
    app.component('success-alert', SuccessAlert)
    app.component('error-alert', ErrorAlert)
    app.component('EasyDataTable', Vue3EasyDataTable),
    app.component('card-table', CardTable)
    app.component('loading-spin', LoadingSpin)
    app.component('transition-element', Transition)

}