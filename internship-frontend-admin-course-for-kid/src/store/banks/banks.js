import axios from "../../api/axios.js"
import router from "@/router/index.js"
export default {
    state:{
        banks:[],
        msg:{
            err:null,
            succ:null
        }

    },
    getters:{
        getBanks:(state)=>state.banks,
        getMsgErr:(state)=>state.msg.err,
        getMsgSucc:(state)=>state.msg.succ,

    },
    mutations:{
        SET_BANKS(state, banks){
            state.banks = banks
        },
        SET_ERR_MSG(state, data){
            state.msg.null = data
        },
        SET_SUCC_MSG(state, data){
            state.msg.succ = data
        }
    },
    actions:{
        async GETBANKS({commit}){
            try {
                const response = await axios.get('/banks')
                commit("SET_BANKS", response.data)
            } catch (error) {
                console.log(error);
            }
        },

        POST_BANK:({commit}, payload)=>{
            return new Promise((resolve, reject)=>{
                axios.post('/banks', payload)
                     .then(({data,status})=>{
                        commit("SET_SUCC_MSG", data.message)
                        if(status === 201){
                            resolve(true)
                        }
                     })
                     .catch(error =>{
                        commit("SET_ERR_MSG", error.response.data.message)
                        reject(error)
                     })
            })
        },
        async UPDATE_BANK({commit}, payload){
            try {
                await axios.patch('/banks/'+payload.id, payload.data)
                .then(res=>{
                    commit("SET_SUCC_MSG", res.data.message)

                })
                .catch(error=>{
                    commit("SET_ERR_MSG", error.response.data.message)

                })
            } catch (error) {
                commit("SET_ERR_MSG", error.response.data.message)

            }
        },
        async DELETE_BANK({commit}, payload){
            try {
                await axios.delete('/banks/'+payload)
                .then(res=>{
                    commit("SET_SUCC_MSG", res.data.message)

                })
                .catch(error=>{
                    commit("SET_ERR_MSG", error.response.data.message)

                })
            } catch (error) {
                commit("SET_ERR_MSG", error.response.data.message)

            }
        }
    },
}