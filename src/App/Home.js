import axios from 'axios';

import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';

import Post from './Post.js';

class Home extends Component {

  constructor(props) {
    super(props);
    this.onClickPost = this.onClickPost.bind(this);
  }

  onClickPost(number) {
    this.props.history.push("/post/:" + number);
  }

  render() {
    var items = this.props.posts.map((item) => {
      return (
        <PostItem info={item} onClickPost = {() => this.onClickPost(item.id)} />
      );
    });

    return (
      <div id='home'>
        This is the home page.
        {items}

        <Switch>
          <Route exact path='/home' component={AddPostButton}/>
          <Route exact path='/home/addPost'
            render={()=><AddPost history={this.props.history} addPost={this.props.addPost}/>}
            />
        </Switch>

      </div>
    );
  }
}

class PostItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='PostItem' onClick={this.props.onClickPost}>
        <div>{this.props.info.title}</div>
        <div>{this.props.info.date}</div>
      </div>
    );
  }
}

class AddPostButton extends Component {
  render() {
    return (
      <button>
        <Link to = '/home/addpost'>
          Add Post
        </Link>
      </button>
    );
  }
}

class AddPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: Math.random()*10000,
      date: '',
      content: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    var d = new Date();
    var newItem = {
      id: this.state.id,
      title: this.state.title,
      date: d.toDateString().substring(3),
      content: this.state.content
    }
    this.props.history.push("/home");
    this.props.addPost(newItem);
  }


  render() {
    return (

      <div>
        <form onSubmit={this.onSubmit}>
          Title:<input type="text" name="title" value={this.state.title} onChange={this.onChange}/><br />
          Content:<input type="text" name="content" value={this.state.content} onChange={this.onChange} /><br/>

          <button type="submit">                  
            Add Post
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Home);