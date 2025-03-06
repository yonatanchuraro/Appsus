const { Link } = ReactRouterDOM;
import { MailList } from "../cmps/MailList.jsx";
import { SentMails } from "../cmps/SentMails.jsx";
import { mailService } from "../services/mail.service.js";
import { SideNav } from "../cmps/SideNav.jsx";
const { useEffect, useState } = React;
const { useSearchParams, Outlet } = ReactRouterDOM;

export function MailIndex() {
  const [mails, setMails] = useState([]);

  useEffect(() => {
    loadMails();
  }, []);

  function loadMails() {
    mailService
      .query()
      .then((mails) => setMails(mails))
      .catch((err) => console.log("Error loading mails:", err));
  }

  function onRemoveMail(mailId) {
    mailService
      .remove(mailId)
      .then(() =>
        setMails((mails) => mails.filter((mail) => mail.id !== mailId))
      )
      .catch((err) => console.log("Error removing mail:", err));
  }
  function onReadMail(mailId) {
    setMails(
      mails.map((mail) =>
        mail.id === mailId ? { ...mail, isRead: !mail.isRead } : mail
      )
    );
    mailService.save(mailId);
  }
  function onStared(mailId) {
    setMails(
      mails.map((mail) =>
        mail.id === mailId ? { ...mail, isStared: !mail.isStared } : mail
      )
    );
    mailService.save(mailId);
  }

  if (!mails) return <div>Loading...</div>;

  return (
    <div className="mail-container">
      <SideNav mails={mails} />
      <div className="main-content">
        <Outlet context={{ mails, onRemoveMail, onReadMail, onStared }} />
      </div>
    </div>
  );
}
