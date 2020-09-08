var Bicicleta = require('../../models/bicicleta');

//Se ejecuta antes de cada funcion
beforeEach(() => { Bicicleta.allBicis = []; });

describe('Bicicleta.allBicis', () => {
    it('comienza vacía', () => {
        expect(Bicicleta.allBicis.length).toBe(0);     
    });
});

describe('Bicicleta.add', () => {
    it('agregamos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, "Rojo", "Urbana", [-27.4689004, -58.8312304]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicleta.findById', () => {
    it('debe devolver la bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var aBici = new Bicicleta(1, "Naranja", "Urbana");
        var aBici2 = new Bicicleta(2, "Lila", "Montaña");
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);

        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);
    }); 
});

describe('Bicicleta.delete', () => {
    it('debe eliminar la bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var aBici = new Bicicleta(1, "Naranja", "Urbana");
        Bicicleta.add(aBici);
        
        Bicicleta.removeById(1);
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});