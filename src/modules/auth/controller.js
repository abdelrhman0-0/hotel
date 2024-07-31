const Client = require('../client/model')
const Account = require('../account/model');
const { sign } = require('../../utils/helpers/jwt');

const  getTokens = async(_data) => {
    const [accessToken, refreshToken] = await Promise.all([
        sign(
            {
                sub: _data?.id,
                email: _data?.email,
                role: _data?.role,
            },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRATION) },
        ),
        sign(
            {
                sub: _data?.id,
                email: _data?.email,
                role: _data?.role,
            },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRATION) },
        )
    ]);
    return {
        accessToken,
        refreshToken
    };
};

const register = async (req, res, next) => {
    try {
        const account = await Account.findOne({where: {email: req.body.email}})
        if(account) res.status(409).json({message:"This Account already exist !"})
        if(account && account.status != 'active') res.status(401).json({message:`account is ${account.status}`})
        const newObjectAccount = {
            email:req.body.email,
            password: process.env.DUMMY_LOGIN_PASSWORD
        }
        let newAccount = await Account.create(newObjectAccount)
        newAccount.get({plain:true})

        const client = await Client.findOne({where: {email: req.body.email}})
        if(client) res.status(409).json({message:"This Client already exist !"})
        if(client && client.status != 'active') res.status(401).json({message:`Client is ${client.status}`})
        const newObjectClient = {
            name: req.body.name,
            email:req.body.email,
            nationality: req.body.nationality,
            personalId: req.body.personalId,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            phone: req.body.phone,
            accId: parseInt(newAccount.id)
        }
        let newClient = await Client.create(newObjectClient)
        newClient.get({plain:true})
        res.status(200).json({message:"Registered Successfully"})

    } catch (error) {
        res.status(500).json({message:"Something wrong!"})
    }
    // create new client 
    // generate dummy password
    // create account
    // res
};
const login = async (req, res, next) => {
    // get the acc 
    // check if exist and status
    // compare password
    // check if allright
    // getTokens
    // update acc refreshToken
    // return {...tokens}
};
const changePassword = async (req, res, next) => {
    // get Acc 
    // compare password 
    // check allright
    // update acc password 
    // success
};

const refreshToken = async (req, res, next) => {
    // get id from reftreshToken
    // get account 
    // check if allright
    // get new tokens
    // update db with new refreshToken
    // return tokens
};


module.exports = {
  register,
  login,
  changePassword,
  refreshToken,
};



// microservices 

// hotel register  => first => second request => slow 

// apps => service but

// TCP NOT HTTP (REAL TIME)


// API GATEWAY  => balancer

// hotel register  => TCP => very fast



