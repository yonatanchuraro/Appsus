import { mailService } from "../services/mail.service.js";
const { useState } = React;
const { useNavigate } = ReactRouterDOM;

export function ComposeMail() {
  const [mail, setMail] = useState(
    mailService.getEmptyMail("", "", "user@appsus.com", "")
  );
  const navigate = useNavigate();

  function handleChange({ target }) {
    const { name, value } = target;
    setMail((prevMail) => ({ ...prevMail, [name]: value }));
  }

  function onSendMail(ev) {
    ev.preventDefault();
    mailService.sendMail(mail).then(() => {
      navigate("/mail/sent");
    });
  }

  return (
    <section className="compose-mail">
      <h2>כתיבת מייל חדש</h2>
      <form onSubmit={onSendMail}>
        <input
          type="text"
          name="to"
          value={mail.to}
          onChange={handleChange}
          placeholder="To"
          required
        />
        <input
          type="text"
          name="subject"
          value={mail.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
        />
        <textarea
          name="body"
          value={mail.body}
          onChange={handleChange}
          placeholder="Mail body "
        ></textarea>
        <button type="submit">שלח</button>
      </form>
    </section>
  );
}
