del mp4List.txt 


@echo on
setlocal ENABLEDELAYEDEXPANSION

for /F "delims="  %%a in ('dir /b *.mp4') do ( 
	echo file '%%a' >> mp4List.txt
)
@echo off  
