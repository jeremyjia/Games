#https://blog.csdn.net/qq_42388523/article/details/107817431

from music21 import*
out = stream.Part()
for i in range(0, 8):
    pitchStream = converter.parse("tinyNotation: 4/4 c8 e d f e g f a g e f d c e c4")
    #代表4/4拍，从头开始都是八分音符，最后一个音是4分音符
    k = key.Key('C')
    pitchStream.measure(1).insert(0, k)#插入调号
    k.transpose(i, inPlace=True)#调号升
    for n in pitchStream.recurse().notes:
        n.transpose(i, inPlace=True)#所有音升
    for m in pitchStream:
        out.append(m)
out.write('xml',fp='out.xml') 