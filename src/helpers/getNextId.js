// find next available id in list
export default function getNextId(list) {
  if (!Array.isArray(list))
    throw new Error(`${list} is not array: it's ${typeof list}`);
  return list.length === 0 ? 0 : list[list.length - 1] + 1;
}
