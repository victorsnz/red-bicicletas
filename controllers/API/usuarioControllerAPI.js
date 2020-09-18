var Usuario = require('../../models/usuario');

exports.usuario_list = function( req, res ){
    Usuario.find({}, ( err , usuarios)   => {
        res.status(200).json({
            usuarios : usuarios
        });
    });x
};

exports.usuario_create = function( req, res) {
    var usuario = new Usuario({ nombre : req.body.nombre });
    usuario.save(function( err) {
        res.status(200).json(usuario);
    });
};

exports.usuario_reservar = function( req,res ) {
    console.log(req.body);
    Usuario.findById(req.body.id, function( err, usuario ){
        console.log(usuario);
        usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta, function( err ){
            if( err ) console.log(err);
            console.log('Reserva !!!');
            res.status(200).send();
        });
    });
};

exports.usuario_actualizar = function( req,res ) {
    
    const user = req.body;
    var id = user._id;
    var nombreUsuario = user.nombre;

    // console.log(id);
    // console.log(nombreUsuario);

    Usuario.findById(id, function(err, usuario){
        if (err) console.log(err);
        
        Usuario.updateOne({ _id: usuario._id }, {$set: {nombre: nombreUsuario}}, {new:true},(error, model) => {
            if(error){
                console.log(error);
            }else {
                console.log(model);
            }
    
            res.status(200).json(model);
        });
    });
};