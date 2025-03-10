export default function pairArray(arr) {
    return arr.reduce((result, value, index, array) => {
        if (index % 2 === 0) {
          if (index + 1 < array.length) {
            result.push([value, array[index + 1]]);
          } else {
            result.push([value]);
          }
        }
        return result;
      }, []);
}