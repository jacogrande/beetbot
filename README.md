## beetbot

To get this thing running:

- Clone the repo
- Install the necessary dependencies with `yarn (or the pm of your choice) install`
- Add your bot config to a project root level `.env` file
- Register the required commands with `yarn register`
- Build the project with `yarn tsc`
- Add the bot to your [pm2](https://github.com/Unitech/pm2) instance with `pm2 start dist/src/index.js`
