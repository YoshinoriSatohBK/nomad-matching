#!/usr/bin/env bash
POOL_ID="ap-northeast-1:9b4a9423-6052-4e53-bb27-24145ac2c7ca"
aws cognito-identity list-identities --identity-pool-id $POOL_ID --max-results 60 --profile amplify-nomadlinks | jq '.Identities | .[].IdentityId'  |  awk '{ print "echo delete id... " $1 "; aws cognito-identity delete-identities --profile amplify-nomadlinks --identity-ids-to-delete " $1 }' | sh
