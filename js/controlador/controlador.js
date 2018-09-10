/*
 * Controlador
 */
var Respuesta = function(respuesta){
    this.cantidad = 0
    this.textoPregunta = respuesta
}

//Cree el objeto Respuesta porque si lo tenia en un diccionario de datos como menciona la guia, me daba error la funcion map, ya que se aplica solo en Arrays según pude investigar, lo declare dentro del modelo, me parecio el lugar más adecuado pero no estaba seguro.


var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function() {
    var value = $('#pregunta').val();
    var respuestas = [];

    $('[name="option[]"]').each(function() {


      //Completar el agregado de una respuesta
      // pusheandola al arreglo de respuestas
      if($(this).val()){
        var respuesta = new Respuesta($(this).val());
        respuestas.push(respuesta)
      }
      
    })
   
    this.modelo.agregarPregunta(value, respuestas);
  },

  borrarPregunta: function(){
    var $id = $('.list-group-item.active').attr('id');
    this.modelo.eliminarPregunta($id)
  },

  editarPregunta: function(){
    let nuevaPregunta = prompt("Editar pregunta:")
    var $id = $('.list-group-item.active').attr('id');
    if(nuevaPregunta){
      this.modelo.editarPregunta($id, nuevaPregunta)
    }
  },
  borrarTodasLasPreguntas: function(){
      this.modelo.borrarTodo();
  },
  agregarVotos: function(){
    var contexto = this;
    $('#preguntas').find('div').each(function(){
      var nombrePregunta = $(this).attr('value')
      var id = $(this).attr('id')
     // var pregunta = contexto.modelo.obtenerPregunta(id); //Por defecto se obtenia la pregunta mandandole el nombrePregunta, no entendi bien esto, si la respuesta seleccionada deberia contener el id, y ya viene, no tengo que buscara dentro de las preguntas.
      var respuestaSeleccionada = $(`input[name='${id}']:checked`).val()
      $(`input[name='${id}']`).prop('checked',false);
      contexto.agregarVoto(id,respuestaSeleccionada);
    });
  },
  agregarVoto: function(pregunta, respuestaSeleccionada){
    this.modelo.agregarVoto(pregunta, respuestaSeleccionada)
  }

  
};
