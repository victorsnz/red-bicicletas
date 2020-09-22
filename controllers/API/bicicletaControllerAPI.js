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

    const bici = {
      _id: req.body._id,
      code: req.body.code,
      color: req.body.color,
      modelo: req.body.modelo,
      ubicacion: [req.body.lat, req.body.lng],
    };


        Bicicleta.updateOne(bici, (err, updatedBici) => {
            if(err){
                console.log(err);
            }else{
                console.log(updatedBici);
            }
            res.status(200).json({
            bicicleta: updatedBici
            });
        });
};

exports.bicicleta_delete = (req, res) => {
  Bicicleta.removeByCode(req.body.code, (err, deletedBici) => {
    if (err) {
      res.status(500);
    } else {
      res.status(204).send();
    }
  });
};