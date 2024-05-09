const Queue = require("bull");

const myQueue= new Queue('myQueue',{
    redis:{
        host: 'redis-11156.c308.sa-east-1-1.ec2.redns.redis-cloud.com',
        port: 11156,
        password: '9t8RBEK2xXLR8Gkp5n0JktUt0kEtYoVR'
    }
});

myQueue.process(async(job)=> {
    console.log(`Procesando tarea con ID ${job.id }`);

    await new Promise(resolve => setTimeout(resolve,20))

    console.log(`Tarea completada de ID ${job.id}`);
})
for(let i=0;i<5;i++){
    myQueue.add({index: i})
}