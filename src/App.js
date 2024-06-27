import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlayAndVisualize from './pages/PlayAndVisualize';
import ComposeAndShare from './pages/ComposeAndShare';
import LearnSongs from './pages/LearnSongs';
import TheCircleOfFifths from './pages/TheCircleOfFifths';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '100px 0'
  },
  appBar: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  navLinks: {
    marginLeft: 'auto',
    gap: theme.spacing(2),
    textDecoration: 'none'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },

}));

export default function App(props) {
  const classes = useStyles();
  const [title, setTitle] = useState('Choose something to display...');

  return (
    <Router>
      <CssBaseline />
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar >
        <Button variant="contained" startIcon={<FavoriteIcon />}>
          <Typography variant="h6" className={classes.title}>Fretty</Typography>
        </Button>
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
        </Toolbar>
      </AppBar>
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
