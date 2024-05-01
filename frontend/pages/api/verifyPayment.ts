import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
const PaytmChecksum = require("paytmchecksum");

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if(req.method !== 'POST') return;

    const paytmParams = {
        "mid" : process.env.NEXT_PUBLIC_PAYTM_MID,
        "orderId" : "YOUR_ORDER_ID",
    };
    
    res.status(200).json('succ');
    // PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "YOUR_MERCHANT_KEY").then(function(checksum){
    //     /* head parameters */
    //     paytmParams.head = {
    
    //         /* put generated checksum value here */
    //         "signature"	: checksum
    //     };
    
    //     /* prepare JSON string for request */
    //     var post_data = JSON.stringify(paytmParams);
    
    //     var options = {
    
    //         /* for Staging */
    //         hostname: 'securegw-stage.paytm.in',
    
    //         /* for Production */
    //         // hostname: 'securegw.paytm.in',
    
    //         port: 443,
    //         path: '/v3/order/status',
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Content-Length': post_data.length
    //         }
    //     };
    
    //     // Set up the request
    //     var response = "";
    //     var post_req = https.request(options, function(post_res) {
    //         post_res.on('data', function (chunk) {
    //             response += chunk;
    //         });
    
    //         post_res.on('end', function(){
    //             console.log('Response: ', response);
    //         });
    //     });
    
    //     // post the data
    //     post_req.write(post_data);
    //     post_req.end();
    // });    
}
