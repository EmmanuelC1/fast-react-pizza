import { useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type={'primary'}>Make Priority</Button>
    </fetcher.Form>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params }) {
  const updatedData = { priority: true };
  await updateOrder(params.orderId, updatedData);

  return null;
}

export default UpdateOrder;
