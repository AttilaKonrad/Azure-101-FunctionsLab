resource storageAccount 'Microsoft.Storage/storageAccounts@2021-04-01' = {
  name: 'attilaktest${uniqueString(resourceGroup().id)}'
  location: 'northeurope'
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'

//resource name 'blobService' = {
//  name: 'default'
//  resource container 'containers' = {
//    name: 'images'
  //}
//}
}

//output storageAccountName string = storageAccount.name
//output connectionString string = 
