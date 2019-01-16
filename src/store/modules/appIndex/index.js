import actions from './actions';
import mutations from './mutations';
export default {
    state: {
        appHeadertitle: '会员中心',
        appHeadershow: '',
        appIntegration: 0,
        userLevel: 1,
        userGrowVal: 0,
        userId: 0,
        iconId: '',
        iconTitle:'',
        remarkInfo: ''
    },
    actions: actions,
    mutations: mutations,
    getters: {
        // filterDoned: function (state) {
            // 已完成的todo
            // let todoList = state.todoList.filter((item) => {
            //     if (item.isDone) {
            //         return item;
            //     }
            // });
            // return todoList;
        // }
    }
};
