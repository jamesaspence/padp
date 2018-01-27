import React, {Component} from 'react';

export default class Header extends Component {
  render() {
    return (
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Pick a Damn Place</h1>
            <h2 className="subtitle">Helping stupid people pick stupid restaurants since 2017.</h2>
          </div>
        </div>
      </section>
    );
  }
}