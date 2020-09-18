var  Reserva = require('../../models/reserva');

exports.reserva_list = function( req, res ){
    Reserva.find({}, ( err, reservas ) =>  {
        res.status(200).json({reservas: reservas});
    });
};

exports.actualizar_reserva = function( req, res ) {
    console.log(req.body);
    let id = req.body._id;
    Reserva.findById(id, ( err, reserva )=> {
        if( err ) console.log( err );        
        let dataUpdate = {
            desde: (req.body.desde)? req.body.desde : reserva.desde,
            hasta: (req.body.hasta) ? req.body.hasta: reserva.hasta,
            usuario: (req.body.usuario)? req.body.usuario: reserva.usuario,
            bicicleta: (req.body.bicicleta)? req.body.bicicleta : reserva.bicicleta
        };

        if(reserva == null) {
            res.status(500).json({error: 'reserva not found'});
        } else{
            Reserva.updateOne({ _id: reserva._id }, {$set: dataUpdate}, function( err, result ){
                res.status(200).json(result);
            });
        }
    });  
};