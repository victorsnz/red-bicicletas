var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req,res){
    Bicicleta.allBicis(function (err, bicis) {
      res.status(200).json({ Bicicletas: bicis });
    });
}

exports.bicicleta_create = function(req, res){
    var bici = new Bicicleta ({color : req.body.color, modelo : req.body.modelo});
    bici.save(function(err){
        res.status(200).json(bici);
    });
};

exports.bicicleta_update = function (req, res) {

    const bici = req.body;
    var id = bici._id;
    var biciCode = bici.code;
    var biciColor = bici.color;
    var biciModelo = bici.modelo;
    var biciUbicacion = [bici.lat, bici.lng];

    Bicicleta.findById(id, function(err, bicicleta){
        if(err) console.log(err);

        Bicicleta.updateOne({ _id: bicicleta._id}, {$set: {code: biciCode, color: biciColor, modelo: biciModelo, ubicacion: biciUbicacion}},{new: true},(error,model) => {
            if(error){
                console.log(error);
            }else{
                console.log(model);
            }
            res.status(200).json(model);
        });
    });
};

exports.bicicleta_delete = function(req, res){
    var id = req.body._id;
    Bicicleta.findById(id, function (err, bicicleta) {
      if (err) console.log(err);

      Bicicleta.deleteOne({ _id: bicicleta._id }, (error, model) => {
        if (error) console.log(error); 

        res.status(204).json(model);
      });
    });
};