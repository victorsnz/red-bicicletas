var mongoose = require = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function(){
    beforeEach(function(done){
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function(){
            console.log('We are connected to test database');
            done();
        });
    });

    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if(err) console.log(err);
            done();
        });
    });

    describe('Bicicleta.createInstance', () => {
        it('crea una instancia de Bicicleta', () => {
            var bici = Bicicleta.CreateInstance(1, "Verde", "Urbana", [
            -27.4689004,
            -58.8312304,
            ]);
            expect(bici.code).toBe(1);
            expect(bici.color).toBe("Verde");
            expect(bici.modelo).toBe("Urbana");
            expect(bici.ubicacion[0]).toEqual(-27.4689004);
            expect(bici.ubicacion[1]).toEqual(-58.8312304);
        });
    });

    describe('Bicicleta.allBicis', () =>{
        it('comienza vacía', (done) => {
            Bicicleta.allBicis(function(err, bicis){
            expect(bicis.length).toBe(0);
            done();
            });
        });
    });

    describe('Bicicleta.add', () => {
        it('agrega solo una bici', (done) => {
            var aBici = new Bicicleta({code: 1, color: "Verde", modelo: "Urbana"});
            Bicicleta.add(aBici, function(err, newBici){
                if (err) console.log(err);
                Bicicleta.allBicis(function(err, bicis){
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);

                    done();
                });
            });
        });
    });
    
    describe("Bicicleta.findByCode", () => {
      it("debe devolver la bici con code 1", (done) => {
        Bicicleta.allBicis(function (err, bicis) {
          expect(bicis.length).toEqual(0);

          var aBici = new Bicicleta({
            code: 1,
            color: "Verde",
            modelo: "Urbana",
          });
          
          Bicicleta.add(aBici, function (err, newBici) {
            if (err) console.log(err);

            var aBici2 = new Bicicleta({
              code: 2,
              color: "Rojo",
              modelo: "Urbana",
            });

            Bicicleta.add(aBici2, function (err, newBici) {
              if (err) console.log(err);
              Bicicleta.findByCode(1, function (error, targetBici) {
                expect(targetBici.code).toBe(aBici.code);
                expect(targetBici.color).toBe(aBici.color);
                expect(targetBici.modelo).toBe(aBici.modelo);

                done();
              });
            });
          });
        });
      });
    });
});


// //Se ejecuta antes de cada funcion
// beforeEach(() => { Bicicleta.allBicis = []; });

// describe('Bicicleta.allBicis', () => {
//     it('comienza vacía', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);     
//     });
// });

// describe('Bicicleta.add', () => {
//     it('agregamos una', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);

//         var a = new Bicicleta(1, "Rojo", "Urbana", [-27.4689004, -58.8312304]);
//         Bicicleta.add(a);

//         expect(Bicicleta.allBicis.length).toBe(1);
//         expect(Bicicleta.allBicis[0]).toBe(a);
//     });
// });

// describe('Bicicleta.findById', () => {
//     it('debe devolver la bici con id 1', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);

//         var aBici = new Bicicleta(1, "Naranja", "Urbana");
//         var aBici2 = new Bicicleta(2, "Lila", "Montaña");
//         Bicicleta.add(aBici);
//         Bicicleta.add(aBici2);

//         var targetBici = Bicicleta.findById(1);
//         expect(targetBici.id).toBe(1);
//         expect(targetBici.color).toBe(aBici.color);
//         expect(targetBici.modelo).toBe(aBici.modelo);
//     }); 
// });

// describe('Bicicleta.delete', () => {
//     it('debe eliminar la bici con id 1', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);

//         var aBici = new Bicicleta(1, "Naranja", "Urbana");
//         Bicicleta.add(aBici);
        
//         Bicicleta.removeById(1);
//         expect(Bicicleta.allBicis.length).toBe(0);
//     });
// });
//