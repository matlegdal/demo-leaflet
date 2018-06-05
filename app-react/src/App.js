import React, { Component } from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        lat: 46.830545,
        lng: -71.306222
      },
      zoom: 14,

    };
  }

  render() {
    return (
      <Map center={this.state.position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; Fujitsu'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={this.state.position}>
          <Popup>
            <span>
              Nos bureaux à Québec
            </span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}