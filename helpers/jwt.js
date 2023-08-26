const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/api\/v1\/products\/(.*)/ , methods: ['GET'] },
            {url: /\/api\/v1\/services\/(.*)/ , methods: ['GET'] },
            {url: /\/api\/v1\/user\/cart\/(.*)/, methods: ['GET', 'DELETE', 'PUT', 'POST']},
            `${api}/users/login`,
            `${api}/users/register`
        ]
    })
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}
module.exports = authJwt