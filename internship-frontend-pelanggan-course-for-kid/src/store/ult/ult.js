export default {
    state:{
        webtitle:"Code GYT",
        showmobilenav: false,
        showmodal: false
    },
    
    mutations:{
        setToggleNav(state){
            state.showmobilenav = !state.showmobilenav
        },
        setShowModal(state, data){
            state.showmodal = data
        }
    },
    actions:{
        toggleNav({commit, state}){
            commit('setToggleNav')
        },
        toggleModal({commit, getters}){
            commit("setShowModal", !getters.getShowModal)
        }
    },
    getters:{
        getWebTitle: state=>state.webtitle,
        getShowMobileNav: state=>state.showmobilenav,
        getShowModal: state=>state.showmodal,

    },

}