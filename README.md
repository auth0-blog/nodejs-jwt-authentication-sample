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
  "id_token": {jwt}
}
```

The JWT is signed with the secret located at the `config.json` file. That JWT will contain the `username` and the `extra` information sent.

#### POST `/sessions/create`

You can do a POST to `/sessions/create` to log a user in.

The body must have:

* `username`: The username
* `password`: The password

It returns the following:

```json
{
  "id_token": {jwt}
}
```

The JWT is signed with the secret located at the `config.json` file. That JWT will contain the `username` and the `extra` information that you sent at signup time.

### Quotes API

#### GET `/api/random-quote`

It returns a String with a Random quote from Chuck Norris. It doesn't require authentication.

#### GET `/api/protected/random-quote`

It returns a String with a Random quote from Chuck Norris. It requires authentication. 

The JWT must be sent on the `Authorization` header as follows: `Authorization: Bearer {jwt}`

## Running it

Just clone the repository, run `npm install` and then `node server.js`. That's it :).

If you want to run it on another port, just run `PORT=3001 node server.js` to run it on port 3001 for example

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## License

MIT

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
