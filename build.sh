#!/bin/bash
set -e

echo "Installing root dependencies..."
npm install

echo "Building dashboard..."
cd dashboard
npm install
npm run build
cd ..

echo "Installing server dependencies..."
cd server
npm install
cd ..

echo "Build completed successfully!"
