document.addEventListener('DOMContentLoaded', (e)=>{

    /**
     * Genera un objeto Blob, que contiene un archivo de texto.
     * @returns Blob Objeto de tipo Blob con el archivo de texto.
     */
    const generarBlobTexto = function(){

        //Una forma simple de concatenar texto: usando un array!
        const partes = [];

        partes.push('Datos Personales:\n');
        partes.push('Nombre: ');
        partes.push(document.querySelector('#nombre').value);
        partes.push('\n');
        partes.push('Fecha de Nacimiento: ');
        partes.push(document.querySelector('#fecha').value);
        partes.push('\n');
        partes.push('Teléfono: ');
        partes.push(document.querySelector('#telefono').value);
        partes.push('\n');
        partes.push('Dirección: ');
        partes.push(document.querySelector('#direccion').value);

        const blobArchivo = new Blob(partes, { type: 'text/plain'} );

        return blobArchivo;

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

        console.log(archivo);
        
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

        //Primero generamos el Blob
        const archivo = generarBlobTexto();

        //Y luego lo descargamos
        descargarArchivo(archivo, 'datosPersonales.txt');

    });

});
