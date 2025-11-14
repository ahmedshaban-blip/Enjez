
import NotificationsDropdown from "../../common/notifications/NotificationsDropdown.jsx";
export default function ClientNotificationsDropdown(props) {
  return (
    <NotificationsDropdown
      {...props}
      allNotificationsPath="/notifications"
    />
  );
}
