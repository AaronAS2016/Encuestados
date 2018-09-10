/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEliminada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntasBorradas.suscribir(function() {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario();
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    nuevoItem = $("<li>", {class:'list-group-item', id: pregunta.id}).text(pregunta.textoPregunta);
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoPregunta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociación de eventos
    e.botonAgregarPregunta.click(function() {
      contexto.controlador.agregarPregunta(); //Estas dos lineas venian intercambiadas de lugar, no se si era una 'trampa' o habia una manera de agregar la pregunta cuando se elimina los datos el formulario previamente.
      contexto.limpiarFormulario();
    });
    // Completar la asociación de de eventos a los
    // botones editarPregunta, borrarPregunta y borrarTodo

    e.botonBorrarPregunta.click(function() {
      contexto.controlador.borrarPregunta();
    });

    e.botonEditarPregunta.click(function() {
      contexto.controlador.editarPregunta();
    });
   
    
    e.borrarTodo.click(function() {
      contexto.controlador.borrarTodasLasPreguntas();
    });
  },


  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
