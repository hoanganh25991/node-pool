# Pool

When we have too much tasks in parallel, `pool` is simple way to queue & throttle tasks efficiently.

## Usage

Example: We have a lot urls to fetch data, doing ALL in parallel may hang our computer

Steps:

1. Decide pool's size. Ex: 5
2. Push async task & args into pool
3. Wait for pool idle & get result

```js
import Pool from '@bul/pool';

// Simple async task
const demoAsyncTask = url =>
  fetch(url)
    .then(res => res.text())
    .catch(err => console.log('[fetch][ERR]', err));

const urls = [
  'https://google.com', //
  'https://medium.com',
  'https://github.com' /* other urls */,
];

// Create pool
const pool = Pool(5);

// Push async task into pool
urls.map(url => pool.push(demoAsyncTask, url /* ALL args right after async func */));

// Wait for pool idle
await pool.idle();

// Get result after all async tasks done
const result = pool.getResult();
```
