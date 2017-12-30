import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import ArticleForm from './ArticleForm.js';

class ArticleDialog extends React.Component {
  state = {
    open: false,
  };

handleOpen = () => {
  this.setState({open: true});
};

handleClose = () => {
  this.setState({open: false});
};

render() {
  const actions = [
    <FlatButton
      label="Submit"
      primary={true}
      keyboardFocused={true}
      onClick={this.handleClose}
      />
  ];

  const customContentStyle = {
    width: '90vw',
    maxWidth: '800px',
  };

  return (
    <div>
      <RaisedButton label={this.props.label} onClick={this.handleOpen} />
      <Dialog
        title={this.props.label}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
        contentStyle={customContentStyle}
        >
        <ArticleForm
          id={this.props.id}
          type={this.props.type}
          submitHandler={this.props.submitHandler}
          getArticle={this.props.getArticle}
          handleClose={this.handleClose}
          ></ArticleForm>
      </Dialog>
    </div>
  );
}
}

export default ArticleDialog;