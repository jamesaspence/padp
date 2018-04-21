import React, {Component} from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);

    console.log(process.env.REACT_APP_CLIENT_ID);

    this.onResponse = this.onResponse.bind(this);
  }

  onResponse(response) {
    console.log(response);
  }

  render() {
    return (
      <div className="columns is-centered">
        <div className="column is-half">
        </div>
      </div>
    );
  }
}