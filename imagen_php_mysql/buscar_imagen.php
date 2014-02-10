<?php
include_once 'utilidades.php';

//Buscamos la imagen asociada al usuario indicado
$usuario_id = $_POST["usuario_id"];
$sql = "select id, imagen, nombre from usuarios where id=$usuario_id";

$data = mysql_query($sql) or mostrar_error("Falló la consulta: " . mysql_error());

if (mysql_num_rows($data) == 0) {
  //El usuario no existe:
  $arr = array("ok" => false,"id" => "$usuario_id", "nombre" => "[N/A]", "imagen" => null);
}else{
  //El usuario si existe:
  $row = mysql_fetch_assoc($data);
  $arr = array("ok" => true,"id" => $row["id"], "nombre" => $row["nombre"], "imagen" => $row["imagen"]);
}

//Respondemos en formato JSON
echo json_encode($arr);

?>