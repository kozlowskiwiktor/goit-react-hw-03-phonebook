import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };
  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      console.log(this.state.contacts);
    }
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }
  render() {
    const handleSubmit = evt => {
      evt.preventDefault();
      const form = evt.currentTarget;
      const nameValue = form.elements[0].value;
      const number = form.elements[1].value;

      this.setState({
        contacts: [
          ...this.state.contacts,
          {
            name: nameValue,
            id: nanoid(),
            number: number,
          },
        ],
        filter: '',
      });

      return this.state.contacts.map(contact => {
        if (contact.name === nameValue) {
          this.setState({
            contacts: this.state.contacts,
          });
          return alert(`${nameValue} is already in contacts`);
        }
        return null;
      });
    };
    const filterUsers = evt => {
      this.setState({
        filter: evt.target.value.toUpperCase(),
      });
    };

    return (
      <>
        <h2>Phonebook</h2>
        <ContactForm submit={handleSubmit} />
        <h2>Contacts</h2>
        <Filter filterUsers={filterUsers} />
        <ContactList state={this.state} />
      </>
    );
  }
}
