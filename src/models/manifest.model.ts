import { BundlesEnum } from "../enums/bundles.enum";

export const Manifest = {
  bundles: [
    {
      name: BundlesEnum.FONTS,
      assets: [
        {
          alias: "FiraGo",
          src: "assets/fonts/FiraGO-Regular.woff2",
        },
        {
          alias: "FiraGoSemiBold",
          src: "assets/fonts/FiraGO-SemiBold.woff2",
        },
        {
          alias: "FiraGoBold",
          src: "assets/fonts/FiraGO-Bold.woff2",
        },
      ],
    },
    {
      name: BundlesEnum.MAIN,
      assets: [
        {
          alias: "background",
          src: "assets/images/bg.jpg",
        },
      ],
    },
    {
      name: BundlesEnum.BUNDLE_1,
      assets: [
        {
          alias: "f22",
          src: "assets/images/f22.png",
        },
        {
          alias: "guy",
          src: "assets/images/guy.json",
        },
      ],
    },
  ],
};
