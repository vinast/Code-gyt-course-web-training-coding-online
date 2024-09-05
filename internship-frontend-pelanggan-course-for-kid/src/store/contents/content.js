import axios from "../../api/axios"

export default {
    state:{
        contents:null,
        contentsfree:null,
        content:[],
    },
    getters:{
        getContents:(state)=>state.contents,
        getContent:(state)=>state.content,
        getFreeContents:(state)=>state.contentsfree
    },
    mutations:{
        setContents(state, contents){
            state.contents = contents
        },
        setFreeContents(state, contentsfree){
            state.contentsfree = contentsfree
        },
        setContent(state, content){
            state.content = content
        }
    },
    actions:{
        async GET_CONTENTS({commit}, payload){
            await axios.get(`/materi/${payload}`)
                .then(res=>{
                    commit("setContents", res.data)
                })
                .catch(err=>{
                    
                })
        },

        async GET_FREECONTENTS({commit}, payload){
            await axios.get(`/materifree/${payload}`)
                .then(res=>{
                    commit("setFreeContents", res.data)
                })
                .catch(err=>{
                    console.log(err.response.data);
                })
        },

        async GET_CONTENTS_BYID({commit}, payload){
            await axios.get(`/contentid/${payload}`)
                .then(res=>{
                    commit("setContent", res.data)
                })
                .catch(err=>{
                    console.log(err.response.data);
                })
        },


    },

}