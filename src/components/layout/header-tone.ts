"use client";

import { createContext, useContext } from "react";

// Whether the header is white (case studies, or any page once it scrolls), so the logo, links,
// menu button, and Services menu use their dark-on-white versions. Set by HeaderShell.
export const HeaderLightContext = createContext(false);

export const useHeaderLight = () => useContext(HeaderLightContext);
