# [Windster - Tailwind CSS Dashboard](https://demo.themesberg.com/windster/) [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&logo=twitter)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fthemesberg%2Fwindster-tailwind-css-dashboard&via=themesberg&text=Check%20out%20this%20open%20source%20Tailwind%20CSS%20dashboard)

[![version](https://img.shields.io/npm/v/@themesberg/windster-tailwind-css-dashboard)](https://www.npmjs.com/package/@themesberg/windster-tailwind-css-dashboard)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)
[![GitHub issues open](https://img.shields.io/github/issues/themesberg/windster-tailwind-css-dashboard.svg)](https://github.com/themesberg/windster-tailwind-css-dashboard/issues?q=is%3Aissue+is%3Aopen+)
[![GitHub issues closed](https://img.shields.io/github/issues-closed-raw/themesberg/windster-tailwind-css-dashboard.svg)](https://github.com/themesberg/windster-tailwind-css-dashboard/issues?q=is%3Aissue+is%3Aclosed)

[![Windster Tailwind CSS Dashboard](https://themesberg.s3.us-east-2.amazonaws.com/public/products/windster/og-image-new.jpg)](https://demo.themesberg.com/windster/)

Windster is a free and open-source Tailwind CSS admin dashboard layout featuring responsive sidebar layouts, authentication pages, charts, users, products pages and hundreds of Tailwind CSS components based on the [Flowbite component library](https://github.com/themesberg/flowbite) such as buttons, dropdowns, navbars, modals, datepickers, and more.

## Build with Tailwind CSS

The pages of this project have been built using only the utility classes from Tailwind CSS and you can continue working with Windster as with any other Tailwind CSS project as it uses the standard PostCSS configuration method together with purging classes as it is recommended.

## Components from Flowbite

Windster also uses the [open-source Tailwind CSS components from Flowbite](https://flowbite.com) including buttons, alerts, typography, dropdowns, navbars, and many more. These components also exclusively use the Tailwind CSS utility classes so there is no need to include any extra CSS into your project.

## Example pages

The open-source version of Windster comes with 5 application UI example pages including a main dashboard layout, a login page, a register page, a users page and a products page where there are also modals included for the CRUD actions.

## HUGO static site generator

We decided to use the HUGO static site generator system to build the HTML templates and also use JSON files as a source of data for some of the pages such as the products or users page. Of course you can adapt these templates to your own tech stack by extracting the HTML templates and the Webpack/POST CSS configuration files.

## Webpack module bundler

Windster uses Webpack to bundle assets and to watch for changes and tie together the compilation actions from HUGO and PostCSS. Feel free to customize the Webpack configuration file based on your needs. We also included a CSS minification feature when building for production.

## Workflow

This project uses the following tech stack:

- Tailwind CSS - utility-first CSS framework ([tailwindcss.com](https://tailwindcss.com/))
- Flowbite - component library for Tailwind CSS ([flowbite.com](https://flowbite.com))
- HUGO - static site generator ([gohugo.io](https://gohugo.io/))
- Webpack - module bundler ([webpack.js.org](https://webpack.js.org/))

## Table of Contents

* [Demo](#demo)
* [Quick Start](#quick-start)
* [Documentation](#documentation)
* [Folder Structure](#folder-structure)
* [Browser Support](#browser-support)
* [Resources](#resources)
* [Upgrade to PRO](#upgrade-to-pro)
* [Reporting Issues](#reporting-issues)
* [Technical Support or Questions](#technical-support-or-questions)
* [Licensing](#licensing)
* [Useful Links](#useful-links)

## Demo

| Dashboard | Users |
| --- | --- |
| [![Dashboard](https://themesberg.s3.us-east-2.amazonaws.com/public/products/windster/github/pages/homepage.jpg)](https://demo.themesberg.com/windster/) | [![Users](https://themesberg.s3.us-east-2.amazonaws.com/public/products/windster/github/pages/users.jpg)](https://demo.themesberg.com/windster/users/list/) |

| Products | Login |
| --- | --- |
| [![Products](https://themesberg.s3.us-east-2.amazonaws.com/public/products/windster/github/pages/products.jpg)](https://demo.themesberg.com/windster/e-commerce/products/) | [![Login](https://themesberg.s3.us-east-2.amazonaws.com/public/products/windster/github/pages/login.jpg)](https://demo.themesberg.com/windster/authentication/sign-in/) |

| Register | Components |
| --- | --- |
| [![Register](https://themesberg.s3.us-east-2.amazonaws.com/public/products/windster/github/pages/register.jpg)](https://demo.themesberg.com/windster/authentication/sign-up/) | [![Components](https://themesberg.s3.us-east-2.amazonaws.com/public/products/windster/github/pages/docs.jpg)](https://flowbite.com/docs/getting-started/introduction/) |

-   [Live Preview](https://demo.themesberg.com/windster/)
-   [Download from Themesberg](https://themesberg.com/product/tailwind-css/dashboard-windster)

## Quick start

1. Download from [Themesberg](https://themesberg.com/product/tailwind-css/dashboard-windster) or clone this repository
2. Download the project's zip
3. Make sure you have [Node.js](https://nodejs.org/en/) and [HUGO](https://gohugo.io/) installed.
4. Run the following command to install the project dependencies:

```
npm install
```

5. Run the development server:

```
npm run start
```

## Building the project

To build the final project files run the following command:

```
npm run build
```

The file will be available in the `.build/` folder.

## Documentation

Windster is first of all a project based on Tailwind CSS but it also uses Flowbite to enable more components, HUGO to generate static HTML files and Webpack for assets bundling.

- [Flowbite](https://flowbite.com/) (Tailwind CSS components)
- [Tailwind CSS](https://tailwindcss.com/) (main CSS framework)
- [HUGO](https://gohugo.io/) (static site generator)
- [Webpack](https://webpack.js.org/) (module bundler)

## Folder Structure

Within the download you'll find the following directories and files:

```
Windster Tailwind CSS Dashboard
.
├── LICENSE.md
├── README.md
├── _gh_pages
├── config.yml
├── content
├── data
├── layouts
├── node_modules
├── package-lock.json
├── package.json
├── postcss.config.js
├── resources
├── src
├── static
├── syntax.css
├── tailwind.config.js
├── temp
└── webpack.config.js
```

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">

## Resources
- Live demo: <https://demo.themesberg.com/windster/>
- Download: <https://themesberg.com/product/tailwind-css/dashboard-windster>
- License Agreement: <https://themesberg.com/licensing>
- Support: <https://themesberg.com/contact>
- Issues: [Github Issues Page](https://github.com/themesberg/windster-tailwind-css-dashboard/issues)

## Upgrade to Pro

If you like working with Windster and you would like to expand the number of pages and get access to a more advanced layout, kanban page, mailing application and 4 times more pages then check out [Windster Pro](https://demo.themesberg.com/windster-pro/) and check out the [differences between the two versions](https://demo.themesberg.com/windster/pricing/).

## Reporting Issues

We use GitHub Issues as the official bug tracker for Windster. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of Windster.
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.

## Technical Support or Questions

If you have questions or need help integrating the product please [contact us](https://themesberg.com/contact) instead of opening an issue.

## Licensing

- Copyright 2021 Themesberg (Crafty Dwarf LLC) (https://themesberg.com)
- Themesberg [license](https://themesberg.com/licensing#mit) (MIT License)

## Useful Links

- [Tailwind CSS themes](https://themesberg.com/templates/tailwind-css)
- [Affiliate Program](https://themesberg.com/affiliate)

##### Social Media

Twitter: <https://twitter.com/themesberg>

Facebook: <https://www.facebook.com/themesberg/>

Dribbble: <https://dribbble.com/themesberg>

Instagram: <https://www.instagram.com/themesberg/>
