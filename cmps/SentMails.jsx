import { MailDetails } from "../pages/MailDetails.jsx";
const { Link, useOutletContext } = ReactRouterDOM;
export function SentMails() {
  const { mails, onRemoveMail } = useOutletContext();
  if (!mails) return <div>אין מיילים</div>;

  return (
    <ul className="mail-list">
      {mails
        .filter((mail) => mail.isSent)
        .map((mail) => (
          <li
            key={mail.id}
            className={`mail-item ${mail.isRead ? "" : "unread"}`}
          >
            <Link to={`/mail/${mail.id}`} className="mail-list">
              <div className="mail-info">
                <span className="mail-from">{mail.from}</span>
                <span className="mail-subject">{mail.subject}</span>
                <span className="mail-preview">
                  {mail.body.slice(0, 50)}...
                </span>
                <span className="mail-date">
                  {new Date(mail.sentAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
            <div className="mail-actions">
              <button onClick={() => onRemoveMail(mail.id)}>
                <span className="material-symbols-outlined">delete</span>
              </button>
              <button>
                <span className="material-symbols-outlined">star</span>
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
}
