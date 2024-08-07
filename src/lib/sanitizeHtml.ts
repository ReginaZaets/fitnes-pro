export const sanitizeHtml = (htmlString: string) => {
  return htmlString
    .replace("&lt;", "<")
    .replace(">", "&gt;")
    .replace('"', "&quot;");
};
