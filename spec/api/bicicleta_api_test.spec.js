var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');


//Se ejecuta antes de cada funcion
beforeEach(() => { Bicicleta.allBicis = []; });

describe('Bicicleta API', () => {
    describe('GET BICICELTAS /', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta(1, 'Gris', 'Montaña', [-27.4689004, -58.8312304]);
            Bicicleta.add(a);

            request.get('http://localhost:3000/api/bicicletas', function(error, response, body){
                expect(response.statusCode).toBe(200);
            });
        });
    });
});

describe('POST BICICLETAS /create', () => {
    it('STATUS 200', (done) => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var headers = {'content-type':'application/json'};
        var aBici = '{"id": 10, "color": "rojo", "modelo": "Urbana", "lat": -27, "lng": -58}';
        request.post({
            headers: headers,
            url: 'http://localhost:3000/api/bicicletas/create',
            body: aBici
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("rojo");
            
                done();
        });
    });
});

describe('POST BICICLETAS /update', () => {
    it('STATUS 200', (done) => {
        expect(Bicicleta.allBicis.length).toBe(0);

        let aBici = new Bicicleta(10, "Azul", "Urbana", [-27, -58]);
        Bicicleta.add(aBici);

        var headers = { 'content-type': 'application/json' };
        aBici = '{"id": 10, "color": "Negro", "modelo": "Urbana", "lat": -27, "lng": -58}';
        request.post({
            headers: headers,
            url: 'http://localhost:3000/api/bicicletas/update',
            body: aBici
        }, function (error, response, body) {
            expect(response.statusCode).toBe(200);
            expect(Bicicleta.findById(10).color).toBe("Negro");
            
            done();
        });
    });
});

describe('DELETE BICICLETAS /delete', () => {
    it('STATUS 200', (done) => {
        expect (Bicicleta.allBicis.length).toBe(0);

        var aBici = new Bicicleta(10, "Azul", "Urbana", [-27, -58]);
        Bicicleta.add(aBici);

        var headers = { 'content-type': 'application/json' };
        
        var code = '{"code":10}';
    
        request.delete({
            headers: headers,
            url: 'http://localhost:3000/api/bicicletas/delete',
            body: code
        }, function (error, response, body) {
            expect(response.statusCode).toBe(204);
            done();
        });
    });
});