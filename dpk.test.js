const crypto = require("crypto");

const { deterministicPartitionKey2:deterministicPartitionKey } = require("./dpk"); // Running the tests for the refactored code
// const { deterministicPartitionKey } = require("./dpk"); // Running the tests for the old code

describe("deterministicPartitionKey", () => {
  const data = { foo: "bar" };
  const hash = crypto.createHash("sha3-512").update(JSON.stringify(data)).digest("hex");

  test("returns a trivial partition key if the event is null, undefined or not given", () => {
    expect(deterministicPartitionKey()).toEqual("0");
    expect(deterministicPartitionKey(null)).toEqual("0");
    expect(deterministicPartitionKey(undefined)).toEqual("0");
  });

  test("returns the partition key if it exists on the event", () => {
    const event = { partitionKey: "foo" };
    expect(deterministicPartitionKey(event)).toEqual("foo");
  });

  test("generates a hash of the event data if no partition key exists", () => {
    const event = data;
    expect(deterministicPartitionKey(event)).toEqual(hash);
  });

  test("returns a hashed partition key if the partition key is too long", () => {
    const event = { partitionKey: "a".repeat(257) };
    const expectedHash = crypto.createHash("sha3-512").update(event.partitionKey).digest("hex");
    expect(deterministicPartitionKey(event)).toEqual(expectedHash);
  });

  test("stringifies and hashes a non-string candidate key", () => {
    const event = { foo: "bar" };
    expect(deterministicPartitionKey(event)).toBe(hash);

    const number = 42;
    const expectedHash = crypto.createHash("sha3-512").update(JSON.stringify(number)).digest("hex");
    expect(deterministicPartitionKey(number)).toEqual(expectedHash);
  });
});