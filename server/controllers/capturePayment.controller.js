import { instance } from "../config/razorpay.js";
import { validatePaymentVerification, validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";

export const capturePayment = async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100,
            // amount: 500 * 100,
            currency: "INR",
        }

        const paymentResponse = await instance.orders.create(options);
        // console.log(paymentResponse);

        // await Student.find({ident});

        return res.status(200).json({
            success: true,
            paymentResponse
        })

    } catch (error) {
        console.error("Couldn't initiate order", error.message);
        return res.status(500).json({
            success: false,
            message: "Couldn't initiate order",
            error: error.message
        })
    }
}

// isPaid: Boolean

export const verifySignature = async (req, res) => {
    try {
        console.log(req.body)

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        // console.log(process.env.RAZORPAY_SECRET)
        // const expectedSignature = crypto
        //                             .createHmac("sha256", process.env.RAZORPAY_SECRET)
        //                             .update(JSON.stringify(body))
        //                             .digest("hex");


        const expectedSignature = validatePaymentVerification(
            {
                "order_id": razorpay_order_id,
                "payment_id": razorpay_payment_id 
            }, 
            razorpay_signature, 
            process.env.RAZORPAY_SECRET
        );
        console.log("expert-",expectedSignature)
        console.log(razorpay_signature)

        if (expectedSignature) {
            console.log("Payment authorized")
            return res.status(200).json({
                success: true,
                message: "Payment authorized"
            })
        }

        // console.log(res)
        return res.status(400).json({
            success: false,
            message: "Payment authorized failed"
        })

    } 
    catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Unable to verify"
        })
    }
}



// const signature = req.headers["x-razorpay-signature"];
// console.log(signature)
// const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
// .update(JSON.stringify(req.body))
// .digest("hex")