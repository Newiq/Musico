import teoria from 'teoria';

export default function TeoriaIntegration(term: string) {
  try {
    let result: string;

    const chordExplanations: { [key: string]: string } = {
      'maj': 'Major chords are often described as happy or bright chords. They are built with the root note, a major third, and a perfect fifth.',
      'min': 'Minor chords often evoke a sad or melancholic feeling. They are built with the root note, a minor third, and a perfect fifth.',
      'dim': 'Diminished chords have a tense, dissonant sound. They consist of the root note, a minor third, and a diminished fifth.',
      'aug': 'Augmented chords sound unresolved and create tension. They are built with the root note, a major third, and an augmented fifth.',
      '7': 'Dominant seventh chords add a bit of tension, often used in blues and jazz. They consist of the root, major third, perfect fifth, and a minor seventh.',
      'maj7': 'Major seventh chords have a dreamy, jazzy sound. They consist of the root, major third, perfect fifth, and a major seventh.',
      'min7': 'Minor seventh chords combine the minor chord’s melancholic feel with a softer, jazzy seventh.',
      'sus': 'Suspended chords replace the third with either a second (sus2) or a fourth (sus4), giving an open, unresolved sound.',
      '11': 'Eleventh chords extend the basic chords with an eleventh (perfect fourth an octave higher), often used in jazz or funk music.',
      '13': 'Thirteenth chords add richness by extending the seventh chord with a thirteenth (major sixth an octave higher).',
      'dim7': 'Diminished seventh chords add another layer of tension, built with a diminished triad and a diminished seventh.',
      'm7': 'Minor seventh chords add warmth to minor chords by adding a minor seventh. They’re used frequently in jazz and ballads.',
      '9': 'Ninth chords add a ninth (major second an octave higher) to the seventh chords. They are common in jazz and blues.'
    };

    const chord = teoria.chord(term);

    let chordType = '';
    if (term.includes('maj7')) {
      chordType = 'maj7';
    } else if (term.includes('min7')) {
      chordType = 'min7';
    } else if (term.includes('dim7')) {
      chordType = 'dim7';
    } else if (term.includes('maj')) {
      chordType = 'maj';
    } else if (term.includes('min')) {
      chordType = 'min';
    } else if (term.includes('dim')) {
      chordType = 'dim';
    } else if (term.includes('aug')) {
      chordType = 'aug';
    } else if (term.includes('7')) {
      chordType = '7';
    } else if (term.includes('9')) {
      chordType = '9';
    } else if (term.includes('11')) {
      chordType = '11';
    } else if (term.includes('13')) {
      chordType = '13';
    } else if (term.includes('sus')) {
      chordType = 'sus';
    } 

    const notes = chord.notes().map((note: any) => note.toString()).join(', ');
    const explanation = chordExplanations[chordType] || 'No additional explanation for this chord type.';

    result = `The ${chord.name} chord consists of the notes: ${notes}. ${explanation}`;

    return result;
  } catch (error) {
    return 'There was an error processing the term. Please try again.';
  }
}
