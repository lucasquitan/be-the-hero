const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  })

  it('shold be able create a new entity on db', async () => {
    const response = await request(app)
      .post('/ongs').
      send(
        {
          name: "APAE",
          email: "apad@mail.com",
          whatsapp: "2199999999",
          city: "Rio de Janeiro",
          uf: "RJ"
        }
      );

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});