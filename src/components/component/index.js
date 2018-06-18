import React, {PureComponent} from 'react'
import classNames from '@/utils/classNames'

export default class Component extends PureComponent {
	constructor(props) {
		super(props);
	}
	
	/**
	 * 对className进行扩展(作用于跟节点) className={this.className([a,b...])}
	 * @param {Array}
	 */
	className(...args) {
		return classNames.apply(this, args.concat([this.props.className]));
	}
	
	/**
	 * 子节点的扩展
	 */
	classNames(...args) {
		return classNames.apply(this, args);
	}
	
	/**
	 * 对style进行扩展(作用于跟节点) style={this.style({})}
	 * @param {Object}
	 */
	style(args) {
		return Object.assign({}, args, this.props.style);
	}
}
