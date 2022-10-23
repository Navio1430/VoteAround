@echo off

python --version 3 1>NUL 2>&1
if errorlevel 1 goto errorNoPython

goto main

:errorNoPython
echo.
echo   #############################################
echo   ##    Python is not installed correctly    ##
echo   ##   open this website to install python:  ##
echo   ##    https://www.python.org/downloads/    ##
echo   #############################################
echo.
goto end

:main

pip install -r requirements.txt
start http://127.0.0.1:5000/
python -u website/app.py


:end
pause