import {createStore} from 'vuex';
import user from './user/user'
import ult from './ult/ult'
import kelas from './kelas/kelas';
import bank from './banks/bank';
import transaksi from './transaksi/transaksi';
import langganan from './langganan/langganan';
import content from './contents/content';
import category from './category/category';

export default createStore({
    modules:{
        ult:ult,
        user: user,
        kelas:kelas,
        bank: bank,
        transaksi: transaksi,
        langganan: langganan,
        content: content,
        category: category
    }

})


// export default {
//     state:{},
//     getters:{},
//     mutations:{},
//     actions:{},

// }