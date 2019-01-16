// import * as types from './mutation_type';

export default {
    CHANGEMONTH (state, value) {
        if (value) {
            state.monthGift = value;
        }
    },
    CHANGECLAIMED (state, value) {
        if (value) {
            state.claimed = value;
        }
    }
};
