import React from 'react'
import { navigator } from '@/app'
import { Component, View, DynamicComponent } from '@/components'
import * as modules from './modules'
import { TabBar } from 'antd-mobile'
import theme from '@/components/theme/index.less'
import style from './style/index.less'

export default class App extends Component {
	constructor(props) {
	    super(props);
	    
	    this.tabLists = [
			{ title: '首页', key: 'Home'},
			{ title: '车辆监控', key: 'Monitor'},
			{ title: '历史轨迹', key: 'Track'},
			{ title: '设置', key: 'Set'}
		];

		this.state = {
			selectedTab: 'Home',
			cachepage: {
				Home: true,
				Monitor: false,
				Track: false,
				Set: false
			}
		}
	}
	
	render() {
		const tabChilds = this.tabLists.map((list, index) => {
			const { title, key } = list;
			return (
				<TabBar.Item 
					title={title} 
					key={key} 
					selected={this.state.selectedTab === key}
					onPress={() => 
						this.setState({
							selectedTab: key,
							cachepage: Object.assign({}, this.state.cachepage, { [key]: true})
						})
					}>
					{this.renderContent(key)}
				</TabBar.Item>
			)
		});
		return (
			<View className="home-tabBar">
				<TabBar > 
					{tabChilds}
				</TabBar>
			</View>
		)
	}
		
	renderContent(key) {
		return (
			<div style={{height: '100%',overflowY:'auto'}}>
				{this.state.cachepage[key] && < DynamicComponent is={modules[key]} />}
			</div>
		)
	}
}
