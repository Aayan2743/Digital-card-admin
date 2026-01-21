export const setFavicon = (href) => {
  let link =
    document.querySelector("link[rel~='icon']") ||
    document.createElement("link");

  link.rel = "icon";
  link.href = href;
  document.head.appendChild(link);
};

export const resetFavicon = () => {
  setFavicon("/favicon-default.ico");
};
