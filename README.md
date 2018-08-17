# okta-auth-jwt
Example of custom authorization service using AWS [Okta](https://developer.okta.com/) and [okta-oidc-js](https://github.com/okta/okta-oidc-js/tree/master/packages/jwt-verifier) library. You will need [AWS](https://aws.amazon.com/) account and [serverless](https://serverless.com/) framework installed to deploy project.

## Configure

1. Register account and log in to [developer.okta.com](https://developer.okta.com/). 
2. Select Applications --> Add Application --> Web
3. Type your lambda application url and your redirect url(here your authorization code will be sent)
4. Now insert cid and issuer to the config file in source code (follow instructions at [okta-oidc-js](https://github.com/okta/okta-oidc-js/tree/master/packages/jwt-verifier)).

## How to pass auth without client-side app
1. You should form get request and send it via browser bar line. Request will look like this:

    ```
    https://dev-890466.oktapreview.com/oauth2/default/v1/authorize?
    client_id=0oaft0pv7fvg40KzG0h7&
    response_type=code&scope=openid&
    redirect_uri=https://a4gzrnox4a.execute-api.us-east-1.amazonaws.com/dev/auth&
    state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601
    ```
    _url_ is your oktapreview account url, _client_id_ is client id of your okta web application and _redirect_uri_ is your redirect uri.
    It will redirect you to your redirection page with url that looks like this: 
    
       https://uvx9np4dxh.execute-api.us-east-1.amazonaws.com/dev/?
       code=1eJQZawh7QiwDu9mugea
       &state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601%27
    you will need a code from url for next step
2. Then you should form POST request via postman with those params:

        Uri: https://<your dev-oktapreview url>/oauth2/default/v1/token 
        
        Headers: {
        	Accept: application/json
            Authorization: Basic <Client secret from okta web application>
        	Content-Type: application/x-www-form-urlencoded
        }
        Body: {
        	grant_type: authorization_code
        	code: <your code from url(available for 60 sec)>
        	redirect_uri: https://a4gzrnox4a.execute-api.us-east-1.
        	amazonaws.com/dev/auth
        }
3. You will receive access token which you can send via GET request to your lambda endpoint with header 
Authorization : \<your access token\>. You will receive decoded info about this token. 
Example of lambda endpoint:

    https://a4gzrnox4a.execute-api.us-east-1.amazonaws.com/dev/     
    
   To learn more about verification cases and Okta's tokens please read: [Working with OAuth 2.0 tokens](https://developer.okta.com/authentication-guide/tokens/)
