import React, {Component} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';

import Api from 'api/api.js';

import 'containers/styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navigation from 'components/Navigation.js';
import ArticleTable from 'components/ArticleTable.js';
import ArticleDialog from 'components/ArticleDialog.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount = () => {
    this.updateArticles();
  }

  updateArticles = () => {
    Api.getArticles((data) => {
      this.setState({articles: data.data});
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Navigation/>
          <Switch>
            <Route
              exact
              path='/articles'
              render={() => {
              return (
                <div id="page">
                  <div className="tableDiv">
                    <ArticleDialog
                      label="Add New Article"
                      submitHandler={Api.addArticle}
                      updateArticles={this.updateArticles}
                      type="add"/>
                    <ArticleTable
                      className="articleTable"
                      submitHandler={Api.editArticle}
                      updateArticles={this.updateArticles}
                      data={this.state.articles}/>
                  </div>
                </div>
              )
            }}/>
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
