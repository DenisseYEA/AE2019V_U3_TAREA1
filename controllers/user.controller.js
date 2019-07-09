const http = require('http');
const path = require('path');
const status = require('http-status');
const jwt = require('jsonwebtoken');
const _config = require('../_config');


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
};

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
};

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

const login = (req, res) => {
    const { email, password } = req.params;
    //const id = req.params.id;
    let query = {
        email: email,
        password: password
    };
    _user.findOne(query, "-password")
        .then((user) => {
            if (user) {
                const token = jwt.sign({ email: email }, _config.SECRETJWT);
                res.status(status.OK);
                res.json({
                    msg: "Acceso exitoso",
                    data: {
                        user: user,
                        token: token
                    }
                });
            } else {
                res.status(status.NOT_FOUND);
                res.json({ msg: "Error!!! No se encontro" });
            }
        })
        .catch((err) => {
            res.status(status.NOT_FOUND);
            res.json({ msg: "Error!!! No se encontro", err: err });
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

};

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

const createUsersCSV = (req, res) => {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('../users.csv')
    });

    var user = {
    }

    var users = new Array();

    lineReader.on('line', (line) => {
        user = {
            name: '',
            email: '',
            password: ''
        }
        var data = line.split(',');
        user.name = data[0];
        user.email = data[1];
        user.password = datos[2];
        console.log(user);
        users.push(user);
        _user.create(users)
            .then((data) => {
                res.status(200);
                res.json({ msg: "Usuario creado correctamente", data: data });
            }).catch((err) => {
                res.status(400);
                res.json({ msg: "Error!!!!", data: err });
            })
        users.pop();
    })
};


module.exports = (User) => {
    _user = User;
    return ({
        createUser,
        findAll,
        deleteByID,
        updateByID,
        findByID,
        login,
        createUsersCSV
    });
}