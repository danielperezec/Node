const bcrypt = require('bcrypt');

// crypt de password

function hashPassword(plainPasssword){

    return new Promise((resolve, reject)=>{

        const saltRounds = 10;

        bcrypt.hash(plainPasssword,saltRounds,(error,hashedPassword)=>{

            if(error){
                PromiseRejectionEvent(new Error ("Error al hashear la password"))
            }else{
                resolve(hashedPassword)
            }
        })
    })
}

// funcion para comparar una contrasena con la otra encriptada 
function comparePassword(plainPasssword, hashedPassword){
return new Promise((resolve,reject)=>{
    bcrypt.compare(plainPasssword,hashedPassword, (error,match)=>{
        if(error){
            reject(new Error("Error al comparar passwords"))
        }else{
            resolve(match)
        }
    })
})
}

module.exports = {
    hashPassword,
    comparePassword
}