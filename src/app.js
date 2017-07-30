import https from 'https';
import tinder from 'tinder';
import getAuthToken from './lib/get_auth_token';

const LIMIT = 10;

const client = new tinder.TinderClient();
getAuthToken().then(async userToken => {
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

  client.authorize(userToken, userId, () => {
    console.log(client.isAuthorized());
    // client.getRecommendations(LIMIT, (recomendationsError, { results }) => {
    //   if (recomendationsError) {
    //     console.error(recomendationsError);
    //   } else {
    //     console.log(results);
    //     results.forEach(({ _id }) => {
    //       client.like(_id, (likeError, data) => {
    //         if (likeError) {
    //           console.error(likeError);
    //         } else {
    //           console.log(data);
    //         }
    //       });
    //     });
    //   }
    // });
  });
});
