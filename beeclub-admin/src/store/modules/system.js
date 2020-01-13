const system = {
  state: {
    navs: [
      {
        name: "dashboard",
        title: "首页",
        path: "/dashboard",
        fullPath: "/dashboard"
      }
    ],
    activeNavIndex: "dashboard",
    defaultActive:'dashboard'
  },
  mutations: {
    addNav: (state, data) => {
      const navs = state.navs;
      for (var nav of navs) {
        if (nav.name == data.name) {
          return;
        }
      }

      state.navs.push({
        name: data.name,
        title: data.meta.title,
        path: data.path,
        fullPath: data.fullPath
      });
    },
    closeNav: (state, nav) => {
    //   const navs = state.navs.slice();
      // for(var i = 0; i < navs.len)
      for (const [i, v] of state.navs.entries()) {
        if (v.name == nav.name) {
          state.navs.splice(i, 1);
          break;
        }
      }
    },
    activeMenu: (state, index) => {
      state.defaultActive = index
    }
  },
  actions: {
    addNav({ commit }, route) {
      commit("addNav", route);
    },
    closeNav({ commit }, nav) {
      commit("closeNav", nav);
    },
    activeMenu({ commit }, index) {
      commit("activeMenu", index);
    }
  }
};

export default system;
