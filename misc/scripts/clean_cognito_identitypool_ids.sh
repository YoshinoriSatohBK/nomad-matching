#!/usr/bin/env bash
POOL_ID="ap-northeast-1:4e898efc-c295-4a8f-a282-bb52628163b5"
aws cognito-identity list-identities --identity-pool-id $POOL_ID --max-results 60 --profile amplify-nomadlinks | jq '.Identities | .[].IdentityId'  |  awk '{ print "echo delete id... " $1 "; aws cognito-identity delete-identities --profile amplify-nomadlinks --identity-ids-to-delete " $1 }' | sh
