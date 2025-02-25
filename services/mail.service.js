import { utilService } from "../services/util.service.js";
import { storageService } from "../services/async-storage.service.js";

const MAIL_KEY = "mailDB";
_createMails();

export const mailService = {
  query,
  get,
  remove,
  save,
  sendMail,
  getReadStats,
  getSenderStats,
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

// // סטטיסטיקות
// function getReadStats() {
//   return storageService.query(MAIL_KEY).then((mails) => {
//     const readCount = mails.filter((mail) => mail.isRead).length;
//     const total = mails.length;
//     return { read: readCount, unread: total - readCount };
//   });
// }

// function getSenderStats() {
//   return storageService.query(MAIL_KEY).then((mails) => {
//     const senderCountMap = _getMailCountBySenderMap(mails);
//     const data = Object.keys(senderCountMap).map((sender) => ({
//       title: sender,
//       value: Math.round((senderCountMap[sender] / mails.length) * 100),
//     }));
//     return data;
//   });
// }

// function _getMailCountBySenderMap(mails) {
//   const senderCountMap = mails.reduce((map, mail) => {
//     if (!map[mail.from]) map[mail.from] = 0;
//     map[mail.from]++;
//     return map;
//   }, {});
//   return senderCountMap;
// }
