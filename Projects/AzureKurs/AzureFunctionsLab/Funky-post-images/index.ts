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
    await blobClient.uploadData(req.body);
    
    
    const doc = {
        id,
        uri: blobClient.url
    }
   
    context.bindings.uploadImage = doc;

    const res: Response = {
        status: 200,
        headers:{
            "content-type": "application/json"
        },
        body: doc
    }

    context.res = res;
};

export default httpTrigger;