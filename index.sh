# Bash script to run the Puppeteer script and output the result to a curl command which will then send me a slack message

echo "Running Bindicator Puppeteer Script:"
node script.js

while IFS= read -r line
    do
        echo "Line: $line"
    done < data.txt

# Output:
# Line: [Each line from basic.txt will be printed here]

echo "POST output to Slack bot:"
curl -X POST -H 'Content-type: application/json' --data '{
    "text":"text"
}' https://hooks.slack.com/services/