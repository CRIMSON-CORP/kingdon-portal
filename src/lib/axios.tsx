import axios from "axios";
import https from "https";

export default axios.create({
  baseURL: `${process.env.BACKEND_API_URL}/${process.env.BACKEND_API_VERSION}`,
  timeout: 60000, // optional
  httpsAgent: new https.Agent({ keepAlive: true }),
});
