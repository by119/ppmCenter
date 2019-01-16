// import * as types from './mutation_type';
export default {
    CHANGETITLE ({ commit }, titleText) {
        commit('CHANGETITLE', titleText);
    },
    CHANGESUBTITLE ({ commit }, titleText) {
        commit('CHANGESUBTITLE', titleText);
    },
    CHANGEINTEGRATION ({ commit }, value) {
        commit('CHANGEINTEGRATION', value);
    },
    CHANGEUSERLEVEL ({ commit }, value) {
        commit('CHANGEUSERLEVEL', value);
    },
    CHANGEUSERGROWVAL ({ commit }, value) {
        commit('CHANGEUSERGROWVAL', value);
    },
    CHANGEUSERID ({ commit }, value) {
        commit('CHANGEUSERID', value);
    },
    CHANGEICONID ({ commit }, value) {
        commit('CHANGEICONID', value);
    },
    CHANGEICONTITLE ({ commit }, value) {
        commit('CHANGEICONTITLE', value);
    },
    CHANGEREMARKINFO ({ commit }, value) {
        commit('CHANGEREMARKINFO', value);
    }
};
