/*
* 此配置用于初始化项目全局配置
* displayAsider 用于控制左侧栏的显示和隐藏
* displayHeader 用于控制顶部栏的显示和隐藏
* displayFooter 用于控制底部栏的显示和隐藏
*/
export default {
	namespaced: true,
	state: {
		displayAsider: true,
		displayHeader: false,
		displayFooter: false,
		isCollapse: true,
	},
	mutations: {
		TOGGLE_DISPLAY_ASIDER: (state) => {
			state.displayAsider = !state.displayAsider;
		},
		TOGGLE_DISPLAY_HEADER: (state) => {
			state.displayHeader = !state.displayHeader;
		},
		TOGGLE_DISPLAY_FOOTER: (state) => {
			state.displayFooter = !state.displayFooter;
		},
		TOGGLE_MENU_COLLAPSE: (state) => {
			state.isCollapse = !state.isCollapse;
		},
	},
	actions: {
		toggleDisplayAsider({commit}) {
			commit('TOGGLE_DISPLAY_ASIDER');
		},
		toggleDisplayHeader({commit}) {
			commit('TOGGLE_DISPLAY_HEADER');
		},
		toggleDisplayFooter({commit}) {
			commit('TOGGLE_DISPLAY_FOOTER');
		},
		toggleMenuCollapse({commit}) {
			commit('TOGGLE_MENU_COLLAPSE');
		},
	}
}
