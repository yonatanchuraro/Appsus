import { MailDetails } from "../pages/MailDetails.jsx";
const { Link } = ReactRouterDOM;
export function MailList({ mails, onRemoveMail }) {
  // console.log(mails);

  return (
    <ul className="mail-list">
      {mails.map((mail) =>
        mail.isSent ? null : (
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
              <button>
                {/* <Link to={`/mail/${mail.id}`}>Details</Link>📩 */}
              </button>

              <button onClick={() => onRemoveMail(mail.id)}>
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>
          </li>
        )
      )}
    </ul>
  );
}
