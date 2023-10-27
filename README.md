
## Description

A React developed app to allow users to view articles, vote on those articles as well as sign in and comment on those articles. This app requires the accompanying back-end which after setting up can be used with your own app, or by default your local repository will connect to the default example back-end. This can be changed in `src/api/article-api.js` by altering the base-URL property of Axios.

## Back-end

The express driven back-end for this project can be found at:

https://github.com/Domaeos/BE_news


## Requirements

Minimum node version to run this app is: `v20.6.1`

## Setup

To run this app locally and test on your system you will need to do the following:

- Clone/Fork the project repository: `gh repo clone Domaeos/nc-news`
- Enter the cloned repository: `cd /nc-news`
- Install the dependencies: `npm i`

If testing with the default online repository you can skip these steps:
- Ensure your back-end of this repository is hosted/or running locally and copy the link
- Change `baseURL` to your back-end link in `./src/api/article-api.js`

- Use `npm run dev` to launch locally
- Follow the link provided by react in your command line: `http:/localhost:<PORT>`
- This project has no back-end authorisation for users - to test users simply add a valid username and any password. A valid username to test is: `tickle122` but usernames can be found at the link below, or alternatively the `api/users` of your own back-end

https://news-app-4jdh.onrender.com/api/users

If you decide to host a clone/fork of this repository the following Vite documentation can provide further information:

https://vitejs.dev/guide/static-deploy.html

