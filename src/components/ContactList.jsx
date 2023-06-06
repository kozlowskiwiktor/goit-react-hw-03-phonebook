import React from 'react';
import propTypes from 'prop-types';
import container from './container.module.css';

export const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <div className={container}>
      {contacts.map(({ name, id, number }) => (
        <p key={id} className={container}>
          {name} {number}
          <button type="submit" onClick={() => onDeleteContact(id)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

ContactList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: propTypes.func.isRequired,
};
