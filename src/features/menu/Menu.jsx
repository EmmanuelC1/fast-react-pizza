import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';

import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// once Menu component is loaded, React Router will call this loader function
// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const menu = getMenu();
  return menu;
}

export default Menu;
