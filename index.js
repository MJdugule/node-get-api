const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/hello', async (req, res) => {
    const visitorName = req.query.visitor_name || 'Mark';
    let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    try {
        // Get location data based on IP
        const ipResponse = await axios.get(`http://ip-api.com/json/${clientIp}`);
        const location = ipResponse.data.city || 'Unknown Location';

       

        res.json({
            client_ip: clientIp,
            location: location,
            greeting: `Hello, ${visitorName}!, the temperature is 11 degrees Celsius in ${location}`
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
