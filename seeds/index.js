const mongoose = require(`mongoose`);
const cities = require(`./cities`);
const {places, descriptors} = require(`./seedHelpers`);
const Campground = require(`../models/campground`);


mongoose.connect(`mongodb://localhost:27017/ycv1`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on(`error`, console.error.bind(console, "connection error:"));
db.once(`open`, ()=>{
    console.log("Databse connected");
})

const sample = (array) => {
    return array[Math.floor(Math.random()*array.length)];
}

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i<300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = await new Campground({
            author: `6107d3386aaed6534cae9bd2`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia alias obcaecati perspiciatis voluptas! Odio sapiente quasi aspernatur minima. Minus, deleniti?`,
            price: price,
            geometry : { 
              type : "Point", 
              coordinates : [ 
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/yj0112/image/upload/v1628236289/YelpCamp/photo-1504280390367-361c6d9f38f4_bexcqw.jpg',
                  filename: 'YelpCamp/photo-1504280390367-361c6d9f38f4_bexcqw'
                },
                {
                  url: 'https://res.cloudinary.com/yj0112/image/upload/v1628236289/YelpCamp/photo-1532339142463-fd0a8979791a_jcnkt9.jpg',
                  filename: 'YelpCamp/photo-1532339142463-fd0a8979791a_jcnkt9'
                },
                {
                  url: 'https://res.cloudinary.com/yj0112/image/upload/v1628236289/YelpCamp/photo-1576176539998-0237d1ac6a85_yb96b6.jpg',
                  filename: 'YelpCamp/photo-1576176539998-0237d1ac6a85_yb96b6'
                }
              ],
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})