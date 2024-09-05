// import {useRoute, useRouter} from "vue-router"
import router from "../../router"
import axios from "../../api/axios"

export default {
    state:{
        me:[],
        auth: null,
        user:[],
        msg:{
            err:null,
            succ:null
        }
      
    },
    getters:{
        getMe: state=>state.me,
        getErrMsg: state=>state.msg.err,
        getSuccMsg: state=>state.msg.succ,
        getAuth: state=>state.auth,
        getUser: state=>state.user
    },
    mutations:{
        setMe(state, me){
            state.me = me
        },
        setErrMsg(state, data ){
            state.msg.err = data
        },
        setSuccMsg(state, data ){
            state.msg.succ = data
        },
        setAuth(state, auth){
            state.auth = auth
        },
        setUser(state, user){
            state.user = user
        }

    },
    actions:{
        LOGIN:({commit}, payload)=>{
            return new Promise((resolve, reject)=>{
                axios
                        .post('/login', payload)
                        .then(({data, status})=>{
                            
                            if (data.role === 'user') {
                                router.push({
                                    path:'/myclass'
                                })
                                commit("setAuth", true)
                            } else if(data.role === 'admin') {
                                commit("setAuth", false)
                                router.push({
                                    name:"login"
                                  })
                            }
                            commit("setMe", data)
                            if (status === 200) {
                                resolve(true)
                            }
                        })
                        .catch(error =>{
                            commit("setErrMsg", error.response.data.message)
                            reject(error)
                        })

            })
        },
        REGISTER:({commit}, payload)=>{
            return new Promise((resolve, reject)=>{
                axios
                        .post('/register', payload)
                        .then(({data, status})=>{
                            commit("setSuccMsg", data.message)
                            console.log(data.msg);
                            if (status === 201) {
                                resolve(true)
                            }
                        })
                        .catch(error =>{
                            commit("setErrMsg", error.response.data.message)
                            reject(error)
                        })

            })
        },
        GETME:({commit})=>{
            return new Promise((resolve, reject)=>{
                axios
                        .get('/me')
                        .then(({data, status})=>{
                            commit("setMe", data)
                            commit("setAuth", true)

                            if (status === 200) {
                                resolve(true)
                            }
                        })
                        .catch(error =>{
                            commit("setErrMsg", error.response.data.message)
                            reject(error)
                        })

            })
        },

        UPDATEUSER({commit}, payload){
            return new Promise((resolve, reject)=>{
                axios
                        .patch(`/users/${payload.id}`, payload.data)
                        .then(({ data,status})=>{
                            commit("setSuccMsg", data.message)
                            if (status === 200) {
                                resolve(true)
                            }
                        })
                        .catch(error =>{
                            commit("setErrMsg", error.response.data.message)
                            reject(error)
                        })

            })
        },

        async LOGOUT({commit}){
           try {
            await axios.delete('/logout')
            .then(res=>{
                commit("setAuth", false)
                router.push({
                    path:'/'
                })
            })
           } catch (error) {
            commit("setErrMsg", error.response.data.message)
           }
        }
    },

}