<?php
include_once 'utilidades.php';

//Leemos el id del usuario solicitado
$id = $_POST["usuario_id"];

//Abrimos una conexion a la base de datos
$conexion = abrirConexion();

//escapamos antes de armar la consulta
$id = mysqli_escape_string($conexion, $id);

$sql = "select id, imagen, nombre from usuarios where id=$id";

$data = mysqli_query($conexion, $sql) or mostrar_error("Falló la consulta: " . mysqli_error());

if (mysqli_num_rows($data) == 0) {
  //El usuario no existe:
  $arr = array("ok" => false,"id" => "$id", "nombre" => "[N/A]", "imagen" => null);
}else{
  //El usuario si existe:
  $row = mysqli_fetch_assoc($data);
  $arr = array("ok" => true,"id" => $row["id"], "nombre" => $row["nombre"], "imagen" => $row["imagen"]);
}

//Respondemos en formato JSON
echo json_encode($arr);

?>