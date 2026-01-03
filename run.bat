@echo off
REM ============================================
REM  KAT - Run Script
REM ============================================

REM Check if venv exists
if not exist ".venv\Scripts\python.exe" (
    echo Virtual environment not found!
    echo Please run setup.bat first.
    pause
    exit /b 1
)

REM Run the application
.venv\Scripts\python.exe kat.py
