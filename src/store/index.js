const Store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increament(state) {
            state.count++;
        }
    }
});