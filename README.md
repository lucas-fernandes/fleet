# fleet

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