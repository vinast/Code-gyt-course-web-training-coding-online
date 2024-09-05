export default {
    state:{
        showModal: false,
        disModal: false,
    },
    getters:{
        GET_SHOWMODAL:(state)=>state.showModal,
        GET_DISMODAL:(state)=>state.disModal
    },
    mutations:{
        SET_MODAL(state, data){
            state.showModal = data
        },
        SET_DISMODAL(state, data){
            state.disModal = data
        }
    },
    actions:{
        DisplayModal({commit, getters}){
            commit("SET_MODAL", !getters.GET_SHOWMODAL)            
        },

        TOGGLE_DELETE_MODAL({commit, getters}){
            commit("SET_DISMODAL", !getters.GET_DISMODAL)
        }
    },
}