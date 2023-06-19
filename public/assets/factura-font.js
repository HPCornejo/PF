let idSeleccionadoParaEliminar=0;
let idSeleccionadoParaActualizar=0;

function crearFactura() {
  const idfactura = document.getElementById('idFacturaaAlta').value;
  const nombreFactura = document.getElementById('nombreFacturaAlta').value;
  const cliente_idFactura = document.getElementById('cIDFacturaAlta').value;

  $.ajax({
    method: 'POST', // Método
    url: window.location.origin + "/api/factura",
    data: { // Body
      id: idfactura,
      nombre: nombreFactura,
      cliente_id: cliente_idFactura 

    },
    success: function(result) {
      if (result.estado == 1) {
        let factura = result.factura;
        // Debemos agregar la categoría a la tabla
        let tabla = $('#tabla-factura').DataTable();
        let Botones = generarBotones(factura.id);
        let nuevoRenglon = tabla.row.add([factura.id, factura.nombre, factura.cliente_id, Botones]).node();
        // Agregar el ID del renglón
        $(nuevoRenglon).attr('id', 'renglon_' + factura.id);
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

function getFactura(){
    $.ajax({
        method:"GET",// metodo
        url: window.location.origin+"/api/factura", //params (pero este no usara)
        data: {  }, //Body
        success: function( result ) {
         if(result.estado==1){
            const factura = result.factura 
            let tabla = $('#tabla-factura').DataTable();
            factura.forEach(factura => {
              let Botones = generarBotones(factura.id);
              let nuevoRenglon = tabla.row.add([factura.id, factura.nombre, factura.cliente_id, Botones]).node()
              //-----------linea Agregada para el ID del renglon-----------
              $(nuevoRenglon).attr('id','renglon_'+factura.id)
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
    url: window.location.origin+"/api/factura/"+idSeleccionadoParaEliminar,
    data: {},
    success: function( result ) {
     if(result.estado==1){
      //Debemos eliminar el renglon de la Data table
      let tabla =$('#tabla-factura').DataTable();
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
    url: window.location.origin+"/api/factura/"+idSeleccionadoParaActualizar,
    data: {  },
    success: function( result ) {
      if(result.estado==1){
        let factura = result.factura;
        //Mostramos en la ventana 
        document.getElementById('idFacturaModificar').value=factura.id;
        document.getElementById('nombreFacturaActualizar').value=factura.nombre;
        document.getElementById('cliente_idFacturaActualizar').value=factura.cliente_id
      }else{
        alert(result.mensaje)
      }
    }
  });
}

function identificaEliminar(id){
  idSeleccionadoParaEliminar=id;


}

function actualizarFactura() {
  let idfactura = document.getElementById('idFacturaModificar').value;
  let nombreFactura = document.getElementById('nombreFacturaActualizar').value;
  let cliente_idFactura = document.getElementById('cliente_idFacturaActualizar').value;

  $.ajax({
    method: "PUT",
    url: window.location.origin + "/api/categorias/" + idSeleccionadoParaActualizar, // Parámetros
    data: { // Cuerpo
      id: idfactura,
      descripcion: nombreFactura,
      cliente_id: cliente_idFactura
    },
    success: function(result) {
      if (result.estado == 1) {
        // Debemos actualizar la tabla
        let tabla = $('#tabla-factura').DataTable();
        let rengloTemporal = tabla.row('#renglon_' + idSeleccionadoParaActualizar).data();
        rengloTemporal[0] = idcategoria;
        rengloTemporal[1] = nombreFactura;
        rengloTemporal[2] = cliente_idFactura
        tabla.row('#renglon_' + idSeleccionadoParaActualizar).data(rengloTemporal).draw();
        alert(result.mensaje);
      } else {
        alert(result.mensaje);
      }
    }
  });
}

getFactura();
