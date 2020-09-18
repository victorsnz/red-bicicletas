var mongoose = require('mongoose');
var Reserva = require("../../models/reserva");
var Bicicleta = require("../../models/bicicleta");
var Usuario = require("../../models/usuario");

describe('Testing Reservas', function(){
    beforeEach(function(done){
        var mongoDB = "mongodb://localhost/testdb";
        mongoose.connect(mongoDB, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function(){
            console.log('Connected to database');
            done();
        });
    });

    afterEach(function (done) {
      Reserva.deleteMany({}, function (err, success) {
        if (err) console.log(err);
        Usuario.deleteMany({}, function (err, success) {
          if (err) console.log(err);
          Bicicleta.deleteMany({}, function (err, success) {
            if (err) console.log(err);

            done();
          });
        });
      });
    });

    describe("Reserva.updateReserva", () => {
      it("Debe existir la reserva", (done) => {
        const usuario = new Usuario({ nombre: "Andres" });
        usuario.save();
        const bicicleta = new Bicicleta({
          code: 1,
          color: "Rojo",
          modelo: "Urbana",
        });
        bicicleta.save();
        
        const bicicleta2 = new Bicicleta({
          code: 2,
          color: "Azul",
          modelo: "Montaña",
        });
        bicicleta2.save();
        var hoy = new Date();
        var manana = new Date();
        manana.setDate(hoy.getDate() + 1);

        usuario.reservar(bicicleta._id, hoy, manana, (err, reserva) => {
          if (err) console.log(err);
          Reserva.findById(reserva._id).populate("bicicleta").populate("usuario").exec(function (err, reservas) {
              var hasta = new Date();
              hasta.setDate(hoy.getDate() + 3);
              var reservaObj = {
                _id: reservas._id,
                desde: hoy,
                hasta: hasta,
                bicicleta: bicicleta2._id,
                usuario: usuario._id,
              };

              Reserva.updateReserva(reservaObj, (err, result) => {
                if (err) console.log(err);
                expect(result.nModified).toBeGreaterThan(0);
                expect(result.ok).toBe(1);
                done();
              });
            });
        });
      });
    });
});