import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import format from './format.js';

class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = format;

    if(this.props.type === "edit") {
      this.props.getArticle(this.props.id, (response) => {
        this.setState(response.data[0]);
      });
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
    if(this.props.type === "add") {
      this.setState({
        dateCreated: d.toDateString().substring(3),
        dateModified: d.toDateString().substring(3),
      }, () => {
        this.props.submitHandler(this.state);
      });
    }
    else {
      this.setState({
        dateModified: d.toDateString().substring(3),
      }, () => {
        this.props.submitHandler(this.props.id, this.state);
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>

        <TextField
          hintText=""
          floatingLabelText="Article Title"
          onChange={this.onChange}
          name="title"
          value={this.state.title} 
          />
        <TextField
          hintText=""
          floatingLabelText="Chinese Title"
          onChange={this.onChange}
          name="cnTitle"
          value={this.state.cnTitle} 
          /><br />
        <TextField
          hintText=""
          floatingLabelText="Short Title"
          onChange={this.onChange}
          name="short"
          value={this.state.short} 
          />
        <TextField
          hintText=""
          floatingLabelText="Author"
          onChange={this.onChange}
          name="author"
          value={this.state.author} 
          /> <br/>
        <TextField
          hintText=""
          floatingLabelText="Description"
          onChange={this.onChange}
          name="description"
          value={this.state.description}
          />
        <TextField
          hintText=""
          floatingLabelText="Chinese Description"
          onChange={this.onChange}
          name="cnDescription"
          value={this.state.cnDescription} 
          /> <br/>
        <TextField
          hintText=""
          floatingLabelText="Type"
          onChange={this.onChange}
          name="type"
          value={this.state.type} 
          />
        <TextField
          hintText=""
          floatingLabelText="Chinese Type"
          onChange={this.onChange}
          name="cnType"
          value={this.state.cnType} 
          /> <br/>
        <TextField
          hintText=""
          floatingLabelText="SubType"
          onChange={this.onChange}
          name="subtype"
          value={this.state.subtype} 
          />
        <TextField
          hintText=""
          floatingLabelText="Chinese SubType"
          onChange={this.onChange}
          name="cnSubtype"
          value={this.state.cnSubtype} 
          /> <br/>
        <TextField
          hintText=""
          floatingLabelText="Image Url"
          /><br/>
        <div>url stuff here</div>
        <TextField
          hintText="Separated by Commas"
          floatingLabelText="Tags"
          />
        <TextField
          hintText="Separated by Commas"
          floatingLabelText="Chinese Tags"
          /><br/>
        <TextField
          hintText="Number"
          floatingLabelText="Life Risk"
          />
        <TextField
          hintText="Number"
          floatingLabelText="Confidence"
          /><br/>



        <RaisedButton
          label="Submit"
          type="submit"
          primary={true}
          keyboardFocused={true}
          onClick={this.props.handleClose}
          style={{
            right: "0px"
          }}
          />
      </form>
    );
  }
}

export default ArticleForm;