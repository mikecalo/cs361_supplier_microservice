const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

const googleSearchApiKey = process.env.GOOGLE_API_KEY;
const searchEngineId = process.env.SEARCH_ENGINE_ID;

app.post('/search', async (req, res) => {
    const { wireSize, costPerUnit, impedance } = req.body; 

    const query = `electrical wire suppliers with ${wireSize} AWG, cost $${costPerUnit}/unit, and impedance ${impedance} ohms`;

    try {
        // Make a request to the Google Custom Search API
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
            params: {
                key: googleSearchApiKey,
                cx: searchEngineId,
                q: query,
                num: 3 
            }
        });

        const supplierLinks = response.data.items.map(item => item.link);
        res.json({ links: supplierLinks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving supplier links' });
    }
});

app.listen(port, () => {
    console.log(`Show Supplier Microservice running on port ${port}`);
});



