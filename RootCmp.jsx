const { Route, Routes } = ReactRouterDOM;
const Router = ReactRouterDOM.HashRouter;

import { AppHeader } from "./cmps/AppHeader.jsx";
import { UserMsg } from "./cmps/UserMsg.jsx";
import { About } from "./pages/About.jsx";
import { Home } from "./pages/Home.jsx";
import { MailDetails } from "./pages/MailDetails.jsx";
import { MailIndex } from "./pages/MailIndex.jsx";
import { SideNav } from "./cmps/SideNav.jsx";

export function RootCmp() {
  return (
    <Router>
      <section className="root-cmp">
        <AppHeader />
        {/* <div className="main-container"> */}
        {/* <SideNav /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/mail" element={<MailIndex />}>
            <Route path="/mail/:mailId" element={<MailDetails />} />
          </Route> */}
          <Route path="/mail" element={<MailIndex />} />
          <Route path="/mail/:mailId" element={<MailDetails />} />
          <Route path="/mail" element={<SideNav />} />
        </Routes>
        <UserMsg />
        {/* </div> */}
      </section>
    </Router>
  );
}
