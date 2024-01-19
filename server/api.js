const db = require("./dbConnector");
const {
    GetItemCommand,
    PutItemCommand,
    DeleteItemCommand,
    ScanCommand,
    UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");



const deleteBook = async (event) => {
    const response = { statusCode: 200 };

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ bookId: event.pathParameters.bookId }),
        };
        const deleteResult = await db.send(new DeleteItemCommand(params));

        response.body = JSON.stringify({
            message: "Successfully deleted book.",
            deleteResult,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to delete book.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};


const getAllBooks = async () => {
    const response = { statusCode: 200 };

    try {
        const { Items } = await db.send(new ScanCommand({ TableName: process.env.DYNAMODB_TABLE_NAME }));

        response.body = JSON.stringify({
            message: "Successfully retrieved all books.",
            data: Items.map((item) => unmarshall(item)),
            Items,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to retrieve books.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};


module.exports = {
    getBook,
    createBook,
    updateBook,
    deleteBook,
    getAllBooks,
};
