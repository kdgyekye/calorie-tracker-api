import jwt from "jsonwebtoken"


export async function validateAuthToken(token:any) {
    return new Promise(
      function(resolve, reject) {
        jwt.verify(
          token,
          'c-t-user',
          function(err:any, payload:any) {
            if (err) reject(new Error("AuthorizationError"));
            resolve(payload);
          }
        );
      }
    );
  }