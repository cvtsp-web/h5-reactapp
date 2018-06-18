import React from 'react'
import { navigator } from '@/app'
import { Component, View } from '@/components'
import { PullToRefresh, ListView } from 'antd-mobile'

function getData() {
	var data = [];
	for(var i = 0; i < 30; i++) {
		data.push(i);
	}
	return data;
}

export default class TabLists extends Component {
	constructor(props) {
	    super(props);
	    const dataSource = new ListView.DataSource({
	    		rowHasChanged: (row1, row2) => row1 !== row2
	    })
	    this.state = {
	    		data: dataSource,
	    		refreshing: false
	    }
	}
	
	componentDidMount() {
		setTimeout( _ => {
			this.setState({
				data: this.state.data.cloneWithRows(getData())
			})
		}, 100)
	}
	
	render() {
		const row = (rowData, sectionID, rowID) => {
			return (
				<div 
					onClick={ () => this.enterHomePage(rowID)}
					key={rowID} style={{height:44, borderBottom:'1px solid #ccc'}}>
					{rowData}
				</div>
			)
		}
		return (
			<ListView 
			style={{height: 400}}
			dataSource={this.state.data}
			renderRow={row} 
			pullToRefresh={
				<PullToRefresh onRefresh={() => this.handlerRefresh()} />
			}/>
		)
	}
	
	handlerRefresh() {
		var data = getData();
		data.unshift(31)
		setTimeout( _ => {
			this.setState({
				data: this.state.data.cloneWithRows(data)
			})
		}, 600)
	}
	
	enterHomePage(key) {
		navigator.push({
			path: 'home',
			query: {
				title: key
			}
		})
	}
}
