import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import PlayAndVisualize from './pages/PlayAndVisualize';
import ComposeAndShare from './pages/ComposeAndShare';
import LearnSongs from './pages/LearnSongs';
import TheCircleOfFifths from './pages/TheCircleOfFifths';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '100px 0',
  },
  appBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  navLinks: {
    display: 'flex',
    gap: theme.spacing(2),
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  drawer: {
    width: 250,
  },
  drawerPaper: {
    width: 250,
  },
  toolbarContent: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  toolbarTitle: {
    [theme.breakpoints.down('sm')]: {
      order: 2,
    },
  },
}));

export default function App(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [title, setTitle] = useState('Choose something to display...');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <div className={classes.drawer}>
      <List>
        <ListItem button component={Link} to="/fretboard/" onClick={handleDrawerToggle}>
          <ListItemText primary="Play and Visualize" />
        </ListItem>
        <ListItem button component={Link} to="/fretboard/compose" onClick={handleDrawerToggle}>
          <ListItemText primary="Compose and Share" />
        </ListItem>
        <ListItem button component={Link} to="/fretboard/learn" onClick={handleDrawerToggle}>
          <ListItemText primary="Learn Songs" />
        </ListItem>
        <ListItem button component={Link} to="/fretboard/circle" onClick={handleDrawerToggle}>
          <ListItemText primary="The Circle Of Fifths" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <Router basename="/fretboard">
      <CssBaseline />
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar className={classes.toolbarContent}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<FavoriteIcon />}
            className={classes.toolbarTitle}
          >
            <Typography variant="h6" className={classes.title}>
              Fretty
            </Typography>
          </Button>
          <Hidden smDown>
            <div className={classes.navLinks}>
              <Link to="/" className={classes.link}>
                <Button color="inherit">Play and Visualize</Button>
              </Link>
              <Link to="/compose" className={classes.link}>
                <Button color="inherit">Compose and Share</Button>
              </Link>
              <Link to="/learn" className={classes.link}>
                <Button color="inherit">Learn Songs</Button>
              </Link>
              <Link to="/circle" className={classes.link}>
                <Button color="inherit">The Circle Of Fifths</Button>
              </Link>
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>
      <nav>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.root}>
        <Switch>
          <Route exact path="/" component={PlayAndVisualize} />
          <Route path="/compose" component={ComposeAndShare} />
          <Route path="/learn" component={LearnSongs} />
          <Route path="/circle" component={TheCircleOfFifths} />
        </Switch>
      </main>
    </Router>
  );
}
