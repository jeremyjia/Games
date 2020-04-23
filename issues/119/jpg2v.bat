echo jpg2v.bat V0.0. 13 ;


ffmpeg -framerate 1 -i %%d.jpg -r 1 -s 240x240 -y v60s.mp4  

echo ffmpeg -framerate 10 -i Path/To/File/filename%3d.jpg -r 5 -y Path/To/File/test.mp4


echo debug:  ...
