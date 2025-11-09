import NotificationsDropdown, {
  mockNotifications,
} from "../notifications/NotificationsDropdown.jsx";

export { mockNotifications };

export default function ClientNotificationsDropdown(props) {
  return (
    <NotificationsDropdown
      {...props}
      allNotificationsPath="/notifications"
    />
  );
}
