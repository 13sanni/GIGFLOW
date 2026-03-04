import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";
dotenv.config();
const applyMongoDnsResolvers = () => {
    // Force stable resolvers for mongodb+srv DNS discovery when local DNS is unreliable.
    const configured = process.env.MONGO_DNS_SERVERS
        ?.split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    const resolvers = configured && configured.length > 0 ? configured : ["1.1.1.1", "8.8.8.8"];
    try {
        dns.setServers(resolvers);
        console.log(`Mongo DNS resolvers: ${resolvers.join(", ")}`);
    }
    catch (error) {
        console.warn("Failed to apply custom Mongo DNS resolvers:", error);
    }
};
const connectDB = async () => {
    try {
        const mongoUrl = process.env.MONGODB_URL;
        if (!mongoUrl) {
            throw new Error("MONGODB_URL is not set");
        }
        if (mongoUrl.startsWith("mongodb+srv://")) {
            applyMongoDnsResolvers();
        }
        await mongoose.connect(mongoUrl);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};
export default connectDB;
//# sourceMappingURL=db.js.map