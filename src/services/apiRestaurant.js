const API_URL = 'https://react-fast-pizza-api.onrender.com/api';

/** Makes API call to retrieve pizza menu data
 * @returns {Array.<object>}
 */
export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error('Failed getting menu');

  const { data } = await res.json();
  return data;
}

/** Takes in an order ID and returns data regarding that order
 * @param {Number} id The order ID
 * @returns {object}
 */
export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

/** Takes in ```order``` object and makes a POST request to the API to submit a new order.
 * @param {object} newOrder The new order to be added to API
 * @returns {object} Returns a new object with the order data and newly created order ID
 */
export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error('Failed creating your order');
  }
}

/** Takes in number and object to update a specific order by making a PATCH request to API
 * @param {Number} id The id of the order to be updated
 * @param {object} updateObj The object containing the updates to the order
 */
export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error('Failed updating your order');
  }
}
