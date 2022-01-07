const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
var url = require("url");
const SpotifyWebApi = require("spotify-web-api-node");

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: req.originalUrl,
  });
}

router.get("/Rain", function (req, res) {
  res.sendFile(path.join(__dirname + "../../client/rain.html"));

  console.log("running.....");
  var login = fullUrl(req);
  var split = login.split("=");

  console.log(split[1]);
  const code = split[1];
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/Rain",
    clientId: "4bf962724ce24264a53a9c6b3c712c35",
    clientSecret: "f77fc9d225bc4d5daf5deccda08e7d24",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      console.log("data.body.access_token: " + data.body.access_token);
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
  //__dirname : It will resolve to your project folder.
});

module.exports = router;
