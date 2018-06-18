import React from 'react'
import { Component, View } from '@/components'
import { navigator } from '@/app'
import { Carousel, Button } from 'antd-mobile'

export default class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			data: []
		}
	}
	
	componentDidMount() {
		this.setState({
			data: [
			'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528999129701&di=8add38ba02ba1afab4b02fac4d2a20b9&imgtype=0&src=http%3A%2F%2Fimage.tianjimedia.com%2FuploadImages%2F2012%2F251%2FOBVWV1FDY378.jpg',
			'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528999156190&di=652958dcd0fa7239a37e775c2756f9a9&imgtype=0&src=http%3A%2F%2Fwww.51ztzj.com%2Fupload%2Fimage%2F20140327%2Fsj2014032804_480x800.jpg', 
			'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528999173435&di=0b505b4f7d4ccd89d97f16f93ab912bf&imgtype=0&src=http%3A%2F%2Fbos.pgzs.com%2Frbpiczy%2FWallpaper%2F2013%2F7%2F16%2F4dca48d7e1a940179266bd42b8eb68a9-5.jpg'
			]
		})
	}
	
	render() {
		return (
			<View style={{position: 'relative'}}>
				<Button 
					onClick={() => this.handlerEnterHome()}
					style={{position:'absolute',top: 5, right: 5,zIndex: 1,width:60}} size="small">
					1s
				</Button>
				<Carousel dots={false}>
					{this.state.data.map((val, index) => (
						<a key={index} 
							style={{width:'100%',height: 'auto',display:'inline-block'}}>
							<img src={val} style={{width: '100%',height:'100%'}}/>
						</a>
					))}
				</Carousel>
			</View>
		)
	}
	
	handlerEnterHome() {
		navigator.push({
			path: 'home',
			afterRouter() {
				plus.webview.currentWebview().close();
			}
		})
	}
}
