# geolocation-theory
## Theory and practice on the geolocation subject
- - - - - - -
**setInterval => fetch (asíncrona)**

al mezclar sincronía con asincronía, si el intervalo de peticiones es inferior al tiempo que tarda la función fetch en devolver la promesa, se produce un error al intentar ejecutar el contenido sin haber recibido la promesa.

Para solventarlo se pueden emplear promesas con setTimeout(x) - ver teoría de Promesas:

`let myPromise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('Te saludo tras 3 segundos!! ');
  }, 3000);
});

myPromise.then(function(value) {
  console.log(value);
});

console.log(myPromise);`