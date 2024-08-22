en el html. se creó un documento en donde se creó lo siguiente:
un select para elegir entre los sistemas de coordenadas, dos campos de número para la posición X e Y habilitados únicamente cuando se selecciona el sistema de coordenadas cartesianas.
dos campos de numero para el radio y ángulo habilitados solo para el sistema de coordenadas polares
tres espacios de numero para ancho, alto y número de lados para la figura
un boton de "actualizar" que llama la función "actualizarFigura()"
y finalmente un evento onchange al seleccionador del sistema de coordenadas que llama otra funcion llamada "habilitarCampos()" Esta funcion habilita o desabilita los campos de texto según la selección del sistema de coordenadas.

en el script se creó:
la función "actualizarFigura()" la cual es llamada cuando se hace clic al boton de actualizar. esta funcion recoge los valores proporcionados en los campos de texto según el sistema de coordenadas y llama la funcion de "dibujarFigura()". esta devuelve "false" para evitar que se recargue la página cuando se hace clic en el boton
la funcion de "dibujarFigura()" es donde con los valores nuevos se dibuja la figura en el canvas.