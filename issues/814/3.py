from music21 import converter
s = converter.parse('3.abc')
s.write('midi', fp='3.mid')