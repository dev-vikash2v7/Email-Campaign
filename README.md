# Email Campaign Scheduler


## Setup

1. Clone repo
2. Install dependencies:

npm install


3. Set up `.env` from `.env.sample` (edit  your SMTP, MongoDB settings)
4. Start MongoDB locally
5. Run the server:

node app.js


6. Open http://localhost:3000

## MongoDB Schema

See `models/Campaign.js` for campaign schema with recipient list and statuses.
