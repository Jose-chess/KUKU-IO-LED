#!/bin/bash

# Tauri Launcher with System Library Override
# This script forces the app to use system libraries instead of snap

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Unset all snap-related variables
unset SNAP SNAP_DATA SNAP_COMMON SNAP_VERSION SNAP_ARCH

# Build the library path with system libraries first
declare -a LIBPATHS=(
    "/usr/lib/x86_64-linux-gnu"
    "/lib/x86_64-linux-gnu"
    "/usr/lib"
    "/lib"
    "/usr/local/lib"
)

NEW_LD_LIBRARY_PATH=""
for path in "${LIBPATHS[@]}"; do
    if [ -d "$path" ]; then
        if [ -z "$NEW_LD_LIBRARY_PATH" ]; then
            NEW_LD_LIBRARY_PATH="$path"
        else
            NEW_LD_LIBRARY_PATH="$NEW_LD_LIBRARY_PATH:$path"
        fi
    fi
done

# Add any existing LD_LIBRARY_PATH but deprioritize it
if [ -n "$LD_LIBRARY_PATH" ]; then
    NEW_LD_LIBRARY_PATH="$NEW_LD_LIBRARY_PATH:$LD_LIBRARY_PATH"
fi

export LD_LIBRARY_PATH="$NEW_LD_LIBRARY_PATH"

# Debug
echo "=== KUKU IO LED - Tauri App Launcher ==="
echo "LD_LIBRARY_PATH configured with system paths"
echo ""

# Navigate to tauri directory and run dev
cd "$SCRIPT_DIR/frontend"
npm run tauri:dev
