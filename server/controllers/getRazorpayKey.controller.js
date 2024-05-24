export function getRazorpayKey(req, res) {
    return res.status(200).json({
        key: process.env.RAZORPAY_KEY
    })
}