export interface INavigationItem {
  label: string;
  href: string;
}

export interface IConfig {
  navigation: INavigationItem[];
}

export default {
  navigation: [
    { label: "App", href: "/" },
    {
      label: "GitHub",
      href: "https://www.github.com/Stradi/screenshot",
    },
  ],
} as IConfig;
