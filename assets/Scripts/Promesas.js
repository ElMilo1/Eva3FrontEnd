import { db } from "./Firebase.js";
import { collection, addDoc , getDocs , updateDoc , doc , deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"; 

export const registrarUsuario = async(Usuario)=>{
    const docRef = await addDoc(collection(db, "Usuarios"), Usuario);
};
export const recuperarUsuario = async()=>{
    const ref = collection(db,"Usuarios");
    const qSnap = await getDocs(ref);
    let lista = [];
    qSnap.forEach((doc)=>{
        lista.push({...doc.data(),id:doc.id})
    });
    return lista;
};

export const editarDatos = async(user,id)=>{
    const ref = collection(db,"Usuarios",id);
    await updateDoc(ref,user)
};

export const eliminarDatos = async(id)=>{
    const ref = doc(db,"Usuarios",id);
    await deleteDoc(ref);
};