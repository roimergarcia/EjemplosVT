<?php
include_once 'utilidades.php';

//Leemos los datos del usuario a insertar/actualizar
$id = $_POST["id"];
$nombre = $_POST["nombre"];
//NOTA: La imagen viene en Base 64 (porque así la enviamos desde consultar.html)
$img = mysql_escape_string($_POST["imagen"]);

//Si el usuario no existe lo insertamos,
//y si ya existe lo actualizamos
$consulta_sql = "INSERT INTO usuarios(id, imagen, nombre)\n". 
                "    VALUES ('$id', '$img', '$nombre')\n".
                "ON DUPLICATE KEY\n".
                "    UPDATE imagen = VALUES(imagen), nombre=VALUES(nombre);";

mysql_query($consulta_sql) 
    or mostrar_error("Error al ejecutar la consulta:\n$consulta_sql.\n\n".
                      mysql_errno($connection) . ": " . mysql_error($connection));

//La respuesta en formato JSON...
$respuesta = array(
    'ok' => true
);
echo json_encode($respuesta);


?>