const {deterministicPartitionKey, deterministicPartitionKey2} = require("./dpk");


console.log('deterministicPartitionKey:', deterministicPartitionKey({partitionKey: 1234}));
console.log('deterministicPartitionKey2:', deterministicPartitionKey2({partitionKey: 1234}));