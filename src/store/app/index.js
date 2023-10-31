import { $themeBreakpoints } from '@themeConfig'
import axiosIns from '@/libs/axios'

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,
  },
  getters: {
    currentBreakPoint: state => {
      const { windowWidth } = state
      if (windowWidth >= $themeBreakpoints.xl) return 'xl'
      if (windowWidth >= $themeBreakpoints.lg) return 'lg'
      if (windowWidth >= $themeBreakpoints.md) return 'md'
      if (windowWidth >= $themeBreakpoints.sm) return 'sm'
      return 'xs'
    },
  },
  mutations: {
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay
    },
  },
  actions: {
    fetchOptions(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axiosIns.get('/option/list',{params:queryParams})
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
  },
}
