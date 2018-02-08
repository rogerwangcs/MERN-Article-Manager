import React, { Component } from 'react';
import ReactTable from 'react-table';
import ArticleDialog from './ArticleDialog.js';

import Api from 'api/api.js'; 

import 'react-table/react-table.css';

class ArticleTable extends Component {

  constructor(props) {
    super(props);

    const columns = [{
      Header: 'ID',
      accessor: '_id',
      maxWidth: 200,
    },{
      Header: 'Title',
      accessor: 'title',
      minWidth: 300,
    }, {
      Header: 'Type',
      accessor: 'type',
      filterable: true,
      maxWidth: 60,
    }, {
      Header: 'Date Modified',
      accessor: 'dateModified',
      maxWidth: 160,        
    }, {
      Header: 'Curated',
      accessor: 'curated',
      maxWidth: 50,
    }, {
      accessor: '_id',
      maxWidth: 120,
      filterable: false,
      sortable: false,
      Cell: (accessor) => (
        <div style={{width: '100%', height: '100%', textAlign: 'center'}}>
          <ArticleDialog
            label="Edit"
            title="Edit Article"
            id={accessor.value}
            submitHandler={this.props.submitHandler}
            updateArticles={this.props.updateArticles}
            type="edit"
          />
        </div>
      )
    }];
    
    // {
    //   accessor: '_id',
    //   maxWidth: 40,
    //   filterable: false,
    //   sortable: false,
    //   Cell: (accessor) => (
    //     <div style={{width: '100%', height: '100%', textAlign: 'center'}}>
    //       <button onClick={() => Api.deleteArticle(accessor.value, () => {
    //           this.props.updateArticles();
    //         }
    //       )}>x</button>
    //     </div>
    //   )
    // }

    this.state = {
      id: 'reactTable',
      data: this.props.articles,
      columns: columns,
      filterable: true,
      defaultFiltered: [],
      defaultFilterMethod: (filter, row, column) => {
        const id = filter.pivotId || filter.id
        return row[id] !== undefined ? String(row[id]).indexOf(filter.value)>-1 : true
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
