import React from 'react';
import './App.scss';
import CharacterDetail from './components/CharacterDetail'; 
import Home from './components/Home';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.png'



const endpoint = 'https://raw.githubusercontent.com/Adalab/rick-y-morty/master/data/rick-y-morty.json'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      query: '',
      gender: 'all gender',
      role: 'todos',
    }
  this.filterName=this.filterName.bind(this);
  this.chooseGender=this.chooseGender.bind(this);
  this.getRole=this.getRole.bind(this);
  }

componentDidMount() {
  this.getData()
}

  getData ()  {
    fetch(endpoint)
      .then(res => res.json())
      .then(result=> {
        this.setState({
          data:result.results
        })
      }, 
 );
}

chooseGender(event) {
  const gender = event.currentTarget.value
  this.setState({
    gender: gender
  })
}

filterName(event) {
  const value = event.currentTarget.value
  this.setState({
    query:value
  })
}

getRole(event) {
  const value = event.currentTarget.value
  this.setState({
    role:value
  })
}

  render() {
    const {data, query, gender, role } = this.state;
    return (
      <div className="app">
        <header className="app_header">
          <h1 className="app_title">Rick and Morty</h1>
          <img src={logo} alt="logo" className="logo_img"></img>
        </header>
        <main className="main">
          <Switch>
           <Route exact path="/" render={()=>
              <Home 
                query={query}
                filterName={this.filterName}
                data={data} 
                gender={gender}
                chooseGender={this.chooseGender}
                role={role}
                getRole={this.getRole}
             /> 
           }/>
           <Route path="/detail/:id" render={
              routerProps=>
              <CharacterDetail
                routerProps={routerProps}
                data={data}
              />
            }/>
          </Switch>
        </main>
        <footer className="footer">&copy; 2019</footer>
      </div>
    );
  }
}

export default App;
