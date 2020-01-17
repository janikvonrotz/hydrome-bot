# HydroMeBot

Hydro;eBot is a Telegram bot that reminds you to water your plants. It runs as a serverless function on [Now](https://zeit.co/download), uses [RedisLabs](https://app.redislabs.com/) to store its state and utilizes [GitHub Actions](https://github.com/features/actions) to schedule reminders.

Telegram link: [t.me/HydroMeBot](https://t.me/HydroMeBot)

## Setup

Register a new Telegram bot with BotFather.

Create a RedisLabs database.

Clone this repo and rename it.

Create an `.env` file with these variables:

```
TELEGRAM_TOKEN=<your telegram bot token goes here>
REDIS_URI=redis://<password>@<host>:<port>/0
```

Export these variables to your current session.

`export $(cat .env | xargs)`

Set these variables as now secrets.

```
now secrets add hydrome_bot_telegram_token $TELEGRAM_TOKEN
now secrets add hydrome_bot_redis_uri $REDIS_URI
```

Deploy with now.

`now --prod`

Then set the Telegram bot wehook with curl.

`curl https://api.telegram.org/bot$TELEGRAM_TOKEN/setWebhook?url=<your deployment url goes here>/api`

Test the bot by writing `/start`.

### GitHub Action

The `send-notifications.js` script is used by GitHub Action to schedule reminder notifications. See `.github/workflows/cron.yml` for details.

The runner authenticates with the Telegram token. In order to enable GitHub Action for your cloned repo you must add the Telegram token as a repo secret.

Further change the static url in `script/job-notifications.js`.

## Troubleshooting

Check status of the webhook.

`curl https://api.telegram.org/bot$TELEGRAM_TOKEN/getWebhookInfo`
