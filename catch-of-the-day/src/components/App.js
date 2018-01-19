import React from 'react';
// components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes.js'

class App extends React.Component {
	constructor(){
		// must call super() to initialize App as a React Copmonent
		// and allow it to have state
		super();

		// create methods that will be available on the app
		// pass them down to components that need them
		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);

		// initial state
		this.state = {
			fishes: {},
			order: {}
		};
	}

	//  loads in sample fishes from json data
	loadSamples() {
		this.setState({
			fishes: sampleFishes,
		});
	}

	// lets us add a new fish via the inventory form
	addFish(fish) {
		// update state
		// best practice: first copy current state
		// destructure existing fishes state into a new object
		const fishes = {...this.state.fishes};
		//  then update state with new data
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;
		
		// next, set state
		this.setState({ fishes });
	}

	render(){
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="list-of-fishes">
						{
							// iterate over the fish data and create a new fish component for each
							// takes in a list and give an array
							Object
							.keys( this.state.fishes )
							.map( key => <Fish key={key} details={ this.state.fishes[key] }/> )

						}
					</ul>
				</div>
				<Order />
				<Inventory addFish={ this.addFish } loadSamples={ this.loadSamples }/>
			</div>
		);
	}
}

export default App;