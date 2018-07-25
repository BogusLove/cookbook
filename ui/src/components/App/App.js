import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import createStore from '../../store';
import history from '../../store/history';
import Recipes from './../../containers/Recipes/Recipes';
import RecipeCreation from './../../containers/RecipeCreation/RecipeCreation';
import RecipeEditing from './../../containers/RecipeEditing/RecipeEditing';

const store = createStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="recipes" />} />
          <Route path="/recipes/new" component={RecipeCreation} exact />
          <Route path="/recipes/:id" component={RecipeEditing} exact/>
          <Route path="/recipes" component={Recipes} exact />          
        </Switch>
      </ConnectedRouter>
    </Provider>
    );
  }
}

export default App;