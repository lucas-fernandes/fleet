# fleet

const db = require("./src/models/db");
console.log("Começou!");


const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ro0tdb'
})


// criando o banco
con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!')

  con.query('CREATE DATABASE dblogin', function (err, result) {
    if (err) throw err
    console.log('Database created')
  })
})




comandos npm
npm init
npm instal nodemon -g 
npm install -- save express
npm install express-session
npm install --save body-parser
npm install --save mysql
npm install ejs -save


Em HOME View
JavaScript puro
<script type="text/javascript">
    function upd(){
        formulario = document.getElementById("formulario");
        formulario.action = '/update';
        formulario.submit();       
        alert ("Atualizado com sucesso!");         
    }

    function del(){
        formulario = document.getElementById("formulario");
        formulario.action = '/delete';
        formulario.submit(); 
        alert ("Excluído com sucesso!");    
    }
</script>