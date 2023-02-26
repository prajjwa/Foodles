const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/foodies');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '622342412868d9746257a869',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: { 
                type: 'Point', 
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude   
                ] 
            },
            title: `${sample(places)} ${sample(descriptors)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/hsgshss/image/upload/v1646677520/Foodles/w3afoagv8aysbkoonhmt.png',        
                  filename: 'Foodles/w3afoagv8aysbkoonhmt',
                },
                {
                  url: 'https://res.cloudinary.com/hsgshss/image/upload/v1646677521/Foodles/vpc5ocxxpaafjj55h9rv.png',        
                  filename: 'Foodles/vpc5ocxxpaafjj55h9rv',
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ab laborum molestias accusantium quis, dolorum recusandae mollitia officia sint totam numquam, minus voluptas culpa illo, fugiat veritatis natus ducimus vel.',
            price
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})