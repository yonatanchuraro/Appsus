import { MailDetails } from "../pages/MailDetails.jsx";
const { Link, useOutletContext } = ReactRouterDOM;
export function MailList() {
  const { mails, onRemoveMail, onReadMail, onStared } = useOutletContext();
  if (!mails.length) return <div>אין מיילים</div>;

  return (
    <ul className="mail-list">
      {mails
        .filter((mail) => !mail.isSent)
        .map((mail) => (
          <li
            key={mail.id}
            className={`mail-item ${mail.isRead ? "" : "unread"}`}
          >
            <button onClick={() => onStared(mail.id)}>
              {mail.isStared ? (
                <span className="material-icons-outlined ">star</span>
              ) : (
                <span className="material-symbols-outlined">star</span>
              )}
            </button>
            <Link to={`/mail/${mail.id}`} className="mail-list">
              <div className="mail-info">
                <span className="mail-from">{mail.from}</span>
                <span className="mail-subject">{mail.subject}</span>

                <span className="mail-date">
                  {new Date(mail.sentAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
            <div className="mail-actions">
              <button onClick={() => onRemoveMail(mail.id)}>
                <span className="material-symbols-outlined">delete</span>
              </button>
              <button onClick={() => onReadMail(mail.id)}>
                {mail.isRead ? (
                  <span className="material-symbols-outlined">drafts</span>
                ) : (
                  <span className="material-symbols-outlined">
                    mark_as_unread
                  </span>
                )}
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
}
