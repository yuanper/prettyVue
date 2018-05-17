import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    active: 0
}
const mutations = {
    changeTab(state,active){
        console.log(active)
        state.active = active
    }
}
export default new Vuex.Store({
    state,
    mutations
})