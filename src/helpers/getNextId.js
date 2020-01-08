// find next available id in list
export default function getNextId(list) {
  if (!Array.isArray(list))
    throw new Error(`${list} is not array: it's ${typeof list}`);
  let nextId = -1;
  list.forEach(id => (nextId = Math.max(id, nextId)));
  nextId += 1;
  return nextId;
}
