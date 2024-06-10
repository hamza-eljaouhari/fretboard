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
    { 
      name: 'I-IV-V', 
      chords: ['0-M-0', '5-M-3', '7-M-4'].map(getCagedShape), 
      songs: [
        // Blues
        { title: "Sweet Home Chicago", artist: "Robert Johnson", genre: "Blues", originalKey: "E" },
        { title: "Crossroads", artist: "Cream", genre: "Blues", originalKey: "A" },
        { title: "Hoochie Coochie Man", artist: "Muddy Waters", genre: "Blues", originalKey: "A" },
        { title: "Rock and Roll Music", artist: "Chuck Berry", genre: "Blues", originalKey: "G" },
        { title: "Move It On Over", artist: "George Thorogood", genre: "Blues", originalKey: "A" },
        { title: "Ice Cream Man", artist: "John Lee Hooker", genre: "Blues", originalKey: "A" },
        { title: "Viola Lee Blues", artist: "Grateful Dead", genre: "Blues", originalKey: "A" },
        { title: "Call Me The Breeze", artist: "Lynyrd Skynyrd", genre: "Blues", originalKey: "D" },
        { title: "The Jack", artist: "AC/DC", genre: "Blues", originalKey: "G" },
        { title: "Rave On", artist: "Buddy Holly", genre: "Blues", originalKey: "A" },
        // Pop
        { title: "Twist and Shout", artist: "The Beatles", genre: "Pop", originalKey: "D" },
        { title: "Wild Thing", artist: "The Troggs", genre: "Pop", originalKey: "A" },
        { title: "I Saw Her Standing There", artist: "The Beatles", genre: "Pop", originalKey: "E" },
        { title: "La Bamba", artist: "Ritchie Valens", genre: "Pop", originalKey: "C" },
        { title: "Good Lovin'", artist: "The Young Rascals", genre: "Pop", originalKey: "G" },
        { title: "Louie Louie", artist: "The Kingsmen", genre: "Pop", originalKey: "A" },
        { title: "Rock Around the Clock", artist: "Bill Haley & His Comets", genre: "Pop", originalKey: "A" },
        { title: "I Love Rock 'n' Roll", artist: "Joan Jett & the Blackhearts", genre: "Pop", originalKey: "E" },
        { title: "No Particular Place to Go", artist: "Chuck Berry", genre: "Pop", originalKey: "G" },
        { title: "Fun, Fun, Fun", artist: "The Beach Boys", genre: "Pop", originalKey: "G" },
        // Jazz
        { title: "C Jam Blues", artist: "Duke Ellington", genre: "Jazz", originalKey: "C" },
        { title: "Straight, No Chaser", artist: "Thelonious Monk", genre: "Jazz", originalKey: "F" },
        { title: "Bag's Groove", artist: "Milt Jackson", genre: "Jazz", originalKey: "C" },
        { title: "Billie's Bounce", artist: "Charlie Parker", genre: "Jazz", originalKey: "F" },
        { title: "Blue Monk", artist: "Thelonious Monk", genre: "Jazz", originalKey: "Bb" },
        { title: "Now's the Time", artist: "Charlie Parker", genre: "Jazz", originalKey: "F" },
        { title: "Tenor Madness", artist: "Sonny Rollins", genre: "Jazz", originalKey: "Bb" },
        { title: "Au Privave", artist: "Charlie Parker", genre: "Jazz", originalKey: "F" },
        { title: "Blues for Alice", artist: "Charlie Parker", genre: "Jazz", originalKey: "F" },
        { title: "Freddie Freeloader", artist: "Miles Davis", genre: "Jazz", originalKey: "Bb" },
        // Rock
        { title: "Johnny B. Goode", artist: "Chuck Berry", genre: "Rock", originalKey: "A" },
        { title: "Roll Over Beethoven", artist: "Chuck Berry", genre: "Rock", originalKey: "D" },
        { title: "Blue Suede Shoes", artist: "Elvis Presley", genre: "Rock", originalKey: "A" },
        { title: "Tutti Frutti", artist: "Little Richard", genre: "Rock", originalKey: "C" },
        { title: "Great Balls of Fire", artist: "Jerry Lee Lewis", genre: "Rock", originalKey: "C" },
        { title: "Whole Lotta Shakin' Goin' On", artist: "Jerry Lee Lewis", genre: "Rock", originalKey: "C" },
        { title: "Good Golly Miss Molly", artist: "Little Richard", genre: "Rock", originalKey: "A" },
        { title: "Long Tall Sally", artist: "Little Richard", genre: "Rock", originalKey: "C" },
        { title: "Shake, Rattle and Roll", artist: "Bill Haley & His Comets", genre: "Rock", originalKey: "G" },
        { title: "Summertime Blues", artist: "Eddie Cochran", genre: "Rock", originalKey: "E" },
      ] 
    },
    { 
      name: 'ii-V-I', 
      chords: ['2-m-1', '7-M-4', '0-M-0'].map(getCagedShape), 
      songs: [
        // Blues
        { title: "The Thrill is Gone", artist: "B.B. King", genre: "Blues", originalKey: "Bm" },
        { title: "Stormy Monday", artist: "T-Bone Walker", genre: "Blues", originalKey: "G" },
        { title: "Since I Met You Baby", artist: "B.B. King", genre: "Blues", originalKey: "Bb" },
        { title: "Every Day I Have the Blues", artist: "B.B. King", genre: "Blues", originalKey: "C" },
        { title: "Trouble in Mind", artist: "Nina Simone", genre: "Blues", originalKey: "F" },
        { title: "St. Louis Blues", artist: "W.C. Handy", genre: "Blues", originalKey: "G" },
        { title: "Call It Stormy Monday", artist: "T-Bone Walker", genre: "Blues", originalKey: "G" },
        { title: "I Got My Mojo Working", artist: "Muddy Waters", genre: "Blues", originalKey: "G" },
        { title: "Born Under a Bad Sign", artist: "Albert King", genre: "Blues", originalKey: "Db" },
        { title: "Help Me", artist: "Sonny Boy Williamson", genre: "Blues", originalKey: "G" },
        // Pop
        { title: "Sunday Morning", artist: "Maroon 5", genre: "Pop", originalKey: "C" },
        { title: "Something", artist: "The Beatles", genre: "Pop", originalKey: "C" },
        { title: "How Deep is Your Love", artist: "Bee Gees", genre: "Pop", originalKey: "Eb" },
        { title: "Careless Whisper", artist: "George Michael", genre: "Pop", originalKey: "D" },
        { title: "What's Love Got to Do with It", artist: "Tina Turner", genre: "Pop", originalKey: "G" },
        { title: "Easy", artist: "Commodores", genre: "Pop", originalKey: "A" },
        { title: "Feelings", artist: "Morris Albert", genre: "Pop", originalKey: "F" },
        { title: "The Lady in Red", artist: "Chris de Burgh", genre: "Pop", originalKey: "C" },
        { title: "Just the Way You Are", artist: "Billy Joel", genre: "Pop", originalKey: "D" },
        { title: "Wonderful Tonight", artist: "Eric Clapton", genre: "Pop", originalKey: "G" },
        // Jazz
        { title: "Autumn Leaves", artist: "Joseph Kosma", genre: "Jazz", originalKey: "G" },
        { title: "Blue Bossa", artist: "Kenny Dorham", genre: "Jazz", originalKey: "Cm" },
        { title: "All the Things You Are", artist: "Jerome Kern", genre: "Jazz", originalKey: "F#" },
        { title: "Someday My Prince Will Come", artist: "Frank Churchill", genre: "Jazz", originalKey: "Bb" },
        { title: "There Will Never Be Another You", artist: "Harry Warren", genre: "Jazz", originalKey: "Eb" },
        { title: "Take Five", artist: "Dave Brubeck", genre: "Jazz", originalKey: "Eb" },
        { title: "So What", artist: "Miles Davis", genre: "Jazz", originalKey: "D" },
        { title: "Freddie Freeloader", artist: "Miles Davis", genre: "Jazz", originalKey: "Bb" },
        { title: "Blue Monk", artist: "Thelonious Monk", genre: "Jazz", originalKey: "Bb" },
        { title: "Doxy", artist: "Sonny Rollins", genre: "Jazz", originalKey: "Bb" },
        // Rock
        { title: "Light My Fire", artist: "The Doors", genre: "Rock", originalKey: "A" },
        { title: "Stairway to Heaven", artist: "Led Zeppelin", genre: "Rock", originalKey: "A" },
        { title: "Purple Haze", artist: "Jimi Hendrix", genre: "Rock", originalKey: "E" },
        { title: "Hotel California", artist: "The Eagles", genre: "Rock", originalKey: "Bm" },
        { title: "Layla", artist: "Derek and the Dominos", genre: "Rock", originalKey: "Dm" },
        { title: "Sweet Child O' Mine", artist: "Guns N' Roses", genre: "Rock", originalKey: "D" },
        { title: "Bohemian Rhapsody", artist: "Queen", genre: "Rock", originalKey: "Bb" },
        { title: "Under the Bridge", artist: "Red Hot Chili Peppers", genre: "Rock", originalKey: "E" },
        { title: "November Rain", artist: "Guns N' Roses", genre: "Rock", originalKey: "C" },
        { title: "Comfortably Numb", artist: "Pink Floyd", genre: "Rock", originalKey: "B" },
      ]
    },  
    { 
      name: 'I-vi-IV-V', 
      chords: ['0-M-0', '9-m-2', '5-M-3', '7-M-4'].map(getCagedShape), 
      songs: [
        // Blues
        { title: "Heart and Soul", artist: "Hoagy Carmichael", genre: "Blues", originalKey: "F" },
        { title: "Earth Angel", artist: "The Penguins", genre: "Blues", originalKey: "C" },
        { title: "Since I Fell for You", artist: "Buddy Johnson", genre: "Blues", originalKey: "Bb" },
        { title: "I'd Rather Go Blind", artist: "Etta James", genre: "Blues", originalKey: "A" },
        { title: "Sitting on Top of the World", artist: "Howlin' Wolf", genre: "Blues", originalKey: "G" },
        { title: "Stormy Monday", artist: "T-Bone Walker", genre: "Blues", originalKey: "G" },
        { title: "Call It Stormy Monday", artist: "T-Bone Walker", genre: "Blues", originalKey: "G" },
        { title: "Next Time You See Me", artist: "Junior Parker", genre: "Blues", originalKey: "Bb" },
        { title: "See See Rider", artist: "Ma Rainey", genre: "Blues", originalKey: "C" },
        { title: "Further on Up the Road", artist: "Bobby Blue Bland", genre: "Blues", originalKey: "A" },
        // Pop
        { title: "Stand By Me", artist: "Ben E. King", genre: "Pop", originalKey: "A" },
        { title: "Perfect", artist: "Ed Sheeran", genre: "Pop", originalKey: "G" },
        { title: "Every Breath You Take", artist: "The Police", genre: "Pop", originalKey: "A" },
        { title: "I'm Yours", artist: "Jason Mraz", genre: "Pop", originalKey: "B" },
        { title: "Let It Be", artist: "The Beatles", genre: "Pop", originalKey: "C" },
        { title: "Hey Soul Sister", artist: "Train", genre: "Pop", originalKey: "E" },
        { title: "With or Without You", artist: "U2", genre: "Pop", originalKey: "D" },
        { title: "No Woman, No Cry", artist: "Bob Marley", genre: "Pop", originalKey: "C" },
        { title: "Can You Feel the Love Tonight", artist: "Elton John", genre: "Pop", originalKey: "C" },
        { title: "Halo", artist: "Beyoncé", genre: "Pop", originalKey: "A" },
        // Jazz
        { title: "Autumn Leaves", artist: "Joseph Kosma", genre: "Jazz", originalKey: "G" },
        { title: "Blue Bossa", artist: "Kenny Dorham", genre: "Jazz", originalKey: "Cm" },
        { title: "All the Things You Are", artist: "Jerome Kern", genre: "Jazz", originalKey: "F#" },
        { title: "Someday My Prince Will Come", artist: "Frank Churchill", genre: "Jazz", originalKey: "Bb" },
        { title: "There Will Never Be Another You", artist: "Harry Warren", genre: "Jazz", originalKey: "Eb" },
        { title: "Take Five", artist: "Dave Brubeck", genre: "Jazz", originalKey: "Eb" },
        { title: "So What", artist: "Miles Davis", genre: "Jazz", originalKey: "D" },
        { title: "Freddie Freeloader", artist: "Miles Davis", genre: "Jazz", originalKey: "Bb" },
        { title: "Blue Monk", artist: "Thelonious Monk", genre: "Jazz", originalKey: "Bb" },
        { title: "Doxy", artist: "Sonny Rollins", genre: "Jazz", originalKey: "Bb" },
        // Rock
        { title: "Light My Fire", artist: "The Doors", genre: "Rock", originalKey: "A" },
        { title: "Stairway to Heaven", artist: "Led Zeppelin", genre: "Rock", originalKey: "A" },
        { title: "Purple Haze", artist: "Jimi Hendrix", genre: "Rock", originalKey: "E" },
        { title: "Hotel California", artist: "The Eagles", genre: "Rock", originalKey: "Bm" },
        { title: "Layla", artist: "Derek and the Dominos", genre: "Rock", originalKey: "Dm" },
        { title: "Sweet Child O' Mine", artist: "Guns N' Roses", genre: "Rock", originalKey: "D" },
        { title: "Bohemian Rhapsody", artist: "Queen", genre: "Rock", originalKey: "Bb" },
        { title: "Under the Bridge", artist: "Red Hot Chili Peppers", genre: "Rock", originalKey: "E" },
        { title: "November Rain", artist: "Guns N' Roses", genre: "Rock", originalKey: "C" },
        { title: "Comfortably Numb", artist: "Pink Floyd", genre: "Rock", originalKey: "B" },
      ] 
    },
      { name: 'I-V-vi-IV', chords: ['0-M-0', '7-M-4', '9-m-2', '5-M-3'].map(getCagedShape) },
      { name: 'I-vi-ii-V', chords: ['0-M-0', '9-m-2', '2-m-1', '7-M-4'].map(getCagedShape) },
      { name: 'I-V-IV', chords: ['0-M-0', '7-M-4', '5-M-3'].map(getCagedShape) },
      { name: 'IV-V-I', chords: ['5-M-3', '7-M-4', '0-M-0'].map(getCagedShape) },
      { name: 'vi-IV-I-V', chords: ['9-m-2', '5-M-3', '0-M-0', '7-M-4'].map(getCagedShape) },
      { name: 'I-IV-vi-V', chords: ['0-M-0', '5-M-3', '9-m-2', '7-M-4'].map(getCagedShape) },
      { name: 'I-IV-I-V', chords: ['0-M-0', '5-M-3',   '0-M-0', '7-M-4'].map(getCagedShape) },
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
    