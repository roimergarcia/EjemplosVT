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
    //      String, y luego se ordenan según el código Unicode de cada caracter.
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
    //      no dará el resultado esperado, a menos que el arrray solo contenga cadenas ASCII
    //      con maýusculas y minúsculas consistentes.
    //VT 2: Debido a esto, la función sort acepta como parámetro una función de comparación, 
    //      que recibe dos valores y retorna un número que indica si a < b (valor negativo), 
    //      a > b (valor positivo) o si a == b (cero). La función de comparación localeCompare
    //      es generalmente la que da mejores resultados para comparar (y ordenar) listas 
    //      de strings.
    //VT 3: La función localeCompare acepta otros dos parámetros opcionales. El primero es 
    //      es una etiqueta de lenguaje (o un array de etiquetas), como "en-US" o "ja-JA",
    //      para indicar que se debe aplicar el conjunto general de reglas de comparación  
    //      de un lenguaje específico (se puede inicar undefined para usar el valor por defecto) 
    //      El segundo parámetro es un objeto con varias opciones de configuración, que permiten
    //      personalizar algunas de las reglas de ordenamiento; como por ejemplo, si se deben 
    //      considerar iguales o no los caracteres que solo difieran en el acento (u vs ü), o en
    //      las mayúsculas (u vs U), o si queremos forzar que als mayúsculas o las minúscula se 
    //      ordenen primero (por defecto, depende de la locale indicada).

    a.localeCompare(b, undefined, {
        sensitivity: "base", //No distinguir acentos ni mayúsculas/minúsculas
        ignorePunctuation: true, //Ignorar signos de puntuación ".", "?", etc.
        numeric: true, //Las secuencias de dígitos se ordenan numéricamente: "1" < "2" < "10"
    });



})();
