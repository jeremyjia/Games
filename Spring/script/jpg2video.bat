echo jpg2v.bat V0.0. 15 ;

IF %1.==. GOTO No1 
IF %2.==. GOTO No1 
IF %3.==. GOTO No1 
 
ffmpeg -framerate %3 -i %%d.jpg -r %3 -s %1x%2 -y vSubtitle.mp4 

GOTO End1

:No1
  ECHO param missing
  ECHO param 1 size-width
  ECHO param 2 size-height
  ECHO param 3 framerate 
GOTO End1 

:End1
 
echo ffmpeg -framerate 10 -i Path/To/File/filename%3d.jpg -r 360x360 -y Path/To/File/test.mp4

echo debug:  ...