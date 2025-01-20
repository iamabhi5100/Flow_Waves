import { generateToken, generateKey, verifyToken } from "authenticator"
import {Router} from "express"
import {client} from "@repo/db/client";
import jwt from "jsonwebtoken";


const router:Router = Router();


router.post("/signup", async (req,res) =>{
    const number = req.body.phonenumber;
    const totp = generateToken(number + "SIGNUP");
    // send topt to phone number 


    const user = await client.user.upsert({
        where: {
            number
        },
        create:{
            number,
            // name:""
        },
        update:{

        }
    })

    if(process.env.NODE_ENV === "production"){
        // send otp to user

    }
    res.json({
        id:user.id
    })

});

router.post("/signup/verify",async (req, res)=>{
    const number = req.body.phoneNumber;
    const name = req.body.name;
    if(!verifyToken(number + "SIGNUP",req.body.otp)){
        res.json({
            message: "Invalid token"
        })
        return
    }

    const user = await client.user.update({
        where:{
            number
        },
        data:{
            name,
            verified:true
        }
    })

    const token = jwt.sign({
        userId,
    },JWT_PASSWORD)
// set user to verified in db
res.json({
    
})
});


export default router;