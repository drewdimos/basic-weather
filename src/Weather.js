import React from 'react';
import ReactDOM from 'react-dom';
import xhr from 'xhr';
import './foundation.css';
import './index.css';
import './animate.css';

export default class Weather extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			location: '',
			data: {}
		}
	}

	fetchData = (evt) => {
		evt.preventDefault();
		
		var location = encodeURIComponent(this.state.location);
		var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
		var urlSuffix = '&APPID=ce16fafada50b81287b46be0a35290f5&units=imperial';
		var url = urlPrefix + location + urlSuffix;

		var self = this;

		xhr({
			url: url
		}, function(err,data){
			self.setState({
				data: JSON.parse(data.body)
			})
		});

	}

	changeLocation = (evt) => {
		this.setState({
			location: evt.target.value
		});
	}



	render() {
		var currentTemp = 'Enter location below';
		var currentIcon = 'placeholder.png';
		var condition = 'placeholder.png';

		if (this.state.data.list) {
			currentTemp = this.state.data.list[0].main.temp;
		}

		if (this.state.data.list) {
			condition = this.state.data.list[0].weather[0].main;
		}

		condition === "Clear" ? currentIcon = './gifs/partly-cloudy.gif' : currentIcon = './gifs/200w_d.gif';

		return (
			<div className="wrapper">
				<div className="row">
					<div className="small-12 columns text-center icon">
						<img src={ currentIcon }/>
					</div>
				</div>
				<div className="row">
					<div className="small-12 columns text-center temp-wrapper">
						<span className="temp">{ currentTemp }</span>
						<span className="temp-symbol"> °F</span>
					</div>
				</div>
				<div className="row">
					<div className="small-12 columns text-center locale">
						<h2>{this.state.location}</h2>
					</div>
				</div>
				<div className="row">
					<div className="small-6 small-centered columns  search">
						<form onSubmit={this.fetchData}>
							<label>
								<input 
									placeholder={'City + Country'} 
									type='text'
									value={this.state.location}
									onChange={this.changeLocation}
								/>
							</label>
						</form>
					</div>
				</div>
				<div className="row">
					<div className="small-8 text-center small-centered columns">
						<span id="links"><a href="http://172.20.10.2:8080/">Home | </a></span>
						<span id="links" ><a href="http://172.20.10.2:3333/">Tasks | </a></span>
						<span id="links"><a href="http://172.20.10.2:3000/">Chat</a></span>
					</div>
				</div>
			</div>
			)
	}
}