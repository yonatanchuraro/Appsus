const { useEffect, useState } = React;
const { Link } = ReactRouterDOM;

export function SideNav({ mails }) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (mails) {
      setUnreadCount(mails.filter((mail) => !mail.isRead).length);
    }
  }, [mails]);

  return (
    <nav className="side-nav">
      <ul>
        <li>
          <Link to="stared">stared</Link>
        </li>
        <li>
          <Link to="index">Index ({unreadCount})</Link>
        </li>
        <li>
          <Link to="sent">Sent</Link>
        </li>
      </ul>
    </nav>
  );
}
