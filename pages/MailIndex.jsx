const { Link } = ReactRouterDOM;
import { MailList } from "../cmps/MailList.jsx";
import { mailService } from "../services/mail.service.js";
import { SideNav } from "../cmps/SideNav.jsx";
const { useEffect, useState } = React;
const { useSearchParams } = ReactRouterDOM;

export function MailIndex() {
  const [mails, setMails] = useState(null);

  useEffect(() => {
    loadMails();
  }, []);

  function loadMails() {
    mailService
      .query()
      .then((mails) => {
        setMails(mails);
      })
      .catch((err) => {
        console.log("Error loading mails:", err);
      });
  }
  function onRemoveMail(mailId) {
    console.log(mailId);

    mailService
      .remove(mailId)
      .then(() => {
        setMails((mails) => mails.filter((mail) => mail.id !== mailId));
        showSuccessMsg(`mail (${mailId}) removed successfully!`);
        console.log(mails.length);
      })
      .catch((err) => {
        console.log("Problems removing car:", err);
      });
  }

  if (!mails) return <div>Loading...</div>;

  return (
    <section className="mail-index">
      <div className="nav">
        <SideNav mails={mails} />
      </div>
      <div className="mails">
        <MailList mails={mails} onRemoveMail={onRemoveMail} />
      </div>
    </section>
  );
}
