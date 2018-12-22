// Assuming you have already done "npm install fernet"
let Fernet = require('fernet')
let secret = new Fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABcDph4_7SC6ol9BgkGLaJ_9hn1LxjC29f_7A5phL8qgtsDJYxVc-rSl3uSWXE6pyNNC-cTyuev04gnyZVwT8hjHLh4_2_Z30wekfY1cGuuOoh4nLqYrJ4qB0EAMf8MJiXYm-G8dLyvRNPxI_bboddT1NYxvAX9j_NN87H5nnHvVS-Z82-wSbvqZFBcxCUa_C4ILwpk'
let token = new Fernet.Token({secret, token: message, ttl:0})
console.log(token.decode())
