import axios from "axios";

export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
        loginFailed: false,
        otpVerified: false,
        signupFailed: false,
        // refreshFailed: false,
        otpRequired: false,
        errors: [],
        isAdmin: false,
    },
    getters: {
        authenticated(state) {
            return state.token;
        },

        user(state) {
            return state.user;
        },

        otpRequired(state) {
            return state.otpRequired;
        },

        isAdmin(state) {
            return state.isAdmin;
        }


    },
    mutations: {
        SET_TOKEN(state, token) {
            // if (token !== 'token_black_listed') {
            //     state.token = token;
            // }
            state.token = token;
        },
        SET_USER_INFO(state, data) {
            state.user = data ? data.data[0] : null
            state.isAdmin = data.data[0].is_admin
        },
        SET_LOGIN_FAILED(state, value) {
            state.loginFailed = value;
        },
        SET_OTP_VERIFIED(state, value) {
            state.otpVerified = value;
        },
        SET_SIGNUP_STATUS(state, value) {
            state.signupFailed = value.bool;
            state.errors = value.errors;
        },
        // SET_REFRESH_FAILED(state, value) {
        //     state.refreshFailed = value;
        // },
        SET_OTP_REQUIRED(state, value) {
            state.otpRequired = value;
        }
    },
    actions: {
        // async refresh({ dispatch, commit }, token) {
        //     try {
        //         let response = await axios.post('auth/refresh', token)
        //         if (! response.data.success && response.data.status === 'Token Expired') {
        //             return dispatch('attempt', response.data.token);
        //         }
        //
        //     } catch (e) {
        //         // commit('SET_REFRESH_FAILED', true)
        //         commit('SET_TOKEN', 'token_black_listed')
        //         commit('SET_USER_INFO', null)
        //     }
        // },

        async login({ dispatch, commit }, credentials) {
            try {
                console.log('credentials', credentials)
                let response = await axios.post('auth/login', credentials);
                if (response.data.otp_required) {
                    commit('SET_OTP_REQUIRED', true);
                } else {
                    return dispatch('attempt', response.data.token);
                }
            } catch (e) {
                console.log(e);
                commit('SET_LOGIN_FAILED', true);
            }
        },

        async verifyOTP({ dispatch, commit }, credentials) {
            try {
                let response = await axios.post('auth/verify', credentials);
                commit('SET_OTP_VERIFIED', true);
                return dispatch('attempt', response.data.token);

            } catch (error) {
                commit('SET_OTP_VERIFIED', false)
            }
        },

        async register({ commit }, credentials) {
            try {
                let response = await axios.post('auth/signup', credentials)
                console.log(response)
            } catch (error) {
                commit('SET_SIGNUP_STATUS', {
                    bool: true,
                    errors: error.response?.data?.errors,
                })
            }
        },

        async attempt({commit, state}, token) {

            if (token) {
                commit('SET_TOKEN', token);
            }

            if (!state.token) {
                return
            }

            try {
               let user = await axios.get('auth/myself', {
                   headers: {
                       'Authorization': 'Bearer ' + token
                   }
               });
               commit('SET_USER_INFO', user.data);

            }catch (e){
                commit('SET_TOKEN', null)
                commit('SET_USER_INFO', null)
            }
        },

        logout({commit}) {
            return axios.post('auth/logout').then(() => {
                commit('SET_TOKEN', null)
                commit('SET_USER_INFO', null)
            })
        },

        async getAuthInfo({ commit }, token) {
            try {
                let user = await axios.get('auth/myself', token);
                commit('SET_USER_INFO', user.data);

            }catch (e){
                commit('SET_USER_INFO', null)
            }
        }
    }
}
