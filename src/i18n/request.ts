import { getRequestConfig } from "next-intl/server";
// Static imports: Cloudflare edge builds cannot resolve runtime dynamic imports.
import en from "../../messages/en/common.json";
import ar from "../../messages/ar/common.json";
import es from "../../messages/es/common.json";
import fr from "../../messages/fr/common.json";

const MESSAGES: Record<string, typeof en> = { en, ar, es, fr };

export default getRequestConfig(async ({ locale }) => {
  const key = String(locale);
  const messages = MESSAGES[key] ?? en;
  return { locale: key, messages };
});
