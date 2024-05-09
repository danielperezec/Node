// Importamos express y creamos un router.
const expressRedisCache=require("express-redis-cache");
const express = require("express");
const {validationResult, body} = require('express-validator');
const router = express.Router()

const testCacheController= require("../controllers/cacheController")
const authController = require("../controllers/authController");
const middleware = require("../middleware/verifyToken");

const cache = expressRedisCache({
    host: 'redis-11156.c308.sa-east-1-1.ec2.redns.redis-cloud.com',
    port: 11156,
    auth_pass: '9t8RBEK2xXLR8Gkp5n0JktUt0kEtYoVR',
    expire: 60
})
// Rutas para al Auth del User.
// login
router.post("/login",[
    body("email").not().isEmpty(),
    body("password").not().isEmpty()],authController.controller.login);

// logout
router.post("/logout",middleware.tokenVerify, authController.controller.logout);


// test cache
router.get("/testcache",cache.route(), testCacheController.testCache)



module.exports = router;