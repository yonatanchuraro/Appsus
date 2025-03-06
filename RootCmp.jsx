const { Route, Routes, Outlet, Navigate } = ReactRouterDOM;
const Router = ReactRouterDOM.HashRouter;
import { AppHeader } from "./cmps/AppHeader.jsx";
import { UserMsg } from "./cmps/UserMsg.jsx";
import { About } from "./pages/About.jsx";
import { Home } from "./pages/Home.jsx";
import { MailIndex } from "./pages/MailIndex.jsx";
import { MailDetails } from "./pages/MailDetails.jsx";
import { SideNav } from "./cmps/SideNav.jsx";
import { SentMails } from "./cmps/SentMails.jsx";
import { MailList } from "./cmps/MailList.jsx";
import { StaredMails } from "./cmps/StaredMails.jsx";
import { ComposeMail } from "./cmps/MailCompose.jsx";

export function RootCmp() {
  return (
    <Router>
      <section className="root-cmp">
        <AppHeader />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}

            <Route path="/mail" element={<MailIndex />}>
              <Route index element={<Navigate to="inbox" />} />
              <Route path="inbox" element={<MailList />} />
              <Route path="stared" element={<StaredMails />} />
              <Route path="sent" element={<SentMails />} />
              <Route path="compose" element={<ComposeMail />} />
              <Route path=":mailId" element={<MailDetails />} />
            </Route>
          </Routes>
        </div>
        <UserMsg />
      </section>
    </Router>
  );
}
