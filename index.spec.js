const controllers = require('./controllers/index');
const models = require('./models/index');
const pgtools = require('pgtools');
const axios = require('axios');
const { Client } = require('pg');

beforeAll(() => {
  const config = {
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'testdb',
    port: process.env.PORT || 5432,
    host: process.env.DB_HOST || 'localhost',
  };

  //   pgtools.createdb(config, 'test-db', function (err, res) {
  //     if (err) {
  //       console.error(err);
  //       process.exit(-1);
  //     }
  //     console.log('DB CREATED', res);
  //   });

  const connection = async (event, context) => {
    const client = new Client(config);
    await client.connect();
  };
});

afterAll(() => {
  // const config = {
  //   user: 'postgres',
  //   password: 'password',
  //   port: 5432,
  //   host: 'localhost',
  // };

  // pgtools.dropdb(config, 'test-db', function (err, res) {
  //   if (err) {
  //     console.error(err);
  //     process.exit(-1);
  //   }
  //   console.log(res);
  // });
  connection.end();
});

describe('PostgreSQL Queries', () => {
  it('Should add question to questions table', async () => {
    const result = await client.query(`SELECT * FROM questions limit 5;`);
    expect(result).toEqual('1');
  });

  // async/await can also be used with `.resolves`.
  it('works with async/await and resolves', async () => {
    await expect(user.getUserName(5)).resolves.toEqual('Paul');
  });

  xtest('Should add answer to answers table', () => {
    expect(data).toBe('second');
  });
  xtest('Should add photo to photos table', () => {
    expect(data).toBe('second');
  });
});

describe('Axios Requests', () => {
  test('Should add question to questions table', async () => {
    let data = await axios
      .get('http://127.0.0.1:3000/qa/questions?product_id=102')
      .then((res) => {
        console.log('RES');
      })
      .catch((err) => {
        console.error(err);
      });
  });
  xtest('Should add answer to answers table', async () => {
    expect(data).toBe('second');
  });
  xtest('Should add photo to photos table', async () => {
    expect(data).toBe('second');
  });
});
