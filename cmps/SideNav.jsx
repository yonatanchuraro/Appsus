const { useEffect, useState } = React;
const { Link } = ReactRouterDOM;

export function SideNav({ mails }) {
  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
    if (mails) {
      setUnreadCount(getUnreadCount(mails));
    }
  }, [mails]);

  function getUnreadCount(mails) {
    return mails.filter((mail) => !mail.isRead).length;
  }
  return (
    <nav className="side-nav">
      <ul>
        <li>
          <Link to="/mail">Inbox ({unreadCount})</Link>
        </li>
      </ul>
    </nav>
  );
}
