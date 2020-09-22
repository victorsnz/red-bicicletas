var mongoose = require("mongoose");
var Bicicleta = require("../../models/bicicleta");
var request = require("request");
var server = require("../../bin/www");

var base_url = 'http://localhost:3000/api/bicicletas';

describe("Testing Api Bicicletas ", function () {
  beforeEach(function (done) {
    var mongoDB = "mongodb://localhost/red_bicicletas";
    // mongoose.connect(mongoDB, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
    //const db = mongoose.connection;
    // El código anterior arroja un error de multiples conexiones.

    const db = mongoose.createConnection(mongoDB); //Esta línea permite multiples conexiones MongoDB.
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", function () {
      console.log("Conectado a la base de datos");
      done();
    });
  });

  afterEach(function (done) {
    Bicicleta.deleteMany({}, function (err, success) {
      if (err) console.log(err);
      done();
    });
  });

  describe("GET Bicicletas /", () => {
    it("Status 200", () => {
      Bicicleta.allBicis((err, bicis) => {
        expect(bicis.length).toBe(0);
      });
      var aBici = new Bicicleta({ code: 1, color: "Verde", modelo: "Urbana" });
      Bicicleta.add(aBici, (err, newBici) => {
        if (err) console.log(err);
      });
      request.get(base_url,
        (error, response, body) => {
          expect(response.statusCode).toBe(200);
          //done();
        });
    });
  });

  describe("POST Bicicletas /create", () => {
    it("Status 200", (done) => {
      var headers = { "content-type": "application/json" };
      var aBici =
        '{"code": 1, "color":"Morado", "modelo":"Urbano", "lat":"-54.3", "lng":"-10.4"}';
      request.post(
        {
          headers: headers,
          url: base_url + "/create",
          body: aBici,
        }, (error, response, body) => {
          expect(response.statusCode).toBe(200);
          Bicicleta.findByCode(1, (err, bicicleta) => {
            if (err) console.log(err);
            expect(bicicleta.code).toBe(1);
            done();
          });
        });
    });
  });

  describe("UPDATE Bicicletas /update", () => {
    it("Actualizar una bicicleta", (done) => {
      var aBici = new Bicicleta({ code: 1, color: "Verde", modelo: "Urbana" });
      aBici.save((err, bici) => {
        if (err) console.log(err);
        Bicicleta.findOne({ _id: bici._id }, "code color  modelo").exec(
          (err, bicicleta) => {
            if (err) console.log(err);
            console.log(bicicleta);
            var headers = { "content-type": "application/json" };
            var abiciUpdate =
              '{ "code": 1,"color":"Rojo","modelo":"Urbano","lat": "-54","lng": "-30" }';
            console.log(bicicleta);
            request.post(
              {
                headers: headers,
                url: base_url + "/update",
                body: abiciUpdate
              },
              function (error, response, body) {
                expect(response.statusCode).toBe(200);
                Bicicleta.findByCode(1, (err, bicicleta) => {
                  if (err) console.log(err);
                  expect(bicicleta.code).toBe(1);
                  done();
                });
              });
          });
      });
    });
  });

  describe("POST DELETE /delete", () => {
    it("Status 204", (done) => {
      aBici = new Bicicleta({ code: 12, color: "Verde", modelo: "Urbana" });

      Bicicleta.add(aBici, (err, newBici) => {
        if (err) console.log(err);
        console.log(newBici);
        var headers = { "content-type": "application/json" };
        var aBici = '{"code": 12}';
        request.post(
          {
            headers: headers,
            url: base_url + "/delete",
            body: aBici
          },
          function (error, response, body) {
            expect(response.statusCode).toBe(204);
            done();
          });
      });
    });
  });
});

// describe("DELETE BICICLETAS /delete", () => {
//   it("STATUS 200", (done) => {
//     var a = Bicicleta.createInstance(1, "Negro", "Urbana", [-27, -58]);
//     Bicicleta.add(a, function (err, newBici) {
//       //});
//       var headers = { "content-type": "application/json" };

//       var code = '{"code":"1"}';

//       request.delete(
//         {
//           headers: headers,
//           url: base_url + "/delete",
//           body: code,
//         },
//         function (error, response, body) {
//           expect(response.statusCode).toBe(204);
//           done();
//         }
//       );
//     });
//   });
// });