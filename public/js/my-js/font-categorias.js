//Para mostrar los mensajes
alert('Hola mundo del Front de categorias');

//Vamos a crear funciones para comunicarnos con el back - API - END POINT
//Creamos la funcion
function getURL(){
  let URL = window.location.protocol + '//'+window.location.hostname
  if(window.location.port)
      URL+=':'+window.location.port
  return URL
}
function muestraUnaCategoriaFront(id){
    let URL = getURL() + '/categorias/api/'+ id; //params
    alert(URL);
    $.ajax({
      method:'GET',
      url: URL,
      data: {}, //Body
      success: function( result ) {
        if(result.estado == 1){
          const categoria = result.categoria;
          document.getElementById('descripcionCategoriaVisualizar').value=categoria.descripcion;
          document.getElementById('observacionesCategoriaVisualizar').value=categoria.observaciones;
        }else{
          alert(result.mensaje);
        }
      }
    });
}

function listaCategoriasFront(){
  let URL = getURL()+'/categorias/api'
    $.ajax({
        method:'GET',
        url: URL,
        data: {},
        success: function( result ) {
         let estado = result.estado;
         let mensaje = result.mensaje;
         if(estado==1){
            let categorias = result.categorias;
            let tabla = $('#tabla-categorias').DataTable();

            categorias.forEach(categoria => {
              let Botones = '<div class="flex space-x-3 rtl:space-x-reverse">'

            Botones += '<button onclick="muestraUnaCategoriaFront('+categoria.id+')" data-bs-toggle="modal" data-bs-target="#viewModal" class="action-btn" type="button">'
            Botones += '<iconify-icon icon="heroicons:eye"></iconify-icon>'
            Botones += '</button>'

            Botones += '<button data-bs-toggle="modal" data-bs-target="#updateModal" class="action-btn" type="button">'
            Botones += '<iconify-icon icon="heroicons:pencil-square"></iconify-icon>'
            Botones += '</button>'

            Botones += '<button data-bs-toggle="modal" data-bs-target="#deleteModal" class="action-btn" type="button">'
            Botones += '<iconify-icon icon="heroicons:trash"></iconify-icon>'
            Botones += '</button>'

            Botones += '</div>'

                //alert(categoria.descripcion)
                //tabla.row.add([categoria.descripcion,Botones]).node.id='registro_'+categoria.id;
                let nuevoRenglon = tabla.row.add([categoria.descripcion,Botones]).node();
                $(nuevoRenglon).find('td').addClass('table-td');
                tabla.draw( false );

            });
         }else{
            alert(mensaje);
         }
        }
      });
}
//La mandamos llamar
listaCategoriasFront();