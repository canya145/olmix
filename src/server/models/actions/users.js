const uuid = require('node-uuid');
const randomstring = require('randomstring');
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

module.exports = {
  register,
};
