// /api/user POST

import prisma from "~/server/db/prisma";
import { readBody, defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });
  console.log(body);
  return {
    data: "success",
  };
});
