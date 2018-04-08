import React, {Component} from 'react';

export default class VoteableLocation extends Component {
  render() {
    return (
      //<div className="tile is-warning notification">
      //  Hi!
      //</div>
      // <div className="box">
      //   <div className="content">
      //     <div className="title">Hello?</div>
      //
      //   </div>
      // </div>

      <div className="card">
        <div className="card-content">
          <h3 className="title">Title!</h3>
          <div className="address-content">
            <p className="address-one">Content Line One</p>
          </div>
        </div>
        <div className="card-footer">
          <a className="card-footer-item">Nah</a>
          <a className="card-footer-item">Sure</a>
        </div>
      </div>
    )
  }
}