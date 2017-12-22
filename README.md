# NodeJS JWT Authentication sample

This is a NodeJS API that supports username and password authentication with JWTs and has APIs that return Chuck Norris phrases. How awesome is that?

## Available APIs

### User APIs

#### POST `/users`

You can do a POST to `/users` to create a new user.

The body must have:

* `username`: The username
* `password`: The password
* `extra`: Some extra information you want to save from the user (It's a string). This could be a color or anything at all.

It returns the following:

```json
{
  "id_token": {jwt},
  "access_token": {jwt}
}
```

The `id_token` and `access_token` are signed with the secret located at the `config.json` file. The `id_token` will contain the `username` and the `extra` information sent, while the `access_token` will contain the `audience`, `jti`, `issuer` and `scope`.

#### POST `/sessions/create`

You can do a POST to `/sessions/create` to log a user in.

The body must have:

* `username`: The username
* `password`: The password

It returns the following:

```json
{
  "id_token": {jwt},
  "access_token": {jwt}
}
```

The `id_token` and `access_token` are signed with the secret located at the `config.json` file. The `id_token` will contain the `username` and the `extra` information sent, while the `access_token` will contain the `audience`, `jti`, `issuer` and `scope`.

### Quotes API

#### GET `/api/random-quote`

It returns a String with a Random quote from Chuck Norris. It doesn't require authentication.

#### GET `/api/protected/random-quote`

It returns a String with a Random quote from Chuck Norris. It requires authentication. 

The JWT - `access_token` must be sent on the `Authorization` header as follows: `Authorization: Bearer {jwt}`

## Running it

Just clone the repository, run `npm install` and then `node server.js`. That's it :).

If you want to run it on another port, just run `PORT=3001 node server.js` to run it on port 3001 for example

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](https://auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free account in Auth0

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Use Postman

Postman provides a powerful GUI platform to make your API development faster & easier, from building API requests through testing, documentation and sharing

Here is a [small collection](https://documenter.getpostman.com/view/3232248/auth0-nodejs-jwt-auth/7LnAi4o) to highlight the features of this sample API.

[![Run NodeJS JWT Authentication in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c57ddc507592c436662c)
