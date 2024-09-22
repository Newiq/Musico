import teoria from 'teoria';

export default function TeoriaIntegration(term: string): string {
  try {
    let result = '';

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

    const scaleExplanations: { [key: string]: string } = {
      'major': 'The major scale consists of seven notes and has a happy or bright sound. It follows the pattern: W-W-H-W-W-W-H (W = Whole step, H = Half step).',
      'minor': 'The minor scale consists of seven notes and has a sad or melancholic sound. It follows the pattern: W-H-W-W-H-W-W.',
      'dorian': 'The Dorian scale is a minor mode with a raised sixth, creating a jazzy or folk-like sound. It is popular in jazz and rock music.',
      'phrygian': 'The Phrygian scale is a minor mode with a flat second, often evoking a Spanish or exotic sound.',
      'lydian': 'The Lydian scale is a major mode with a raised fourth, creating a bright and dreamy sound. It is used often in jazz and film scores.',
      'mixolydian': 'The Mixolydian scale is a major mode with a flat seventh, often used in blues, rock, and jazz.',
      'locrian': 'The Locrian scale is a diminished mode with a flat second and fifth, giving it a tense and unstable sound.',
      'blues': 'The blues scale is a six-note scale commonly used in blues and rock music. It is derived from the minor pentatonic scale with an added blue note.'
    };

    const scalesPatterns: { [key: string]: number[] } = {
      'dorian': [2, 1, 2, 2, 2, 1, 2],
      'phrygian': [1, 2, 2, 2, 1, 2, 2],
      'lydian': [2, 2, 2, 1, 2, 2, 1],
      'mixolydian': [2, 2, 1, 2, 2, 1, 2],
      'locrian': [1, 2, 2, 1, 2, 2, 2]
    };

    // const applyPatternToRoot = (root: string, pattern: number[]) => {
    //   const scale = teoria.note(root).scale('major');
    //   const notes = [scale.get(1)];

    //   let currentStep = teoria.note(root).fq();
    //   for (let i = 0; i < pattern.length; i++) {
    //     currentStep *= Math.pow(2, pattern[i] / 12); 
    //     notes.push(teoria.note.fromFrequency(currentStep));
    //   }

    //   return notes.map((note: any) => note.toString()).join(', ');
    // };

    if (/maj|min|dim|aug|7|sus|11|13|9/.test(term)) {
      const chord = teoria.chord(term);
      const notes = chord.notes().map((note: any) => note.toString()).join(', ');

      const chordType = Object.keys(chordExplanations).find(type => term.includes(type)) || 'maj';
      const explanation = chordExplanations[chordType] || 'No additional explanation for this chord type.';

      result = `The ${chord.name} chord consists of the notes: ${notes}. ${explanation}`;
    } 

    else if (/scale/.test(term)) {
      const [note, scaleType] = term.split(' ');

      if (scalesPatterns[scaleType]) {
        const scale = teoria.scale(note, scaleType);
        const notes = scale.notes().map((note: any) => note.toString()).join(', ');
        const explanation = scaleExplanations[scaleType] || 'No additional explanation for this scale type.';
        result = `The ${note} ${scaleType} scale consists of the notes: ${notes}. ${explanation}`;
      }
    } 
    else {
      result = 'Invalid term. Please enter a valid chord or scale.';
    }

    return result;
  } catch (error) {
    console.error('Error processing the term:', error);
    return 'There was an error processing the term. Please try again.';
  }
}
