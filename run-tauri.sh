#!/bin/bash

# Script para ejecutar Tauri App con wrapper de librerías del sistema

# Cleanup snap environment variables
unset SNAP
unset SNAP_DATA  
unset SNAP_COMMON
unset SNAP_VERSION

# Aggressive LD_LIBRARY_PATH configuration
export LD_LIBRARY_PATH="/usr/lib/x86_64-linux-gnu:/lib/x86_64-linux-gnu:/usr/lib:/lib:/usr/local/lib:$LD_LIBRARY_PATH"

# Try to run the release binary
BINARY="/home/jose/KUKU-IO-LED.2/frontend/src-tauri/target/release/kuku_io_led"

if [ ! -f "$BINARY" ]; then
    echo "Binary not found. Compiling..."
    cd /home/jose/KUKU-IO-LED.2/frontend
    npm run build
    cd src-tauri
    cargo build --release
fi

echo "Starting KUKU IO LED application..."
echo "LD_LIBRARY_PATH=$LD_LIBRARY_PATH"

exec "$BINARY" "$@"
