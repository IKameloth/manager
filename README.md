<div align="center" width="100%">
  <img src="/src/assets/images/autentia-logo.svg" alt="Autentia-Manager" width="50%" position="center">
</div>

<div align="center" width="100%">
  <img align="center" alt="shield" src="https://img.shields.io/static/v1?label=version&message=v1&color=informational"/>
  <img align="center" alt="shield" src="https://img.shields.io/static/v1?label=node&message=v16.13.0&color=green" />
  <img align="center" alt="shield" src="https://img.shields.io/static/v1?label=react&message=^17.0.2.0&color=brightgreen" />
</div>

# :large_blue_diamond: Autentia-Manager
> Autentia-Manager this App has been made from Innovation Area of Autentia. It is currently in the dev stage of a second version that absorbs the predecessor [_Autentia-Admin_](https://admin.autentia.io/) & [_Verify_](https://verify-dev.autentia.cl/).

> [_Autentia-Admin_](https://admin.autentia.io/) it was mainly released to control and manage Autentia resources using SOAP services through CGI's. <br/>
> [_Verify_](https://verify-dev.autentia.cl/) is a web launched to perform identity verification using lector devices returning PDF files.

> Live demo [_Autentia-Manager_](https://autentia-admin-dev.autentia.io/login) (dev).

## Table of Contents
* [Technologies](#technologies)
* [Structure](#output-structure)
* [Plugins](#plugins)
* [Features](#features)
* [Setup](#setup)

## Technologies

<p align="left">
  :zap: FRONT <br/>
  <a href="https://developer.mozilla.org/es/docs/Web/HTML"><img alt="html" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /></a>
  <a href="https://developer.mozilla.org/es/docs/Web/CSS"><img alt="css" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /></a>
  <a href="https://developer.mozilla.org/es/docs/Web/JavaScript"><img alt="js" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /></a>
  <a href="https://es.reactjs.org/"><img alt="reactjs" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /></a>
  <a href="https://www.typescriptlang.org/"><img alt="ts" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /></a>
  <a href="https://mui.com/"><img alt="material-ui" src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" /></a>
</p>

<p align="left">
  :zap: BACK <br/>
  <a href="https://www.postgresql.org/"><img alt="pgsql" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /></a>
  <a href="https://go.dev/"><img alt="go" src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white" /></a>
  <a href="https://gorm.io/index.html">
    <img alt="gorm" src="https://avatars.githubusercontent.com/u/15127678?s=200&v=4" height="55" width="55"/>
  </a>
  <a href="https://github.com/gin-gonic/gin#gin-web-framework">
    <img alt="gin" src="https://raw.githubusercontent.com/gin-gonic/logo/master/color.png" height="60" width="45"/>
  </a>
</p>


## Output Structure

```shell
AUTENTIA-ADMIN/
├── k8s
│   ├── base
│   ├── dev
│   ├── prod
│   └── stg
├── public
│   ├── assets
│   │   └── i18n
│   │       └── translations
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   └── manifest.json
├── src
│   ├── app
│   │   ├── components
│   │   ├── helper
│   │   ├── pages
│   │   ├── routes
│   │   ├── store
│   │   ├── types
│   │   └── App.tsx
│   ├── assets
│   │   └── images
│   ├── config
│   │   └── environment.ts
│   ├── services
│   │   └── apiServices.ts
│   ├── index.tsx
│   └── react-app-env.ts
├── .env
├── .gitignore
├── .gitlab-ci.yml
├── Dockerfile
├── nginx.conf
├── package-lock.json
├── package.json
├── README.md
├── skaffold.yml
├── tsconfig.json
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
└── yarn.lock
```


## Plugins
<details>
<summary>:package: Dependencies</summary>

```json
"@material-ui/core": "^4.12.3",
"@material-ui/data-grid": "^4.0.0-alpha.37",
"@material-ui/icons": "^4.11.2",
"@material-ui/lab": "^4.0.0-alpha.60",
"@tanem/react-nprogress": "^3.0.47",
"@testing-library/jest-dom": "^4.2.4",
"@testing-library/react": "^9.3.2",
"@testing-library/user-event": "^7.1.2",
"@types/react-typing-animation": "^1.6.2",
"@webscopeio/react-health-check": "^3.0.0",
"framer-motion": "^4.1.8",
"i18next": "^19.8.2",
"i18next-xhr-backend": "^3.2.2",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-hook-form": "^7.19.3",
"react-hot-toast": "^2.1.1",
"react-i18next": "^11.7.3",
"react-redux": "^7.2.2",
"react-router-dom": "^5.2.0",
"react-scripts": "3.4.3",
"react-table": "^7.6.3",
"redux": "^4.0.5",
"redux-persist": "^6.0.0",
"redux-thunk": "^2.3.0",
"typescript": "^4.3.5",
"uuid": "^8.3.2"
```

</details>

## Features
:ok_hand: Already features:
- Register users 🗸
- Confirm user account 🗸
- Manage access roles 🗸
- Ban account 🗸
- Recover pass 🗸

Tested in: <br/>
<a href="https://www.google.com/"><img alt="chrome" src="https://img.shields.io/badge/Google_chrome-4285F4?style=for-the-badge&logo=Google-chrome&logoColor=white" /></a>

## Setup

**:nut_and_bolt: Runs the app in the development mode.<br />**
```shell
> yarn start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

:point_right: You must create user account through the [_API_](https://gitlab.endpoints.autentiax-ctl.cloud.goog/legacy-api/legacy-api). <br/>
:point_right: For communication with [_API_](https://gitlab.endpoints.autentiax-ctl.cloud.goog/legacy-api/legacy-api) we recommend <a href="https://www.postman.com/"><img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" alt="postman"></a>.

---

**:nut_and_bolt: Builds the app for production to the `build` folder.<br />**
```shell
> yarn build
```
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
