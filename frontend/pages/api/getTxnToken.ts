import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
const PaytmChecksum = require("paytmchecksum");

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if(req.method !== 'POST') return;

    const paytmParams = {
        "body": {
          "requestType": "Payment",
          "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
          "websiteName": "thebbqcompany",
          "orderId": req.body.oid,
          "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/verifyPayment`,
          "txnAmount": {
            "value": req.body.amount,
            "currency": "INR"
          },
          "userInfo": {
            "custId": req.body.email
          }
        },
        "head": {
          "signature": "",
          "timestamp": "",
        }
    };

    let checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.NEXT_PUBLIC_PAYTM_MKEY)
    paytmParams.head.signature = checksum;
    paytmParams.head.timestamp = new Date().toISOString();

    const response = await axios.post(`https://securegw.paytm.in/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`, paytmParams, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    res.status(200).json(response.data);
}
