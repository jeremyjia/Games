echo jpg2v.bat V0.0. 15 ;

IF %1.==. GOTO No1 

ffmpeg -framerate 1 -i %%d.jpg -r 1 -s %1x%1 -y v60s.mp4  

GOTO End1

:No1
  ECHO No param 1 :  usage:   jpg2v 480
GOTO End1 

:End1
 
echo ffmpeg -framerate 10 -i Path/To/File/filename%3d.jpg -r 5 -y Path/To/File/test.mp4


echo debug:  ...
