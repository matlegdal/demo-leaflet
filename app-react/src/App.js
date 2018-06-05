import React, { Component } from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { updateFakePosition } from './utils';
import * as api from './api';
import Button from './Button';

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
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    updateFakePosition.call(this);
  }

  async loadRoutes(from, to) {
    let routes = await api.getRoutes(from, to, {});
    window.routes = routes;
    // this.setState({ routes });
  }

  handleMapClick(e) {
    this.setState({
      position: e.latlng,
    });
  }

  handleButtonClick() {
    let home = {
      lat: 46.7585587,
      lng: -71.2937415
    };
    this.loadRoutes(this.state.position, home)
  }

  render() {
    return (
      <div>
        <Map
          animate={this.state.animate}
          length={4}
          onClick={this.handleMapClick}
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
        <Button onClick={this.handleButtonClick} />
      </div>
    );
  }
}