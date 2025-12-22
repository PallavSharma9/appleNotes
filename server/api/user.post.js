// /api/user POST

import prisma from "~/server/db/prisma";
import { readBody, defineEventHandler } from "h3";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  try {
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
  } catch (error) {
    console.log(error.code);

    if (error.code === "P2002") {
      throw createError({
        statusCode: 409,
        message: "An email with this address already exists.",
      });
    }

    throw error;
  }
});
