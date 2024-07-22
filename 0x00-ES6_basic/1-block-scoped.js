export default function taskBlock(trueOrFalse) {
  // Declare task and task2 using let so they are block-scoped
  let task = false;
  let task2 = true;

  // If trueOrFalse is true, the variables inside this block will be separate
  if (trueOrFalse) {
    // These task and task2 are block-scoped and will not overwrite the outer variables
    let task = true;
    let task2 = false;
  }

  // Return the outer task and task2, which are not affected by the inner block
  return [task, task2];
