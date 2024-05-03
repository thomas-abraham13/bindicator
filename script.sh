#!/bin/bash

source .env

# Bash script to run script.js and output to Slack
echo "Running Bindicator Puppeteer Script:"
node index.js

while IFS= read -r line
    do
        echo "Line: $line"
    done < data.json

# Output:
echo "POST output to Slack bot:"
curl -X POST -H 'Content-type: application/json' --data-binary "@data.json" $SLACK_WEBHOOK

rm data.json