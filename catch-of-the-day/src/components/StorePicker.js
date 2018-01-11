import React from 'react';
import { getFunName } from '../helpers'


class StorePicker extends React.Component {
	// use the constructor to bind to the component
	// constructor() {
	// 	super();
	// 	this.gotoStore = this.gotoStore.bind(this);
	// }

	goToStore(event) {
		// stops the url from submitting
		event.preventDefault();
		
		// grab text from user
		const storeId = this.storeInput.value;
		console.log(`Going to ${storeId}`);
		
		// transition url from / to /store/:storeId
		this.context.router.transitionTo(`/store/${storeId}`);

	}

	render(){
		return (
			<form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
				{ /* hello - this is a valid JSX comment. Weird, huh? */ }
				<h2>Please Enter a Store</h2>
				<input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}}/>
				<button type="submit">Visit Store ➡️</button>
			</form>
		);
	}
}

StorePicker.contextTypes = {
	router: React.PropTypes.object,
}

export default StorePicker;