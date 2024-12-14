import React, { useState } from "react";
import Search, { SEARCH_VARIANTS } from "./Search";
import PortfeilLogo from "../assets/Portfeil.svg";
import ProfileLogo from "../assets/Profile.svg";
import HeaderMenuItem from "./HeaderMenuItem";
import { useSearchContext } from "../context/searchContext";
import { useBasketContext } from "../context/basketContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { totalPrice } = useBasketContext();
  const { setSearchText, searchText } = useSearchContext();
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="logo-wrapper" onClick={() => navigate("/")}>
          Eteration
        </div>
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
            content={totalPrice + "₺"}
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
