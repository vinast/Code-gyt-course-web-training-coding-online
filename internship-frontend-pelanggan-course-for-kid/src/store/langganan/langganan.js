import axios from "../../api/axios"
export default {
    state:{
        langganan:[],
    },
    getters:{
        getLangganan:(state)=>state.langganan
    },
    mutations:{
        setLangganan(state, langganan){
            state.langganan = langganan
        }
    },
    actions:{
        async FETCH_LANGGANAN_KELAS({commit}, payload){
            await axios(`/langganan/${payload}`)
                .then(res=>{
                    commit("setLangganan", res.data)
                })
                .catch(err =>{
                    console.log(err);
                })
        }
    },

}