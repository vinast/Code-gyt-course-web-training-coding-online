import axios from "../../api/axios"
export default {
    state:{
        transaksi:[],
        msg:{
            err:null,
            succ:null
        }
    },
    getters:{
        getTransaksi: state=>state.transaksi,
        getMsgSucc: state=>state.msg.succ,
        getMsgErr: state=>state.msg.err

    },
    mutations:{
        setTransaksi(state, transaksi){
            state.transaksi = transaksi
        },
        setMsgErr(state, data){
            state.msg.err = data
        },
        setMsgSucc(state, data){
            state.msg.succ = data
        },
    },
    actions:{
        BELI_KELAS:async ({commit}, payload)=>{
                await axios
                        .post('/transaksi', payload)
                        .then((res)=>{
                            commit("setMsgSucc", res.data.message)
                        })
                        .catch(error =>{
                            commit("setMsgErr", error.response.data.message)
                            
                        })
        },

        TRIAL_KELAS:async ({commit}, payload)=>{
            await axios
                    .post('/trials', payload)
                    .then((res)=>{
                        commit("setMsgSucc", res.data.message)
                    })
                    .catch(error =>{
                        commit("setMsgErr", error.response.data.message)
                        
                    })
    },

        FETCH_TRANSAKSI:({commit}, payload)=>{
            return new Promise((resolve, reject)=>{
                axios
                        .get(`/gettransaksiuser/${payload}` )
                        .then(({data, status})=>{
                            commit("setTransaksi", data)
                            if (status === 200) {
                                resolve(true)
                            }
                        })
                        .catch(error =>{
                          reject(error)
                        })

            })
        },

        KONFIRMASI_TRANSAKSI:({commit}, payload)=>{
            return new Promise((resolve, reject)=>{
                axios
                        .patch(`/transaksiuser/${payload.id}`, payload.data,{
                            headers:{
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(({data, status})=>{
                            commit("setMsgSucc", data.message)
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
    },

}