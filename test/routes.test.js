var supertest = require('supertest-as-promised')(require('../app'));
var expect = require('chai').expect;
const { Page, db } = require('../models')



describe('pedidos http', () => {
    before(() => {
        return db.sync({ force: true })
            .then(() => {
                Page.create({
                    title: "Hola, es una prueba beforeEach",
                    content: "Contenido de prueba",
                    tags: ['foo', 'bar']
                })
            })
    })


    describe('GET /wiki/', () => {
        it('responde con 200', () => {
            return supertest
                .get('/wiki')
                .expect(200)
        });
    });
    describe('GET /wiki/add', () => {
        it('responde con 200', () => {
            return supertest
                .get('/wiki/add')
                .expect(200)
        });
    });
    describe('GET /wiki/:urlTitle', () => {
        it('responde con 404 cuando la página no existe', () => {
            return supertest
                .get('/wiki/Hola_es_una_prueba_beforeEach_err')
                .expect(404)
        });
        it('responde con 200 cuando la página existe', () => {
            return supertest
                .get('/wiki/Hola_es_una_prueba_beforeEach')
                .expect(200)
        });
    });
    describe('GET /wiki/search/:tag', () => {
        it('responde con 200', () => {
            return supertest
                .get("/wiki/search/foo")
                .expect(200)
        });
    });
    describe('GET /wiki/search/:tag', () => {
        it('responde con 404 por tag invalido', () => {
            return supertest
                .get("/wiki/search/foof")
                .expect(404)
        });
    });
    describe('GET /wiki/:urlTitle/similar', () => {
        it('responde con 404 cuando la página no existe', () => {
            return supertest
                .get('/wiki/Hola_es_una_prueba_beforeEach/similar')
                .expect(404)
        });
        describe('', () => {
            before(() => {
                return Page.create({
                    title: "Hola, es una prueba para similar",
                    content: "Contenido de prueba similar",
                    tags: ['foo', 'rab']
                })
            })

            it('responde con 200 porque hay una similar', () => {
                return supertest
                    .get('/wiki/Hola_es_una_prueba_beforeEach/similar')
                    .expect(200)
            });


        })

    });
    describe('POST /wiki', () => {
        it('responde con 302', () => {
            return supertest
                .post("/wiki")
                .send({
                    title: "Post desde el test",
                    content: "Contenido de post/test",
                    tags: ['test', 'gar']
                }).expect(302)
        });
        it('crea una page en la base de datos', () => {
            return supertest
                .get('/wiki/Post_desde_el_test')
                .expect(200)

        });
    });
});