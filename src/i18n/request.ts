import { getRequestConfig } from "next-intl/server";
// @ts-nocheck
export default getRequestConfig(async ({ locale }) => {
  let messages;
  switch (locale) {

    default: messages = (await import("../../messages/en.json")).default; break;
  }
  return { locale, messages };
});
