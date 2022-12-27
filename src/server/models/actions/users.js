const uuid = require('node-uuid');
const randomstring = require('randomstring');
const crypto = require('crypto');
const User = require('../redis/user');

const register = function (session, email, password) {
  return session
    .query('MATCH (user:User {email: $email}) RETURN user', {email})
    .then((results) => {
      if (results.hasNext()) {
        throw {email: 'email already in use', status: 400};
      } else {
        return session
          .query(
            'CREATE (user:User {id: $id, email: $email, password: $password, api_key: $api_key}) RETURN user',
            {
              id: uuid.v4(),
              email,
              password: hashPassword(email, password),
              api_key: randomstring.generate({
                length: 20,
                charset: 'hex',
              }),
            },
          )
          .then((createdUser) => {
            while (createdUser.hasNext()) {
              const record = createdUser.next();
              const dbUser = record.get('user').properties;
              return {token: dbUser.api_key, user: new User(record.get('user'))};
            }
          });
      }
    });
};

const login = function (session, email, password) {
  return session
    .query('MATCH (user:User {email: $email}) RETURN user', {email})
    .then((foundedUser) => {
      if (!foundedUser.hasNext()) {
        throw {email: 'username does not exist', status: 400};
      } else {
        while (foundedUser.hasNext()) {
          const record = foundedUser.next();
          const dbUser = record.get('user').properties;
          if (dbUser.password !== hashPassword(email, password)) {
            throw {password: 'wrong password', status: 400};
          }
          return {token: dbUser.api_key, user: new User(record.get('user'))};
        }
      }
    });
};

function hashPassword(username, password) {
  const s = `${username}:${password}`;
  return crypto.createHash('sha256').update(s).digest('hex');
}

module.exports = {
  register,
  login,
};
