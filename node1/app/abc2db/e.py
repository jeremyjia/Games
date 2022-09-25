from music21 import converter
s = converter.parse('t1.abc')
s.write('midi', fp='t.mid')