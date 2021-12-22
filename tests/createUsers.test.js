const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3003';

const image = 'https://tarcisio-menezes.github.io/portfolio/static/media/perfil.048135be.jpeg';

describe('1 - A aplicação deve ter o endpoint POST `/user`', function () {
  beforeEach(function () {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
  });

  it('É possível cadastrar um usuário com sucesso', async function () {
    await frisby
      .post(`${url}/user`,
        {
          name: 'Tarcísio Konduter',
          email: 'konduter@gmail.com',
          password: '123456',
          image,
        })
      .expect('status', 201)
      .then((response) => {
        const { json } = response;
        expect(json.token).not.toBeNull();
      });
  });

  it('Não é possível cadastrar usuário com o campo `name` menor que 8 caracteres',
    async function () {
    await frisby
      .post(`${url}/user`,
        {
          name: 'Ciso',
          email: 'tarcisio@lovekonduto.com',
          password: '123456',
          image,
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"name" length must be at least 8 characters long');
      });
  });

  it('Não é possível cadastrar usuário com o campo `email` inválido',
     async function () {
    await frisby
      .post(`${url}/user`,
        {
          name: 'Tarcísio Menezes',
          email: 'konduters.com',
          password: '123456',
          image,
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"email" must be a valid email');
      });
  });

  it('O campo `email` é obrigatório', async function () {
    await frisby
      .post(`${url}/user`,
        {
          name: 'Tarcísio Love Konduto',
          password: '123456',
          image,
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"email" is required');
      });
  });

  it('Não é possível cadastrar usuário com o campo `password` menor que 6 caracteres',
     async function () {
    await frisby
      .post(`${url}/user`,
        {
          name: 'Konduto me contrata ',
          email: 'konduto@mecontrate.com',
          password: '12345',
          image,
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"password" length must be 6 characters long');
      });
  });

  it('O campo `password` é obrigatório', async function () {
    await frisby
      .post(`${url}/user`,
        {
          name: 'Konduto contrate o Tarcísio',
          email: 'konduto@gmail.com',
          image,
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"password" is required');
      });
  });

  it('Não é possível cadastrar um usuário com email já existente', async function () {
    await frisby
      .post(`${url}/user`,
        {
          name: 'Tarcísio Konduter',
          email: 'konduter@gmail.com',
          password: '123456',
          image,
        })
      .expect('status', 201);

    await frisby
      .post(`${url}/user`,
        {
          name: 'Tarcísio Konduter',
          email: 'konduter@gmail.com',
          password: '123456',
          image,
        })
      .expect('status', 409)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('User already registered');
      });
  });
});
