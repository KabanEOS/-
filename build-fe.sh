#!/bin/bash
cd graph-vis-fe  
npm run build
cp public/index.html build/index.html  
cd ..  