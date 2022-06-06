Sonyflake - A modern implementation [Sonyflake](https://github.com/sony/sonyflake) on TypeScript

| 📖 [Documentation](docs/) |
| ------------------------- |


## Installation

> **[Node.js](https://nodejs.org/) 10.16.0 or newer is required**

### Yarn

Recommended

```
yarn add sonyflake
```

### NPM

```
npm i sonyflake
```

## Example usage

```ts
import { Sonyflake, Epochs } from 'sonyflake';

const sonyflake = new Sonyflake({
  machineId: 2, // in range 2^16
  epoch: Date.UTC(2020, 4, 18, 0, 0, 0), // timestamp
});

const snowflake = sonyflake.nextId();

console.log(snowflake); // => "1211144891006978"

const deconstructSnowflake = sonyflake.deconstruct(snowflake);

console.log(deconstructSnowflake); // =>
// { timestamp: 1589832189861,
// 	machineId: 2,
// 	sequence: 0 }
```
