const http = require('http');
const path = require('path');
const status = require('http-status');


let _user;

const createUser = (req, res) => {
    const user = req.body;

    _user.create(user)
        .then((data) => {
            res.status(200);
            res.json({ msg: "Usuario creado correctamente", data: data });
        }).catch((err) => {
            res.status(400);
            res.json({ msg: "Error!!!!", data: err });
        })
}

const findAll = (req, res) => {
    _user.find()
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
    _user.findOne(params)
        .then((data) => {
            if (data.length == 0) {
                res.status(status.NO_CONTENT);
                res.json({ msg: "No se encontro usuario" });
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

const findLogin = (req, res) => {
    const { email,password } = req.params;
    //const id = req.params.id;
    const params = {
        email: email,
        password: password
    };
    _user.findOne(params)
        .then((data) => {
            if (data.length == 0) {
                res.status(status.NO_CONTENT);
                res.json({ msg: "No inicida sesión" });
            } else {
                res.status(status.OK);
                res.json({ msg: "Sesión iniciada"});
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

    _user.findByIdAndRemove(params)
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

    _user.findOneAndUpdate(query, newData, (err, data) => {
        if (err) {
            res.status(status.NOT_MODIFIED);
            res.json({ msg: "No se pudo actualizar, intente nuevamente" })
        } else {
            res.status(status.OK);
            res.json({ msg: "Usuario se modificó correctamente" });
        }
    });
};

module.exports = (User) => {
    _user = User;
    return ({
        createUser,
        findAll,
        deleteByID,
        updateByID,
        findByID,
        findLogin
    });
}