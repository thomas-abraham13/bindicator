# cmd="curl -X POST -H 'Content-type: application/json' --data '{"text\":"Next collection date:   Tuesday, 06 February\"}' https://hooks.slack.com/services/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"
# echo "$cmd"

# node script.js

curl -X POST -H 'Content-type: application/json' --data '{"text":"Next collection date: Tuesday, 06 February"}' https://hooks.slack.com/services/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