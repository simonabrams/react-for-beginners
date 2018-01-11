import React from 'react';
// components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
	constructor(){
		// must call super() to initialize App as a React Copmonent
		// and allow it to have state
		super();

		// add the addFish() method to the App
		this.addFish = this.addFish.bind(this);

		// initial state
		this.state = {
			fishes: {},
			order: {}
		};
	}

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
				</div>
				<Order />
				<Inventory addFish={this.addFish}/>
			</div>
		);
	}
}

export default App;