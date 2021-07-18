import React from "react";

// load react components lazily through code splitting
const Home = React.lazy(() => import("./pages/home/Home.js"));
const VideoLink = React.lazy(() => import("./pages/videolink/VideoLink.js"));
const Profile = React.lazy(() => import("./pages/profile/Profile.js"));

// set path for every page
const routes = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/pages/home", name: "Home", component: Home },
  { path: "/pages/videolink/:videoId", name: "VideoLink", component: VideoLink },
  { path: "/pages/profile", name: "Profile", component: Profile },
];

export default routes;
