import tinder from 'tinder';
import { FB_USER_ID, FB_USER_TOKEN } from './fb_credentials';

const LIMIT = 100;

const client = new tinder.TinderClient();

client.authorize(FB_USER_TOKEN, FB_USER_ID, () => {
  client.getRecommendations(LIMIT, (error, { results }) => {
    results.forEach(({ _id }) => {
      client.like(_id, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
        }
      });
    });
  });
});
