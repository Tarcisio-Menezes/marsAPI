const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3003';

describe('2 - A aplicação deve ter o endpoint POST `/login`', function () {
  beforeEach(async function () {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
    shell.exec('npx sequelize-cli db:seed:all');
  });

  it('É possível fazer login com sucesso', async function () {
    await frisby
      .post(`${url}/login`,
        {
          email: 'tarcisioquim@gmail.com',
          password: 'konduto',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.token).not.toBeNull();
      });
  });

  it('Não é possível fazer login sem o campo `email`', async function () {
    await frisby
      .post(`${url}/login`,
        {
          password: '123456',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('"email" is required');
      });
  });

  it('Não é possível fazer login sem o campo `password`', async function () {
    await frisby
      .post(`${url}/login`,
        {
          email: 'kondutomecontrate@gmail.com',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('"password" is required');
      });
  });

  it('Não é possível fazer login com o campo `email` em branco', async function () {
    await frisby
      .post(`${url}/login`,
        {
          email: '',
          password: '123456',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('"email" is not allowed to be empty');
      });
  });

  it('Não é possível fazer login com o campo `password` em branco', async function () {
    await frisby
      .post(`${url}/login`,
        {
          email: 'kondutomecontrate@gmail.com',
          password: '',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('"password" is not allowed to be empty');
      });
  });

  it('Não é possível fazer login com um usuário que não existe', async function () {
    await frisby
      .post(`${url}/login`,
        {
          email: 'linustorvals@gmail.com',
          password: '123456',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid fields');
      });
  });
});
