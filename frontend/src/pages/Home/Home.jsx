import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const { user, dispatch } = useContext(AuthContext);

  console.log(user.username)
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed username={user.username}/>
        <Rightbar user={user} />
      </div>
    </>
  );
}
