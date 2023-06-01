import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import propTypes from 'prop-types';
import container from './container.module.css';

export class ContactList extends Component {
  render() {
    const { state } = this.props;

    return (
      <div className={container}>
        {state.contacts
          .filter(contact => contact.name.includes(state.filter.toUpperCase()))
          .map(contact => (
            <p key={nanoid()} className={container}>
              {contact.name} {contact.number}
              <button
                onClick={() => {
                  let index = state.contacts.indexOf(contact);
                  this.setState(state.contacts.splice(index, 1));
                }}
                value={contact.name}
              >
                delete
              </button>
            </p>
          ))}
      </div>
    );
  }
}
ContactList.propTypes = {
  state: propTypes.object.isRequired,
};
