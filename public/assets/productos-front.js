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
function muestraUnProductoFront(id){
    let URL = getURL() + '/productos/api/'+ id; //params
    alert(URL);
    $.ajax({
      method:'GET',
      url: URL,
      data: {}, //Body
      success: function( result ) {
        if(result.estado == 1){
          const producto = result.producto;
          document.getElementById('nombreProductoVisualizar').value=producto.nombre;
          document.getElementById('nombre_proveedorVisualizar').value=producto.nombre_proveedor;
          document.getElementById('precio_proveedorVisualizar').value=producto.precio;
          document.getElementById('categoria_id_proveedorVisualizar').value=producto.categoria_id;
          document.getElementById('descripcionProductoVisualizar').value=producto.descripcion;
          document.getElementById('observacionesProductoVisualizar').value=producto.observaciones;
        
        
        
        }else{
          alert(result.mensaje);
        }
      }
    });
}

function listaProductosFront(){
  let URL = getURL()+'/productos/api'
    $.ajax({
        method:'GET',
        url: URL,
        data: {},
        success: function( result ) {
         let estado = result.estado;
         let mensaje = result.mensaje;
         if(estado==1){
            let categorias = result.categorias;
            let tabla = $('#tabla-productos').DataTable();

            categorias.forEach(categoria => {
              let Botones = '<div class="flex space-x-3 rtl:space-x-reverse">'

            Botones += '<button onclick="muestraUnProductoFront('+producto.id+')" data-bs-toggle="modal" data-bs-target="#viewModal" class="action-btn" type="button">'
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
listaProductosFront();