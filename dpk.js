const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};

/*
  deterministicPartitionKey2 is the refactored version of the function above:
  In this refactored version, we have separated the generation of the partition key candidate from the validation 
  and transformation of the candidate. We have also removed the unnecessary type check and stringification of the candidate. 
  Finally, we use a hash of the candidate key if it is too long, rather than falling back to a trivial key.
*/
exports.deterministicPartitionKey2 = (event) => {
  const MAX_PARTITION_KEY_LENGTH = 256;

  const candidate = getPartitionKeyCandidate(event);


  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return hash(candidate);
  } else {
    return candidate;
  }
};

function getPartitionKeyCandidate(event) {
  const TRIVIAL_PARTITION_KEY = "0"; 

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event.partitionKey) {
    return event.partitionKey.toString();
  } else {
    return hash(JSON.stringify(event));
  }
}

function hash(key) {
  return crypto.createHash("sha3-512").update(key).digest("hex");
}
