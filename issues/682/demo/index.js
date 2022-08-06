// in Node.js:
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
smf.push(new JZZ.MIDI.SMF.MTrk());

smf[0].add(0, JZZ.MIDI.smfBPM(120)) // tempo 120 bpm
      .add(96, JZZ.MIDI.noteOn(0, 'C6', 127))
      .add(96, JZZ.MIDI.noteOn(0, 'Eb6', 127))
      .add(96, JZZ.MIDI.noteOn(0, 'G6', 127))
      .add(192, JZZ.MIDI.noteOff(0, 'C6'))
      .add(192, JZZ.MIDI.noteOff(0, 'Eb6'))
      .add(192, JZZ.MIDI.noteOff(0, 'G6'))
      .add(288, JZZ.MIDI.smfEndOfTrack());

require('fs').writeFileSync('a1.mid', smf.dump(), 'binary');