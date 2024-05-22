/** Takes in object to retrieve users address using an API call
 * @param {object} object Object that contains the ```latitude``` and  ```longitude``` properties to find corresponding address
 * @returns {object}
 */
export async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );
  if (!res.ok) throw Error('Failed getting address');

  const data = await res.json();
  return data;
}
