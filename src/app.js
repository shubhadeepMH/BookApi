const express = require('express');
const mongoose = require('mongoose')
const Books = require('./Bookschema')
//connection with mongo db

mongoose.connect('mongodb://localhost:27017/myBooks', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
).then(() => console.log("connection successful")).catch((err) => console.log(err))

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000

// insert books at database

app.post("/addBooks", (req, res) => {
    //  res.status(200).send("Hello from API side")
    const addBooks = new Books(req.body)
    addBooks.save().then(() => {
        // console.log(addBooks);
        res.status(200).send(req.body)
    }).catch((e) => {
        console.log(e);
        res.status(200).send(e)
    })
})
// get Books data
app.get("/getBooks", async (req, res) => {
    try {
        const bookData = await Books.find()
        res.send(bookData)

    } catch (e) {
        res.send(e)
    }

})
//Dalete book Data
app.delete("/deleteBooks/:id", async (req, res) => {
    try {
        const ids = req.params.id;
        const deleBook = await Books.findByIdAndDelete(ids)
        if (!deleBook) {
            res.status(404).send()
        }
        res.send(deleBook)
    }
    catch (err) {
        res.status(404).send(err)

    }

})


app.patch("/updateBooks/:id", async (req, res) => {
    try {
        const ids = req.params.id;
        const updateBook = await Books.findByIdAndUpdate(ids,req.body,{new:true})
        if (!updateBook) {
            res.status(404).send()
        }
        res.send(updateBook)

    }
    catch (e) {
        res.send(e)
    }


})

app.listen(port, () => {
    console.log("i am listning at ", port, " port");
})