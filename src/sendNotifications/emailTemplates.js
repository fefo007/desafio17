
const newUserEmail = (data)=>{
    return `
    <h2>Nuevo usuario registrado</h2>
    <p>se acaba de seguistrar un nuevo usuario en la API con los siguientes datos</p>
    <ul>
        <li><strong>email:</strong> ${data.direccion}
        <li><strong>password:</strong> ${data.password}
        <li><strong>nombre:</strong> ${data.username}
        <li><strong>direccion:</strong> ${data.residencia}
        <li><strong>edad:</strong> ${data.edad}
        <li><strong>imagen:</strong> ${data.formfile}
    `
    
} 

const newUserBuy = (data)=>{
    return `
    <h2>Nueva compra realizada</h2>
    <p>pedido realizado por ${data.username},email:${data.direccion}</p>
    <p>productos seleccionados:${data.prods}</p>`
}

module.exports={newUserEmail,newUserBuy}