import { registrarUsuario , recuperarUsuario , editarDatos , eliminarDatos } from "./Promesas.js"
window.addEventListener("load",()=>{
    document.getElementById("BtnEnviar").addEventListener("click",userData);
    document.getElementById("Contraste").addEventListener("click",contraste);
    document.getElementById("Tamanio").addEventListener("click",tamano);
    cargarUsuarios()
});


// funcion userdata() recupera los datos del formulario, valida,y en caso de ser valido, crea el objeto "user" y lo envia a firestore mediante funcion registrarUsuario()
const userData =() =>{
    let valido = true;
    let msgError = "";

    let eName = document.getElementById("unombre");
    let vName = eName.value.trim();
    if (vName === ""){
        valido = false;
        msgError += "Rellena el campo nombre.<br>"
        document.getElementById("unombre").style.borderColor = "red"
    }else{
        document.getElementById("unombre").style.borderColor = "gray"
    }
        

    let eSurname = document.getElementById("uapellido");
    let vSurname = eSurname.value.trim();
    if (vSurname === ""){
        valido = false;
        msgError += "Rellena el campo apellido.<br>"
        document.getElementById("uapellido").style.borderColor = "red"
    }else{
        document.getElementById("uapellido").style.borderColor = "gray"
    };

    let eRut = document.getElementById("urut");
    let vRut = eRut.value;
    if (vRut === ""){
        valido = false;
        msgError += "Rellena el campo de Rut.<br>"
    }else if(!/^\d{8,9}$/.test(vRut)){
        valido = false;
        msgError += "Rellena el campo rut de forma valida.<br>"
        document.getElementById("urut").style.borderColor = "red"
    }else{
        document.getElementById("urut").style.borderColor = "gray"
    }

    let vPhone = document.getElementById("telefono").value;
    if (vPhone === "") {
        valido = false;
        msgError += "Rellena el campo telefono.<br>";
    } else if (!/^\d{9,10}$/.test(vPhone)) {
        valido = false;
        msgError += "El teléfono debe tener entre 9 y 10 dígitos.<br>";
        document.getElementById("telefono").style.borderColor = "red"
    }else{
        document.getElementById("telefono").style.borderColor = "gray"
    }

    let vBday = document.getElementById("bday").value;
    if (vBday===""){
        valido = false;
        msgError += "Selecciona una fecha.<br>"
        document.getElementById("bday").style.borderColor = "red"
    }else{
        document.getElementById("bday").style.borderColor = "gray"
    }

    let vAge = document.getElementById("uedad").value;
    if (vAge === ""){
        valido = false;
        msgError += "Rellena el campo edad.<br>"
    } else if (isNaN(vAge)||vAge <= 0){
        valido = false;
        msgError += "La edad debe ser un numero positivo.<br>"
        document.getElementById("uedad").style.borderColor = "red"
    }else{
        document.getElementById("uedad").style.borderColor = "gray"
    };

    let vGender = document.getElementById("sexo").value;
    if (vGender ===""){
        valido = false;
        msgError += "Debes seleccionar un sexo.<br>"
        document.getElementById("sexo").style.borderColor = "red"
    }else{
        document.getElementById("sexo").style.borderColor = "gray"
    }

    let vExer = recRutina();

    let eComment = document.getElementById("comentario");
    let vComment = eComment.value;
    if (vComment===""){
        valido = false;
        msgError += "Deja un comentario para contactarte.<br>"
        document.getElementById("comentario").style.borderColor = "red"
    }else{
        document.getElementById("comentario").style.borderColor = "gray"
    }

    let user = {
        Nombre:vName,
        Apellido:vSurname,
        Rut:vRut,
        Telefono:vPhone,
        Fecha_Nacimiento:vBday,
        Edad:vAge,
        Genero:vGender,
        Ejercicio_Fav:vExer,
        Comentario:vComment
    };
    console.log(user)
    if (valido){
        registrarUsuario(user)
        cargarUsuarios()
    }else{
        alert(msgError)
    }}

// Funcion recRutina() recupera el valor del input radio y lo retorna hacia donde es llamado
const recRutina =()=>{
    let eRutina = document.querySelectorAll("input[name='rutina']");
    eRutina.forEach((i) => {
        if (i.checked) {
            eRutina = i.value;
        }
    });
    return eRutina
};

// funcion enviarRutina() hace lo contrario, envia el valor del radio del objeto.
const enviarRutina = (value) => {
        const radio = document.querySelector(`input[name="rutina"][value="${value}"]`);
        if (radio) {
            radio.checked = true;
}};

// carga la tabla con los usuarios ya registrados en la base de datos, siendo llamados con la funcion del archivo promesas llamada recuperarUsuario()
// y retornando un diccionario que debe ser recorrido con un ciclo for, el cual crea tambien los botones "actualizar","confirmar" y "eliminar"
// tambien permite la funcion de eliminar registro la cual funciona de forma exitosa.
const cargarUsuarios = () => {
    recuperarUsuario().then((tabla) => {
        let relleno = "";
        tabla.forEach((i) => {
            relleno += "<tr>";
            relleno += "<td>" + i.Nombre + "</td>";
            relleno += "<td>" + i.Apellido + "</td>";
            relleno += "<td>" + i.Rut + "</td>";
            relleno += "<td>" + i.Telefono + "</td>";
            relleno += "<td>" + i.Fecha_Nacimiento + "</td>";
            relleno += "<td>" + i.Edad + "</td>";
            relleno += "<td>" + i.Genero + "</td>";
            relleno += "<td>" + i.Ejercicio_Fav + "</td>";
            relleno += "<td>" + i.Comentario + "</td>"
            relleno += "<td><button id='UPD" + i.id + "'>Actualizar</button></td>";
            relleno += "<td><button id='CONF" + i.id + "'>Confirmar</button></td>";
            relleno += "<td><button id='DEL" + i.id + "'>Eliminar</button></td>";
            relleno += "</tr>";
    });
    document.getElementById("tablaUsuarios").innerHTML = relleno;

    tabla.forEach((i) => {
        let obj = document.getElementById("UPD"+i.id);
        obj.addEventListener("click",()=>{
            document.getElementById("unombre").value = i.Nombre;
            document.getElementById("uapellido").value = i.Apellido;
            document.getElementById("urut").value = i.Rut;
            document.getElementById("telefono").value = i.Telefono;
            document.getElementById("bday").value = i.Fecha_Nacimiento;
            document.getElementById("uedad").value = i.Edad;
            document.getElementById("sexo").value = i.Genero;
            enviarRutina(i.Ejercicio_Fav)
            document.getElementById("comentario").value = i.Comentario;
        })

        let editarUsuario = document.getElementById("CONF"+i.id);
        let oldData = i
        let newData = nuevaData()
        let oldId = document.getElementById("UPD"+i.id).id;
        editarUsuario.addEventListener("click",()=>{
            if (confirm("Seguro que desea editar al usuario seleccionado?"))
                console.log(oldData)
                console.log(newData)
                console.log(oldId)
        })


        let eliminarUsuario = document.getElementById("DEL"+i.id);
        eliminarUsuario.addEventListener("click", ()=>{
            if (confirm("Seguro que deseas eliminar al usuario seleccionado?")){
                eliminarDatos(i.id).then(() => {
                alert("Informacion eliminada.");
                cargarUsuarios();    
                }).catch((error) => {
                    alert("Error al eliminar")
                    console.log(error)
                }); 
            }else{
                console.log("No logrado.")
            }
        });
    });
})};

// intento de recuperar la data del formulario para actualizar el objeto, no resulto.
const nuevaData = () => {
    let eName = document.getElementById("unombre");
    let vName = eName.value;
    let eSurname = document.getElementById("uapellido");
    let vSurname = eSurname.value;
    let eRut = document.getElementById("urut");
    let vRut = eRut.value;
    let vPhone = document.getElementById("telefono").value;
    let vBday = document.getElementById("bday").value;
    let vAge = document.getElementById("uedad").value;
    let vGender = document.getElementById("sexo").value;
    let vExer = recRutina();
    let eComment = document.getElementById("comentario");
    let vComment = eComment.value;

    let user = {
        Nombre:vName,
        Apellido:vSurname,
        Rut:vRut,
        Telefono:vPhone,
        Fecha_Nacimiento:vBday,
        Edad:vAge,
        Genero:vGender,
        Ejercicio_Fav:vExer,
        Comentario:vComment
}
    return user
};

// cambia el contraste de la pagina entre 2 colores.
const contraste = () =>{
    let cuerpo = document.body;
    let colorCuerpo = cuerpo.style.backgroundColor;
        if (colorCuerpo=="white"){
            cuerpo.style.backgroundColor="lightblue"
    }
        else{
            cuerpo.style.backgroundColor="white"
        }
}

// cambia el tamaño de la fuente de toda la pagina.
const tamano = () =>{
    let size = document.body.style;
    let actualsize = parseFloat(size.fontSize) || 15;
    if (actualsize === 15){
        let newsize = actualsize + 10;
        size.fontSize = newsize + "px"
    }else{
        let newsize = actualsize - 10;
        size.fontSize = newsize + "px"
    }
}