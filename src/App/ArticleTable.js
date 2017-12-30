import React, { Component } from 'react';
import ReactTable from 'react-table';
import ArticleDialog from './ArticleDialog.js';
import 'react-table/react-table.css';

import IconButton from 'material-ui/IconButton';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001';

class ArticleTable extends Component {

  constructor(props) {
    super(props);

    const columns = [{
      Header: 'Title',
      accessor: 'title',
      minWidth: 200,
    }, {
      Header: 'Type',
      accessor: 'type',
      filterable: false,
      maxWidth: 80,
    }, {
      Header: 'Date Modified',
      accessor: 'dateModified',
      maxWidth: 100,
      filterable: false,
    }, {
      accessor: '_id',
      maxWidth: 100,
      filterable: false,
      sortable: false,
      Cell: (accessor) => (
        <div style={{width: '100%', height: '100%', textAlign: 'center'}}>
          <ArticleDialog
            label="Edit"
            title="Edit Article"
            getArticle={this.props.getArticle}
            submitHandler={this.props.editArticle}
            type="edit"
            id={accessor.value}
            ></ArticleDialog>
        </div>
      )
    }, {
      accessor: '_id',
      maxWidth: 40,
      filterable: false,
      sortable: false,
      Cell: (accessor) => (
        <div style={{width: '100%', height: '100%', textAlign: 'center'}}>
          <button onClick={() => this.props.deleteArticle(accessor.value)}>x</button>
        </div>
      )
    }];

    this.state = {
      id: 'reactTable',
      data: this.props.articles,
      columns: columns,
      filterable: true,
      defaultFiltered: [],
      defaultFilterMethod: (filter, row, column) => {
        const id = filter.pivotId || filter.id
        return row[id] !== undefined ? String(row[id]).toLowerCase().startsWith(filter.value) : true
      },
      defaultPageSize: 15,
      pageSizeOptions: [15, 25, 50],
      loading: true,
      resizable: false,
      sortable: true,
      multiSort: true,
      defaultSorted: [
        {
          id: "dateModified",
          desc: true
        }
      ],
      className: "-striped -highlight",
    };

  }
  componentDidMount() {
    this.setState({data: this.props.data, loading: false});
  }
  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data, loading: false});
  }

  render() {
    return (
      <ReactTable {...this.state}/>
    );
  }
}

export default ArticleTable;