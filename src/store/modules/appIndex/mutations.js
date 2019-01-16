// import * as types from './mutation_type';

export default {
    CHANGETITLE (state, titleText) {
        if (titleText) {
            state.appHeadertitle = titleText;
        }
    },
    CHANGESUBTITLE (state, titleText) {
        if (titleText) {
            state.appHeadershow = titleText;
        }
    },
    CHANGEINTEGRATION (state, value) {
        if (value) {
            state.appIntegration = value;
        }
    },
    CHANGEUSERLEVEL (state, value) {
        if (value) {
            state.userLevel = value;
        }
    },
    CHANGEUSERGROWVAL (state, value) {
        if (value) {
            state.userGrowVal = value;
        }
    },
    CHANGEUSERID (state, value) {
        if (value) {
            state.userId = value;
        }
    },
    CHANGEICONID (state, value) {
        if (value) {
            state.iconId = value;
        }
    },
    CHANGEICONTITLE (state, value) {
        if (value) {
            state.iconTitle = value;
        }
    },
    CHANGEREMARKINFO (state, value) {
        state.remarkInfo = value;
    }
};
