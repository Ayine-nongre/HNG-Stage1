import express from 'express'
import ip from 'ip'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.get('/api/hello', async (req, res) => {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${ip.address()}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.KEY,
            'x-rapidapi-host': process.env.HOST
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        res.status(200).json({
            "client_ip": ip.address(),
            "location": result.location.name,
            "greeting": `Hello ${req.query.visitor_name}!, the temperature is ${result.current.temp_c} degrees Celcius in ${result.location.name}`
        })
    } catch (error) {
        res.status(500).json({
            'message': 'Internal server error'
        })
    }
})

app.listen(3000, () => {
    console.log("Server is running...")
})