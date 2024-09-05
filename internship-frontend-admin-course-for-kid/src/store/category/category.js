import axios from "../../api/axios.js"
import router from "@/router/index.js"
export default {
    state:{
        category:[],
        message:{
            err:null,
            succ:null
        }
    },
    getters:{
        getCategory: (state)=>state.category,
        getErr_Msg: (state)=>state.message.err,
        getSuccMsg: (state)=>state.message.succ
    },
    mutations:{
        SET_CATEGORY(state, category){
            state.category = category
        },
        SET_ERRMSG(state, data){
            state.message.err = data
        },
        SET_SUCCMSG(state, data){
            state.message.succ = data
        }
    },
    actions:{
        async GETCATEGORY({commit}){
            try {
                const response = await axios.get('/category')
                commit("SET_CATEGORY", response.data)
            } catch (error) {
             
            }
        },
                
        POST_CATEGORY:({commit}, payload)=>{
            return new Promise((resolve, reject)=>{
                axios
                        .post("/category", payload)
                        .then(({data, status})=>{
                            commit("SET_SUCCMSG", data.message)
                            if (status === 201) {
                                resolve(true)
                            }
                        })
                        .catch(error =>{
                      
                            commit("SET_ERRMSG", error.response.data[0].message)
                            reject(error)
                        })

            })
        },
    },
}