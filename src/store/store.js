import { createStore } from 'vuex';
import axios from 'axios';
import router from '@/routers/router.js';

const baseUrl = 'http://localhost:9000/api/v1/';

const store = createStore({
    state: () => ({
        isAuth: false,
        errors: [],
        files: [],
        isFilesLoading: false,
        isFileUploading: false,
    }),
    getters: {},
    mutations: {
        setIsAuth(state, isAuth) {
            state.isAuth = isAuth;
        },
        addError(state, error) {
            state.errors.push(error);
        },
        clearErrors(state) {
            state.errors = [];
        },
        setIsFilesLoading(state, isFilesLoading) {
            state.isFilesLoading = isFilesLoading;
        },
        setFiles(state, files) {
            state.files = files;
        },
        setIsFileUploading(state, isFileUploading) {
            state.isFileUploading = isFileUploading;
        }
    },
    actions: {
        login({ commit }, user) {
            commit('clearErrors');

            if (!user.username) {
                commit('addError', "Вы не ввели логин");
                return;
            }

            if (!user.password) {
                commit('addError', "Вы не ввели пароль");
                return;
            }

            axios.post(baseUrl + "users/login/", {
                username: user.username,
                password: user.password,
            }).then(res => {
                const token = res.data.token;
                localStorage.setItem('token', token);
                axios.defaults.headers.common = {'Authorization': `Token ${token}`}
                commit('setIsAuth', true);
                router.push('/');
            }).catch(err => {
                commit('addError', err.response.data.non_field_errors[0])
            })
        },
        load({ commit }) {
            const token = localStorage.getItem('token');

            if (token) {
                axios.defaults.headers.common = {'Authorization': `Token ${token}`};
                commit('setIsAuth', true);
            }
        },
        fetchFiles({ commit }) {
            commit('setIsFilesLoading', true);

            axios.get(baseUrl + 'list/')
                .then(res => {
                    commit('setFiles', res.data);
                    commit('setIsFilesLoading', false);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        downloadFile(_, { id, label }) {
            axios.get(baseUrl + `download/${id}`, { responseType: 'blob' })
            .then(response => {
                const blob = new Blob([response.data], { type: 'application/pdf' })
                const link = document.createElement('a')
                link.href = URL.createObjectURL(blob)
                link.download = label;
                link.click()
                URL.revokeObjectURL(link.href)
            }).catch(console.error)
        },
        deleteFile({ dispatch }, id) {
            axios.delete(baseUrl + `delete/${id}/`)
                .then(res => {
                    console.log(res);
                    dispatch('fetchFiles');
                })
        },
        uploadFile({ commit }, file) {
            commit('setIsFileUploading', true);
            const formData = new FormData();
            formData.append('file', file);
            axios.post(baseUrl + 'upload/', 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            ).then(res => {
                console.log(res);
                commit('setIsFileUploading', false);
            }).catch(err => {
                console.log(err);
            })
        },
        logout({ state, commit }) {
            if(!state.isAuth) {
                return;
            }

            commit('setIsAuth', false);
            localStorage.removeItem('token');
            router.push('/login')

        }
}})

export default store;
