import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import './styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import Navigation from './Navigation.js';
import ArticleTable from './ArticleTable.js';
import ArticleDialog from './ArticleDialog.js';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount = () => {
    this.getArticles();
  }

  getArticles = () => {
    axios.get('/api/articles')
      .then((response) => {
      this.setState({articles: response.data});
      console.log("get articles");
    })
      .catch((error) => {
      this.setState({articles: []});
      console.log(error);
    });
  }

  getArticle = (id, callback) => {
    axios.get('/api/articles?_id=' + id)
      .then(function (response) {
      console.log("get article.");
      callback(response);
    })
      .catch(function (error) {
      console.log(error);
    })
  };

addArticle = (articleJson) => {
  axios({
    method:'post',
    url:'/api/articles',
    data: articleJson,
  })
    .then((response) => {
    console.log("add article.");
    this.getArticles();
  });
}

editArticle = (id, articleJson) => {
  console.log("called edit article.");
  axios({
    method:'put',
    url:'/api/articles',
    params: {
      _id: id
    },
    data: articleJson
  })
    .then((response) => {
    console.log("edit article.");
    this.getArticles();
  });
  console.log("edit article.");
  this.getArticles();
}

deleteArticle = (id) => {
  axios({
    method:'delete',
    url:'/api/articles',
    params: {
      _id: id
    }
  })
    .then((response) => {
    console.log("delete article");
    this.getArticles();
  });
}

render() {
  return (
    <MuiThemeProvider>
      <div className="App">
        <Navigation></Navigation>
        <Switch>
          <Route exact path='/articles'
            render={()=> {return (
              <div id="page">
                <div className="tableDiv">
                  <ArticleDialog
                    label="Add New Article"
                    submitHandler={this.addArticle}
                    type="add"
                    ></ArticleDialog>
                  <ArticleTable
                    className="articleTable"
                    data={this.state.articles}
                    getArticle={this.getArticle}
                    editArticle={this.editArticle}
                    deleteArticle={this.deleteArticle}
                    />
                </div>
              </div>
            )}}
            />
          <Route exact path='/otherpage'
            render={()=> {return (
              <div id="page">
                This is another page.
              </div>
            )}}
            />
        </Switch>
      </div>
    </MuiThemeProvider>
  );
}
}

export default withRouter(App);
