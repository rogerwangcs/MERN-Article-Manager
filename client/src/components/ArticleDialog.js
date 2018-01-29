import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FullscreenDialog from 'material-ui-fullscreen-dialog';
import RaisedButton from 'material-ui/RaisedButton';

import ArticleForm from './ArticleForm.js';

class ArticleDialog extends Component {
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

  const contentStyle = {
    width: '90vw',
    maxWidth: '1200px'
  };

  const bodyStyle = {
    height: '90vh',
    maxHeight: '90vh',
    backgroundcolor: 'red'
  };

  return (
    <div>
      <RaisedButton label={this.props.label} onClick={this.handleOpen} />

      <FullscreenDialog
        open={this.state.open}
        onRequestClose={() => this.setState({ open: false })}
        title={this.props.label}
        >
        <ArticleForm
          id={this.props.id}
          type={this.props.type}
          submitHandler={this.props.submitHandler}
          updateArticles={this.props.updateArticles}
          handleClose={this.handleClose}
          ></ArticleForm>
      </FullscreenDialog>
    </div>
  );
}
}

export default ArticleDialog;