import { Language } from "@/lib/i18n/settings";

export type LanguageParams = {
  lang: Language;
};

export type PageProps<ParamsType> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any> & Promise<ParamsType>;
};

export type LanguagePageProps = PageProps<LanguageParams>;
