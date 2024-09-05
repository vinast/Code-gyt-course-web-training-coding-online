import axios from "../../api/axios"
export default {
    state:{
        categories: [],
        category: [],
    },
    getters:{
        getCategories: state =>state.categories,
        getCategory: state =>state.category
    },
    mutations:{
        setCategories(state, data){
            state.categories = data
        },
        setCategory(state, data){
            state.category = data
        }
    },
    actions:{
        async GET_CATEGORIES({commit}, payload){
            await axios.get('/category')
            .then(res=>{
                commit("setCategories", res.data)
            })
            .catch(err=>{
                console.log(err.response.data)
            })
        },
        async GET_CATEGORIES_BY_ID({commit}, payload){
            await axios.get(`/category/${payload}`)
            .then(res=>{
                commit("setCategory", res.data)
            })
            .catch(err=>{
                console.log(err.response.data)
            })
        },

    },

}