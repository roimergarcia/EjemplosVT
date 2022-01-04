/**
 *  Ejemplo 1: Ordenar un array de textos
 */
(function(){

    const listaFrutas = new Array();
    listaFrutas.push('Manzana');
    listaFrutas.push('Piña');
    listaFrutas.push('Pera');
    listaFrutas.push('Limón');
    listaFrutas.push('tomate');
    listaFrutas.push('Uva');
    listaFrutas.push('Ñame');
    listaFrutas.push('Toronja');

    listaFrutas.sort();
    console.log(listaFrutas);

    //Resultado:
    //Array(8) [ "Limón", "Manzana", "Pera", "Piña", "Toronja", "Uva", "tomate", "Ñame" ]

    //VT 1: La función sort se ejecuta "in place", esto es, modifica directamente 
    //      el array original.
    //VT 2: El ordenamiento por defecto se ejecuta convirtiendo cada ítem en un 
    //      String, y luego se ordenan según el código Unicode de cada carácter.
    //      Por esto el "Ñame" está de último (la "Ñ" va después de todos los caracteres 
    //      ASCII) y el tomate de 7mo en lugar de estar después de la piña (las minúsculas
    //      van después de las mayúsculas). 
    //VT 3: Si, ya se que el "Ñame" es una verdura, pero no conozco frutas que empiecen por Ñ.

})();


/**
 *  Ejemplo 2: Ordenar "correctamente" un array de textos
 */
(function(){

    const listaFrutas = new Array();
    listaFrutas.push('Manzana');
    listaFrutas.push('Piña');
    listaFrutas.push('Pera');
    listaFrutas.push('Limón');
    listaFrutas.push('tomate');
    listaFrutas.push('Uva');
    listaFrutas.push('Ñame');
    listaFrutas.push('Toronja');

    listaFrutas.sort((a, b) =>{
        return a.localeCompare(b, undefined, {
            sensitivity: "base", //No distinguir acentos ni mayúsculas/minúsculas
            ignorePunctuation: true, //Ignorar signos de puntuación ".", "?", etc.
            numeric: true, //Las secuencias de dígitos se ordenan numéricamente: "1" < "2" < "10"
        });
    });
    console.log(listaFrutas);

    //Resultado:
    //Array(8) [ "Limón", "Manzana", "Ñame", "Pera", "Piña", "tomate", "Toronja", "Uva" ]


    //VT 1: El algoritmo de ordenamiento es dependiende de la implementación, pero en todo
    //      caso utiliza una función de comparación. La comparación por defecto generalmente
    //      no dará el resultado esperado, a menos que el array solo contenga cadenas ASCII
    //      con mayúsculas y minúsculas consistentes.
    //VT 2: Debido a esto, la función sort acepta como parámetro una función de comparación, 
    //      que recibe dos valores,"a" y "b", y retorna un número que indica si a < b (valor negativo), 
    //      a > b (valor positivo) o si a == b (cero). La función de comparación localeCompare
    //      es generalmente la que da mejores resultados para comparar (y ordenar) listas 
    //      de strings.
    //VT 3: La función localeCompare acepta otros dos parámetros opcionales. El primero es 
    //      es una etiqueta de lenguaje (o un array de etiquetas), como "en-US" o "ja-JA",
    //      para indicar que se debe aplicar el conjunto general de reglas de comparación  
    //      de un lenguaje específico (se puede indicar undefined para usar el valor por defecto) 
    //      El segundo parámetro es un objeto con varias opciones de configuración, que permiten
    //      personalizar algunas de las reglas de ordenamiento; como por ejemplo, si se deben 
    //      considerar iguales o no los caracteres que solo difieran en el acento (u vs ü), o en
    //      las mayúsculas (u vs U), o si queremos forzar que las mayúsculas o las minúsculas se 
    //      ordenen primero (por defecto, depende de la locale indicada).

    // a.localeCompare(b, undefined, {
    //     sensitivity: "base", //No distinguir acentos ni mayúsculas/minúsculas
    //     ignorePunctuation: true, //Ignorar signos de puntuación ".", "?", etc.
    //     numeric: true, //Las secuencias de dígitos se ordenan numéricamente: "1" < "2" < "10"
    // });

})();

/**
 *  Ejemplo 3: Ordenar un array de números
 */
 (function(){

    const listaValores = [7, 4, 10, 1, 20, 25, 2, 3, 45];

    listaValores.sort();
    console.log(listaValores);

    //Resultado:
    //Array(9) [ 1, 10, 2, 20, 25, 3, 4, 45, 7 ]

    //VT 1: Al primer intento pensaríamos que array.sort funcionaría de forma nativa para ordenar  
    //      una lista de números, pero no es así.
    //VT 2: Como indiqué en el ejemplo anterior, el ordenamiento por defecto se ejecuta convirtiendo  
    //      cada ítem en un String, por lo que que el texto "10" queda ordenado entre los textos "1" y "2".
    //      Por esto el "Ñame" está de último (la "Ñ" va después de todos los caracteres 
    //      ASCII) y el tomate de 7mo en lugar de estar después de la piña (las minúsculas
    //      van después de las mayúsculas). 
    //VT 3: Como norma general, si vamos a usar el método array.sort, siempre hay que indicar la función de comparación.

})();

/**
 *  Ejemplo 4: Ordenar "Correctamente" un array de números
 */
 (function(){

    const valores = [7, 4, 10, 1, 20, 25, 2, 3, 45]; 
    
    valores.sort((a, b) =>{ 
        if (a < b){
            return -1;
        } else if (a > b){
            return 1
        } else {
            return 0
        }
    });
        
    console.log(valores); 

    //Resultado:  
    //Array(9) [ 1, 2, 3, 4, 7, 10, 20, 25, 45 ]  

    //VT 1: En general, la función de comparación debe devolver un valor negativo si el primer ítem 
    //      es menor al segundo (a < b), un valor positivo si el primero es mayor al segundo (a > b), 
    //      o 0 si ambos son iguales.
    //VT 2: La función de comparación anterior es perfecta para ordenar una lista de valores numéricos

})();


/**
 *  Ejemplo 5: Ordenar un array de objetos
 */
 (function(){

    /**
     * Utilidad/constructor para crear objetos Persona.
     * @param {String} nombre 
     * @param {Boolean} trabaja 
     * @param {number} edad 
     */
     const Persona = function Persona(nombre, trabaja, edad){
        this.nombre = nombre;
        this.trabaja = trabaja;
        this.edad = edad;
    }
    Persona.prototype.toString = function(){
        return `$(this.nombre), $(this.edad) ($(this.trabaja? 'trabaja': 'no trabaja'))`;
    }

    const listaObjetos = new Array();
    listaObjetos.push(new Persona('Juan', true, 22));
    listaObjetos.push(new Persona('María', true, 25));
    listaObjetos.push(new Persona('Carla', false, 19));
    listaObjetos.push(new Persona('Ana', true, 21));
    listaObjetos.push(new Persona('Pedro', false, 66));
    listaObjetos.push(new Persona('Antonio', true, 33));
    listaObjetos.push(new Persona('Valentina', true, 31));
    listaObjetos.push(new Persona('Elena', false, 52));
    listaObjetos.push(new Persona('Ignacio', true, 48));
    listaObjetos.push(new Persona('Germán', false, 41));
    listaObjetos.push(new Persona('Lorena', true, 33));

    listaObjetos.sort((a, b) =>{
        if (a.trabaja && !b.trabaja){
            return -1;
        } else if (!a.trabaja && b.trabaja){
            return 1
        } else {
            if (a.edad < b.edad){
                return -1;
            } else if (a.edad > b.edad){
                return 1
            } else {
                return 0
            }
        }
    });
    console.log(listaObjetos);

    //Resultado:
    // Array(11) ...
    // 0: Object { nombre: "Ana", trabaja: true, edad: 21 }
    // 1: Object { nombre: "Juan", trabaja: true, edad: 22 }
    // 2: Object { nombre: "María", trabaja: true, edad: 25 }
    // 3: Object { nombre: "Valentina", trabaja: true, edad: 31 }
    // 4: Object { nombre: "Antonio", trabaja: true, edad: 33 }
    // 5: Object { nombre: "Lorena", trabaja: true, edad: 33 }
    // 6: Object { nombre: "Ignacio", trabaja: true, edad: 48 }
    // 7: Object { nombre: "Carla", trabaja: false, edad: 19 }
    // 8: Object { nombre: "Germán", trabaja: false, edad: 41 }
    // 9: Object { nombre: "Elena", trabaja: false, edad: 52 }
    // 10:Object { nombre: "Pedro", trabaja: false, edad: 66 }


    //VT 1: En este ejemplo vemos como aplicar un ordenamiento customizado con varios criterios:
    //      Comenzamos con una lista de objetos Persona (o cualquier tipo nativo o customizado), 
    //      para el cual queremos colocar primero a las personas que trabajan, y después a las que no.
    //      Además las personas de cada "grupo" deben ordenarse por edad ascendente.
    //VT 2: Entonces el primer criterio de comparación será: si el primer ítem "a" trabaja y el 
    //      segundo "b" no, entonces "a" va antes que "b"; si "a" No trabaja y "b" si, entonces "a" 
    //      va después que "b". En caso de no cumplir con las primeras dos condiciones (osea que ambos 
    //      trabajen o que ambos no trabajen), "a" y "b" se consideran iguales según este criterio. 
    //VT 3: Como tenemos un segundo criterio, en lugar de devolver 0 en el "else", colocamos allí una
    //      segunda comparación; en este caso la comparación es la misma que usamos para los números 
    //      en el ejemplo 4, con la diferencia de que en lugar de comparar "a" y "B" directamente, comparamos
    //      las edades de "a" y "b".

})();