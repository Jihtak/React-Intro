import React, { Component } from 'react';

import { CardList } from './components/card_list/card_list.component';
import { SearchBox } from "./components/search-box/search-box.component";

import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			monsters: [],
			searchField: ""
		};
	}

	componentDidMount() {
		//Lifecycle method componentDidMount calls the function inside it once it has rendered that component and executes it
		fetch('https://jsonplaceholder.typicode.com/users') //We go to the designated address and grab the data from it
			.then((response) => response.json()) //data gets to us formated in .json file that we can extract the datathat we need from
			.then((users) => this.setState({ monsters: users })); //we take the data that we need and set them in our array( we change its state!!!) which we later call in render method
	}

	render() {
		const { monsters, searchField } = this.state;
		const filteredMonsters = monsters.filter(monster =>
			monster.name.toLowerCase().includes(searchField.toLowerCase())
		)
		return (
			<div className="App">
				<h1>Monsters Rolodex</h1>
				<SearchBox
					placeholder="search monsters"
					handleChange={e => this.setState({ searchField: e.target.value })}
				/>
				<CardList monsters={filteredMonsters} />
			</div>
		);
	}
}

export default App;
