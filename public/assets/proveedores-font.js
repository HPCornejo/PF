let idSeleccionadoParaEliminar=0;
let idSeleccionadoParaActualizar=0;

function crearProveedores() {
  const idProveedores = document.getElementById('idProveedoresAlta').value;
  const nombreProveedores = document.getElementById('nombreProveedoresAlta').value;
  const telefonoProveedores = document.getElementById('telefonoProveedoresAlta').value;

  $.ajax({
    method: 'POST', // Método
    url: window.location.origin + "/api/proveedores",
    data: { // Body
      id: idProveedores,
      nombre: nombreProveedores,
      telefono: telefonoProveedores

    },
    success: function(result) {
      if (result.estado == 1) {
        let proveedores = result.proveedores;
        // Debemos agregar la categoría a la tabla
        let tabla = $('#tabla-proveedores').DataTable();
        let Botones = generarBotones(factura.id);
        let nuevoRenglon = tabla.row.add([proveedores.id, proveedores.nombre, telefonoProveedores, Botones]).node();
        // Agregar el ID del renglón
        $(nuevoRenglon).attr('id', 'renglon_' + proveedores.id);
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

function getProveedores(){
    $.ajax({
        method:"GET",// metodo
        url: window.location.origin+"/api/proveedores", //params (pero este no usara)
        data: {  }, //Body
        success: function( result ) {
         if(result.estado==1){
            const proveedores = result.proveedores 
            let tabla = $('#tabla-proveedores').DataTable();
            proveedores.forEach(proveedores => {
              let Botones = generarBotones(proveedores.id);
              let nuevoRenglon = tabla.row.add([proveedores.id, proveedores.nombre, telefonoProveedores, Botones]).node()
              //-----------linea Agregada para el ID del renglon-----------
              $(nuevoRenglon).attr('id','renglon_'+proveedores.id)
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

function borrarProveedores(){
  $.ajax({
    method:"DELETE",
    url: window.location.origin+"/api/proveedores/"+idSeleccionadoParaEliminar,
    data: {},
    success: function( result ) {
     if(result.estado==1){
      //Debemos eliminar el renglon de la Data table
      let tabla =$('#tabla-proveedores').DataTable();
      tabla.row('#renglon_'+idSeleccionadoParaEliminar).remove().draw()
     }else{
      alert(result.mensaje)
     }
    }
  });
}


function generarBotones(id){
    let Botones= '<div style="display: flex; justify-content: center;">'
    Botones+='<button type="button" class="btn  btn-outline-primary" style="display: inline-block;" data-toggle="modal" onclick="identificaActualizar('+id+');" data-target="#modal-modificar">'
    Botones+= '<i class="fas fa-edit"></i>'
    Botones+= '</button>'
    Botones+= '<button type="button" class="btn btn-outline-danger" style="display: inline-block;" data-toggle="modal" onclick="identificaEliminar('+id+');" data-target="#modal-eliminar">'
    Botones+=  '<i class="fas fa-edit"></i>'
    Botones+='</button>'
    Botones+= '</div>'
    return Botones;
};

function identificaActualizar(id){
  idSeleccionadoParaActualizar=id;
  //debemos de obtener los datos de la base de datos y mostrar en la ventana
  $.ajax({
    method:"GET",
    url: window.location.origin+"/api/proveedores/"+idSeleccionadoParaActualizar,
    data: {  },
    success: function( result ) {
      if(result.estado==1){
        let proveedores = result.proveedores;
        //Mostramos en la ventana 
        document.getElementById('idProveesoresModificar').value=proveedores.id;
        document.getElementById('nombreProveedoresActualizar').value=proveedores.nombre;
        document.getElementById('telefonoProveedoresActualizar').value=telefonoProveedores;
      }else{
        alert(result.mensaje)
      }
    }
  });
}

function identificaEliminar(id){
  idSeleccionadoParaEliminar=id;


}

function actualizarProveedores() {
  let idProveedores = document.getElementById('idProveedoresModificar').value;
  let nombreProveedores = document.getElementById('nombreProveedoresActualizar').value;
  let telefonoProveedores = document.getElementById('cliente_idProveedoresActualizar').value;

  $.ajax({
    method: "PUT",
    url: window.location.origin + "/api/proveedores/" + idSeleccionadoParaActualizar, // Parámetros
    data: { // Cuerpo
      id: idProveedores,
      descripcion: nombreProveedores,
      telefono: telefonoProveedores
    },
    success: function(result) {
      if (result.estado == 1) {
        // Debemos actualizar la tabla
        let tabla = $('#tabla-factura').DataTable();
        let rengloTemporal = tabla.row('#renglon_' + idSeleccionadoParaActualizar).data();
        rengloTemporal[0] = idProveedores;
        rengloTemporal[1] = nombreProveedores;
        rengloTemporal[2] = telefonoProveedores
        tabla.row('#renglon_' + idSeleccionadoParaActualizar).data(rengloTemporal).draw();
        alert(result.mensaje);
      } else {
        alert(result.mensaje);
      }
    }
  });
}

getProveedores();