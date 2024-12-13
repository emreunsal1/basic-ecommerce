import React, { useState } from "react";
import Search, { SEARCH_VARIANTS } from "./Search";
import PortfeilLogo from "../assets/Portfeil.svg";
import ProfileLogo from "../assets/Profile.svg";
import HeaderMenuItem from "./HeaderMenuItem";

export default function Header() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="logo-wrapper">Eteration</div>
        <div className="search-wrapper">
          <Search
            value={searchText}
            placeholder="Search"
            variant={SEARCH_VARIANTS.PRIMARY}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
        <div className="menu-wrapper">
          <HeaderMenuItem
            logo={PortfeilLogo}
            content={"117.000₺"}
            className="portfeil"
          />
          <HeaderMenuItem
            logo={ProfileLogo}
            content={"Kerem"}
            className="profile"
          />
        </div>
      </div>
    </div>
  );
}
