import './App.css';
import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  pageSize = 8;
  country = 'in';
  apiKey = process.env.REACT_APP_API_KEY
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path='/' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="general" pageSize={this.pageSize} country={this.country} category="general" />} />
            <Route exact path='/business' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="business" pageSize={this.pageSize} country={this.country} category="business" />} />
            <Route exact path='/entertainment' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="entertainment" pageSize={this.pageSize} country={this.country} category="entertainment" />} />
            <Route exact path='/general' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="general" pageSize={this.pageSize} country={this.country} category="general" />} />
            <Route exact path='/health' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="health" pageSize={this.pageSize} country={this.country} category="health" />} />
            <Route exact path='/science' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="science" pageSize={this.pageSize} country={this.country} category="science" />} />
            <Route exact path='/sports' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="sports" pageSize={this.pageSize} country={this.country} category="sports" />} />
            <Route exact path='/technology' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="technology" pageSize={this.pageSize} country={this.country} category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

