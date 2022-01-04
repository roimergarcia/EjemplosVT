document.addEventListener('DOMContentLoaded', (e)=>{

    /**
     * Genera un objeto Blob, que contiene un archivo XML.
     * @param {function(Blob)} callback Función que se debe ejecutar con el blob generado.
     * @param {string} tipo Tipo de imagen a generar: 'image/png' o 'image/jpeg' 
     * @param {number} calidad Porcentaje de calidad de la imagen, entre 0 y 1.
     * @returns Blob Objeto de tipo Blob con el archivo xml.
     */
    const generarBlobImagen = function(callback, tipo, calidad){

        //primero obtenemos una referencia al elemento canvas
        const canvas = document.getElementById("elementoCanvas");

        //Pintamos algo sobre el canvas, para tener algo que mostrar:
        const ancho = canvas.width;
        const alto = canvas.height;

        //Fondo azul claro
        const contexto = canvas.getContext('2d');
        contexto.fillStyle = "#99D9FF"; //Azul claro
        contexto.fillRect(0, 0, ancho, alto);
        //Un par de rectángulos 
        contexto.fillStyle = "#E8821C"; //Naranja
        contexto.fillRect(50, 100, ancho - 100, 100); 
        contexto.strokeStyle = "#902090"; //Morado
        contexto.lineWidth= 12;
        contexto.strokeRect(100, 180, 300, 160); 
        //Y algo de texto
        contexto.fillStyle = "#008000"; //Verde
        contexto.font = '100px sans-serif'
        contexto.fillText('Canvas!', 100, 100);

        //Nos aseguramos de indicar un tipo MIME, por defecto image/png
        tipo = tipo || 'image/png';
        //la calidad solo es necesaria si es una imagen jpeg, 
        //pero asignamos un valor por defecto de todas formas
        calidad = calidad || 0.95; 

        //La función "toBlob" requiere una función callback, 
        //por lo que generarBlobImagen no puede retornar el 
        //blob directamente.
        canvas.toBlob(callback, tipo, calidad);

    }

    /**
     * Inicia la descarga del archivo en el navegador. 
     * Dependiendo de la configuración del navegador, 
     * este descargará el archivo automáticamente, o mostrará
     * el cuadro de dialogo "Guardar Cómo"
     * @param {Blob} archivo Objeto tipo Blob para descargar. 
     * @param {string} nombre Nombre por defecto para el archivo
     */
    const descargarArchivo = function(archivo, nombre){

        //Creamos un link
        const guardar = document.createElement('a');
        //Le asigna el ObjectURL que "apunta" al Blob
        guardar.href = URL.createObjectURL(archivo);
        //Preferiblemente descargar (con el nombre indicado), 
        //sino, entonces que por lo menos abra en otra ventana
        guardar.download = nombre || 'archivo.dat'; 
        guardar.target = '_blank'; 
        
        //Simulamos un clic del usuario
        //no es necesario agregar el link al DOM
        var clicEvent = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        guardar.dispatchEvent(clicEvent);

        //Al final removemos el DataURL para liberar recursos
        URL.revokeObjectURL(guardar.href);

    }

    //Al hacer clic: generar el archivo
    document.querySelector('#boton-descargar').addEventListener('click', (e) =>{

        //Primero definamos los parámetros como variales, para mayor claridad
        const tipo = 'image/png'; //Prueba también con 'image/jpeg'
        const calidad = 0.95; // 95%, aunque si es PNG no se requiere

        //Ahora generamos el blob, pero la descarga se iniciará 
        //mediante una función callback
        generarBlobImagen((archivo) => {

            //Lo descargamos dentro del callback
            descargarArchivo(archivo, 'nuevaImagen.png');

        }, tipo, calidad);

    });

});
