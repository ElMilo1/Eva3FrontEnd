window.addEventListener("load",()=>{
    document.getElementById("BtnEnviar").addEventListener("click",userData)
});

const userData =() =>{
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

    let vExer = document.querySelector("input[name='rutina']").value;

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
    };

    console.log(user);
}