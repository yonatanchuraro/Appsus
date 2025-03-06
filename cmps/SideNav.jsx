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
          <Link to="compose">
            <span className="material-symbols-outlined">edit</span> Compose
          </Link>
        </li>
        <li>
          <Link to="inbox">
            <span className="material-symbols-outlined">inbox</span> Inbox (
            {unreadCount})
          </Link>
        </li>
        <li>
          <Link to="stared">
            <span className="material-symbols-outlined">star</span> Starred
          </Link>
        </li>
        <li>
          <Link to="sent">
            <span className="material-symbols-outlined">send</span> Sent
          </Link>
        </li>
      </ul>
    </nav>
  );
}
