# .

## Repositorio
Utilicé Vue 3, que es la versión mas reciente de vue, para hacer esta prueba tecnica.
Para crear el repositorio usé el comando vue-create-app de Vue que te permite crear un repo de Vue rapidamente.
Usé Vue Router para el manejo de las rutas y Pinia para el store.

## Busqueda de pokemons
Para las busquedas de pokemon implementé un filtro lineal que es para mi lo mas optimo en terminos de rapidez y costo.

## Componentes
Para los componentes no utlicé ninguna libreria o herramienta externa. Debido a que eran relativamente sencillos diseñé componentes a nivel de moleculas y luego los fuí reutilizando.

## Persistencia de datos
Los datos tanto de los pokemons como el pokemon seleccionado persisten en el store por lo tanto mientras se navega por las urls no se pierde la información del store. Si se pierde si se recarga la pagina, en un futuro se podría implementar guardar el store directamente en el localStorage y así recuperarlos luego de que se recargue la pagina.

