import React, {Component} from 'react';
import './Loader.css';

export default class Loader extends Component {
  render() {
    const classNames = 'card is-loading' + (this.props.noBoxShadow ? ' no-shadow' : '');

    return (
      <div className={classNames}/>
    );
  }
}