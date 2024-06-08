import config from '../config/guitar';

const getCagedShape = (chordSymbol) => {
  const [rootIndex, quality, shapeIndex] = chordSymbol.split('-');
  const rootNote = config.notes.sharps[rootIndex];
  const chord = config.arppegios[quality];

  if (!chord) return null;

  const shapeName = config.shapes.names[shapeIndex];
  const cagedShape = chord.cagedShapes[shapeName];
  let qualitySymbol;

  switch (quality) {
    case 'M':
      qualitySymbol = 'M';
      break;
    case 'm':
      qualitySymbol = 'm';
      break;
    case 'dim':
      qualitySymbol = 'dim';
      break;
    default:
      qualitySymbol = '';
  }

  // Add 7th degree to jazzy chords
  if (chord.name.includes('7')) {
    qualitySymbol += '7';
  }

  return {
    rootNote,
    quality: qualitySymbol,
    intervals: chord.intervals,
    cagedShape,
    shape: shapeName
  };
};

export const commonChordProgressions = [
    { name: 'I-IV-V', chords: ['0-M-0', '5-M-3', '7-M-4'].map(getCagedShape) },
    { name: 'ii-V-I', chords: ['2-m-1', '7-M-4', '0-M-0'].map(getCagedShape) },
    { name: 'I-vi-IV-V', chords: ['0-M-0', '9-m-2', '5-M-3', '7-M-4'].map(getCagedShape) },
    { name: 'I-V-vi-IV', chords: ['0-M-0', '7-M-4', '9-m-2', '5-M-3'].map(getCagedShape) },
    { name: 'I-vi-ii-V', chords: ['0-M-0', '9-m-2', '2-m-1', '7-M-4'].map(getCagedShape) },
    { name: 'I-V-IV', chords: ['0-M-0', '7-M-4', '5-M-3'].map(getCagedShape) },
    { name: 'IV-V-I', chords: ['5-M-3', '7-M-4', '0-M-0'].map(getCagedShape) },
    { name: 'vi-IV-I-V', chords: ['9-m-2', '5-M-3', '0-M-0', '7-M-4'].map(getCagedShape) },
    { name: 'I-IV-vi-V', chords: ['0-M-0', '5-M-3', '9-m-2', '7-M-4'].map(getCagedShape) },
    { name: 'I-IV-I-V', chords: ['0-M-0', '5-M-3', '0-M-0', '7-M-4'].map(getCagedShape) },
    { name: 'I-IV-vi-IV', chords: ['0-M-0', '5-M-3', '9-m-2', '5-M-3'].map(getCagedShape) },
    { name: 'vi-IV-vi-V', chords: ['9-m-2', '5-M-3', '9-m-2', '7-M-4'].map(getCagedShape) },
    { name: 'I-V-vi-iii-IV-I-IV-V', chords: ['0-M-0', '7-M-4', '9-m-2', '4-m-1', '5-M-3', '0-M-0', '5-M-3', '7-M-4'].map(getCagedShape) },
    { name: 'I-iii-IV-V', chords: ['0-M-0', '4-m-1', '5-M-3', '7-M-4'].map(getCagedShape) },
    { name: 'I-IV-V-vi', chords: ['0-M-0', '5-M-3', '7-M-4', '9-m-2'].map(getCagedShape) },
    { name: 'I-V-vi-iii-IV-I-IV-V', chords: ['0-M-0', '7-M-4', '9-m-2', '4-m-1', '5-M-3', '0-M-0', '5-M-3', '7-M-4'].map(getCagedShape) },
    { name: 'I-iii-IV-ii', chords: ['0-M-0', '4-m-1', '5-M-3', '2-m-1'].map(getCagedShape) },
    { name: 'I-V-IV-vi', chords: ['0-M-0', '7-M-4', '5-M-3', '9-m-2'].map(getCagedShape) },
    { name: 'I-ii-IV-V', chords: ['0-M-0', '2-m-1', '5-M-3', '7-M-4'].map(getCagedShape) },
    { name: 'ii-IV-I-V', chords: ['2-m-1', '5-M-3', '0-M-0', '7-M-4'].map(getCagedShape) },
    { name: 'I-V-IV-ii', chords: ['0-M-0', '7-M-4', '5-M-3', '2-m-1'].map(getCagedShape) },
    { name: 'I-IV-V-ii', chords: ['0-M-0', '5-M-3', '7-M-4', '2-m-1'].map(getCagedShape) },
    { name: 'ii-V-IV-I', chords: ['2-m-1', '7-M-4', '5-M-3', '0-M-0'].map(getCagedShape) },
    { name: 'I-V-vi-iii-IV-I-ii-V', chords: ['0-M-0', '7-M-4', '9-m-2', '4-m-1', '5-M-3', '0-M-0', '2-m-1', '7-M-4'].map(getCagedShape) },
    { name: 'vi-ii-IV-V', chords: ['9-m-2', '2-m-1', '5-M-3', '7-M-4'].map(getCagedShape) },
    { name: 'I-V-vi-ii-IV-I-IV-V', chords: ['0-M-0', '7-M-4', '9-m-2', '2-m-1', '5-M-3', '0-M-0', '5-M-3', '7-M-4'].map(getCagedShape) },
    { name: 'I-vi-ii-IV-V', chords: ['0-M-0', '9-m-2', '2-m-1', '5-M-3', '7-M-4'].map(getCagedShape) },
    { name: 'I-IV-V-iii', chords: ['0-M-0', '5-M-3', '7-M-4', '4-m-1'].map(getCagedShape) },
    { name: 'I-ii-iii-IV', chords: ['0-M-0', '2-m-1', '4-m-1', '5-M-3'].map(getCagedShape) },
    { name: 'IV-V-vi-iii', chords: ['5-M-3', '7-M-4', '9-m-2', '4-m-1'].map(getCagedShape) },
    { name: 'I-vi-IV-I-V-IV', chords: ['0-M-0', '9-m-2', '5-M-3', '0-M-0', '7-M-4', '5-M-3'].map(getCagedShape) },
    { name: 'vi-V-vi-IV', chords: ['9-m-2', '7-M-4', '9-m-2', '5-M-3'].map(getCagedShape) },
    { name: 'I-V-vi-V-IV', chords: ['0-M-0', '7-M-4', '9-m-2', '7-M-4', '5-M-3'].map(getCagedShape) },
    { name: 'I-V-vi-IV-V', chords: ['0-M-0', '7-M-4', '9-m-2', '5-M-3', '7-M-4'].map(getCagedShape) },
    { name: 'I-ii-IV-V-IV', chords: ['0-M-0', '2-m-1', '5-M-3', '7-M-4', '5-M-3'].map(getCagedShape) },
    { name: 'IV-I-V-vi', chords: ['5-M-3', '0-M-0', '7-M-4', '9-m-2'].map(getCagedShape) },
    { name: 'vi-iii-IV-V', chords: ['9-m-2', '4-m-1', '5-M-3', '7-M-4'].map(getCagedShape) },
    { name: 'I-IV-I-V-IV', chords: ['0-M-0', '5-M-3', '0-M-0', '7-M-4', '5-M-3'].map(getCagedShape) },
    { name: 'IV-V-IV-V-I', chords: ['5-M-3', '7-M-4', '5-M-3', '7-M-4', '0-M-0'].map(getCagedShape) },
    { name: 'I-V-vi-IV-iii-IV', chords: ['0-M-0', '7-M-4', '9-m-2', '5-M-3', '4-m-1', '5-M-3'].map(getCagedShape) },
    { name: 'I-vi-V-IV-V', chords: ['0-M-0', '9-m-2', '7-M-4', '5-M-3', '7-M-4'].map(getCagedShape) },
    { name: 'IV-V-vi-V-IV', chords: ['5-M-3', '7-M-4', '9-m-2', '7-M-4', '5-M-3'].map(getCagedShape) },
    { name: 'IV-I-IV-V', chords: ['5-M-3', '0-M-0', '5-M-3', '7-M-4'].map(getCagedShape) },
    { name: 'I-IV-V-IV-V', chords: ['0-M-0', '5-M-3', '7-M-4', '5-M-3', '7-M-4'].map(getCagedShape) },
    { name: 'vi-ii-V-I', chords: ['9-m-2', '2-m-1', '7-M-4', '0-M-0'].map(getCagedShape) },
    { name: 'I-V-vi-iii-IV', chords: ['0-M-0', '7-M-4', '9-m-2', '4-m-1', '5-M-3'].map(getCagedShape) },
    { name: 'I-vi-IV-V-IV', chords: ['0-M-0', '9-m-2', '5-M-3', '7-M-4', '5-M-3'].map(getCagedShape) },
    { name: 'I-V-IV-vi-IV', chords: ['0-M-0', '7-M-4', '5-M-3', '9-m-2', '5-M-3'].map(getCagedShape) },
    { name: 'I-V-IV-I-IV', chords: ['0-M-0', '7-M-4', '5-M-3', '0-M-0', '5-M-3'].map(getCagedShape) },
    { name: 'vi-IV-ii-V-I', chords: ['9-m-2', '5-M-3', '2-m-1', '7-M-4', '0-M-0'].map(getCagedShape) },
  ];
  
  export const keys = [
      'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
  ];
  