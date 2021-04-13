# Database Module

## Usage

```js
const setupDatabase = require('metrics-monitor-db');

setupDatabase(config)
  .then((db) => {
    const { Agent, Metric } = db;
  })
  .catch((err) => console.error(err));
```
