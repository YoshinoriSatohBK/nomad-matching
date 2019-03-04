#!/usr/bin/env bash
POOL_ID="ap-northeast-1:6654f472-823b-4154-875f-2ff15cc8e4a5"
aws cognito-identity list-identities --identity-pool-id $POOL_ID --max-results 60 --profile amplify-user | jq '.Identities | .[].IdentityId'  |  awk '{ print "echo delete id... " $1 "; aws cognito-identity delete-identities --profile amplify-user --identity-ids-to-delete " $1 }' | sh
