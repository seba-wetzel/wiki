const { expect } = require('chai')
const { Page, User, db } = require('../models')
const chai = require("chai");
chai.should();
chai.use(require('chai-things'));


describe("Testeo del modelo Page", () => {
    before(() => {
        return db.sync({ force: true })
    })

    before((done) => {
        Page.create({
            title: "Hola, es una prueba beforeEach",
            content: "Contenido de prueba",
            tags: ['foo', 'bar']
        }).then((page) => {
        })
            .catch(err => done(err))

        Page.create({
            title: "Hola, es una prueba beforeEach 1",
            content: "Contenido de prueba",
            tags: ['ofo', 'bar']
        }).then((page) => {
        })
            .catch(err => done(err))


        Page.create({
            title: "Hola, es una prueba beforeEach2",
            content: "Contenido de prueba",
            tags: ['oof', 'rab']
        }).then((page) => {
        })
            .catch(err => done(err))

        Page.create({
            title: "Hola, es una prueba beforeEach3",
            content: "Contenido de prueba",
            tags: ['foof', 'bar']
        }).then((page) => {
            done()
        })
            .catch(err => done(err))

    });


    it("Hook", (done) => {
        Page.findOne({ where: { title: "Hola, es una prueba beforeEach" } })
            .then(page => {
                expect(page.urlTitle).to.be.equal("Hola_es_una_prueba_beforeEach")
                done()
            })
    })


    it("Virtual", (done) => {
        Page.findOne({ where: { title: "Hola, es una prueba beforeEach" } })
            .then(page => {
                expect(page.route()).to.be.equal("/wiki/" + page.urlTitle)
                done()
            })
    })


    describe('Class methods', function () {
        describe('findByTag', function () {
            it('busca palabras por el tag de búsqueda', (done) => {
                Page.findByTag('foo').then(results => {
                    expect(results.length).to.be.equal(1)
                    done()
                })
            });
            it('no trae páginas sin el tag de búsqueda', (done) => {
                Page.findByTag('gfdgfd').then(results => {
                    expect(results.length).to.be.equal(0)
                    done()
                })
            });
        });
    });
    describe('Instance methods', function () {
        describe('findSimilar', function () {
            it('nunca consigue a si misma', (done) => {
                Page.findOne({ where: { id: 1 } })
                    .then(page => {
                        page.findSimilar()
                            .then(result => {
                                expect(result.length).to.be.equal(2)
                                result.should.not.include({ id: page.id })
                                done()
                            })
                    })

            });

            it('consigue otras páginas con tags comunes', (done) => {
                Page.findOne({ where: { id: 1 } })
                    .then(page => {
                        page.findSimilar()
                            .then(result => {
                                expect(result.length).to.be.equal(2)
                                result.map((page => page.tags.should.include.something.that.deep.equals('bar')))
                                done()
                            })
                    })
            });

            it('no consigue otras páginas sin tags comunes', (done) => {
                Page.findOne({ where: { id: 1 } })
                    .then(page => {
                        page.findSimilar()
                            .then(result => {
                                expect(result.length).to.be.equal(2)
                                result.map((page => page.tags.should.not.include.something.that.deep.equals('rab')))
                                done()
                            })
                    })

            });
        });
    });
    describe('Validations', function () {
        const page = Page.build({ title: null, content: null, status: 4 });
        it('error sin title', (done) => {
            page.validate()
                .then(err => console.log(err))
                .catch(err => {
                    expect(err).to.exist;
                    expect(err.errors).to.exist;
                    expect(err.errors[0].path).to.equal('title');
                    done()
                })

        });
        it('error sin content', (done) => {
            page.validate()
                .then(err => console.log(err))
                .catch(err => {
                    expect(err).to.exist;
                    expect(err.errors).to.exist;
                    expect(err.errors[1].path).to.equal('content');
                    done()
                })

        });
        // it('error con un status invalido', (done) => {
        //     page.validate()
        //         .then(err => console.log(err))
        //         .catch(err => {
        //             // expect(err).to.exist;
        //             // expect(err.errors).to.exist;
        //             // expect(err.errors[2].path).to.equal('title');
        //             console.log(err)
        //             done()
        //         })

        // });
    });





})