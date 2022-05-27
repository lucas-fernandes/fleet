const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()

// captura dos dados passados no FORM
const bodyParser = require('body-parser')

//sessão
app.use(session({ secret: 'secret' }))
app.use(express.static('src'))
//engines
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/src'))
//bodyparser  leitura de post
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//----------------------------------------------------------------
//bd conection
async function conectiondb(){
  var mysql = require("mysql2/promise");
  var con = await mysql.createConnection(
    "mysql://root:ro0tdb@localhost:3306/dblogin"
  );

  //verifica conexao com o banco
  con.connect((err) => {
      if (err) {
          console.log('Erro na conexão com o banco MySQL...', err)
          return
      }
      console.log('Connection estabelecida!')
  });

  return con;
}


//----------------------------------------------------------------
// routes
//padrao
app.get('/', (req, res) => {
  var message = ' '
  req.session.destroy()
  res.render('views/registro', { message: message })
})

//rota registro
app.get('/views/registro', (req, res) => {
  res.redirect('../')
  //res.render('views/registro', {message:message});
})

//rota home
app.get('/views/home', function (req, res) {
  //verifica seção ativa
  if (req.session.user) {
    var con = conectiondb()
    var query2 = 'SELECT * FROM users WHERE email LIKE ?'
    con.query(query2, [req.session.user], function (err, results) {
      res.render('views/home', { message: results })
    })
  } else {
    res.redirect('/')
  }
})

//rota login
app.get('/views/login', function (req, res) {
  var message = ' '
  res.render('views/login', { message: message })
})

//----------------------------------------------------------------
// POSTs
//método post do register
app.post('/register', function (req, res){

  var nome = req.body.nome
  var sobrenome = req.body.sobrenome
  var nascimento = req.body.nascimento
  var email = req.body.email
  var telefone = req.body.idade
  var cars = req.body.cars
  var user = req.body.user
  var pass = req.body.pwd

  var con = conectiondb();

  var queryConsulta = 'SELECT * FROM users WHERE email LIKE ?';

  con.query(queryConsulta, [user], function (err, results) {
    if (results.length > 0) {
      var message = 'Login já cadastrado'
      res.render('views/registro', { message: message })
    } else {
      var query = 'INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?)'

      con.query(
        query,
        [nome, sobrenome, nascimento, email, telefone, cars, user, pass],
        function (err, results) {
          if (err) {
            throw err
          } else {
            console.log('Usuario adicionado com email ' + email)
            var message = 'ok'
            res.render('views/registro', { message: message })
          }
        }
      )
    }
  })
});