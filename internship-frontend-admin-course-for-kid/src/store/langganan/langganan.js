import axios from "../../api/axios.js"
import router from "@/router/index.js"
export default {
    state:{
    },
    getters:{
    },
    mutations:{
    },
    actions:{
        async POST_LANGGANAN({commit}, payload){
            try {
                await axios.post('/langganan', payload)
                .then(res=>{
                })
            } catch (error) {
                console.log(error.response.data.msg);
            }

        }
    },
}