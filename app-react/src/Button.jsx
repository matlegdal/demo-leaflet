import React, { Component } from 'react';
import './Button.css';

export default class Button extends Component {
    render() {
        return (
            <button
                className='widget'
                onClick={this.props.onClick}>
                Route
            </button>
        );
    }
}