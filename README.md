# Pruebas  Analytic Labs

## Componentes

### Slider Component
Es el compoenente encargado de mostrar las peliculas en forma de slider separado por categoria, por lo que al momento de invocarlo, se debe enviar como parámetro la categoria que se va a mostrar. 

### Home Component
Es la pantalla principal, donde se muestran los diferentes slide separados por categoria.

### Create-Movie Component 
Es el componente con el formulario para crear una nueva película.

### Edit-Movie Component 
Es el componmente con el formulario para editar una película.


## Servicios 

### slide Service
Es el servicio que consulta las películas de la base de datos y las separa por categoria.

### movie service
Es el servicio que consulta una película por el id 

### Create service
Es el servicio crea una película en la base de datos, con información dada

### authentication Service
Es el encargao de realizar la consulta a la base de datos del usuario y devolver si es efectivo el login

## Modelos

### Movies 
Son los encargados de modelar todos los datos de tipo movies

### User 
es el encargado de almacenar la información del user actual 