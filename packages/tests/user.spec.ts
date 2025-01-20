import {expect, test, it, describe} from 'vitest'
import axios from "axios"

const BACKEND_URL = "http://localhost:8080"

const PHONE_NUMBER1 = "7224568151";
const NAME_1 = "CHIKU";

describe("Signup EndPoints", ()=>{


    it('Double Signup doesnt work', async ()=>{
        const response1 = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
            username: PHONE_NUMBER1,
        });

        const response2 = await axios.post(`${BACKEND_URL}/api/v1/user/signup/verify`, {
            name:NAME_1,
            otp:"000000"
        });


        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200);
        expect(response1.data.id).not.toBeNull();

        // expect(async()=>{
        //     await axios.post(`${BACKEND_URL},/api/v1/user/signup`,{
        //         number:PHONE_NUMBER1,
        //     });
        // }).toThrow();
    })
})
