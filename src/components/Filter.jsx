import React, { Component } from 'react';
import PropTypes from 'prop-types';
import container from './container.module.css';

export class Filter extends Component {
  render() {
    const { filterUsers } = this.props;

    return (
      <form className={container}>
        <label>Find contact</label>
        <input onChange={filterUsers}></input>
      </form>
    );
  }
}

Filter.propTypes = {
  filterUsers: PropTypes.func,
};
