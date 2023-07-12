@echo off
title Kill pkg.exe

set var1=%1
set target=%var1%
set pid=0
for /f "tokens=2,5" %%b in ('netstat -ano ^| findstr ":%target%"') do (
    rem to check is this really equal to target port
    set find=%%b
    for /f "usebackq delims=: tokens=1,2" %%i in (`set find`) do (
        if %%j==%target% (
            going to kill %target% process %%c
            taskkill /f /pid %%c
            echo %target% process %%c has been killed
        ) else (
            echo %%j is not %target%
        )
    )
)

rem to check is target port has been really killed
for /f "tokens=2,5" %%b in ('netstat -ano ^| findstr ":%target%"') do (
    rem to check is this really equal to target port
    set find=%%b
    for /f "usebackq delims=: tokens=1,2" %%i in (`set find`) do (
        if %%j==%target% (
            set pid=%%c
        )
    )
)
if %pid%==0 (
    echo [SUCCESS]%target% port has been free already.
) else (
    echo [ERROR]%target% port is not be killed.
)

exit