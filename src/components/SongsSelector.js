import React, { useState } from 'react';
import { Button, makeStyles, Card, CardContent, Typography } from '@material-ui/core';
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  choiceButton: {
    width: '100%'
  },
  button: {
    margin: theme.spacing(1),
    borderRadius: '20px',
  },
  backButton: {
    margin: 20,
    borderRadius: '20px',
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100vw',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
  buttonsContainer: {
    padding: 20
  },
  playProgression: {
    margin: 20,
    borderRadius: '20px',
  },
  fixedWidth: {
    maxWidth: '100%',
    '&::-webkit-scrollbar': {
      width: '8px',
      borderRadius: '10px',
      height: '8px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'darkgrey',
      borderRadius: '10px',
      height: '8px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'grey',
      height: '8px'
    }
  }
}));


function generateRandomCagedSystem() {
  const systems = ['C', 'A', 'G', 'E', 'D'];
  return systems[Math.floor(Math.random() * systems.length)];
}

const SongsSelector = ({ playProgression, getScaleNotes }) => {
  const classes = useStyles();
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);
  const [selectedKey, setSelectedKey] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(mostCommonSongs.songs);
  const [showChordProgression, setShowChordProgression] = useState(false);
  const [selectedChordProgression, setSelectedChordProgression] = useState('');

  const handlePlayProgression = () => {
    const selectedSong = filteredSongs[selectedSongIndex];
    if (selectedSong) {
      const convertedProgression = convertChordProgression(selectedSong.chords, selectedKey);
      playProgression(convertedProgression)
    }
  };

  const convertChordProgression = (progressionString, selectedKey) => {
    const keyIndex = keys.indexOf(selectedKey);

    const isMajorScale = selectedKey.includes('m') === false;
    const scaleNotes = getScaleNotes(isMajorScale ? 'major' : 'minor', keyIndex)

    return progressionString.split('-').map(chordSymbol => {
      const chordType = chordMap[chordSymbol].chord;
      const chordCaged = chordMap[chordSymbol].caged;
      const chordIndex = chordMap[chordSymbol].index;

      return {
        key: guitar.notes.sharps.indexOf(scaleNotes[chordIndex]),
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

  function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  const uniqueGenres = Array.from(new Set(mostCommonSongs.songs.map(song => song.genre)));

  return (
    <div className={classes.root}>
      {showChordProgression ? (
        <>
          {/* Render chord progression cards */}
          <Typography variant="h6" className={classes.backButton}>Chord Progressions:</Typography>
          <Button
            variant="outlined"
            color="primary"
            className={classes.backButton}
            onClick={handleBackButtonClick}
          >
            Back
          </Button>
          <div className={classes.fixedWidth} style={{ overflowX: 'auto', width: '100vw' }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.playProgression}
            onClick={handlePlayProgression}
          >
            Play Progression
          </Button>
            <div className={classes.cardsContainer}>
              
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
              <div className={classes.buttonContainer}>
              </div>
            </div>
          </div>
        </>
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
          <div className={classes.fixedWidth} style={{ overflowX: 'auto', width: '100vw' }}>
            <div className={classes.cardsContainer}>
              {/* Render song cards in chunks of 33 items each */}
              {chunkArray(filteredSongs, filteredSongs.length / 10).map((chunk, rowIndex) => (
                <div key={rowIndex} className={classes.row}>
                  {chunk.map((song, index) => (
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
              ))}
            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default SongsSelector;