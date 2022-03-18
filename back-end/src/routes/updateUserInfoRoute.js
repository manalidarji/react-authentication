import jwt from 'jsonwebtoken';
import {getDbConnection} from '../db';
import {ObjectID} from 'mongodb';

export const updateUserInfoRoute = {
    path: '/api/users/:userId',
    method: 'put',
    handler: async (req, res) => {
        // get headers, params and body from request object
        const { authorization } = req.headers;
        const { userId } = req.params;
        // I don't want the whole req.body to be sent as an updated object as user can send some malicious or extra data, hence destructing then making a new object out of it
        const { favoriteFood, hairColor, bio } = req.body;
        const updates = {favoriteFood, hairColor, bio};

        // if No authorization header was sent
        if(!authorization){
            return res.status(401).json({message: 'No authorization header sent'})
        }

        // need to remove 'Bearer ' part from the token sent by the authorization header  
        const token = authorization.split(' ')[1];

        // verify the token sent to check if wasn't hampered
        jwt.verify(
            token, 
            process.env.JWT_SECRET,
            async (err, decoded) => {
                if(err){
                    return res.status(401).json({message: 'Unable to login'});
                }
                
                const {id} = decoded;

                // find that user and update the details of the same in db
                if(id == userId){
                    if(!decoded.isVerified) return res.status(403).json({message: 'You need to verify your email before updating the data'});

                    const db= getDbConnection('react-auth-db');
                    const result = await db.collection('users').findOneAndUpdate(
                        { _id: ObjectID(id) },
                        { $set: {info: updates} },
                        { returnOriginal: false }
                    );
                    const {email, isVerified, info} = result.value;
                    
                    // once updated, set the updated user
                    jwt.sign(
                        {id, email, isVerified, info},
                        process.env.JWT_SECRET,
                        {expiresIn: '2d'},
                        (err, token) => {
                            if(err){
                                res.status(200).json(err);
                            }else{
                                res.status(200).json({token});
                            }
                        }
                    )
                }else{
                    return res.status(403).json({message: 'Not allowed to update user\'s data'})
                }
            })
    }
}