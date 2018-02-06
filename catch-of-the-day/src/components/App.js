import React from 'react';
// components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes.js';
import base from '../base';

class App extends React.Component {
	constructor(){
		// must call super() to initialize App as a React Copmonent
		// and allow it to have state
		super();

		// create methods that will be available on the app
		// pass them down to components that need them
		this.addFish = this.addFish.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);

		// initial state
		this.state = {
			fishes: {},
			order: {}
		};
	}

	componentWillMount() {
		// this runs right before the app is rendered
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});

		// check if anything is in local storage
		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

		if(localStorageRef) {
			// update our app's order state
			this.setState({
				order: JSON.parse(localStorageRef),
			});
		}
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
	}

	//  loads in sample fishes from json data
	loadSamples() {
		this.setState({
			fishes: sampleFishes,
		});
	}

	// add to order
	addToOrder(key) {
		// copy state
		const order = {...this.state.order};
		// update or add the new number of fish ordered
		order[key] = order[key] + 1 || 1;
		// updtea state
		this.setState({ order });
	}

	removeFromOrder(key) {
		const order = {...this.state.order};
		delete order[key];
		this.setState({ order });
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

	updateFish(key, updatedFish) {
		const fishes = {...this.state.fishes};
		fishes[key] = updatedFish;
		this.setState({ fishes });
	}

	removeFish(key) {
		const fishes = {...this.state.fishes};	
		fishes[key] = null;
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
							.map( key => <Fish key={key} index={key} details={ this.state.fishes[key] } addToOrder={ this.addToOrder }/> )

						}
					</ul>
				</div>
				<Order 
					fishes={ this.state.fishes }
					order={ this.state.order }
					params={ this.props.params }
					removeFromOrder={ this.removeFromOrder }
				/>
				<Inventory
					addFish={ this.addFish }
					updateFish={ this.updateFish }
					loadSamples={ this.loadSamples }
					fishes={ this.state.fishes }
					removeFish={ this.removeFish }
				/>
			</div>
		);
	}
}

export default App;