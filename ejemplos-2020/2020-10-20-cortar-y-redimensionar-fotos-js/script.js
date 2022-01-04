/**
 * La funcionalidad del editor la colocaremos en un objeto único
 */
const editor = (function(){

 /**
  * @param {File} archivo Objeto File con el archivo a mostrar
  * @param {Canvas} canvas Elemento Canvas donde se digbujará la imagen
  * @returns
  */   
    const mostrarImagen = function(archivo, canvas){

        if(!archivo){ return }

        const lector = new FileReader();
        lector.addEventListener('load', (load_e)=>{
            const resultado = lector.result;
            let tipoMime = (/^data:[^;]+/).exec(resultado)[0];
            tipoMime = tipoMime.split(':')[1];


            if (tipoMime !== 'image/jpeg' && tipoMime !== 'image/png'){
                console.warn(`tipo MIME "${tipoMime}" no permitido`);
                return
            } else {
                const imagen = new Image();
                imagen.addEventListener('load', function(){
                    
                    const esVertical = imagen.naturalHeight > imagen.naturalWidth;
                    let lado = esVertical? imagen.naturalHeight: imagen.naturalWidth;

                    canvas.width = lado;
                    canvas.height = lado;
                    
                    const ctx = canvas.getContext('2d');

                    ctx.fillStyle='#FFFFFF';
                    ctx.fillRect(0, 0, lado, lado);

                    let x = (lado - this.naturalWidth)/2; 
                    let y = (lado - this.naturalHeight)/2;
                    ctx.drawImage(imagen, x, y, this.naturalWidth, this.naturalHeight);

                });

                imagen.src = resultado;

            }

        });

        lector.readAsDataURL(archivo);

    }

    return{
        mostrarImagen
    }
})();

/**
 * Al cargar el DOM montamos los manejadores de eventos
 */
document.addEventListener('DOMContentLoaded', ()=>{
    const archivoImagen = document.querySelector('#archivoImagen');
    const canvas = document.querySelector('#vistaPrevia');


    archivoImagen.addEventListener('change', (e)=>{
        
        const archivo = e.target.files[0];
        editor.mostrarImagen(archivo, canvas);

    });




});
