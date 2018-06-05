import React, { Component } from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import {updateFakePosition} from './utils';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.fujitsuPos = { lat: 46.830545, lng: -71.306222 };
    this.state = {
      position: {
        lat: 46.830545,
        lng: -71.306222
      },
      zoom: 14,
      animate: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    updateFakePosition.call(this);
  }

  handleClick(e) {
    this.setState({
      position: e.latlng,
    });
  }

  render() {
    return (
      <Map
        animate={this.state.animate}
        length={4}
        onClick={this.handleClick}
        center={this.state.position}
        zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; Fujitsu'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={this.fujitsuPos}>
          <Popup>
            <span>
              Nos bureaux à Québec
            </span>
          </Popup>
        </Marker>
        <CircleMarker center={this.state.position} radius={10} color='red' fillColor="red">
          <Popup>
            <span>Tracker</span>
          </Popup>
        </CircleMarker>
      </Map>
    );
  }
}