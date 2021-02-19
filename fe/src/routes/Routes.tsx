import moment from "moment";
import React, { useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";

import { Header } from "../components/header/Header";
import { HelpPage } from "../components/HelpPage/HelpPage";
import { ZapierHelpPage } from "../components/HelpPage/ZapierHelpPage/ZapierHelpPage";
import { HomePage } from "../components/HomePage/HomePage";
import LoginPage, { LoginPagePath } from "../components/login/LoginPage";
import { LogoutPage } from "../components/LogoutPage/LogoutPage";
import { EditNotePage } from "../components/notes/EditNotePage/EditNotePage";
import {
  PrivacyPolicyPage,
  PrivacyPolicyPagePath,
} from "../components/PrivacyPolicyPage/PrivacyPolicyPage";
import SignupPage, {
  SignupPagePath,
} from "../components/SignupPage/SignupPage";
import {
  TermsOfServicePage,
  TermsOfServicePagePath,
} from "../TermsOfServicePage/TermsOfServicePage";

function getStartDate(date: Date, dateRangeValue: string) {
  switch (dateRangeValue) {
    // case "Before":
    //   return null;
    case "Since":
    case "Day":
      return moment(date).startOf("day").toDate();
    case "Fortnight":
    case "Week":
      return moment(date).startOf("week").toDate();
    case "Month":
      return moment(date).startOf("month").toDate();
    case "Quarter":
      return moment(date).startOf("quarter").toDate();
    case "Year":
      return moment(date).startOf("year").toDate();
    default:
      throw new Error(`Unexpected value: ${dateRangeValue}`);
  }
}

function getEndDate(date: Date, dateRangeValue: string) {
  const startDate = getStartDate(date, dateRangeValue);
  let momentToReturn = moment(startDate);
  switch (dateRangeValue) {
    // case "Since":
    //   return null;
    case "Before":
    case "Day":
      break;
    case "Week":
      momentToReturn = momentToReturn.endOf("week");
      break;
    case "Fortnight":
      momentToReturn = momentToReturn.add(2, "week");
      break;
    case "Month":
      momentToReturn = momentToReturn.endOf("month");
      break;
    case "Quarter":
      momentToReturn = momentToReturn.endOf("quarter");
      break;
    case "Year":
      momentToReturn = momentToReturn.endOf("year");
      break;
    default:
      throw new Error(`Unexpected value: ${dateRangeValue}`);
  }
  return momentToReturn.endOf("day").toDate();
}

export default function Routes() {
  const location = useLocation();

  const [date, setDate] = useState(moment().startOf("day").toDate());
  const [dateRangeValue, setDateRangeValue] = useState("Day");
  const [search, setSearch] = useState("");
  const [activeParentId, setActiveParentId] = useState<
    string | null | undefined
  >(null);

  const startDate = getStartDate(date, dateRangeValue);
  const endDate = getEndDate(date, dateRangeValue);

  let title = "";
  switch (location.pathname) {
    case TermsOfServicePagePath:
      title = "Terms of Service";
      break;
    case PrivacyPolicyPagePath:
      title = "Privacy Policy";
      break;
    case SignupPagePath:
    case LoginPagePath:
      title = "engram";
      break;
    case "/help":
    case "/help/zapier":
      title = "Help";
      break;
    default:
      break;
  }

  const handleDateChanged = (date: Date) => {
    setDate(date);
  };

  const handleDateRangeChanged = (dateRange: string) => {
    setDateRangeValue(dateRange);
  };

  const handleSearchSubmitted = (search: string) => {
    setSearch(search);
  };

  const handleWorkspaceSelected = (id: string | null | undefined) => {
    setActiveParentId(id);
  };

  return (
    <>
      <Header
        title={title}
        date={date}
        onDateChange={handleDateChanged}
        dateRangeValue={dateRangeValue}
        onDateRangeChange={handleDateRangeChanged}
        onSearchSubmit={handleSearchSubmitted}
        onWorkspaceSelected={handleWorkspaceSelected}
      />
      <Switch>
        <Route exact path="/">
          <HomePage
            dateRangeValue={dateRangeValue}
            date={date}
            startDate={startDate}
            endDate={endDate}
            search={search}
            activeParentId={activeParentId}
          />
        </Route>
        <Route exact path="/notes/:id">
          <EditNotePage />
        </Route>
        <Route exact path={LoginPagePath}>
          <LoginPage />
        </Route>
        <Route exact path={SignupPagePath}>
          <SignupPage />
        </Route>
        <Route exact path="/logout">
          <LogoutPage />
        </Route>
        <Route exact path="/help">
          <HelpPage />
        </Route>
        <Route exact path="/help/zapier">
          <ZapierHelpPage />
        </Route>
        <Route exact path={PrivacyPolicyPagePath}>
          <PrivacyPolicyPage />
        </Route>
        <Route exact path={TermsOfServicePagePath}>
          <TermsOfServicePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </>
  );
}
