'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const root = '/api';
const follow = require('./follow'); // function to hop multiple links by "rel"
// end::vars[]

// tag::app[]
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {persons: []};
	}

	componentDidMount() { // <2>
		client({method: 'GET', path: '/api/persons'}).done(response => {
			this.setState({persons: response.entity._embedded.persons});
		});
	}
    // tag::on-create[]
	onCreate(newPerson) {
		follow(client, root, ['persons']).done(response => {
			client({
				method: 'POST',
				path: response.entity._links.self.href,
				entity: newPerson,
				headers: {'Content-Type': 'application/json'}
			})
		})
	}
	// end::on-create[]

	render() { // <3>
		return (
            <div>
			<PersonList persons={this.state.persons}/>
            <CreateDialog onCreate={this.onCreate}/>
            </div>
		)
	}
}
// end::app[]

// tag::persons-list[]
class PersonList extends React.Component{
	render() {
		const persons = this.props.persons.map(person =>
			<Person key={person._links.self.href} person={person}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
					</tr>
					{persons}
				</tbody>
			</table>
		)
	}
}
// end::person-list[]

// tag::person[]
class Person extends React.Component{
	render() {
		return (
                <tr>
                    <td>{this.props.person.firstName}</td>
                    <td>{this.props.person.lastName}</td>
                </tr>
		)
	}
}
// end::persons[]

class CreateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const newPerson = {};
		this.props.attributes.forEach(attribute => {
			newPerson[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onCreate(newPerson);
		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = ''; // clear out the dialog's inputs
		});
		window.location = "#";
	}

	render() {
		const inputs = this.props.attributes.map(attribute =>
			<p key={attribute}>
				<input type="text" placeholder={attribute} ref={attribute} className="field"/>
			</p>
		);
		return (
			<div>
				<a href="#createPerson">Create</a>

				<div id="createPerson" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Create new person</h2>

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Create</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]