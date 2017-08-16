import https from 'https';
import tinder from 'tinder';
import moment from 'moment';

import getAuthToken from './lib/get_auth_token';
import log from './lib/log';

const LIMIT = 10;

const client = new tinder.TinderClient();
getAuthToken().then(async userToken => {
  console.log('Retrieving user id...');
  const userId = await (() =>
    new Promise(resolve => {
      const userIdUrl =
        'https://graph.facebook.com/v2.6/me?fields=id&access_token=';
      https.get(`${userIdUrl}${userToken}`, res => {
        res.setEncoding('utf8');
        let body = '';
        res.on('data', data => {
          body += data;
        });
        res.on('end', () => {
          const json = JSON.parse(body);
          resolve(json.id);
        });
      });
    }))();
  console.log('User id retrieved!');
    client.authorize(userToken, userId, () => {
      console.log('Retrieving recommendations...');
      client.getRecommendations(LIMIT, (recomendationsError, { results }) => {
        if (recomendationsError) {
          console.error(recomendationsError);
        } else {
          console.log('Recommendations retrieved!');
          console.log('Liking recommendations...');
          results.forEach(({ _id, name }) => {
            client.like(_id, (likeError, data) => {
              if (likeError) {
                // console.error(likeError);
                console.log(`Could not like ${name} (${_id})`);
              } else {
                if (data.likes_remaining) {
                  console.log(`Liked ${name} (${_id})!`);
                } else {
                  console.log(
                    `Could not like ${name} (${_id}), out of swipes.`
                  );
                }
              }
            });
          });
        }
      });
    });
});
