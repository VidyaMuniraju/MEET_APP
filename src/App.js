import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import "./nprogress.css";


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberofevents: 32,
    currentLocation: 'all',
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
        const locationEvents = (location === 'all') ?
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
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <NumberOfEvents numberofevents={this.state.numberofevents} updateEvents={this.updateEvents} />  
      </div>
    );
  }
}

export default App;
