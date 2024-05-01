import axios from "axios";
import moment from "moment";

import locationId from './locationId';

export default async function initiatePayment(email: string, amount: number, Pname: string, branchName: string, dateTime: string, phone: string, veg: number, nonVeg: number, children: number, date: string, time: string, bmMail: string, bmWhatsapp: string) {
    return new Promise(async (resolve, reject) => {
        const booky = locationId;

        let oid =  "BBQ" + Math.floor(Math.random() * Date.now());
        let fetchParams = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ oid, email, amount })
        }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getTxnToken`, fetchParams);
        let data = await res.json();
        
        let fetchParam, resp, id: any;
        if(booky) {
            fetchParam = {
                method: "POST",
                body: JSON.stringify({
                    "token": process.env.NEXT_PUBLIC_BOOKY_KEY,
                    "restaurantLocationId": "",
                    "customerName": Pname,
                    "phoneNo": phone,
                    "bookingDate": moment(date).format('yyyy-MM-DD'),
                    "sessionStartTime": "12:00",
                    "sessionEndTime": "14:00"
                })
            }
            resp = await fetch(process.env.NEXT_PUBLIC_BOOKY_HOST!, fetchParam);
        }
        else {
            fetchParam = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                },
                body: JSON.stringify({
                    data: {
                        "Name": Pname,
                        "Booking_ID": oid,
                        "Branch": branchName,
                        "Phone": phone,
                        "Email": email,
                        "Non_Veg_Adults": nonVeg,
                        "Veg_Adults": veg,
                        "Children": children,
                        "Event_Date_Time": dateTime,
                        "Transaction_ID": "PENDING",
                        "Amount": `₹ ${amount}`
                    },
                }),
            }
            resp = await fetch(`${process.env.NEXT_PUBLIC_CMS_PANEL}/api/Bookings`, fetchParam);
            let responseBody = await resp.json();

            id = responseBody.data.id;
        }

        let txnToken = data.body.txnToken;
        if(!txnToken) resolve(false);
        
        var config = {
        "root": "",
        "flow": "DEFAULT",
        "merchant": {
            "redirect": false
        },
        "data": {
            "orderId": oid,
            "token": txnToken,
            "tokenType": "TXN_TOKEN",
            "amount": amount
        },
        "handler": {
            "notifyMerchant": function(eventName: any, data: any){
                console.log(eventName, data);
            },
            "transactionStatus": function(paymentStatus: any){
                (window as any).Paytm.CheckoutJS.close();
                if(paymentStatus && paymentStatus.STATUS === "TXN_SUCCESS") {
                    if(!booky) {
                        let fetchParam = {
                            method: "PUT",
                            headers: {
                                "Content-type": "application/json",
                                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                            },
                            body: JSON.stringify({
                                data: {
                                    "Transaction_ID": paymentStatus.TXNID
                                },
                            }),
                        }
                        fetch(`${process.env.NEXT_PUBLIC_CMS_PANEL}/api/Bookings/${id}`, fetchParam);
                    }
                    
                    const formData = new FormData();
                    formData.append("to", "+91" + phone);
                    formData.append("bookingID", oid);
                    formData.append("name", Pname);
                    formData.append("branch", branchName);
                    formData.append("date", date);
                    formData.append("time", time);
                    formData.append("bmEmail", bmMail);
                    formData.append("bmWhatsapp", "+91" + bmWhatsapp);

                    axios.post(('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NmMwNTY5MDYzNzA0M2Q1MjY1NTUzNSI_3D_pc'), formData).then(() => resolve(true));
                }
                else resolve(false);
            },
        }
        };

        try {
            await (window as any).Paytm.CheckoutJS.init(config);
            await (window as any).Paytm.CheckoutJS.invoke();
        }
        catch (error) {
            (window as any).Paytm.CheckoutJS.close();
            reject(false);
        }
    });
}