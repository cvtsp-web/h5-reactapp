import React from 'react'
import PropTypes from 'prop-types'
import { navigator } from '@/app' 
import { Component } from '@/components'
import { NavBar, Icon } from 'antd-mobile'

const privateProps = {
	onTap: 'tap',
	children: 'child'
}
export default class View extends Component {
	constructor(props) {
		super(props);
		
		this.tapTime = 300;
		this.tapStarttime = 0;
		this.tapStartPos = { x: 0, y: 0 };
		this.isTapHandler = true;
	}
	
	render() {
		var props = {};
		Object.keys(this.props).forEach(key => {
			if(!privateProps[key]) {
				props[key] = this.props[key];
			}
		});
		
		var navBar = null;
		// 存在title,自动给view添加navBar组件
		if(props.title) {
			navBar = (
				<NavBar 
					key="navBar"
					onLeftClick={ () => this.handlerBack()}
					icon={<Icon type="left" />}>
					{this.props.title || ''}
				</NavBar>
			);
		}
		//子元素不能为a标签
		return React.createElement('div', {
			...props,
			onTouchStart: (event) => this.handlerTouchStart(event),
			onTouchMove: (e) => this.handlerTouchMove(e),
			onTouchEnd: (e) => this.handlerTouchEnd(e)
		}, [navBar].concat(this.props.children))
	}
	
	handlerTouchStart(event) {
		var { clientX, clientY } = event.touches[0];
		
		this.tapStarttime = new Date().getTime();	
		this.tapStartPos = { x: clientX, y: clientY };
		this.isTapHandler = true;
	}
	
	handlerTouchMove(event) {
		var { clientX, clientY } = event.touches[0];
		var x = Math.abs(clientX - this.tapStartPos.x);
		var y = Math.abs(clientY - this.tapStartPos.y);
		
		if(x > 15 || y > 15) {
			this.isTapHandler = false;
		}
	}
	
	handlerTouchEnd(event) {
		var current_time = new Date().getTime();
		var time_distance = current_time - this.tapStarttime;
		
		if(this.isTapHandler && time_distance <= this.tapTime) {
			this.props.onTap && this.props.onTap(event);
		}
	}
	
	/**
	 * 页面返回上一页事件
	 */
	handlerBack() {
		navigator.back();
	}
}
