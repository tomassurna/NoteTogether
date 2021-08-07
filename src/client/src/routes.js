import React from "react";

// load react components lazily through code splitting
const Home = React.lazy(() => import("./pages/home/Home.js"));
const VideoLink = React.lazy(() => import("./pages/videolink/VideoLink.js"));
const Profile = React.lazy(() => import("./pages/profile/Profile.js"));
const About = React.lazy(() => import("./pages/about/About.js"));

// set path for every page
const routes = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/pages/home", name: "Home", component: Home },
  {
    path: "/pages/videolink/:videoId",
    name: "VideoLink",
    component: VideoLink,
    width100: true,
  },
  { path: "/pages/profile", name: "Profile", component: Profile },
  { path: "/pages/aboutUs", name: "About", component: About },
];

export default routes;
