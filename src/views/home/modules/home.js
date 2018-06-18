import React from 'react'
import { Component, View } from '@/components'
import { Tabs } from 'antd-mobile'

export default class Home extends Component {
	constructor(props) {
		super(props);
		
		this.tabs = [
			{ title: 'hello'},
			{ title: 'world'},
			{ title: 'is me'}
		]
	}
	
	render() {
		return (
			<Tabs tabs={this.tabs}>
				<View>1</View>
				<View>2</View>
				<View>3</View>
			</Tabs>
		)
	}
}
