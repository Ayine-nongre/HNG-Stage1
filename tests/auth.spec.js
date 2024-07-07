import request from 'supertest'
import { app } from '../app'
import { User } from '../model/User'
import { Organization } from '../model/Organization'

describe('POST /auth/register', () => {
    it('Should Fail If Required Fields Are Missing (firstName)', async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({
            firstName: undefined,
            lastName: 'User',
            email: "testuser@gmail.com",
            password: '123456',
            confirmPassword: '123456',
            phone: '02000000000'
        })
        expect(res.statusCode).toEqual(422)
        expect(res.body).toHaveProperty('errors')
    })

    it('Should Fail If Required Fields Are Missing (lastName)', async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({
            firstName: "Test",
            lastName: undefined,
            email: "testuser@gmail.com",
            password: '123456',
            confirmPassword: '123456',
            phone: '02000000000'
        })
        expect(res.statusCode).toEqual(422)
        expect(res.body).toHaveProperty('errors')
    })

    it('Should Fail If Required Fields Are Missing (email)', async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({
            firstName: "Test",
            lastName: 'User',
            email: undefined,
            password: '123456',
            confirmPassword: '123456',
            phone: '02000000000'
        })
        expect(res.statusCode).toEqual(422)
        expect(res.body).toHaveProperty('errors')
    })

    it('Should Fail If Required Fields Are Missing (password)', async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({
            firstName: "Test",
            lastName: 'User',
            email: "testuser@gmail.com",
            password: undefined,
            confirmPassword: '123456',
            phone: '02000000000'
        })
        expect(res.statusCode).toEqual(422)
        expect(res.body).toHaveProperty('errors')
    })

    it('should register a new user and create an organisation', async () => {
      await User.destroy({ where: { email: 'testuser@gmail.com'}}).catch(err => console.log(err))
      const res = await request(app)
        .post('/auth/register')
        .send({
            firstName: 'Test',
            lastName: 'User',
            email: "testuser@gmail.com",
            password: '123456',
            confirmPassword: '123456',
            phone: '02000000000'
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('data')
    })

    it('should fail if organisation was created with user\'s name', async () => {
          const org = await Organization.findOne({ where: { name: "Test's Organization"}}).catch(err => console.log(err))
          expect(org.name).toEqual("Test's Organization")
      })

    it("Should Fail if there’s Duplicate Email", async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({
            firstName: "Test",
            lastName: 'User',
            email: "testuser@gmail.com",
            password: '123456',
            confirmPassword: '123456',
            phone: '02000000000'
        })
        expect(res.statusCode).toEqual(422)
        expect(res.body).toHaveProperty('errors')
    })
  })

  describe('POST /auth/login', () => {
    it('should log a user with right credentials', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
            email: "testuser@gmail.com",
            password: '123456'
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
    })

    it('should fail to log a user with wrong credentials', async () => {
        const res = await request(app)
          .post('/auth/login')
          .send({
              email: "testuser@gmail.com",
              password: '1234567'
          })
          expect(res.statusCode).toEqual(401)
          expect(res.body).toHaveProperty('message')
      })
  })