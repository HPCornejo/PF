let idSeleccionadoParaEliminar=0;
let idSeleccionadoParaActualizar=0;

function crearCategoria() {
  const idcategoria = document.getElementById('idCategoriaAlta').value;
  const categoria = document.getElementById('categoriaAlta').value;
  const descripcionCategoria = document.getElementById('descripcionCateAlta').value;

  $.ajax({
    method: 'POST', // Método
    url: window.location.origin + "/api/categorias",
    data: { // Body
      id: idcategoria,
      categoria:categoria,
      descripcion: descripcionCategoria
    },
    success: function(result) {
      if (result.estado == 1) {
        let categoria = result.categoria;
        // Debemos agregar la categoría a la tabla
        let tabla = $('#tabla-categoria').DataTable();
        let Botones = generarBotones(categoria.id);
        let nuevoRenglon = tabla.row.add([categoria.id, categoria.categoria, categoria.descripcion, Botones]).node();
        // Agregar el ID del renglón
        $(nuevoRenglon).attr('id', 'renglon_' + categoria.id);
        $(nuevoRenglon).find('td').addClass('table-td');
        tabla.draw(false);

        // Mostrar un mensaje agradable al usuario
        // alert(result.mensaje);
      } else {
        alert(result.mensaje);
      }
    }
  });
}

function getCategorias(){
    $.ajax({
        method:"GET",// metodo
        url: window.location.origin+"/api/categorias", //params (pero este no usara)
        data: {  }, //Body
        success: function( result ) {
         if(result.estado==1){
            const categorias = result.categorias 
            let tabla = $('#tabla-categoria').DataTable();
            categorias.forEach(categoria => {
              let Botones = generarBotones(categoria.id);
              let nuevoRenglon = tabla.row.add([categoria.id, categoria.categoria, categoria.descripcion, Botones]).node()
              //-----------linea Agregada para el ID del renglon-----------
              $(nuevoRenglon).attr('id','renglon_'+categoria.id)
              //------------------------------------------------------------
              //$(nuevoRenglon).find('td').addClass('table-td');
              tabla.draw( false );
            });
         }else{
            alert(result.mensaje)
         }
        }
      });
}

function borrarCategoria(){
  $.ajax({
    method:"DELETE",
    url: window.location.origin+"/api/categorias/"+idSeleccionadoParaEliminar,
    data: {},
    success: function( result ) {
     if(result.estado==1){
      //Debemos eliminar el renglon de la Data table
      let tabla =$('#tabla-categoria').DataTable();
      tabla.row('#renglon_'+idSeleccionadoParaEliminar).remove().draw()
     }else{
      alert(result.mensaje)
     }
    }
  });
}

getCategorias()
function generarBotones(id){
  botones = '<div class="d-flex">'
  botones += '<a href="#" onclick="CTMRaul('+id+')" class="btn btn-danger shadow btn-xs sharp" data-bs-toggle="modal" data-bs-target="#borrar" ><i class="fa fa-trash"></i></a>'
  botones += '<a href="#" onclick="CTMRaul2('+id+')" class="btn btn-primary shadow btn-xs sharp" data-bs-toggle="modal" data-bs-target="#editar" ><i class="fa fa-trash"></i></a>'
  botones += '</div>'
  return botones
}

function CTMRaul(id){
  idSeleccionadoParaEliminar=id
}
function CTMRaul2(id){
  idSeleccionadoParaActualizar=id
  $.ajax({
    method:"GET",// metodo
    url: window.location.origin+"/api/categorias/"+idSeleccionadoParaActualizar, //params (pero este no usara)
    data: {  }, //Body
    success: function( result ) {
     if(result.estado==1){
        let categoria = result.categoria;
        document.getElementById('input1').value=categoria.id;
        document.getElementById('input2').value=categoria.categoria;
        document.getElementById('input3').value=categoria.descripcion;
     }else{
        alert(result.mensaje)
     }
    }
  });

}

function actualizar(){
  let idcategoria = document.getElementById('input1').value;
  let categoria = document.getElementById('input2').value;
  let descripcion = document.getElementById('input3').value;

  $.ajax({
    method:"PUT",// metodo
    url: window.location.origin+"/api/categorias/" +idSeleccionadoParaActualizar, //params (pero este no usara)
    data: { id:idcategoria, categoria:categoria, descripcion:descripcion }, //Body
    success: function( result ) {
     if(result.estado==1){
        let tabla = $('#tabla-categoria').DataTable();
        let rengT = tabla.row('#renglon_'+idSeleccionadoParaActualizar).data();
        rengT[0] = idcategoria;
        rengT[1] = categoria;
        rengT[2] = descripcion;
        tabla.row('#renglon_'+idSeleccionadoParaActualizar).data(rengT).draw();
     }else{
        alert(result.mensaje)
     }
    }
  });

}