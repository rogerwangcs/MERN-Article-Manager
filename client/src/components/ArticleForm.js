// refer to: http://www.material-ui.com/#/components
import React, { Component } from 'react';
import Api from 'api/api.js';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import moment from "moment";

import format from 'data-format-config.js';

// console.log = function(){};

class ArticleForm extends Component {

  constructor(props) {
    super(props);
    this.state = format;

    if(this.props.type === "edit") {
      Api.getArticle(this.props.id, (response) => {
        this.setState(response.data[0]);
      });
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(e.target.name);
    console.log(e.target);
  }
  
  onChangeNumber = (e) => {
    this.setState({
      [e.target.name]: Number(e.target.value)
    });
    console.log(e.target.name);
    console.log(e.target.value);
  }
  
  onChangeBinary = (stateName, e, key, payload) => {
    this.setState({
      [stateName]: payload
    });
  }
    
  onChangeArray = (index, e) => {
    const stateName = e.target.name;
    const state = this.state[stateName];
    state[index] = e.target.value;
    console.log(state);
    this.setState({
      state
    });
  }
  
  onChangeNumberArray = (index, e) => {
    const stateName = e.target.name;
    const state = this.state[stateName];
    state[index] = Number(e.target.value);
    console.log(state);
    this.setState({
      state,
    });
  }
  
  onChangeObject = (index, type, stateName, e) => {
    const state = this.state[stateName];
    state[index][type] = e.target.value;
    console.log(state);
    this.setState({
      state,
    });
  }
  
  deleteArrayElement = (stateName,index) => {
    const state = this.state[stateName];
    state.splice(index,1);
    this.setState({state});
  }
  

  onSubmit(e) {
    e.preventDefault();
    this.props.handleClose();
    
    var now = moment(new Date());
    var d = now.format("YYYY-MM-DD HH:mm:ss");

    if(this.props.type === "add") {
      this.setState({
        dateCreated: d.toString(),
        dateModified: d.toString(),
      }, () => {
        this.props.submitHandler(this.state, () => {
          this.props.updateArticles();
        });
      });
    }
    else {
      this.setState({
        dateModified: d.toString(),
      }, () => {
        this.props.submitHandler(this.props.id, this.state, () => {
          this.props.updateArticles();
        });
      });
    }
  }

  render() {
    
    const contentStyle = {
      padding: '30px',
      width: '95%',
      maxWidth: '800px',
      margin: 'auto',
      fontFamily: 'helvetica',
      fontSize: '18px',
      color: '#4d4d4d',

    };
    
    const halfBox = {
      width: '48%',
      marginRight: '1%'
    };
    
    const tags = this.state.tags.map((tag,index) =>
      <span>
        <TextField
          hintText="Tag"
          index={index}
          name={'tags'}
          value={this.state.tags[index]}
          onChange={this.onChangeArray.bind(null,index)}
          style = {{width: 100}}
             />
       <IconButton
        onClick={() => this.deleteArrayElement('tags',index)}
        style={{top:'7px'}}
        >
          <i className="material-icons">clear</i>
        </IconButton>
      </span>
    );                                

    const numberArray = this.state.numberArray.map((item,index) =>
      <span>
        <TextField
          hintText="numArray"
          type='number'
          index={index}
          name={'numberArray'}
          value={this.state.numberArray[index]}
          onChange={this.onChangeNumberArray.bind(null,index)}
          style = {{width: 50}}
             />
        <IconButton
        onClick={() => this.deleteArrayElement('numArray',index)}
        style={{top:'7px'}}
        >
          <i className="material-icons">clear</i>
        </IconButton>
      </span>
    );

    const urls = this.state.urls.map((item,index) =>
    <div>
      {index + 1}
      <TextField
        hintText="Name"
        index={index}
        name={'name'}
        value={this.state.urls[index].name}
        onChange={this.onChangeObject.bind(null,index, 'name', 'urls')}
        style = {{left: '30px', width: '20%'}}
           />
      <TextField
        hintText="Link"
        index={index}
        name={'link'}
        value={this.state.urls[index].link}
        onChange={this.onChangeObject.bind(null,index, 'link', 'urls')}
        style = {{left: '10%', width: '70%'}}
           />
    <IconButton
      onClick={() => this.deleteArrayElement('urls',index)}
      style={{top:'7px'}}
      >
        <i className="material-icons">clear</i>
      </IconButton>
    </div>
  );
                                             
    return (
      <Paper style={contentStyle}>
        <form>
                                           
        <TextField
          hintText=""
          floatingLabelText="Article Title"
          fullWidth={true}
          onChange={this.onChange}
          name="title"
          value={this.state.title} 
          /><br/>
        <TextField
          hintText=""
          floatingLabelText="Author"
          onChange={this.onChange}
          name="author"
          value={this.state.author}
          style={halfBox}
          /> <br/>
        <TextField
          hintText=""
          floatingLabelText="Description"
          onChange={this.onChange}
          name="description"
          multiLine={true}
          fullWidth={true}
          value={this.state.description}
          /><br/>
        <TextField
          hintText=""
          floatingLabelText="Type"
          onChange={this.onChange}
          name="type"
          value={this.state.type} 
          style={halfBox}
          />      
        <TextField
          hintText=""
          fullWidth={true}
          floatingLabelText="Image Url"
          onChange={this.onChange}
          name="img"
          value={this.state.img}        
          /><br/>
        <div>
          <div style={{height: '30px'}}/>
          Urls:
          {urls}
          <FloatingActionButton
            onClick={()=> this.setState({
              urls: [...this.state.urls, {name: '', link: ''}]
            })}
            mini={true}
          >
            <i className="material-icons">add</i>
          </FloatingActionButton>
        </div>
        <div>Tags: {tags}
          <FloatingActionButton
            onClick={()=> this.setState({
              tags: [...this.state.tags, '']
            })}
            mini={true}
          >
            <i className="material-icons">add</i>
          </FloatingActionButton>
        </div>
        <TextField
          hintText="Number"
          type="number"
          name="number"
          floatingLabelText="Number"
          value={this.state.number}
          onChange={this.onChangeNumber}
          style={halfBox}
          />
        <SelectField
          floatingLabelText="Binary"
          name='binary'
          value={this.state.binary}
          onChange={this.onChangeBinary.bind(this,'binary')}
        >
          <MenuItem value={false} primaryText="False" />
          <MenuItem value={true} primaryText="True" />
        </SelectField><br/>  
        <div>NumberArray: {numberArray}
          <FloatingActionButton
            onClick={()=> this.setState({
              numberArray: [...this.state.numberArray, 0]
            })}
            mini={true}
          >
            <i className="material-icons">add</i>
          </FloatingActionButton>
        </div>
      
        <RaisedButton
          label="Submit"
          type="submit"
          primary={true}
          onClick={this.onSubmit}
          style={{
            right: "0px"
          }}
        />
          
      </form>
      </Paper>
    );
  }
}

export default ArticleForm;
