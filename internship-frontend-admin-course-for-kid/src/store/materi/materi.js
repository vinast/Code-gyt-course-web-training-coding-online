import axios from "../../api/axios.js"
import router from "@/router/index.js"
export default {
    state:{
        msg:{
            err:null,
            succ:null
        }
    },
    getters:{
        GET_ERR:(state)=>state.msg.err,
        GET_SUCC:(state)=>state.msg.succ

    },
    mutations:{
        SET_ERR_MSG(state, data){
            state.msg.err = data
        },
        SET_SUCC_MSG(state, data){
            state.msg.succ = data
        }
    },
    actions:{
        async POST_MATERI({commit}, payload){
            try {
                await axios.post("/content", payload)
                .then(response=>{
                    commit("SET_SUCC_MSG", response.data.message)
                })
            } catch (error) {
                commit("SET_ERR_MSG", error.response.data.message)

            }
        },
        async UPDATE_MATERI({commit}, payload){
            try {
                await axios.patch(`/content/${payload.id}`, payload.data)
                .then(response=>{
                                        commit("SET_SUCC_MSG", response.data.message)
                })
            } catch (error) {                commit("SET_ERR_MSG", error.response.data.message)
            }
        },
        
    },
    
        
    
}