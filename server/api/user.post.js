// /api/user POST

// Generate secret
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

import prisma from "~/server/db/prisma";
import { readBody, defineEventHandler } from "h3";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!validator.isEmail(body.email)) {
      throw createError({
        statusCode: 400,
        message: "Invalid email, please change",
      });
    }

    if (
      !validator.isStrongPassword(body.password, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      throw createError({
        statusCode: 400,
        message: "Password is not minimum 8 characters, please change.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordhash = await bcrypt.hash(body.password, salt);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: passwordhash,
        salt: salt,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    setCookie(event, "NoteNestJWT", token);

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
