// /api/user POST

import prisma from "~/server/db/prisma";
import { readBody, defineEventHandler } from "h3";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const salt = await bcrypt.genSalt(10);
  const passwordhash = await bcrypt.hash(body.password, salt);

  await prisma.user.create({
    data: {
      email: body.email,
      password: passwordhash,
      salt: salt,
    },
  });
  console.log(body);
  return {
    data: "success",
  };
});
