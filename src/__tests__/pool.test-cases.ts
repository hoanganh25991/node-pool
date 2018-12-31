const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time));
const bufferTime = 3000; // ms

// Time to complete base on item's value
const taskFunc = async (item: number) => {
  await delay(item * 1000);
  return item;
};

// complete-time in order
const arr = [1, 2, 3, 4, 5, 6];

// complete-time not ordered
const arr2 = [6, 5, 4, 4, 0, 1];

export = {
  case1: {
    in: {
      size: 3,
      arr,
      taskFunc,
      // 3s from first chunk
      // 6s from second chunk
      timeout: (3 + 6) * 1000 + bufferTime,
    },
    expected: {
      result: [1, 2, 3, 4, 5, 6],
    },
  },
  case2: {
    in: {
      size: 2,
      arr,
      taskFunc,
      // 2s from fist chunk
      // 4s from second chunk
      // 6s from third chunk
      timeout: (2 + 4 + 6) * 1000 + bufferTime,
    },
    expected: {
      result: [1, 2, 3, 4, 5, 6],
    },
  },
  case3: {
    in: {
      size: 3,
      arr: arr2,
      taskFunc,
      // 4s from first chunk
      // 4s from second chunk
      timeout: (4 + 4) * 1000 + bufferTime,
    },
    expected: {
      result: [4, 5, 0, 6, 1, 4],
    },
  },
  case4: {
    in: {
      size: 2,
      arr: arr2,
      taskFunc,
      // 6s from first chunk
      // 4s from second chunk
      // 1s from last chunk
      timeout: (6 + 4 + 1) * 1000 + bufferTime,
    },
    expected: {
      result: [5, 6, 4, 0, 4, 1],
    },
  },
};
