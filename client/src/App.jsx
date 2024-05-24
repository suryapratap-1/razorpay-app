import axios from "axios";

function App() {

  async function payment(amount) {
    try {
      const { data: { key } } = await axios.get('/api/payment/getKey');

      const data = await axios.post('/api/payment/order', {amount})
      console.log(data.data.paymentResponse)

      const options = {
        key,
        amount: data.data.paymentResponse.amount,
        currency: "INR",
        name: "Razorpay Test",
        description: "Test Transaction",
        order_id: data.data.paymentResponse.id,
        callback_url: "/api/payment/payment-verification",
        prefill: {
            name: "Surya Pratap",
            email: "dev.suryapratap65@gmail.com",
            contact: "9999999999"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
      };
      const razor = new window.Razorpay(options);
      razor.open();
      console.log(razor)

    } 
    catch (error) {
      console.log(error)
    }
  }

  return (
    <main>
        <h1>Razorpay</h1>
        <button onClick={() => payment(100)}>Pay now</button>
    </main>
  )
}

export default App
