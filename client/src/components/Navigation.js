import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

import { Link } from 'react-router-dom';

const NavList = () => (
  <Paper id="nav" zDepth={2}>
    <List>
      <Divider />
      <Link className = "Link" to='/'>
        <ListItem primaryText="Home"/>
        <Divider />
      </Link>
      <Link className = "Link" to='/articles'>
        <ListItem primaryText="Articles" leftIcon={<ContentInbox />}/>
        <Divider />
      </Link>
    </List>
  </Paper>
);

export default NavList;