import http from '@/services/auth'

const state = {
    authStatus: localStorage.getItem('auth') || null,
}

const getters = {
    logedIn(){
        if(state.authStatus == null){
            return false
        }else{
            if(state.authStatus == "eyJpdiI6IlhqeWNCZjF3MWhJenRNY0pOcE1rMEE9PS"){
                return true
            }else{
                return false
            }
        }
    }
}

const mutations = {
    signIn(state, passkey){
        state.authStatus = passkey
    },
    signOut(state){
        localStorage.removeItem('auth')
        state.authStatus = null
    },
    destroyLogedIn(){
        localStorage.removeItem('auth')
        state.authStatus = null
    },
}

const actions = {
    destroyLogedIn(context){
        context.commit('destroyLogedIn')
        window.location.href = '/'
    },
    signOut(context){
        return new Promise((resolve, reject) => {
            http.post('logout')
                .then(response => {
                    context.commit('signOut')
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    signIn(context, credential){
        return new Promise((resolve, reject) => {
            http.post(`login`, credential)
                .then(response => {
                    localStorage.setItem('auth', response.data.passkey)
                    context.commit('signIn', response.data.passkey)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}