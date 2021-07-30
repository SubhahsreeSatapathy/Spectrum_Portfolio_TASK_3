
const mongoose = require('mongoose')


const url = "mongodb://localhost:27017/Spectrum";

mongoose.connect(
    url,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    (err) => {
        if (err) throw err;
        else {
            console.info("INFO: Connected to DB");
        }
    }
);

mongoose.set("useCreateIndex", true);


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    education: String,
    password: String,
    skills: [],
    about: String,
    projects: [
        {
            projectName: String,
            startDate: String,
            endDate: String,
            projectDesc: String,
        },
    ],
});
const User = new mongoose.model("User", userSchema);

const userVar = new User({
    name: "Subhashree Satapathy",
    email: "ss@gmail.com",
    education: "MCA",
    password: "1234",
    skills: ["c", "c++", "java"],
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices tortor ac tristique ornare. Suspendisse ipsum ipsum, faucibus et tellus euismod, ornare molestie mauris. Fusce eu faucibus orci. Vivamus quis ex cursus, feugiat augue quis, faucibus augue. Pellentesque bibendum lectus et auctor rutrum. Nunc pulvinar placerat elit sit amet lobortis. Mauris porttitor metus placerat, cursus erat porttitor, hendrerit dolor. Quisque elit risus, consequat sed libero et, placerat tempus odio. Nulla condimentum feugiat pharetra. Praesent id est porta, dignissim ipsum vel, fermentum nunc. Sed at sem et lectus dapibus vehicula. ",
    projects: [
        {
            projectName: "Project 1",
            startDate: "2019-07-08",
            endDate: "2019-08-01",
            projectDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        },
        {
            projectName: "Project 2",
            startDate: "2020-03-08",
            endDate: "2020-05-01",
            projectDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        },
        {
            projectName: "Project 3",
            startDate: "2020-06-08",
            endDate: "2020-08-01",
            projectDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        },
    ],
});

function initData() {
    User.find({}, (err, result) => {
        if (err) console.log("sorry error found,when getting data");
        else {
            if (result.length === 0) {
                userVar.save((error) => {
                    if (!error) console.log("Inserted Initial Data")
                })
            }
        }
    });
}
initData();

module.exports = { User, initData };