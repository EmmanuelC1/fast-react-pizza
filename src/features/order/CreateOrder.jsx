import { useState } from 'react';
import { Form, redirect } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = str =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let&apos;s go!</h2>

      {/* Form is a React Router form component */}
      {/* <Form method='POST' action='/order/new'> */}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <div>
          {/* hidden input to also submit cart data coming from Redux */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button>Order now</button>
        </div>
      </Form>
    </div>
  );
}

// once Form is submitted React Router will call the action function behind the scene (just like the loader function)
// 'request' will be passed in to action func
export async function action({ request }) {
  const formData = await request.formData(); // formData() is a regular web API provided from the browser
  const data = Object.fromEntries(formData); // turn formData into object

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on', // check if priority checkbox is checked (result will be true/false not on/off)
  };

  const newOrder = await createOrder(order);

  // redirect function from React Router to navigate to new component/path. Can't use navigate as before because that is a hook and only can be used inside components and not functions
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
