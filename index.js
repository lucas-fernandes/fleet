const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()
// captura dos dados passados no FORM
const bodyParser = require('body-parser')

const mysql = require('mysql')
const { resolveSoa } = require('dns')
const { connect } = require('http2')

//sessão
app.use(session({ secret: 'secret' }))
app.use(express.static('src'))
//engines
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/src'))
//bodyparser  leitura de post
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//conexão com banco mysql
function conectiondb(){
    var con = mysql.createConnection({
        host: 'localhost', // O host do banco. Ex: localhost
        user: 'root', // Um usuário do banco. Ex: user 
        password: 'sqlro0t', // A senha do usuário. Ex: user123
        database: 'dblogin' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
    });

    //verifica conexao com o banco
    con.connect((err) => {
        if (err) {
            console.log('Erro connecting to database...', err)
            return
        }
        console.log('Connection established!')
    });

    return con;
}

// routes ***

//rota padrao
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
    var query2 = 'SELECT * FROM users WHERE user LIKE ?'
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

// POST

//post register
app.post('/register', function (req, res) {
  var nome = req.body.nome
  var sobrenome = req.body.sobrenome
  var nascimento = req.body.nascimento
  var email = req.body.email
  var telefone = req.body.telefone
  var cars = req.body.cars
  var user = req.body.user
  var pass = req.body.pwd

  var con = conectiondb()

  var queryConsulta = 'SELECT * FROM users WHERE user LIKE ?'

  con.query(queryConsulta, [email], function (err, results) {
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
            console.log('Usuario adicionado com user ' + user)
            var message = 'ok'
            res.render('views/registro', { message: message })
          }
        }
      )
    }
  })
})

//método post do login
app.post('/log', function (req, res) {
  //pega os valores digitados pelo usuário
  var user = req.body.user
  var pass = req.body.pass
  //conexão com banco de dados
  var con = conectiondb()
  //query de execução
  var query = 'SELECT * FROM users WHERE pass = ? AND user LIKE ?'

  //execução da query
  con.query(query, [pass, user], function (err, results) {
    if (results.length > 0) {
      req.session.user = user //seção de identificação
      console.log('Login feito com sucesso!')
      res.render('views/home', { message: results })
    } else {
      var message = 'Login incorreto!'
      res.render('views/login', { message: message })
    }
  })
})

// método post da home
app.post('/update', function (req, res) {
  console.log('entrou')

  var nome = req.body.nome
  var sobrenome = req.body.sobrenome
  var nascimento = req.body.nascimento
  var email = req.body.email
  var telefone = req.body.telefone
  var cars = req.body.cars
  var user = req.body.user
  var pass = req.body.pwd
  //conexão com banco de dados
  var con = conectiondb()
  //query de execução
  var query =
    'UPDATE users SET nome = ?, sobrenome = ?, nascimento = ?, email = ?, telefone = ?, cars = ?, user = ?, pass = ? WHERE user LIKE ?'

  //execução da query
  con.query(query,[nome, sobrenome, nascimento, email, telefone, cars, user, pass, req.session.user], function (err, results){
      
    var query2 = 'SELECT * FROM users WHERE user LIKE ?'
    con.query(query2, [req.session.user], function (err, results) {
      res.render('views/home', { message: results })
    });
  });
});

app.post('/delete', function (req, res) {
  //pega os valores digitados pelo usuário

  var nome = req.body.nome

  //conexão com banco de dados
  var con = conectiondb()
  //query de execução
  var query = 'DELETE FROM users WHERE user LIKE ?'

  //execução da query
  con.query(query, [req.session.user], function (err, results) {
    res.redirect('/')
  })
})

app.listen(8081, () => console.log(`App up!`))