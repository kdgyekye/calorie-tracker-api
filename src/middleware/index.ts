"use strict";

import {validateAuthToken} from "../utils/verify-token"
import { AuthenticationError } from "apollo-server-express";
import models from "../models";

export async function __setContext({req}:any) {
  let context:any = {
    db: models,
  }
  if (req.headers.authorization) {
    let authorization:any = await validateAuthToken(req.headers.authorization)
    if (!authorization) throw new AuthenticationError("InvalidToken")
    const user = await models.User.findOne({ _id: authorization._id, 'tokens': req.headers.authorization })
    context.user = user
    context.token = req.headers.authorization
  }
  return context
}

export function __authenticateUser(fn:any) {
  return async function (_:any, args:any, context:any, info:any) {
    if (
      !context._user ||
      ![
        "ORCHESTRATOR",
        "ADMINISTRATOR",
        "USER"
      ].includes(context._role)
    )
      return new Error("PermissionDenied")
    return fn(_, args, context, info)
  }
}