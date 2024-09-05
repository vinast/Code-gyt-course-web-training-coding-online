import axios from "../../api/axios.js"
import router from "@/router/index.js"
export default {
    state:{
        errormessage: null,
        errlogout: null,
        id:null,
        email:null,
        name: null,
        role:null,
        users:null,
        auth: null,
    },
    getters:{
        getErrorMessage:state=>state.errormessage,
        getErrorLogout:state=>state.errorlogout,

        getName: state=>state.name,
        getId: state=>state.id,
        getRole: state=>state.role,
        getEmail: state=>state.email,
        getUser: state=>state.users,
        getAuth: state=>state.auth
    },
    mutations:{
        setErrormessage(state, data){
            state.errormessage = data
        },
        setErrorLogout(state, data){
            state.errorlogout = data
        },
        setName(state, data){
            state.name = data
        },
        setId(state, data){
            state.id = data
        },
        setRole(state, data){
            state.role = data
        },
        setEmail(state, data){
            state.email = data
        },
        setAuth(state, data){
            state.auth = data
        }
    },
    actions:{
        LOGIN:({commit}, payload)=>{
            return new Promise((resolve, reject)=>{
                axios
                        .post('/login', payload)
                        .then(({data, status})=>{
                            
                            if (data.role === 'admin') {
                                commit("setAuth", true)
                                commit("setId", data.id)
                                router.push({
                                    path:'/dashboard'
                                })
                            } else if(data.role === 'user') {
                                commit("setErrormessage", "403")
                                router.push({
                                    name:"login"
                                })
                            }

                            if (status === 200) {
                                resolve(true)
                            }
                        })
                        .catch(error =>{
                            commit("setErrormessage", error.response.data.message)
                            reject(error)
                        })

            })
        },
        GETME:({commit})=>{
            return new Promise((resolve, reject)=>{
                axios
                        .get('/me', )
                        .then(({data, status})=>{
                            commit("setId", data.id)
                            commit("setName", data.name)
                            commit("setEmail", data.email)
                            commit("setRole", data.role)
                            commit("setAuth", true)
                            if (status === 200) {
                                resolve(true)
                            }
                        })
                        .catch(error =>{
                            commit("setErrormessage", error.response.data.message)
                            reject(error)
                        })

            })
        },


        async LOGOUT({commit}){
            await axios.delete('/logout')
            .then(res=>{
                commit("setAuth", null)
                router.push({
                    name:"login"
                })
            })
            .catch(error=>{
                commit("setErrorLogout", error.response.data.message)
            })
        }
    },

}