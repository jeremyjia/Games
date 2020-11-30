setlocal enabledelayedexpansion
set /a h1=10
set /a m1=59
set /a s1=59

for /l %%x in (1, 1, 78) do (
	
	set /a s1+=1
	if !s1!==60 (
	set /a s1=0
	set /a m1+=1)
	if !m1!==60 (
	set /a m1=0
	set /a h1+=1)
	if !h1!==24 (
	set /a h1=0)

	set time=!h1!:!m1!:!s1!
    echo -------!time!------
	
	curl "http://localhost:8080/image/clock?time=!time!" -o %%x.jpg
)