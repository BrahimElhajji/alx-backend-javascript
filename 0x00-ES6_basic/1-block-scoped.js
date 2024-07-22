export default function taskBlock(trueOrFalse) {
  const task = false;
  const task2 = true;

  /* If trueOrFalse is true, the variables inside this block will be separate */
  if (trueOrFalse) {
    const task = true;
    const task2 = false;
  }
  /* Return the outer task and task2, which are not affected by the inner block */

  return [task, task2];
}
