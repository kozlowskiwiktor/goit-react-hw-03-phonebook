import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const nameValue = form.elements[0].value;
    const number = form.elements[1].value;
    form.reset();

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

  filterUsers = evt => {
    this.setState({
      filter: evt.target.value.toUpperCase(),
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    if (filter === '') {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toUpperCase().includes(filter)
    );
  };

  handleRemove = id => {
    const newContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: newContacts });
  };

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }
  render() {
    return (
      <>
        <h2>Phonebook</h2>
        <ContactForm submit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter filterUsers={this.filterUsers} />
        <ContactList
          contacts={this.getFilteredContacts()}
          onDeleteContact={this.handleRemove}
        />
      </>
    );
  }
}
