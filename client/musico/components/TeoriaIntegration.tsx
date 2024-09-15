import teoria from 'teoria';

export default function TeoriaIntegration(term: string) {
try {
let result: any;

if (term.includes('maj') || term.includes('min') || term.includes('dim') || term.includes('aug')) {
    const chord = teoria.chord(term);
    result = {
    name: chord.name,
    notes: chord.notes().map((note: any) => note.toString()),
    };
}

else if (term.includes('scale')) {
    const scaleType = term.split(' ')[0]; 
    const scale = teoria.scale(teoria.note('c'), scaleType); 
    result = {
    name: scale.name,
    notes: scale.notes().map((note: any) => note.toString()),
    };
}


else if (term.includes('interval')) {
    const note = teoria.note.fromString('c');
    const interval = teoria.interval(note, term.split(' ')[0]);
    result = {
    name: interval.toString(),
    semitones: interval.semitones(),
    };
}

return result;
} catch (error) {
return { error: 'Invalid term or not supported.' };
}
}
