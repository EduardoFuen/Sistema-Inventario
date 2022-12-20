
# Midas

Proyecto para gestión de inventarios con integración a shopify 
- **Productos**
- **Proveedores**
- **Compras**
- **Recepción**
- **Inventario**

------------
#### **Login**
[![](https://user-images.githubusercontent.com/66569273/208505923-89b9fe04-29ae-4655-8fcc-979c6ae84f12.png)](https://user-images.githubusercontent.com/66569273/208505923-89b9fe04-29ae-4655-8fcc-979c6ae84f12.png)

------------
##### **Dashboard** 

[![system](https://user-images.githubusercontent.com/66569273/208505495-aa408845-d30e-48ef-904b-8f8638b2cc45.png "system")](http://https://user-images.githubusercontent.com/66569273/208505495-aa408845-d30e-48ef-904b-8f8638b2cc45.png "system")

------------
##### **Products** 

[![](https://user-images.githubusercontent.com/66569273/208506357-d0d32492-f28e-4f45-98cd-31a9b4fd83be.png)](https://user-images.githubusercontent.com/66569273/208506357-d0d32492-f28e-4f45-98cd-31a9b4fd83be.png)

------------
##### **Suppliers** 

[![](https://user-images.githubusercontent.com/66569273/208506791-82ea3a0b-aaf2-4212-bb6f-7f093c292b70.png)](https://user-images.githubusercontent.com/66569273/208506791-82ea3a0b-aaf2-4212-bb6f-7f093c292b70.png)

------------
##### **Purchase** 

[![](https://user-images.githubusercontent.com/66569273/208507004-932c837c-2bf2-4151-abaa-76e352f8e1d9.png)](https://user-images.githubusercontent.com/66569273/208507004-932c837c-2bf2-4151-abaa-76e352f8e1d9.png)

------------
##### **Reception** 

[![](https://user-images.githubusercontent.com/66569273/208507208-b13ad7b5-cc2e-487a-9f41-f413d61ebba2.png)](https://user-images.githubusercontent.com/66569273/208507208-b13ad7b5-cc2e-487a-9f41-f413d61ebba2.png)

------------
##### **Inventory** 

[![](https://user-images.githubusercontent.com/66569273/208507371-b3fd85f0-2486-4935-978a-951ee4c11305.png)](https://user-images.githubusercontent.com/66569273/208507371-b3fd85f0-2486-4935-978a-951ee4c11305.png)


------------

## Project structure in folder

[![](https://user-images.githubusercontent.com/66569273/208508380-e3bb3bf9-bd47-4ec4-9329-84582dab4e66.png)](https://user-images.githubusercontent.com/66569273/208508380-e3bb3bf9-bd47-4ec4-9329-84582dab4e66.png)

------------


## Installation
###### package.json
    {
      "name": "midas",
      "version": "1.1.0",
      "homepage": "/",
      "private": true,
      "dependencies": {
        "@ant-design/colors": "^6.0.0",
        "@ant-design/icons": "^4.7.0",
        "@emotion/cache": "^11.9.3",
        "@emotion/react": "^11",
        "@emotion/styled": "^11",
        "@mui/lab": "^5.0.0-alpha.86",
        "@mui/material": "^5.8.4",
        "@mui/system": "^5.8.4",
        "@mui/x-date-pickers": "^5.0.0-alpha.6",
        "@react-pdf/renderer": "2.0.21",
        "@reduxjs/toolkit": "^1.8.2",
        "@types/file-saver": "^2.0.2",
        "amazon-cognito-identity-js": "^5.2.9",
        "axios": "^0.27.2",
        "date-fns": "^2.28.0",
        "file-saver": "^2.0.5",
        "firebase": "^9.8.3",
        "formik": "^2.2.9",
        "framer-motion": "^4.1.17",
        "history": "^5.3.0",
        "lodash": "^4.17.21",
        "match-sorter": "^6.3.1",
        "react": "^17.0.2",
        "react-copy-to-clipboard": "^5.1.0",
        "react-device-detect": "^2.2.2",
        "react-dnd": "^15.1.1",
        "react-dnd-html5-backend": "^15.1.2",
        "react-dom": "^17.0.2",
        "react-intl": "^5.25.1",
        "react-number-format": "^4.9.3",
        "react-redux": "^7.2.6",
        "react-router-dom": "^6.3.0",
        "react-scripts": "^4.0.3",
        "react-syntax-highlighter": "^15.5.0",
        "react-table": "^7.8.0",
        "redux-persist": "^6.0.0",
        "simplebar": "^5.3.8",
        "stylis-plugin-rtl": "^2.1.1",
        "typescript": "^4.5.5",
        "web-vitals": "^2.1.4",
        "xlsx": "0.18.5",
        "yup": "^0.32.11"
      },
      "resolutions": {
        "@react-pdf/font": "2.2.1",
        "@react-pdf/pdfkit": "2.1.0"
      },
      "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build && compress-cra -c /path/to/configfile",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
      },
      "eslintConfig": {
        "extends": [
          "react-app",
          "react-app/jest"
        ]
      },
      "babel": {
        "presets": [
          "@babel/preset-react"
        ]
      },
      "browserslist": {
        "production": [
          ">0.2%",
          "not dead",
          "not op_mini all"
        ],
        "development": [
          "last 1 chrome version",
          "last 1 firefox version",
          "last 1 safari version"
        ]
      },
      "devDependencies": {
        "@babel/core": "^7.18.5",
        "@types/lodash": "^4.14.182",
        "@types/react-copy-to-clipboard": "^5.0.2",
        "@types/react-dom": "^17.0.11",
        "@types/react-syntax-highlighter": "^15.5.2",
        "@types/react-table": "^7.7.12",
        "@typescript-eslint/eslint-plugin": "4.4.1",
        "@typescript-eslint/parser": "^4.24.0",
        "eslint": "^7.27.0",
        "eslint-config-prettier": "^8.5.0",
        "eslint-config-react-app": "6.0.0",
        "eslint-plugin-flowtype": "^5.7.2",
        "eslint-plugin-import": "^2.26.0",
        "eslint-plugin-jsx-a11y": "^6.5.1",
        "eslint-plugin-prettier": "^4.0.0",
        "eslint-plugin-react": "^7.30.0",
        "@types/webpack-env": "^1.17.0",
        "eslint-plugin-react-hooks": "^4.6.0",
        "prettier": "^2.7.1",
        "compress-create-react-app": "^1.3.1"

      }
    }
    
#### Installing Packages

Please navigate to project directory with command line and use one of the commands below.

`yarn install o yarn`

------------


#### Starting Project

Runs the app in development mode. Open ```http://localhost:3000``` to view it in the browser.


The page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

 `yarn start`

------------


### Creating a Production Build

Builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed.

`yarn build`

------------


### Deployed S3 Build

[S3 - midas-front](https://s3.console.aws.amazon.com/s3/buckets/midas-front?region=sa-east-1&tab=objects "S3 - midas-front")

------------


### CloudFront 
[https://dvccr31c6r8ly.cloudfront.net/dashboard](https://us-east-1.console.aws.amazon.com/cloudfront/v3/home?region=sa-east-1#/distributions/E130IZ3YYAKHQL "https://dvccr31c6r8ly.cloudfront.net/dashboard")

###End