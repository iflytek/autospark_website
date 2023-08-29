// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  // url: 'https://your-docusaurus-test-site.com',
  // // Set the /<baseUrl>/ pathname under which your site is served
  // // For GitHub pages deployment, it is often '/<projectName>/'
  // baseUrl: '/',
  url: 'https://iflytek.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/autospark_website/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'My Site',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          // {
          //   type: 'localeDropdown',
          // },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
// // @ts-check
// // Note: type annotations allow type checking and IDEs autocompletion

// const lightCodeTheme = require('prism-react-renderer/themes/github');
// const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// /** @type {import('@docusaurus/types').Config} */
// const config = {
//   title: 'AutoSpark',
//   tagline: "Kubernetes-kernel-based cloud os! Let's autoSpark run kubernetes",
//   favicon: 'img/favicon.ico',

//   // Set the production url of your site here
//   // url: 'https://your-docusaurus-test-site.com',
//   // // Set the /<baseUrl>/ pathname under which your site is served
//   // // For GitHub pages deployment, it is often '/<projectName>/'
//   // baseUrl: '/',
//   url: 'https://iflytek.github.io',
//   // Set the /<baseUrl>/ pathname under which your site is served
//   // For GitHub pages deployment, it is often '/<projectName>/'
//   baseUrl: '/autospark_website/',

//   // GitHub pages deployment config.
//   // If you aren't using GitHub pages, you don't need these.
//   organizationName: 'iflytek', // Usually your GitHub org/user name.
//   projectName: 'AutoSpark', // Usually your repo name.

//   onBrokenLinks: 'warn',
//   onBrokenMarkdownLinks: 'warn',

//   // Even if you don't use internalization, you can use this field to set useful
//   // metadata like html lang. For example, if your site is Chinese, you may want
//   // to replace "en" with "zh-Hans".
//   i18n: {
//     defaultLocale: "en",
//     locales: ["en", "zh-Hans"],
//     // path: "../autospark/i18n"
//   },

//   presets: [
//     [
//       'classic',
//       /** @type {import('@docusaurus/preset-classic').Options} */
//       ({
//         docs: {
//           path: "./docs/autospark/docs",
//           sidebarPath: require.resolve('./sidebars.js'),
//           // Please change this to your repo.
//           // Remove this to remove the "edit this page" links.
//           editUrl: ({ versionDocsDirPath, docPath, locale }) =>
//             "https://github.com/iflytek/autospark_website/tree/zqwu/docs/autospark/" +
//             (locale === "en" ? `${versionDocsDirPath}` : `i18n/${locale}`) +
//             `/${docPath}`,
//           editLocalizedFiles: false,
//           editCurrentVersion: false,
//         },
//         blog: {
//           path: "./docs/blog",
//           showReadingTime: true,
//           // Please change this to your repo.
//           // Remove this to remove the "edit this page" links.
//           editUrl:
//             'https://github.com/iflytek/autospark_website/tree/zqwu/docs/',
//           editLocalizedFiles: true,
//         },
//         theme: {
//           customCss: require.resolve('./src/css/custom.css'),
//         },
//       }),
//     ],
//   ],

//   themeConfig:
//     /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
//     ({
//       // Replace with your project's social card
//       image: 'img/docusaurus-social-card.jpg',
//       navbar: {
//         title: '',
//         logo: {
//           alt: 'AutoSpark',
//           //logo图片
//           src: "img/sealos-left.png",
//           //logo图片(带文字)
//           srcDark: "img/sealos-left-dark.png",
//         },
//         items: [
//           {
//             type: "doc",
//             docId: "Intro",
//             position: "left",
//             label: "Docs",
//             to: "/docs/Intro"
//           },
//           {
//             position: "left",
//             to: "https://cloud.sealos.io",
//             label: "Start Now"
//           },
//           {
//             position: "left",
//             to: "https://www.wenjuan.com/s/UZBZJv9ToJ/#",
//             label: "Contact",
//           },
//           {
//             type: "localeDropdown",
//             position: "right",
//           },
//           {
//             href: "https://github.com/iflytek/autospark_website",
//             position: "right",
//             className: "header-github-link",
//             "aria-label": "GitHub repository",
//           },
//           // {
//           //   type: 'localeDropdown',
//           // },
//           // {
//           //   type: 'docSidebar',
//           //   sidebarId: 'tutorialSidebar',
//           //   position: 'left',
//           //   label: 'Tutorial',
//           // },
//           // {to: '/blog', label: 'Blog', position: 'left'},
//           // {
//           //   href: 'https://github.com/facebook/docusaurus',
//           //   label: 'GitHub',
//           //   position: 'right',
//           // },
//         ],
//       },
//       footer: {
//         //相关项目周边
//         style: 'dark',
//         links: [
//           {
//             title: "Product",
//             items: [
//               {
//                 label: "Laf",
//                 to: "https://github.com/labring/laf",
//               },
//               {
//                 label: "Sealfs",
//                 to: "https://github.com/labring/sealfs",
//               },
//               {
//                 label: "FastGPT",
//                 to: "https://github.com/labring/FastGPT",
//               }
//             ]
//           },
//           {
//             title: "Developer",
//             items: [
//               {
//                 label: "Contribute",
//                 to: "https://github.com/labring/sealos/blob/main/CONTRIBUTING.md",
//               }, {
  
//                 label: "Documentation",
//                 to: '/docs/Intro'
//               }
//             ]
//           },
//           {
//             title: "Support",
//             items: [
//               {
//                 label: "Forum",
//                 to: "https://forum.laf.run/",
//               },
//               {
//                 label: "Feedback",
//                 to: "https://github.com/labring/sealos/issues",
//               },
//               {
//                 label: "Company",
//                 to: "https://sealos.io/company",
//               },
//               {
//                 label: "Contact US",
//                 to: "https://www.wenjuan.com/s/UZBZJv9ToJ/#",
//               }
//             ]
//           }
//         ],
//         copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
//       },
//       prism: {
//         theme: lightCodeTheme,
//         darkTheme: darkCodeTheme,
//       },
//     }),
// };

// module.exports = config;
