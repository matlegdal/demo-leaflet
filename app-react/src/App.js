import React, { Component } from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import fakePositions from './data/fakePositions';

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
      animate: true,
      arrivee: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.updateFakePosition();
  }

  updateFakePosition() {
    const self = this;
    let i = 0;
    setInterval(() => {
      if (i >= fakePositions.length) {
        i = 0;
      } else {
        let [lat, lng] = fakePositions[i].split(',').map(s => Number(s));
        self.setState({ position: { lat, lng } });
        i++;
      }
    }, 1000);
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
        <Marker position={this.state.position}>
          <Popup>
            <span>Tracker</span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}