"use client";
import "@/app/Assets/images/logo.png";
import Image from "next/image";
import logo from "../../../Assets/images/logo.png";

export default function Navbar() {
  return (
    <>
      <div className="box-navigations">
        <div className="box-navbar">
          <div className="box-logo">
            <Image width={82} height={82} alt="" src={logo} loading="eager" fetchPriority="high"/>
          </div>
          <div className="box-perfil"></div>
        </div>
      </div>
    </>
  );
}
