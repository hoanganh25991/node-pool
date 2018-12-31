export type ErrorFunc = (error: any, ...args: any[]) => any;
export type TaskFunc = (...args: any[]) => any;

export interface Task {
  taskFunc: TaskFunc;
  args: any[];
}

const Pool = (size: number, onError?: ErrorFunc) => {
  const taskPools: Task[] = [];
  let result: any[] = [];

  const execAndQueueNext = async (task: Task): Promise<any> => {
    const { taskFunc, args } = task;
    await Promise.resolve(taskFunc(...args))
      .then((data: any) => result.push(data))
      .catch((err: Error) => {
        result.push(err);
        onError && onError(err, ...args);
      });
    const nextTask = taskPools.splice(0, 1)[0];
    return nextTask && execAndQueueNext(nextTask);
  };

  return {
    push: (taskFunc: TaskFunc, ...args: any[]) => {
      const task = { taskFunc, args };
      taskPools.push(task);
    },
    idle: async (): Promise<any> =>
      Promise.all(
        taskPools //
          .splice(0, size)
          .map(task => execAndQueueNext(task)),
      ),
    resetResult: (): any[] => (result = []),
    getResult: (): any[] => result,
  };
};

export default Pool;
