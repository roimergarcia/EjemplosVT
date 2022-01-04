<?php
include_once 'utilidades.php';

//Leemos los datos del usuario
$id = $_POST["id"];
$nombre = $_POST["nombre"];
//NOTA: La imagen viene en Base 64 (porque así la enviamos desde consultar.html)
$img = $_POST["imagen"];

//Abrimos una conexión a la base de datos
$conexion = abrirConexion();

//escapamos antes de armar la consulta
$id = mysqli_escape_string($conexion, $id);
$nombre = mysqli_escape_string($conexion, $nombre);
$img = mysqli_escape_string($conexion, $img);

//Si el usuario no existe lo insertamos,
//y si ya existe lo actualizamos
$consulta_sql = "INSERT INTO usuarios(id, imagen, nombre)\n". 
                "    VALUES ('$id', '$img', '$nombre')\n".
                "ON DUPLICATE KEY\n".
                "    UPDATE imagen = VALUES(imagen), nombre=VALUES(nombre);";

mysqli_query($conexion, $consulta_sql) 
    or mostrar_error("Error al ejecutar la consulta:\n$consulta_sql.\n\n".
                      mysqli_errno($connection) . ": " . mysqli_error($connection));


//La respuesta en formato JSON...
$respuesta = array(
    'ok' => true
);
echo json_encode($respuesta);


?>