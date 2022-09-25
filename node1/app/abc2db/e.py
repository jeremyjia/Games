from music21 import converter
s = converter.parse('t1.txt')
s.write('midi', fp='t1.mid')