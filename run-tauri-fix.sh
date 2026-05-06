#!/bin/bash

# Script para ejecutar Tauri evitando conflictos con snap

# Limpiar variables de entorno que podrían estar apuntando a snap
unset SNAP
unset SNAP_DATA
unset SNAP_COMMON

# Establecer librerías del sistema
export LD_LIBRARY_PATH="/usr/lib/x86_64-linux-gnu:/usr/lib:/lib/x86_64-linux-gnu:/lib:$LD_LIBRARY_PATH"

# Ejecutar tauri
cd /home/jose/KUKU-IO-LED.2/frontend
exec npm run tauri:dev
