import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import BusinessList from '../BusinessList/BusinessList';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: []
    }
    this.searchYelp = this.searchYelp.bind(this)
  }
  async searchYelp(searchObject) {
    await fetch(``, {
      method: 'POST',
      body: JSON.stringify({
        term: searchObject.term,
        location: searchObject.location,
        sortBy: searchObject.sortBy
      })
    }).then(response => {
      return response.json()
    }).then(jsonResponse => {
      this.setState({ businesses: jsonResponse })
    })


  }

  render() {
    return (
      <div className="App" >
        <h1>Brandon Severless Yelp API</h1>
        <SearchBar searchYelp={this.searchYelp} />
        <BusinessList businesses={this.state.businesses} />
      </div>
    )
  }
}
export default App;
