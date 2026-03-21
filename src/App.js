import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';
import { studioName } from './constants';
import About from './About';
import GameDetails from './GameDetails';
import ContactUs from './ContactUs';

/**
 * Top level app, routes to each Component (Home, About, Contact Us, Games, NotFound)
 */
function App() {
  return (
     <BrowserRouter>
      <div className="App">
        <div className="content">
          <h1><img src="favicon.ico" alt="Lucky 13 Interactive" height="10%" width="10%" style={{"vertical-align":"middle"}}/>{ studioName }</h1>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/about">
              <About/>
            </Route>
            <Route path="/games/:name">
              <GameDetails/>
            </Route>
            <Route exact path="/contact-us">
              <ContactUs/>
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
