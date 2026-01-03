# KAT - Yaesu FT-991A Controller

A PyQt5-based GUI for controlling the Yaesu FT-991A transceiver via CAT commands.

## Quick Start

1. Run `setup.bat` — creates virtual environment and installs dependencies
2. Run `run.bat` — launches KAT

## Project Structure

```
KAT/
├── .venv/                  # Virtual environment (created by setup.bat)
├── kat.py                  # Main application
├── cat_sniffer.py          # CAT command proxy/debugger
├── requirements.txt        # Python dependencies
├── setup.bat               # One-time setup script
├── run.bat                 # Application launcher
└── presets/                # Radio preset files
    ├── aprs.xml
    ├── defaultv002.xml
    ├── FT8settings.xml
    ├── overrides_only.xml
    ├── SSB_setting.xml
    ├── WINLINK_APRS.xml
    └── wiresx.xml
```

## Requirements

- Windows 10/11
- Python 3.8+
- Yaesu FT-991A connected via USB/serial

## Dependencies

- **PyQt5** — GUI framework
- **pyserial** — Serial communication for CAT control

## CAT Interface Settings

Make sure your FT-991A CAT settings match:
- Menu 031: CAT RATE (typically 38400bps)
- Menu 032: CAT TIMEOUT
- Menu 033: CAT RTS

73 de KO6IKR
