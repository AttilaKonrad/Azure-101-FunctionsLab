import { AzureFunction, Context, HttpRequest } from "@azure/functions"

interface Response {
    status: number
    headers?: {[name: string]: string}
    body?: unknown
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Oh, hell-ooo from the joke function!');

    const body = {
        text:"What did the SNAIL say while riding on the TURTLES back? He said 'Wheeeeee'!"
    }
   
    const res: Response = {
        status: 200,
        headers:{
            "content-type": "application/json"
        },
        body // : {"text":"What did the SNAIL say while riding on the TURTLES back? He said 'Wheeeeee'!"}
    }

    context.res = res;
};

export default httpTrigger;