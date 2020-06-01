/**
 * Get unique values from an array based on the criteria provided
 * @param   {Array}   arr   Array of objects to filter from
 * @param   {String}  key   A string corresponding to a key from the objects
 * @returns {Array}         An array of values based on the provided key without duplicates          
 */

export const getUniqueValues = (arr, key) =>{
  return arr
            .reduce((acc, curr) => {
              acc.push(curr[key]);
              return acc;
            }, [])
            .filter((el, i, arr) => arr.indexOf(el) === i)
}

 /**
  * Get elements based on a criteria
  * @param    {Array}   arr   Array of objects to filter from
  * @param    {String}  key   A key from the objects
  * @param    {String}  value A string to match a key from the objects
  * @returns  {Array}         A copy of the array filtered by the matched key and value
  */

  export const getMatchingValues = (arr, key, value) => {
    return arr.filter(el => el[key] === value)
  }