var express =  require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

var app =  express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//configuracion de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'bd-angular'});

  //conectar a la base de datos
  db.connect();


app.listen(3000, function () {
  console.log('Server is running on port 3000');
});


app.get('/', function (req, res, next) {
  res.status(200).json ({
    ok: true,
    message: 'Peticion realizada correctamente',
  });
});

app.get('/productos', function (req, res) {
    db.query('SELECT * FROM productos', function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: 'Lista de productos'
      });
    });
});

app.post('/productos', function (req, res) {
  let datosProducto = {
    productName: req.body.name,
    productCode: req.body.code,
    releaseDate: req.body.releaseDate,
    price: parseInt(req.body.price),
    description: req.body.description,
    starRating: parseInt(req.body.starRating),
    imageUrl: req.body.image
  };
  if(db){
    db.query("INSERT INTO productos SET ?", datosProducto, function (error, results) {
        if(error) {
            res.status(500).json   ({"Mensaje": "Error al insertar el producto"});
        }
        else {
            res.status(201).json ({"Mensaje": "Producto insertado correctamente"});
        }
    });
    }
});

app.put('/upload/producto/:id', (req, res) =>{
  let id = req.params.id;
  if(!req.files){
    return res.status(400).json({
      ok: false,
      Mensaje: 'No se ha subido ningun archivo',
      errors: { message: 'Debe de seleccionar una imagen' }
    });
  }

  //Obtener el nombre del archivo
  let archivo = req.files.imagen;
  let nombreCortado = archivo.name.split('.');
  let extensionArchivo = nombreCortado[nombreCortado.length - 1];
  //Solo estas extensiones aceptamos
  let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg', 'PNG'];

  if(extensionesValidas.indexOf(extensionArchivo) < 0){
    return res.status(400).json({
      ok: false,
      Mensaje: 'Extension no valida',
      errors: { message: 'Las extensiones validas son ' + extensionesValidas.join(', ') }
    });
  };

  //Nombre de archivo personalizado
  let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

  //Mover el archivo del temporal a un path
  let path = `./uploads/productos/${nombreArchivo}`;

  console.log(path);

  archivo.mv(path, err => {
    if(err){
      return res.status(500).json({
        ok: false,
        Mensaje: 'Error al mover el archivo',
        errors: err
      });
    }

    return res.status(200).json({
      ok: true,
      Mensaje: 'Archivo subido correctamente'
    });
  })
});