// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkpWalF6MFlsaFpKQUtXREJmUG4zRDk5U0Q0NEt1QzJ3WmowNTJ6SW9WWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTElqMnRGNFdKejFFRjdGbUUzYWhOM1pXRFJlc3lZc1NMckdTS3g3MlFIVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtUE5UVHM0T1FWY1B6aFhhQk5tbGUxendONGlaR0t4UnR6akZhR2IzZEhvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyNmh1S0FNZFQyQzNQNFVzS1FhMkQxNEIza1VGSEZoeUFkRU1mcTJoY2lvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklDZFA2TGI0ZXB6ZVFib0lnMDVsNXJIZWNQOXNHY1dGRVg4ajRhbS9abFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imp1emUyZi9uMTJvNVJkYnRPYTZpaHJkeklHZEc0aFkyZ2ZiVEpPdmt5SG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ1BEQVgrV2gwU3hKcTRxVWdyOTFDWElrU3lwTWFaL3NDYXZ3cGRPVkhuZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSVNUdFJEOWNMMEZ5Y2RXUnhtU01FZzJmN2pLL25VdUlCM2ZsLzRTSG1VMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRrUTl6Q2hFTTZ2S3pBMWtCTUs3elp1SGlkQk81WEp4L21GNHlwMnN6NUFiSkRFSEk1L0U1M3NEOUVTVE9WeHMxLzVSR2pNU1lNdm1odGdQWkdKR0FnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ1LCJhZHZTZWNyZXRLZXkiOiJ3Y2ZjV1hMejhyTHVWVUFHb1I4S25FVldwYnBwS1RDMnRvTU01cjlROFZFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ2X2daQktXSFF1S2tQMHhzODNXYkJnIiwicGhvbmVJZCI6ImNmOTdmNGQzLWNhMDEtNDllMi1hYjU2LTFjZGEyOTFlYmNmYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnWUw5Y1NHRkdCWGRmb0FTelBPYk5SZnNZa1k9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWnpYbEVCbjFrVFVpMkJWTVVpYlpVbTRNQjZVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkoyVFg1QTE4IiwibWUiOnsiaWQiOiIyNTQ3MDA2Mzk1MTg6NzBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoibTNtfsO4aiEifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0kzTzUxOFE1ZVdWdUFZWURDQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkU2UGVLTk8yVXhXTmdUOGkyLzcyNjlnVmsvQitkZFNCUHBSU3VnK0RXQTA9IiwiYWNjb3VudFNpZ25hdHVyZSI6InZVdHVWb1YyYWJuVGNkMW9YUjZ2RTFqN1RYcHRDaCtlZGE4VWpXbFFESGNFNy80a2xRRzFzcU0zVEZ4aTNqQm5KU1Zud01qNWVXYUQ2S2ZyeENSaUNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJYVFltWSt1TmF4d0Y4WndYUHNaL1craUdQcWlpSlNBMjdDU1FNektaR1JuNmFpa1duakhjaWNBZUNEVGlXbTRnaGJlUTFZOUdUaldwLzBqQWM3OWNEdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcwMDYzOTUxODo3MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJST2ozaWpUdGxNVmpZRS9JdHYrOXV2WUZaUHdmblhVZ1Q2VVVyb1BnMWdOIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI4NDEwMzU1fQ==",
  PREFIX: process.env.PREFIX || '.',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'false' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "©Baraka Bega",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "254700639518",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
