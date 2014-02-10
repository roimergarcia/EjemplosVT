<?php
//Función auxiliar para errores
function mostrar_error($mensaje_error){
  $arr = array("error" => true, "mensaje" => $mensaje_error);
  echo json_encode($arr);
  exit();
};

//Conexión a la base de datos
$db_host = '127.0.0.1';
$db_user = 'root';
$db_pw = '42k65536';
$db_name = 'test';

$connection = mysql_connect($db_host, $db_user, $db_pw);
if (!$connection) {
  mostrar_error("No se puede conectar al servidor: $db_host");
}

$db_selected = mysql_select_db($db_name, $connection);
if (!$db_selected) {
  mostrar_error("No se puede seleccionar la base de datos: $db_name");  
}

?>