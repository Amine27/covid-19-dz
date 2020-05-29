#!/bin/bash

# ~/.local/bin/when-changed src/data.js -c bash scripts/ci.sh
# npx nodemon -w src/data.js -x "bash scripts/ci.sh"

git add src/data.js
git commit -m "[Bot] Update stats"
git push -u origin master
python3 scripts/post_data.py
npm run build-prod
