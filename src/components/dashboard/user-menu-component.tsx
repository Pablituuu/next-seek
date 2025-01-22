import { Button } from "../ui/button";

interface UserMenuProps {
  onLogout: () => void;
}

/**
 * Presentational component for rendering the user menu.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onLogout - Function to handle logout action.
 */
function UserMenuComponent({ onLogout }: UserMenuProps) {
  return (
    <Button onClick={onLogout} variant="outline" className="mt-4 w-min">
      Logout
    </Button>
  );
}

export default UserMenuComponent;
