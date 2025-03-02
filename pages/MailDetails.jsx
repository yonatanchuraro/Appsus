const { useParams, useNavigate, NavLink } = ReactRouterDOM;
import { mailService } from "../services/mail.service.js";

const { useEffect, useState } = React;

export function MailDetails() {
  const [mail, setMail] = useState(null);
  const { mailId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadMail();
  }, [mailId]);

  function loadMail() {
    mailService.get(mailId).then((mail) => {
      if (!mail) {
        navigate(`/mail`);
        return;
      }

      if (!mail.isRead) {
        const updatedMail = { ...mail, isRead: true };
        mailService.update(updatedMail).then(() => setMail(updatedMail));
      } else {
        setMail(mail);
      }
    });
  }

  if (!mail) return <div>Loading...</div>;

  return (
    <section className="mail-details">
      <h1>{mail.subject}</h1>
      <h2>{mail.from}</h2>
      <p>{mail.body}</p>
      <button>
        <NavLink to="/mail">Back</NavLink>
      </button>
    </section>
  );
}
