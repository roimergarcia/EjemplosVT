<?php
//Función auxiliar para errores
function mostrar_error($mensaje_error){
  $arr = array("error" => true, "mensaje" => $mensaje_error);
  echo json_encode($arr);
  exit();
};


//Conexión a la base de datos
function abrirConexion(){
  $db_host = '127.0.0.1'; //La dirección del servidor de BD
  $db_user = 'mi-usuario-mysql';
  $db_pw = 'mi-contrasena-mysql';
  $db_name = 'mi-base-de-datos-mysql';

  $connection = mysqli_connect($db_host, $db_user, $db_pw, $db_name);
  if (!$connection) {
    mostrar_error("No se puede conectar al servidor\\base de datos: $db_host\\$db_name");
  }
  
  return $connection;
  
}


?>
