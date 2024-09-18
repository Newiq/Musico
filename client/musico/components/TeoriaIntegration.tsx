import teoria from 'teoria';

export default function TeoriaIntegration(term: string) {
  try {
    let result: any;

    const searchTerm = term.toLowerCase();

    const chordTypes = ['maj', 'min', 'dim', 'aug', '7', 'm7', 'sus', 'maj7', 'min7', 'dim7', 'aug7', '11', '13', '6', '9', 'add9'];
    const scaleTypes = ['major', 'minor', 'harmonic', 'melodic', 'pentatonic', 'blues', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'locrian'];
    const intervalTypes = ['P1', 'P4', 'P5', 'P8', 'M2', 'M3', 'M6', 'M7', 'm2', 'm3', 'm6', 'm7', 'A1', 'A4', 'A5', 'd2', 'd3', 'd5', 'd6'];

    // 检查是否是和弦类型
    const chordMatch = chordTypes.find(type => searchTerm.includes(type));
    if (chordMatch) {
      const chord = teoria.chord(term);
      result = {
        type: 'Chord',
        name: chord.name,
        notes: chord.notes().map((note: any) => note.toString()),
      };
    }

    // 检查是否是音阶类型
    const scaleMatch = scaleTypes.find(type => searchTerm.includes(type));
    if (scaleMatch) {
      const rootNote = term.split(' ')[0]; // 根音在输入的第一个单词
      const scale = teoria.scale(teoria.note(rootNote), scaleMatch);
      result = {
        type: 'Scale',
        name: scale.name,
        notes: scale.notes().map((note: any) => note.toString()),
      };
    }

    // 检查是否是音程类型
    const intervalMatch = intervalTypes.find(type => searchTerm.includes(type));
    if (intervalMatch) {
      const note = teoria.note.fromString('c'); // 默认根音为 C
      const interval = teoria.interval(note, intervalMatch);
      result = {
        type: 'Interval',
        name: interval.toString(),
        semitones: interval.semitones(),
      };
    }

    if (!result) {
      result = { error: 'No matching chord, scale, or interval found.' };
    }

    return result;
  } catch (error) {
    return { error: 'Invalid term or not supported.' };
  }
}
