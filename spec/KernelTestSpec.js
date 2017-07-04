const fs = require('fs');
const path = require('path');
const Kernel = require('@conga/framework/lib/kernel/TestKernel');

const Length = require('./data/projects/sample/src/demo-bundle/lib/model/Length');
const NotNull = require('./data/projects/sample/src/demo-bundle/lib/model/NotNull');
const NotNullWithMessage = require('./data/projects/sample/src/demo-bundle/lib/model/NotNullWithMessage');

describe("Kernel", () => {

    let kernel;
    let container;
    let validator;

    beforeAll((done) => {

        kernel = new Kernel(
            path.join(__dirname, '..', 'spec', 'data', 'projects', 'sample'),
            'app',
            'test',
            {}
        );

        kernel.addBundlePaths({
            'demo-bundle': path.join(__dirname, '..', 'spec', 'data', 'projects', 'sample', 'src', 'demo-bundle'),
            '@conga/framework-validation': path.join(__dirname, '..')
        });

        kernel.boot(() => {
            container = kernel.container;
            validator = container.get('validator');
            done();
        });

    });

    it("should throw error for Assert:NotNull", (done) => {

        const model = new NotNull();

        validator.validate(model).catch((err) => {
            expect(err[0]).toEqual({ message: 'This value should not be null', property: 'name' });
            done();
        });

    });

    it("should pass Assert:NotNull", (done) => {

        const model = new NotNull();
        model.name = 'test';

        validator.validate(model).then((res) => {
            expect(true).toEqual(true);
            done();
        });

    });

    it("should throw custom error message for Assert:NotNull", (done) => {

        const model = new NotNullWithMessage();

        validator.validate(model).catch((err) => {
            expect(err[0]).toEqual({ message: 'My custom message', property: 'name' });
            done();
        });

    });

    it("should throw error for Assert:Length -> min", (done) => {

        const model = new Length();
        model.name = 'a';

        validator.validate(model).catch((err) => {
            expect(err[0]).toEqual({ message: 'This value must be at least 2 characters long', property: 'name' });
            done();
        });

    });

    it("should throw error for Assert:Length -> max", (done) => {

        const model = new Length();
        model.name = 'aaaaaaaaaaa';

        validator.validate(model).catch((err) => {
            expect(err[0]).toEqual({ message: 'This value must be less than 10 characters long', property: 'name' });
            done();
        });

    });

    it("should pass Assert:Length", (done) => {

        const model = new Length();
        model.name = 'aaaa';

        validator.validate(model).then(() => {
            expect(true).toEqual(true);
            done();
        });

    });

});
