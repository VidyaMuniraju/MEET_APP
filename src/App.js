import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import "./nprogress.css";
import { InfoAlert } from './Alert';


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberofevents: 32,
    currentLocation: 'all',
    infoText: ''
  }

  updateEvents = (location, eventCount) => {
    const { currentLocation, numberofevents } = this.state;
    if(location) {
      getEvents().then((events) => {
        const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
        const filteredEvents = locationEvents.slice(0, numberofevents);
        this.setState({
          events: filteredEvents,
          currentLocation: location,
        });
      });
    }
    else {
      getEvents().then((events) => {
        const locationEvents = (currentLocation === 'all') ?
        events :
        events.filter((event) => event.location === currentLocation);
        const filteredEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: filteredEvents,
          numberofevents: eventCount,
        });
      });      
    }
  };

  componentDidMount() {
    this.mounted = true;
    if(!navigator.onLine){
      this.setState({
        infoText: 'You are not connected to the internet. Data has been loaded from cache.'
      });
    }
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      } 
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <h3>Meet App</h3>
        <h5>Choose your nearest city</h5>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <h5>Number of events</h5>
        <NumberOfEvents numberofevents={this.state.numberofevents} updateEvents={this.updateEvents} />
        <InfoAlert text={this.state.infoText} />
        <EventList events={this.state.events} />
        
      </div>
    );
  }
}

export default App;
