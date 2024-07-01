import express from 'express'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.get('/api/hello', async (req, res) => {
    const ipAdd = req.headers["cf-connecting-ip"] || req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.headers['x-real-ip'] || req.socket.remoteAddress

    if (!req.query.visitor_name) return res.status(404).json({ "message": "Visitor name is required"})

    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${ipAdd}`;
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
            "client_ip": ipAdd,
            "location": result.location.name,
            "greeting": `Hello ${req.query.visitor_name}!, the temperature is ${result.current.temp_c} degrees Celcius in ${result.location.name}`
        })
    } catch (error) {
        res.status(500).json({
            'message': 'Failed to get weather details'
        })
    }
})

app.listen(3000, () => {
    console.log("Server is running...")
})