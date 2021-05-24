import { makeStyles } from '@material-ui/core';
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import { format } from 'date-fns';
import Avatar from '@material-ui/core/Avatar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      backgroundColor: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: 'flex',
    },
    active: {
      backgroundColor: '#f4f4f4',
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: 'My Notes',
      icon: <SubjectOutlined color="secondary" />,
      path: '/',
    },
    {
      text: 'Create Note',
      icon: <AddCircleOutlined color="secondary" />,
      path: '/create',
    },
  ];

  return (
    <div className={classes.root}>
      {/* app bar */}

      <AppBar className={classes.appBar} elevation={0}>
        <ToolBar>
          <Typography className={classes.date}>
            Today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography>Mario</Typography>
          <Avatar src="/mario-av.png" className={classes.avatar} />
        </ToolBar>
      </AppBar>

      {/* side drawer */}

      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Jojo Notes
          </Typography>
        </div>

        {/* list, links */}

        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text}></ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {location.pathname !== '/create' && (
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={() => history.push('/create')}
        >
          <AddIcon />
        </Fab>
      )}

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
