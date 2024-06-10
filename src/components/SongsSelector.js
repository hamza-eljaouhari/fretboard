import React, { useState } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel, makeStyles, Card, CardContent, Typography, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { keys, mostCommonSongs } from '../config/mostCommonSongs';
import guitar from '../config/guitar';

const chordMap = {
  "I": {
    index: 0,
    chord: "M",
    caged: generateRandomCagedSystem(),
  },
  "i": {
    index: 0,
    chord: "m",
    caged: generateRandomCagedSystem(),
  },
  "ii": {
    index: 1,
    chord: "m",
    caged: generateRandomCagedSystem(),
  },
  "ii°": {
    index: 1,
    chord: "diminished",
    caged: generateRandomCagedSystem(),
  },
  "III": {
    index: 2,
    chord: "M",
    caged: generateRandomCagedSystem(),
  },
  "iii": {
    index: 2,
    chord: "m",
    caged: generateRandomCagedSystem(),
  },
  "IV": {
    index: 3,
    chord: "M",
    caged: generateRandomCagedSystem(),
  },
  "iv": {
    index: 3,
    chord: "m",
    caged: generateRandomCagedSystem(),
  },
  "V": {
    index: 4,
    chord: "M",
    caged: generateRandomCagedSystem(),
  },
  "V7": {
    index: 4,
    chord: "dominant 7th",
    caged: generateRandomCagedSystem(),
  },
  "V+": {
    index: 4,
    chord: "augmented",
    caged: generateRandomCagedSystem(),
  },
  "v": {
    index: 4,
    chord: "m",
    caged: generateRandomCagedSystem(),
  },
  "v7": {
    index: 4,
    chord: "minor 7th",
    caged: generateRandomCagedSystem(),
  },
  "VI": {
    index: 5,
    chord: "M",
    caged: generateRandomCagedSystem(),
  },
  "vi": {
    index: 5,
    chord: "m",
    caged: generateRandomCagedSystem(),
  },
  "vii°": {
    index: 6,
    chord: "diminished",
    caged: generateRandomCagedSystem(),
  },
  "viio7": {
    index: 6,
    chord: "half-diminished 7th",
    caged: generateRandomCagedSystem(),
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  button: {
    margin: theme.spacing(0.5),
    borderRadius: '20px',
    padding: '5px',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(2),
    overflowX: 'auto',
    width: '100%',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  card: {
    margin: theme.spacing(1),
    minWidth: 200,
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}));

function generateRandomCagedSystem() {
  const systems = ['C', 'A', 'G', 'E', 'D'];
  return systems[Math.floor(Math.random() * systems.length)];
}

const SongsSelector = ({ playProgression }) => {
  const classes = useStyles();
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);
  const [selectedKey, setSelectedKey] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(mostCommonSongs.songs);
  const [showChordProgression, setShowChordProgression] = useState(false);
  const [selectedChordProgression, setSelectedChordProgression] = useState('');

  const handlePlayProgression = () => {
    const selectedSong = filteredSongs[selectedSongIndex];

    if (selectedSong && selectedKey) {
      const convertedProgression = convertChordProgression(selectedSong.chords, selectedKey);
      playProgression(convertedProgression)
    }
  };

  const convertChordProgression = (progressionString, selectedKey) => {
    const keyIndex = keys.indexOf(selectedKey);
    return progressionString.split('-').map(chordSymbol => {
      const chordType = chordMap[chordSymbol].chord;
      const chordCaged = chordMap[chordSymbol].caged;
      const chordIndex = chordMap[chordSymbol].index;
      return {
        key: chordIndex,
        chord: chordType,
        shape: chordCaged,
      };
    });
  };

  const handleGenreFilter = (genre) => {
    setSelectedGenre(genre);
    filterSongs('genre', genre);
  };

  const handleBackButtonClick = () => {
    setShowChordProgression(false);
    setSelectedChordProgression('');
    setSelectedSongIndex(null);
  };

  const handleSongCardClick = (index) => {
    setSelectedSongIndex(index);
    const selectedSong = filteredSongs[index];
    setSelectedChordProgression(convertChordProgression(selectedSong.chords, selectedSong.key));
    setShowChordProgression(true);
  };

  const filterSongs = (filterKey, filterValue) => {
    let filtered = mostCommonSongs.songs;

    if (filterValue !== '') {
      filtered = filtered.filter(song => song[filterKey].toLowerCase().includes(filterValue.toLowerCase()));
    }

    setFilteredSongs(filtered);
    setSelectedSongIndex(null); // Reset selected song index when filter changes
  };

  const uniqueGenres = Array.from(new Set(mostCommonSongs.songs.map(song => song.genre)));

  return (
    <div className={classes.root}>
      {showChordProgression ? (
        <div>
          {/* Render chord progression cards */}
          <Typography variant="h6">Chord Progressions:</Typography>
          <div className={classes.buttonContainer}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={handleBackButtonClick}
            >
              Back
            </Button>
            <div className={classes.cardContainer}>

              {selectedChordProgression.map((chord, index) => (
                <Card
                  key={index}
                  className={classes.card}
                  onClick={() => playProgression([chord])}
                >
                  <CardContent>
                    <Typography variant="body2">Key: {guitar.notes.sharps[chord.key]}</Typography>
                    <Typography variant="body2">Quality: {chord.chord}</Typography>
                    <Typography variant="body2">CAGED: {chord.shape}</Typography>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
        </div>
      ) : (
        <>
          <div className={classes.buttonsContainer}>
            <Typography variant="h6">Genres:</Typography>
            <div className={classes.filterButtons}>
              {uniqueGenres.map((genre, index) => (
                <Button
                  key={index}
                  variant={selectedGenre === genre ? "contained" : "outlined"}
                  color="primary"
                  className={classes.button}
                  onClick={() => handleGenreFilter(genre)}
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handlePlayProgression}
          >
            Play Progression
          </Button>

          <div className={classes.cardContainer}>
            {/* Render song cards */}
            {filteredSongs.map((song, index) => (
              <Card
                key={index}
                className={classes.card}
                onClick={() => handleSongCardClick(index)}
              >
                <CardContent>
                  <Typography variant="h6">{song.title}</Typography>
                  <Typography variant="subtitle1">{song.artist}</Typography>
                  <Typography variant="body2">Key: {song.key}</Typography>
                  <Typography variant="body2">Chords: {song.chords}</Typography>
                  <Typography variant="body2">Genre: {song.genre}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SongsSelector;