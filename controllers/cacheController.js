var controller = {

    testCache: function(req,res){

let saludos = [];

        for(let i =0; i<10000;i++){
           console.log("hola soy el numero"+i);
            saludos.push("hola soy el numero"+i)

        }

        return res.status(200).send({
            status:200,
            message:"Test de cache",
            data: saludos
        })
    }
}
module.exports=controller