import actions from './actions';
import mutations from './mutations';
export default {
    state: {
        monthGift: 0,
        claimed: 0
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
