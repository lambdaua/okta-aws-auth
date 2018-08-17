const config = require('../config.js'); // all const params moved to config.js file
const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: config.issuer,
    assertClaims: {
        cid: config.cid  //aud changed to cid
    }
});

module.exports.auth = (event, context, callback) => {
    oktaJwtVerifier.verifyAccessToken(event.authorizationToken)
        .then(() => {
            callback(null, {
                principalId: 'user',
                policyDocument: {
                    Version: '2012-10-17',
                    Statement: [{
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: event.methodArn  //arn of the called API gateway now dynamic   
                    }]
                },
            });
        })
        .catch((err) => { 
            if (err.denied) { // example of deny policy 
                callback(null, {
                    principalId: 'user',
                    policyDocument: {
                        Version: '2012-10-17',
                        Statement: [{
                            Action: 'execute-api:Invoke',
                            Effect: 'Deny',
                            Resource: event.methodArn     
                        }]
                    },
                });
            } else {
                callback('Unauthorized');
            }         
        });      
};