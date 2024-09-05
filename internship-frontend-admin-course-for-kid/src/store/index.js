import {createStore} from 'vuex';
import user from './user/user'
import kelas from './kelas/kelas';
import category from './category/category';
import materi from './materi/materi';
import banks from './banks/banks';
import transaksi from './transaksi/transaksi';
import langganan from './langganan/langganan';
import ult from './ult/ult';

export default createStore({
    modules:{
        user: user,
        kelas: kelas,
        category: category,
        materi:materi,
        banks: banks,
        transaksi: transaksi,
        langganan: langganan,
        ult: ult
        
    }
})

// import axios from "../../api/axios.js"
// import router from "@/router/index.js"
// export default {
//     state:{
//     },
//     getters:{
//     },
//     mutations:{
//     },
//     actions:{
        
//     },
// }