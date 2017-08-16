import fs from 'fs';
const dir = './logs';

function log(data) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(`./logs/${Date.now()}.json`, data);
}

export default log;
