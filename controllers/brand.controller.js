const http = require('http');
const path = require('path');
const status = require('http-status');


let _brand;

const createBrand = (req, res) => {
    const brand = req.body;

    _brand.create(brand)
        .then((data) => {
            res.status(200);
            res.json({ msg: "Marca creada correctamente", data: data });
        }).catch((err) => {
            res.status(400);
            res.json({ msg: "Error!!!!", data: err });
        })
}

const findAll = (req, res) => {
    _brand.find()
        .then((data) => {
            if (data.length == 0) {
                res.status(status.NO_CONTENT);
                res.json({ msg: "No se encontraron usuarios" });
            } else {
                res.status(status.OK);
                res.json({ msg: "Éxito!!!", data: data });
            }
        })
        .catch((err) => {
            res.status(status.BAD_REQUEST);
            res.json({ msg: "Error!!!" });
        });
}

const findByID = (req, res) => {
    const { id } = req.params;
    //const id = req.params.id;
    const params = {
        _id: id
    };
    _brand.findOne(params)
        .then((data) => {
            if (data.length == 0) {
                res.status(status.NO_CONTENT);
                res.json({ msg: "No se encontro brand" });
            } else {
                res.status(status.OK);
                res.json({ msg: "Éxito!!!", data: data });
            }
        })
        .catch((err) => {
            res.status(status.NO_CONTENT);
            res.json({ msg: "Error!!!" });
        });

};

const deleteByID = (req, res) => {
    const { id } = req.params;
    //const id = req.params.id;
    const params = {
        _id: id
    };

    _brand.findByIdAndRemove(params)
        .then((data) => {
            res.status(status.OK);
            res.json({ msg: "Éxito!!!", data: data });
        })
        .catch((err) => {
            res.status(status.NOT_FOUND);
            res.json({ msg: "Error!!! No se encontró", err: err });
        });

}

const updateByID = (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    const query = { _id: id };

    _brand.findOneAndUpdate(query, newData, (err, data) => {
        if (err) {
            res.status(status.NOT_MODIFIED);
            res.json({ msg: "No se pudo actualizar, intente nuevamente" })
        } else {
            res.status(status.OK);
            res.json({ msg: "Marca se modificó correctamente" });
        }
    });
};

module.exports = (Brand) => {
    _brand = Brand;
    return ({
        createBrand,
        findAll,
        deleteByID,
        updateByID,
        findByID
    });
}