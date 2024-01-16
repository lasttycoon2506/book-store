

exports.add = async function(req, res) {
    try {
        const newBook = req.body
        //todo: add book to database
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred while adding book..." });
    }

    
    res.json(newBook)
}