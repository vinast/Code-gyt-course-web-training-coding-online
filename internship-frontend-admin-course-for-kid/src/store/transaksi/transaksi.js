import axios from "../../api/axios.js";
import router from "@/router/index.js";
export default {
  state: {
    transaksi_details: [],
    msg: {
      err: null,
      succ: null,
    },
  },
  getters: {
    GET_TRANSAKSI: (state) => state.transaksi_details,
    GET_ERR_MSG: (state) => state.msg.err,
    GET_SUCC_MSG: (state) => state.msg.succ,
  },
  mutations: {
    SET_TRANSAKSI(state, transaksi_details) {
      state.transaksi_details = transaksi_details;
    },
    SET_ERR_MSG(state, data) {
      state.msg.err = data;
    },
    SET_SUCC_MSG(state, data) {
      state.msg.succ = data;
    },
  },
  actions: {
    async FETCH_TRANSAKSI({ commit }) {
      try {
        const response = await axios.get("/transaksi");
        commit("SET_TRANSAKSI", response.data);
      } catch (error) {
        console.log(error);
      }
    },

    async KONFIRMASI_ADMIN({ commit }, payload) {
      try {
        await axios
          .patch("/transaksiadmin/" + payload.id, payload.data)
          .then((res) => {})
          .catch((error) => {});
      } catch (error) {
        console.log(error);
      }
    },

    DELETE_TRANSAKSI: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/transaksi/${payload}`)
          .then(({ data, status }) => {
            commit("SET_SUCC_MSG", data.message);
            if (status === 200) {
              resolve(true);
            }
          })
          .catch((error) => {
            commit("SET_ERR_MSG", error.response.data.message);
            reject(error);
          });
      });
    },
  },
};
