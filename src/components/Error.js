import React, {Component} from 'react';

export default class Error extends Component {
    static defaultProps = {
        title: 'Uh Oh!',
        subheader: 'Something went wrong.',
        errorMessage: 'Unknown Error'
    };

    render() {
        return (
            <div className="card location-error">
                <div className="card-header">
                    <h3 className="card-header-title">{this.props.title}</h3>
                </div>
                <div className="card-content">
                    <p>{this.props.subheader}</p>
                    <p>"{this.props.errorMessage}"</p>
                </div>
            </div>
        );
    }
}