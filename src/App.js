import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Fretboard from './components/Fretboard';
import CircleOfFifths from './components/CircleOfFifths';

const leftDrawerWidth = 240;
const rightDrawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "no-wrap",
    justifyContent: 'space-between',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShiftRight:{
    marginLeft: leftDrawerWidth
  },
  appBarShiftLeft:{
    marginRight: leftDrawerWidth
  },
  appBarShift: {
    width: `calc(100% - ${leftDrawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  leftDrawer: {
    width: leftDrawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  rightDrawer: {
    width: rightDrawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: leftDrawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerPaper: {
    width: rightDrawerWidth,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: '100px 100px'
  },
}));

export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [leftOpen, setLeftOpen] = React.useState(false);
  const [rightOpen, setRightOpen] = React.useState(false);
  const [circleOfFifthsRotation, setCircleOfFifthsRotation] = React.useState(222);
  const [dashesRotation, setDashesRotation] = React.useState(10);
  
  const handleLeftDrawerClose = () => {
    setLeftOpen(false);
  };

  const handleRightDrawerClose = () => {
    setRightOpen(false);
  };

  const handleLeftDrawerOpen = () => {
    setLeftOpen(true);
  };

  const handleRightDrawerOpen = () => {
    setRightOpen(true);
  };

  const onChangeKey = (key) => {
    var k = parseInt(key);
    var orderOfNote = k;

    if(k % 2 !== 0){
      orderOfNote = k > 6 ? k - 6 : k + 6;
    }

    var value = (((orderOfNote / 12 ) * 360) + 222) % 360;
    console.log(value)
    setCircleOfFifthsRotation(value);
    setDashesRotation(((orderOfNote + 1) * 30) + 10);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: leftOpen || rightOpen,
          [classes.appBarShiftRight]: leftOpen,
          [classes.appBarShiftLeft]: rightOpen
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleLeftDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: leftOpen,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Menu
          </Typography>
        </Toolbar>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Controls
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleRightDrawerOpen}
            className={clsx(rightOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.leftDrawer, {
          [classes.drawerOpen]: leftOpen,
          [classes.drawerClose]: !leftOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: leftOpen,
            [classes.drawerClose]: !leftOpen,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleLeftDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[ 'Circle Of Fifths', 'Fretboard', 'Account', 'Compositions'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>

      <main className={classes.content}>
        <Fretboard onChangeKey={onChangeKey}></Fretboard>
        <CircleOfFifths circleOfFifthsRotation={circleOfFifthsRotation} dashesRotation={dashesRotation}></CircleOfFifths>
      </main>

      <Drawer
        className={classes.rightDrawer}
        variant="persistent"
        anchor="right"
        open={rightOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleRightDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
