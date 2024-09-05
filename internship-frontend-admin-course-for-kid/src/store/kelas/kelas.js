import axios from "../../api/axios.js"
import router from "@/router/index.js"
import { useRouter, useRoute } from 'vue-router'
export default {
    
    state:{
        kelas:[],
        errmsg: null,
        title:null
    },
    getters:{
        getKelas: (state)=>state.kelas,
        getErrMsg: (state)=>state.errmsg,
        getTitle: (state)=>state.title
    },
    actions:{
        async FETCHKELAS({commit}){
            try {
                const response = await axios.get('/kelas');
                commit("SET_KELAS", response.data)
            } catch (error) {
                commit("SET_ERRMSG", error.response.data.message)
            }
        },

        async POSTKELAS({commit}, payload){
            try {
                await axios.post("/kelas", payload,{
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response=>{
                    router.replace({name:"kelas"})
                })
            } catch (error) {
                commit("SET_ERRMSG", error.response.data.message)
            }
        },

        async GETKELASBYID({commit}) {
            const route = useRoute()
            await axios.get("/kelas/"+route.params.id)
            .then(res=>{
              commit("SET_TITLE", res.data.name)
            })
            .catch(err=>{
              console.log(err);
            })
          }

    },
    mutations:{
        SET_KELAS(state, kelas){
            state.kelas = kelas
        },
        SET_ERRMSG(state, errmsg){
            state.errmsg = errmsg
        },
        SET_TITLE(state, title){
            state.title = title
        }
    },
}


