<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-React_Native-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-NodeJS-black?style=for-the-badge&logoColor=white&logo=node&color=green" alt="node" />
    <img src="https://img.shields.io/badge/MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=green" alt="mongodb" />
   <img src="https://img.shields.io/badge/Express Handlebars-white?style=for-the-badge&logoColor=white&logo=express&color=black" alt="express" />
   
  </div>
  <h3 align="center">Email Campaign Scheduler</h3>
</div>


## <a name="introduction">🤖 Introduction</a>
 <div>
<p>
1. Email Scheduling: Node cron to schedule email delivery.

2. Email Sending: Use of nodemailer & SMTP to send emails at the scheduled time.

Campaign Listing API: Lists all campaigns with status – pending, sent, or failed.
</p>
  
</div>


## 🛠️ Tech Stack

- **Backend**: NodeJS
- **Frontend**: HTML , CSS , Express-handlebars
- **Database**: MongoDB
- **Email schedule**: Cron   , Nodemailer



## 📦 Installation

### Prerequisites
- Node.js 18+


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
