import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreateEvent = ({ user }) => {



    const navigate = useNavigate();

    const [data, setData] = useState({
        summary: "",
        description: "",
        startDateTime: "",
        endDateTime: "",
        location: "",

    })

    const [influencers, setInfluencers] = useState([]);
    const [selectedInfluencer, setSelectedInfluencer] = useState("");
    const [loading,setLoading] = useState(false);

    const orderId = useRef("")

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get('http://localhost:8000/api/influencer/get-influencers');
            setInfluencers(res.data);
        }
        fetch();
    }, [])

    const change = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }

    const orderData = {
        user_id: user._id,
        to_email: selectedInfluencer,
        amount: 10,
        event_data: data,
        currency: 'INR'
    }

    const handleSelectChange = (event) => {
        setSelectedInfluencer(event.target.value);

       
    };

    const handleSubmit =async  (e) => {
        e.preventDefault();
        console.log(data);
        try {

             setLoading(true);

           try{
            const response = await axios.post("http://localhost:8000/api/order/create-order",orderData)
            orderId.current = response.data.order_id;
                console.log(response);
           }catch(error){
            console.log(error);
           }

            const options = {
                "key": import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                "amount": `${orderData.amount * 100}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Guild up",
                "description": "Test Transaction",

                "order_id": orderId.current, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": function (response) {
                    response.event = data;
                    axios.post('http://localhost:8000/api/calendar/create-event', response).then((res) => {
                        console.log(res.data);
                        navigate('/success')
                    }).catch((err) => {
                        console.log(err);
                    })
                    //   alert(response.razorpay_payment_id);
                    //   alert(response.razorpay_order_id);
                    //   alert(response.razorpay_signature)
                },
                "prefill": {
                    "name": `${user.name}`,
                    "email": `${user.email}`,
                    "contact": "9000090000"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.on('payment.failed', function (response) {
                console.log(response.error);
                axios.get('http://localhost:8000/api/order/update-status').then((res) => {
                    console.log(res.data);
                    navigate('/failure')
                }).catch((err) => {
                    console.log(err);
                })

            });
            console.log(orderId)
            if(orderId.current!==""){
            razorpay.open();
            }
        } catch (error) {
            console.log(error);
            alert('Failed to initialize payment');
        } finally {
          setLoading(false);
        }

    };

    return (
        <div className="max-w-lg mx-auto p-4">
  {/* Dropdown for selecting influencer */}
  <div className="mb-6">
    <label htmlFor="influencer" className="block text-sm font-medium text-gray-700">Select Influencer</label>
    <select
      id="influencer"
      value={selectedInfluencer}
      onChange={handleSelectChange}
      className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    >
      <option value="" disabled>Please choose one option</option>
      {influencers.map((influencer) => (
        <option key={influencer._id} value={influencer.email}>
          {influencer.name}
        </option>
      ))}
    </select>
  </div>

  {/* Form */}
  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="space-y-2">
      <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Summary</label>
      <input
        type="text"
        id="summary"
        name="summary"
        value={data.summary}
        onChange={change}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <div className="space-y-2">
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
      <input
        type="text"
        id="description"
        name="description"
        value={data.description}
        onChange={change}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <div className="space-y-2">
      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
      <textarea
        id="location"
        name="location"
        value={data.location}
        onChange={change}
        rows="3"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <div className="space-y-2">
      <label htmlFor="startdatetime" className="block text-sm font-medium text-gray-700">Start Date Time</label>
      <input
        type="datetime-local"
        id="startdatetime"
        name="startDateTime"
        value={data.startDateTime}
        onChange={change}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <div className="space-y-2">
      <label htmlFor="enddatetime" className="block text-sm font-medium text-gray-700">End Date Time</label>
      <input
        type="datetime-local"
        id="enddatetime"
        name="endDateTime"
        value={data.endDateTime}
        onChange={change}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    {/* Submit Button */}
    <div className="flex justify-center">
      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full py-3 px-6 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {loading ? <p>Loading...</p> : <p>Create Event</p>}
      </button>
    </div>
  </form>
</div>

    )
}

export default CreateEvent
