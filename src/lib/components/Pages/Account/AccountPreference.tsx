/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { URLs, getUrl } from "@/lib/constants/urls";
import { languageData, languages } from "@/lib/i18n/settings";
import { LanguageParams } from "@/lib/types/page";
import { RadioGroup, Select, SelectItem } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useParams, useRouter } from "next/navigation";
import { DarkTheme, LightTheme } from "@/utils/icons";
import dynamic from "next/dynamic";
import { usePreference } from "@/store/preference";
import { build_path } from "@/utils/common";

const ThemeRadio = dynamic(() => import("@/lib/components/Common/ThemeRadio"), {
  ssr: false,
});

const AccountPreference = ({ lang }: LanguageParams) => {
  const params = useParams();
  const router = useRouter();

  const { theme, setTheme } = useTheme();
  const { font, setFont } = usePreference();

  const organization = params.organization as string;

  const handleLanguageChange = (language: string) => {
    if (language) {
      document.cookie = `preferredLanguage=${language}; path=/`;
      router.push(
        getUrl(
          build_path(URLs.organization.settings.preferences, { organization }),
          language
        )
      );
    }
  };

  const setPreferredTheme = (theme: string) => {
    setTheme(theme);
    window.localStorage.setItem("preferred-theme", theme);
  };

  return (
    <div className="grid grid-cols-1 w-full gap-8 sm:px-6 py-3 max-sm:pt-0 max-w-[624px]">
      <div className="flex flex-col">
        <p className="text-base font-medium text-default-700 px-1">Theme</p>

        <p className="mb-2 text-sm font-normal text-default-400 px-1">
          Change the appearance of the web.
        </p>

        <RadioGroup
          aria-label="Theme"
          orientation="horizontal"
          value={theme}
          onValueChange={setPreferredTheme}
          classNames={{
            wrapper: "grid grid-cols-2 max-w-[624px] mt-3",
          }}
        >
          <ThemeRadio value="light">
            <div className="flex flex-col w-full justify-between relative">
              <p>Light</p>
              <div className="w-full absolute top-8">
                <LightTheme />
              </div>
            </div>
          </ThemeRadio>

          <ThemeRadio value="dark">
            <div className="flex flex-col w-full justify-between relative ">
              <p>Dark</p>
              <div className="w-full absolute top-8">
                <DarkTheme />
              </div>
            </div>
          </ThemeRadio>
        </RadioGroup>
      </div>

      <div className="flex md:flex-row flex-col md:justify-between md:items-center">
        <div className="flex flex-col">
          <p className="text-base font-medium text-default-700 px-1">
            Language
          </p>

          <p className="mb-2 text-sm font-normal text-default-400 px-1">
            Select your preferred language.
          </p>
        </div>

        <Select
          aria-label={"Language"}
          className="max-w-xs"
          size="lg"
          selectedKeys={new Set([lang])}
          classNames={{
            trigger:
              "bg-white dark:bg-default-100 group-data-[focus=true]:bg-white dark:group-data-[focus=true]:bg-default-100 shadow-none",
          }}
        >
          {languages.map((language) => (
            <SelectItem
              key={language}
              value={language}
              textValue={languageData[language].localName}
              onClick={() => handleLanguageChange(language)}
            >
              <div className="flex items-center gap-2">
                <div>{languageData[language].localName}</div>
              </div>
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex md:flex-row flex-col md:justify-between md:items-center">
        <div className="flex flex-col">
          <p className="text-base font-medium text-default-700 px-1">
            Font Size
          </p>

          <p className="mb-2 text-sm font-normal text-default-400 px-1">
            Adjust the chat font size.
          </p>
        </div>

        <Select
          aria-label={"Font Size"}
          size="lg"
          className="max-w-xs"
          classNames={{
            trigger:
              "bg-white dark:bg-default-100 group-data-[focus=true]:bg-white dark:group-data-[focus=true]:bg-default-100 shadow-none",
          }}
          selectedKeys={new Set([font])}
          onSelectionChange={(val) =>
            setFont(Array.from(val)[0].toString() as any)
          }
        >
          <SelectItem key={"Small"} value={"Small"}>
            Small
          </SelectItem>
          <SelectItem key={"Medium"} value={"Medium"}>
            Medium
          </SelectItem>
          <SelectItem key={"Large"} value={"Large"}>
            Large
          </SelectItem>
        </Select>
      </div>
    </div>
  );
};

export default AccountPreference;
