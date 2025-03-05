import { utilService } from "../services/util.service.js";
import { storageService } from "../services/async-storage.service.js";

const MAIL_KEY = "mailDB";
_createMails();

export const mailService = {
  query,
  get,
  remove,
  save,
  update,
  sendMail,
  getEmptyMail,
  getDefaultFilter,
  getFilterFromSearchParams,
};

function query(filterBy = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {
    if (filterBy.subject) {
      const regExp = new RegExp(filterBy.subject, "i");
      mails = mails.filter((mail) => regExp.test(mail.subject));
    }
    if (filterBy.isRead !== undefined) {
      mails = mails.filter((mail) => mail.isRead === filterBy.isRead);
    }
    return mails;
  });
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId);
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId);
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail);
  } else {
    return storageService.post(MAIL_KEY, mail);
  }
}

function update(mail) {
  return storageService.put(MAIL_KEY, mail);
}

function sendMail(mail) {
  mail.sentAt = Date.now();
  mail.isRead = false;
  return save(mail);
}

function getEmptyMail(subject = "", body = "", from = "", to = "") {
  return {
    id: utilService.makeId(),
    createdAt: Date.now(),
    subject,
    body,
    isRead: false,
    isStared: false,
    isSent: false,
    sentAt: null,
    removedAt: null,
    from,
    to,
  };
}

function getDefaultFilter() {
  return { subject: "", isRead: "" };
}

function getFilterFromSearchParams(searchParams) {
  const subject = searchParams.get("subject") || "";
  const isRead = searchParams.get("isRead") || "";
  return { subject, isRead };
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY);
  if (!mails || !mails.length) {
    mails = [];
    mails.push(
      _createMail(
        "Miss you!",
        "Hey [שם], It feels like ages since we last talked! I just wanted to drop you a quick line to say I've been thinking about you and missing our chats. How have you been? Anything exciting happening in your world? Let's catch up soon. Maybe we can grab coffee or hop on a call? Talk to you later,",
        "momo@momo.com",
        "user@appsus.com"
      )
    );
    mails.push(
      _createMail(
        "Your  order is on the way",
        "Would love to catch up sometimes",
        "ali-exspres.com",
        "user@appsus.com"
      )
    );
    mails.push(
      _createMail(
        "Miss you!",
        "Would love to catch up sometimes",
        "momo@momo.com",
        "user@appsus.com"
      )
    );
    mails.push(
      _createMail(
        "Miss you!",
        "Would love to catch up sometimes",
        "momo@momo.com",
        "user@appsus.com"
      )
    );
    mails.push(
      _createMail(
        "Meeting Reminder",
        "Don't forget our meeting at 3 PM",
        "alice@example.com",
        "bob@example.com"
      )
    );
    mails.push(
      _createMail(
        "Project Update",
        "The project is progressing well",
        "manager@example.com",
        "employee@example.com"
      )
    );
    utilService.saveToStorage(MAIL_KEY, mails);
  }
}

function _createMail(subject, body, from, to) {
  const mail = getEmptyMail(subject, body, from, to);
  mail.id = utilService.makeId();
  return mail;
}
