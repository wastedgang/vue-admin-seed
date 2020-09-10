const state = {
    userinfo : {}
}

const mutations = {
    setUserinfo(state,playload) {
        state.userinfo.userinfo = playload
    }
}

const actions = {
    setUserinfo({commit},playload) {
        commit('userinfo.setUserinfo',playload)
    }
}

export {
    state,
    mutations,
    actions
}