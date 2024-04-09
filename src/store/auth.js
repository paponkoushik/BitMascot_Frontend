import axios from "axios";

export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
        loginFailed: false,
        signupFailed: false,
        refreshFailed: false,
        otpRequired: false,
        errors: []
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
        }

    },
    mutations: {
        SET_TOKEN(state, token) {
            if (token !== 'token_black_listed') {
                state.token = token;
            }
        },
        SET_USER_INFO(state, data) {
            state.user = data ? data.data[0] : null
        },
        SET_LOGIN_FAILED(state, value) {
            state.loginFailed = value;
        },
        SET_SIGNUP_FAILED(state, value) {
            state.signupFailed = value.bool;
            state.errors = value.errors;
        },
        SET_REFRESH_FAILED(state, value) {
            state.refreshFailed = value;
        },
        SET_OTP_REQUIRED(state, value) {
            state.otpRequired = value;
        }
    },
    actions: {
        async refresh({ dispatch, commit }, token) {
            try {
                let response = await axios.post('auth/refresh', token)
                if (! response.data.success && response.data.status === 'Token Expired') {
                    return dispatch('attempt', response.data.token);
                }

            } catch (e) {
                commit('SET_REFRESH_FAILED', true)
                commit('SET_TOKEN', 'token_black_listed')
                commit('SET_USER_INFO', null)
            }
        },
        // async login({ dispatch, commit }, credentials) {
        //     try {
        //         let response = await axios.post('auth/login', credentials)
        //         return dispatch('attempt', response.data.token);
        //     } catch (e) {
        //         console.log(e)
        //         commit('SET_LOGIN_FAILED', true)
        //     }
        // },

        async login({ dispatch, commit }, credentials) {
            try {
                let response = await axios.post('auth/login', credentials);
                if (response.data.otpRequired) {
                    // OTP verification is required, update the state
                    commit('SET_OTP_REQUIRED', true);
                } else {
                    // No OTP verification required, proceed with authentication
                    return dispatch('attempt', response.data.token);
                }
            } catch (e) {
                console.log(e);
                commit('SET_LOGIN_FAILED', true);
            }
        },



        async verifyOTP({ dispatch, commit }, { email, otp }) {
            try {
                let response = await axios.post('auth/verify-otp', { email, otp });
                // OTP verification successful, proceed with authentication
                return dispatch('attempt', response.data.token);
            } catch (error) {
                // Handle OTP verification failure
                console.error('OTP verification failed:', error);
            }
        },

        async register({ dispatch, commit }, credentials) {
            try {
                let response = await axios.post('auth/signup', credentials)
                return dispatch('attempt', response.data.token);
            } catch (error) {
                commit('SET_SIGNUP_FAILED', {bool: true, errors: error.response?.data?.errors})
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
