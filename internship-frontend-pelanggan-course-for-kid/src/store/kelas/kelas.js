import axios from "../../api/axios"
export default {
  state: {
    kelas: [],
    kelasByCategory: [],

    // errMsg: null,
  },
  getters: {
    // getErrMesg: (state) => state.errMsg,
    getKelas:(state)=>state.kelas,
    getKelasByCategory:(state)=>state.kelasByCategory

  },
  mutations: {
    // setErrMsg(state, errMsg) {
    //   state.errMsg = errMsg;
    // },
    setKelas(state, kelas){
        state.kelas = kelas
    },
    setKelasByCategory(state, kelasByCategory){
      state.kelasByCategory = kelasByCategory
  }
  },
  actions: {
    async GET_KELAS({commit}) {
        try {
           await axios.get('/kelas')
           .then(res=>{
            commit("setKelas", res.data)
           })
        } catch (error) {
          console.error(error);
        }
      },
      async GET_KELAS_BY_ID({commit}, payload) {
        try {
           await axios.get('/kelas/'+payload)
           .then(res=>{
            commit("setKelas", res.data)
           })
        } catch (error) {
        }
      },
      async GET_KELAS_BY_CATEGORY({commit}, payload) {
        try {
           await axios.get('/kelas/category/'+payload)
           .then(res=>{
            commit("setKelasByCategory", res.data)
           })
        } catch (error) {
        }
      }
  },
  
};
