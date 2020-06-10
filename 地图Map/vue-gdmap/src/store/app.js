import Cookies from 'js-cookie'

const state = {
  sidebar: {
    isAlwaysHidden: false,
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  menus: [],
  menuIndex: '1',
  menuBasePath: '',
  globalLoading: false,
  closeGlobalLoading: false,
  isFullScreen: false,
  appConfig: PROJECT_CONFIG
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_MENUS_INDEX: (state, index) => {
    state.menuIndex = index
  },
  TOGGLE_SIDEBAR_HIDDEN: (state, isHidden) => {
    state.sidebar.isAlwaysHidden = isHidden
  },
  SET_MENUS_BASEPATH: (state, menuBasePath) => {
    state.menuBasePath = menuBasePath
  },
  SHOW_GLOBAL_LOADING: (state) => {
    state.globalLoading = true
  },
  HIDE_GLOBAL_LOADING: (state) => {
    state.globalLoading = false
  },
  DISABLE_GLOBAL_LOADING: (state) => {
    state.closeGlobalLoading = true
  },
  ENABLE_GLOBAL_LOADING: (state) => {
    state.closeGlobalLoading = false
  },
  SET_FULL_SCREEN(state, status) {
    state.isFullScreen = status
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  showGlobalLoading({ commit }) {
    commit('SHOW_GLOBAL_LOADING')
  },
  hideGlobalLoading({ commit }) {
    commit('HIDE_GLOBAL_LOADING')
  },
  enableGlobalLoading({ commit }) {
    commit('ENABLE_GLOBAL_LOADING')
  },
  disableGlobalLoading({ commit }) {
    commit('DISABLE_GLOBAL_LOADING')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setMenus({ commit }, menus) {
    commit('SET_MENUS', menus)
  },
  setMenuIndex({ commit }, index) {
    commit('SET_MENUS_INDEX', index)
  },
  toggleSideBarHidden({ commit }, isHidden) {
    commit('TOGGLE_SIDEBAR_HIDDEN', isHidden)
  },
  setMenuBasePath({ commit }, menuBasePath) {
    commit('SET_MENUS_BASEPATH', menuBasePath)
  },
  setFullScreen({ commit }, status) {
    commit('SET_FULL_SCREEN', status)
  }
}
const getters = {
  sidebar: state => state.sidebar,
  globalLoading: state => state.globalLoading,
  closeGlobalLoading: state => state.closeGlobalLoading,
  menus: state => state.menus,
  menuIndex: state => state.menuIndex,
  menuBasePath: state => state.menuBasePath,
  device: state => state.device,
  isFullScreen: state => state.isFullScreen,
  appConfig: state => state.appConfig
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
