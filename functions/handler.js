'use strict';
// https://dev-890466.oktapreview.com/oauth2/default/v1/authorize?
// client_id=0oaft0pv7fvg40KzG0h7&
// response_type=code&scope=openid&
// redirect_uri=https://a4gzrnox4a.execute-api.us-east-1.amazonaws.com/dev/auth&
// state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601'

module.exports.test = (event, context, callback) => {   
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'This is private message. Only authorized users can see it.'
        })
    };

    callback(null, response);
};