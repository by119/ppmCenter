// import * as types from './mutation_type';
export default {

    CHANGEMONTH ({ commit }, titleText) {
        commit('CHANGEMONTH', titleText);
    },
    CHANGECLAIMED ({ commit }, value) {
        commit('CHANGECLAIMED', value);
    }
};
