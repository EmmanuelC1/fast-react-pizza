import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../services/apiRestaurant';
import { fetchAddress, getUser } from '../user/userSlice';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import store from '../../store';
import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector(getUser);
  const isLoadingAddress = addressStatus === 'loading';

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);

  // if Priority checked, then priorityPrice is 20% of cart price, otherwise its 0
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  // Hook to get access to data that is returned from action function (any form errors in this case)
  const formErrors = useActionData();

  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      {/* Form is a React Router form component */}
      {/* <Form method='POST' action='/order/new'> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-600">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-600">
                {errorAddress}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className="z-50 flex sm:absolute sm:right-[5px] sm:top-[3.5px] md:top-[5px]">
              <Button
                type={'small'}
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?{' '}
            <span className="text-sm font-normal text-stone-500">
              20% extra of total price
            </span>
          </label>
        </div>

        <div>
          {/* hidden input to also submit cart data, otherwise cart array does not get passed to action func */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ''
            }
          />

          <Button disabled={isSubmitting || isLoadingAddress} type={'primary'}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// once Form is submitted React Router will call the action function behind the scene (just like the loader function)
// 'request' will be passed in to action func
// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData(); // formData() is a regular web API provided from the browser
  const data = Object.fromEntries(formData); // turn formData into object

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (Object.keys(errors).length > 0) return errors; // return errors object, if any

  const newOrder = await createOrder(order); // place order

  store.dispatch(clearCart()); // hacky approach to clear cart, since we cant use any hooks outside components (don't overuse this technique)

  // redirect function from React Router to navigate to new component/path. Can't use navigate as before because that is a hook and only can be used inside components and not functions
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
