document.addEventListener('DOMContentLoaded', (e)=>{

    /**
     * Genera un objeto Blob, que contiene un archivo XML.
     * @returns Blob Objeto de tipo Blob con el archivo xml.
     */
    const generarBlobXml = function(){

        //Comenzamos por crear un XmlDocument
        const documento = document.implementation.createDocument('', '', null)

        //A este, le agregamos un elemento raiz, tal y como
        //cuando manipulamos el DOM:
        const raiz = documento.createElement('datos');
        documento.appendChild(raiz);

        //El elemento raiz debe ser único, pero dentro de él
        //podemos agregar cualquier cantidad de elementos hijos:
        //Usaremos la propiedad textContent para que automáticamente "escape"
        //los caracteres que no pueden incluirse directamente en el XML
        const nombre = documento.createElement('nombre');
        nombre.textContent = document.querySelector('#nombre').value;
        raiz.appendChild(nombre);

        //También puedes agregar atributos a los elementos, 
        //Probemos con uno como ejemplo:
        const fecha = documento.createElement('fecha-nacimiento');
        fecha.setAttribute('formato', 'yyyy-MM-dd');
        fecha.textContent = document.querySelector('#fecha').value;
        raiz.appendChild(fecha);

        //Agregamos los tres últimos elementos
        const telefono = documento.createElement('telefono');
        telefono.textContent = document.querySelector('#telefono').value;
        raiz.appendChild(telefono);

        const direccion = documento.createElement('direccion');
        direccion.textContent = document.querySelector('#direccion').value;
        raiz.appendChild(direccion);

        const comentario = documento.createElement('comentario');
        comentario.textContent = document.querySelector('#comentario').value;
        raiz.appendChild(comentario);

        //Para el blob, necesitamos convertir el documento XML en una cadena
        //de texto. Usamos la propiedad outerHTML del elemento raiz
        const partes = [raiz.outerHTML];

        //El tipo MIME para xml con contenido personalizado como este
        //debe ser "text/xml"
        const blobArchivo = new Blob(partes, { type: 'text/xml'} );
            /*
                text/html (Document)
                text/xml (XMLDocument)
                application/xml (XMLDocument)
                image/svg+xml (XMLDocument)        
             */


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
        const archivo = generarBlobXml();

        //Y luego lo descargamos
        descargarArchivo(archivo, 'datosPersonales.xml');

    });

});
