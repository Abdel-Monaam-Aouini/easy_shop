import expressJwt from "express-jwt";
import config from "../config.js";

function authJwt() {
  const { API_URL, secret } = config;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      {
        url: /\/api\/v1\/orders(.*)/,
        methods: ["GET", "OPTIONS", "POST"],
      },
      `${API_URL}/users/login`,
      `${API_URL}/users/register`,
    ],
  });

  async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
      done(null, true);
    }

    done();
  }
}

export default authJwt;
