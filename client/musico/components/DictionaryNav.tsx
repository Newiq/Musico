function DictionaryNav({ onTermClick }) {
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const chords = ['maj', 'min', 'dim', 'aug', '7', 'm7', 'sus', 'maj7', 'min7', 'dim7', 'aug7', '11', '13', '6', '9', 'add9'];
    const scales = ['major', 'minor', 'harmonic', 'melodic', 'pentatonic', 'blues', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'locrian'];
    const intervals = ['P1', 'P4', 'P5', 'P8', 'M2', 'M3', 'M6', 'M7', 'm2', 'm3', 'm6', 'm7', 'A1', 'A4', 'A5', 'd2', 'd3', 'd5', 'd6'];
  
    return (
      <ul className="menu bg-base-200 rounded-box w-56 mt-10 mb-20">
        <li>
          <details>
            <summary>Chords</summary>
            <ul>
              {chords.map((chordType, index) => (
                <li key={index}>
                  <details>
                    <summary>{chordType}</summary>
                    <ul>
                      {notes.map((note) => (
                        <li key={note}>
                          <a href="#" onClick={() => onTermClick(`${note}${chordType}`)}>
                            {`${note}${chordType}`}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
          </details>
        </li>
  
        <li>
          <details>
            <summary>Scales</summary>
            <ul>
              {scales.map((scale, index) => (
                <li key={index}>
                  <a href="#" onClick={() => onTermClick(scale)}>{scale}</a>
                </li>
              ))}
            </ul>
          </details>
        </li>
  
        <li>
          <details>
            <summary>Intervals</summary>
            <ul>
              {intervals.map((interval, index) => (
                <li key={index}>
                  <a href="#" onClick={() => onTermClick(interval)}>{interval}</a>
                </li>
              ))}
            </ul>
          </details>
        </li>
      </ul>
    );
  }
  
  export default DictionaryNav;
  