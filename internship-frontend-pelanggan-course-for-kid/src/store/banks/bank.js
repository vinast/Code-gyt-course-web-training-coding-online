import axios from "../../api/axios"
export default {
    state:{
        banks:[]
    },
    getters:{
        getBanks:(state)=>state.banks
    },
    mutations:{
        setBanks(state, banks){
            state.banks = banks
        }
    },
    actions:{
        async GET_BANKS({commit}, payload){
            await axios('/banks')
                .then(res=>{
                    commit("setBanks", res.data)
                })
                .catch(err=>{
                    console.log(err.response.data);
                })

        }
    },

}