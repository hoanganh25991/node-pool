import TestCases from './pool.test-cases';
import Pool from './../index';

describe('Unit Test "Pool"', () => {
  const { case1, case2, case3, case4 } = TestCases;

  beforeAll(() => {});
  afterAll(() => {});

  it(
    'Should queue item follow batch size [1]',
    async () => {
      const pool1 = Pool(case1.in.size);

      case1.in.arr.map(item => pool1.push(case1.in.taskFunc, item));
      await pool1.idle();

      expect(pool1.getResult()).toEqual(case1.expected.result);
    },
    case1.in.timeout,
  );

  it(
    'Should queue item follow batch size [2]',
    async () => {
      const pool2 = Pool(case2.in.size);

      case2.in.arr.map(item => pool2.push(case2.in.taskFunc, item));
      await pool2.idle();

      expect(pool2.getResult()).toEqual(case2.expected.result);
    },
    case2.in.timeout,
  );

  it(
    'Should queue item follow batch size [3]',
    async () => {
      const pool3 = Pool(case3.in.size);

      case3.in.arr.map(item => pool3.push(case3.in.taskFunc, item));
      await pool3.idle();

      expect(pool3.getResult()).toEqual(case3.expected.result);
    },
    case3.in.timeout,
  );

  it(
    'Should queue item follow batch size [4]',
    async () => {
      const pool4 = Pool(case4.in.size);

      case4.in.arr.map(item => pool4.push(case4.in.taskFunc, item));
      await pool4.idle();

      expect(pool4.getResult()).toEqual(case4.expected.result);
    },
    case4.in.timeout,
  );
});
