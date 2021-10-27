import { AzureFunction, Context } from "@azure/functions"
import resizeImg from "resize-img"

interface Message {
    id: string
    uri: string
}

interface Document{
    id: string
    uri: string
    thumbnail?: string
}
const serviceBusQueueTrigger: AzureFunction = async function(context: Context, mySbMsg: any): Promise<void> {
    //context.log('ServiceBus queue trigger function processed message', mySbMsg);

    //context.bindings.inputBlob
    //context.bindings.inputImageDocument

const doc: Document = {
    id: mySbMsg.id,
    uri: mySbMsg.uri,
    thumbnail: mySbMsg.uri.replace("testimages", "testthumbnails")
}

const resizedImage = await resizeImg(context.bindings.inputBlob, {
    width: 128,
    height: 128
  })

context.bindings.outputBlob = resizedImage;
  
context.bindings.outputDocument = doc; //context.bindings.inputImageDocument;
    

};

export default serviceBusQueueTrigger;
