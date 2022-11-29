import { createI18n } from "vue-i18n";
import en from "./en.json";
import tr from "./tr.json";

export const i18n = createI18n({
  locale: "en",
  messages: { en: en, tr: tr },
});
