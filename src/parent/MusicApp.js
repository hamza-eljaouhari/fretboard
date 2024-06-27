import React, { useState } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FretboardControls from '../components/FretboardControls';
import Progressor from '../components/Progressor';
import CircleOfFifths from '../components/CircleOfFifths';
import FretboardDisplay from '../components/FretboardDisplay';
import ChordComposer from '../components/ChordComposer';
import withFretboardState from '../hoc/withFretboardState';
import withChordProgression from '../hoc/withChordProgression';
import withPlayback from '../hoc/withPlayback';
import { withRouter } from 'react-router-dom'; // Import withRouter
import { connect } from 'react-redux';
import { addFretboard, updateStateProperty, setProgression, setProgressionKey } from '../redux/actions';
import guitar from '../config/guitar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '65%',
    margin: '0 auto',
  },
  fretboardContainer: {
    width: '100%',
    overflowX: 'auto',
    maxWidth: '100vw'
  },
  fretboardArea: {
    flex: 1,
    overflowY: 'auto',
  },
  shadowyContainer: {
    backgroundColor: '#ffffff',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1000,
  },
  selectControl: {
    minWidth: '120px',
  },
  formControl: {
    margin: '8px',
    width: '100vw'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
  },
  chordPressionDisplay: {},
}));

const MusicApp = (props) => {
  const classes = useStyles();
  const {
    boards,
    selectedFretboard,
    handleFretboardSelect,
    handleChoiceChange,
    createNewBoardDisplay,
    cleanFretboard,
    onElementChange,
    addChordToProgression,
    saveProgression,
    playProgression,
    playSelectedNotes,
    progressions,
    setProgression,
    setProgressionKey,
    getScaleNotes,
    selectedFretboardIndex
  } = props;


  const [showFretboardControls, setShowFretboardControls] = useState(true);
  const [showProgressor, setShowProgressor] = useState(true);
  const [showCircleOfFifths, setShowCircleOfFifths] = useState(true);
  const [showChordComposer, setShowChordComposer] = useState(true);

  if (!selectedFretboard) {
    return <div>Loading...</div>;
  }

  const getCircleData = () => {
    const defaultPoint = { tone: 'C', degree: 'Major' };
    if (selectedFretboardIndex === -1 || !selectedFretboard) return defaultPoint;
    const selectedKey = selectedFretboard.keySettings[selectedFretboard.generalSettings.choice];
    const selectedTone = guitar.notes.flats[selectedKey];
    return { tone: selectedTone, degree: getDegree(selectedFretboard.generalSettings.choice) };
  };

  const getDegree = (choice) => {
    const defaultDegree = 'Major';
    if (!choice || selectedFretboardIndex === -1 || !boards.length) return defaultDegree;
    if (choice === 'scale') {
      const scale = guitar.scales[selectedFretboard.scaleSettings.scale];
      return scale ? scale.degree : defaultDegree;
    } else if (choice === 'chord' || choice === 'arppegio') {
      const chord = guitar.arppegios[selectedFretboard[choice + 'Settings'][choice]];
      return chord ? chord.quality : defaultDegree;
    }
    return defaultDegree;
  };

  const circleData = getCircleData();
  const currentScale = selectedFretboardIndex >= 0 && selectedFretboard ? guitar.scales[selectedFretboard.scaleSettings.scale] : 'major';
  const scaleModes = currentScale?.isModal ? currentScale.modes : [];

  const components = (
        <div className={classes.root}>
        <div>
            <IconButton onClick={createNewBoardDisplay}>
            <AddCircleOutlineIcon />
            </IconButton>
            <FretboardDisplay
            boards={boards}
            handleFretboardSelect={handleFretboardSelect}
            onElementChange={onElementChange}
            />
        </div>
        <div>
            <section className="controls">
            {showFretboardControls && (
                <FretboardControls
                playSelectedNotes={playSelectedNotes}
                handleChoiceChange={handleChoiceChange}
                scaleModes={scaleModes}
                arppegiosNames={Object.keys(guitar.arppegios)}
                choice={selectedFretboard.generalSettings.choice}
                onCleanFretboard={cleanFretboard}
                selectedKey={parseInt(selectedFretboard.keySettings[selectedFretboard.generalSettings.choice])}
                onCopyLink={() => navigator.clipboard.writeText(window.location.href).then(() => alert("The link has been copied successfully."), () => alert("Oops, something went wrong. You can copy the link directly."))}
                selectedMode={parseInt(selectedFretboard.modeSettings.mode || 0)}
                selectedScale={selectedFretboard.scaleSettings.scale || ''}
                selectedChord={selectedFretboard.chordSettings.chord || ''}
                selectedShape={selectedFretboard[selectedFretboard.generalSettings.choice + 'Settings'].shape || ''}
                selectedArppegio={selectedFretboard.arppegioSettings.arppegio}
                selectedFret={selectedFretboard.chordSettings.fret}
                addChordToProgression={addChordToProgression}
                saveProgression={saveProgression}
                playProgression={playProgression}
                progressions={progressions.progression}
                onElementChange={onElementChange}
                />
            )}
            </section>
            {showCircleOfFifths && (
            <CircleOfFifths
                className={classes.circleOfFifths}
                tone={circleData.tone}
                onElementChange={onElementChange}
                selectedFretboardIndex={selectedFretboardIndex}
                quality={circleData.degree}
            />
            )}
            {showChordComposer && (
            <ChordComposer
                addChordToProgression={addChordToProgression}
                playProgression={playProgression}
                saveProgression={saveProgression}
            />
            )}
            {showProgressor && (
            <Progressor
                className={classes.chordPressionDisplay}
                progression={progressions.progression}
                setProgression={setProgression}
                playProgression={playProgression}
                setProgressionKey={setProgressionKey}
                selectedKey={progressions.key}
                getScaleNotes={getScaleNotes}
            />
            )}
        </div>
        </div>
    );

    if(selectedFretboard){
        return (
            <>
                { components }
            </>
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    const currentPath = ownProps.location.pathname;
    const filteredBoards = state.fretboard.components.filter(board => board.generalSettings.page === currentPath);
    return { boards: filteredBoards, progressions: state.partitions };
};

export default withRouter(connect(
    mapStateToProps,
    {
        addFretboard, updateStateProperty, setProgression, setProgressionKey
    }
)(withFretboardState(withChordProgression(withPlayback(MusicApp)))));