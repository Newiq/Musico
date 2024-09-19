function DictionaryNav({ onTermClick }: { onTermClick: (description: string) => void }) {
  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const chords = ['maj', 'min', 'dim', 'aug', '7', 'm7', 'sus', 'maj7', 'min7', 'dim7', 'aug7', '11', '13', '6', '9', 'add9'];
  const scales = ['blues', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'locrian'];

  return (
    <ul className="menu bg-base-200 rounded-box w-56 mt-10 mb-20">
      {/* Chords */}
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
                        <a href="#" onClick={() => onTermClick(`${note}${chordType}`)} className="max-w-full">
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

      {/* Scales */}
      <li>
        <details>
          <summary>Scales</summary>
          <ul>
            {scales.map((scale, index) => (
              <li key={index}>
                <details>
                  <summary>{scale}</summary>
                  <ul>
                    {notes.map((note) => (
                      <li key={note}>
                        <a href="#" onClick={() => onTermClick(`${note} ${scale} scale`)}>
                          {`${note} ${scale} scale`}
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
    </ul>
  );
}

export default DictionaryNav;
