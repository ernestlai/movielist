import React, { Component } from 'react';
import ReactTable from 'react-table'
import './App.css';
import 'react-table/react-table.css'

var OMDB_KEY = process.env.REACT_APP_OMDB_KEY;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      data: [],
      descriptions: [],
    }

    this.detailedFilms = [];
  }

  handleChange = e => {
    this.setState({query: e.target.value});
  }

  submitquery = e => {
    e.preventDefault();
    let films = [];
    let self = this;
    let moviePromise = fetch('http://www.omdbapi.com/?apikey=' + OMDB_KEY + '&s=' + this.state.query)
      .then(response => response.json())
      .then(movielist => {
        films.push(movielist.Search)
        return movielist.Search;
      }
    )

    moviePromise.then(movies => {
      movies.forEach(movie => {
        fetch('http://www.omdbapi.com/?apikey=' + OMDB_KEY+ '&t=' + movie.Title)
            .then(response => response.json())
            .then(film => self.detailedFilms.push(film))
            .then(() => self.setState({data: self.detailedFilms})
        );
      })
    })
  }

  render() {
    const data = this.state.data;
    const columns = [{
      Header: 'Poster',
      accessor: 'Poster',
      Cell: (row) => {
        return <div><a href={row.value}><img src={row.value} alt='' height="140"></img></a></div>
      }
    }, {
      Header: 'Title',
      accessor: 'Title'
    }, {
      Header: 'Year',
      accessor: 'Year'
    }, {
      Header: 'Description',
      accessor: 'Plot',
      id:'description',
      style:{ 'whiteSpace': 'unset'}
    }]
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <div className="App-header">
          <h2>What movie would you like to search for?</h2>
          <div>
            <form onSubmit={this.submitquery}>
              <input type="text" onChange={this.handleChange} placeholder="Search..." />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <ReactTable 
          data={data} 
          columns={columns}
        />
      </div>
    );
  }
}

export default App;
