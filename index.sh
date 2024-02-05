# Bash script to run the Puppeteer script and output the result to a curl command which will then send me a slack message

# echo "Running Bindicator Puppeteer Script:"
# node script.js

echo "POST output to Slack bot:"
curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}'