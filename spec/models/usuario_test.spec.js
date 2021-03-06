var mongoose = require("mongoose");
var Bicicleta = require('../../models/bicicleta');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');

describe('Testing Usuarios', function(){
    beforeEach(function(done){
      var mongoDB = "mongodb://localhost/testdb";
      // mongoose.connect(mongoDB, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
      //const db = mongoose.connection;
      // El código anterior arroja un error de multiples conexiones.

      const db = mongoose.createConnection(mongoDB); //Esta línea permite multiples conexiones MongoDB.
      db.on("error", console.error.bind(console, "connection error"));
      db.once("open", function () {
        console.log("Connected to database");

        done();
      });
    });

    afterEach(function(done){
        Reserva.deleteMany({}, function(err, success){
            if(err) console.log(err);
            Usuario.deleteMany({}, function(err,success){
                if (err) console.log(err);
                Bicicleta.deleteMany({}, function(err,success){
                    if (err) console.log(err);
                    done();
                });
            });
        });
    });

    describe('Usuario.reservar', () => {
        it('Debe existir la reserva', (done) => {
            const usuario = new Usuario({ nombre: 'Andres' });
            usuario.save();
            console.log("usuario " + usuario);
            const bicicleta = new Bicicleta({
              code: 1,
              color: "Rojo",
              modelo: "Urbana",
              ubicacion: [-27.4689004, -58.8312304]
            });
            bicicleta.save();
            //console.log('bicicleta ' + bicicleta);
            
            var hoy = new Date();
            var manana = new Date();
            
            manana.setDate(hoy.getDate() + 1);
            usuario.reservar(bicicleta.id, hoy, manana, (err, reserva) => {
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas){
                    console.log(reservas[0]);
                    console.log(reservas[0].usuario);
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);//2 en el original
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);

                    done();
                });
            });
        });
    });
});