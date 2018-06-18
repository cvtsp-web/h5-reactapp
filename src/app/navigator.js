/**
 * 新创建一个webview
 * @param {Object} options: {path, styles, query}
 * @param {String} path: 指定打开的地址
 * @param {Object} styles: webview样式
 * @param {Object} query: 创建Webview窗口的额外扩展参数
 * @return {Webview} webview对象
 */
const addRoute = function(options) {
	const {path, styles, query} = options;
	var webview = plus.webview.getWebviewById(options.id);
	
	// webview不存在则创建新的webview
	if(!webview) {
		webview = plus.webview.create(path, null, styles, {query});
	}
	return webview;
}

/**
 * 新建打开一个webview
 * @param {Object} options: {path, id, styles, aniShow, duration, showedCB}
 * @param {String} path: 指定打开的地址
 * @param {String} id:  当前webview指定的id(唯一)
 * @param {Object} styles: webview样式：如窗口宽、高、位置等信息
 * @param {String} aniShow: none(默认) slide-in-right, slide-in-left, slide-in-top, slide-in-bottom
 * @param {Function} afterRouter: Webview窗口显示完成的回调函数
 */
const push = function(options) {
	var { path, query, styles, aniShow, duration, afterRouter } = options;
	var webview = addRoute({
		...options,
		path: `${path}.html`
	});
	
	webview.show(aniShow || 'slide-in-right', duration, afterRouter);
	return webview;
}

/**
 * 回退到上一个页面
 */
const back = function() {
	var current_page = plus.webview.currentWebview();
	current_page.close();
}

/**
 * 获取当前页面的所有参数
 * @return 
 */
const query = (function() {
	var current_page = window.plus ? plus.webview.currentWebview() : {};
	return current_page.query || {};
})();

export default {
	addRoute,
	push,
	back,
	query
}
