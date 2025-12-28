import jwt from "jsonwebtoken";
import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const id = Number(getRouterParam(event, "id"));

    const token = parseCookies(event).NoteNestJWT;
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Not authorized to update",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const noteTryingToUpdate = await prisma.note.findUnique({
      where: { id },
    });

    if (!noteTryingToUpdate) {
      throw createError({
        statusCode: 404,
        statusMessage: "Note does not exist",
      });
    }

    if (noteTryingToUpdate.userId !== decodedToken.id) {
      throw createError({
        statusCode: 401,
        statusMessage: "Permission denied",
      });
    }

    await prisma.note.update({
      where: { id },
      data: {
        text: body.updatedNote,
      },
    });
  } catch (error) {
    throw error;
  }
});
