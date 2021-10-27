import { AzureFunction, Context, HttpRequest } from "@azure/functions";

interface Response{
    status: number
    headers?: {[name:string]:string};
    body?: unknown;
}

interface Images {
    id: string
    uri: string
}

export const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest, image: Images): Promise<Response> {
    context.log('Getting image');
   
    if (image === undefined) {
        return {
            status: 404
        }
    }

    image.id;
    context.bindings.uploadImage = image;

    const res: Response = {
        status: 200,
        headers:{
            "content-type": "application/json"
        },
        body: image
    }

    return res;
};