import mongoose from "mongoose";

const ConnectDB = async () => {
    try {

        const res = await mongoose.connect(process.env.MONGODBURI)

        console.log("MongoDB Connected:", res.connection.host);
    }
    catch (error) {
        console.log("Connection Error", error);
        process.exit(1)
    }
}

export default ConnectDB