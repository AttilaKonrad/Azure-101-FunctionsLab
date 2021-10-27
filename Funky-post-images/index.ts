import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {BlobServiceClient} from "@azure/storage-blob";
import {v4} from "uuid";

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.STORAGE_IMAGE_CONNECTION_STRING);

interface Response {
    status: number
    headers?: {[name: string]: string}
    body?: unknown
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    context.log('Image uploading');
    const id = v4()

    const blobClient = blobServiceClient.getContainerClient("testimages").getBlockBlobClient(id + ".jpg");
    try{
        await blobClient.uploadData(req.body);
    }
    catch (err){
        context.log.error("Internal server error (500) encountered when storing image")
        const res: Response = {
            status: 500,
            headers:{
                "content-type": "application/json"
            }
        }
        context.res = res;
        context.done()      
    }
   
    const doc = {
        id,
        uri: blobClient.url
    }
   
    context.bindings.uploadImage = doc;
    context.bindings.outputSbMsg = doc;

    const res: Response = {
        status: 201,
        headers:{
            "content-type": "application/json"
        },
        body: doc
    }

    context.res = res;
};

export default httpTrigger;