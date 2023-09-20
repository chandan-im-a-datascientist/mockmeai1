import HttpError from '@wasp/core/HttpError.js'

export const getInterview = async ({ interviewId }, context) => {
  if (!context.user) { throw new HttpError(401); }

  const interview = await context.entities.Interview.findUnique({
    where: { id: interviewId },
    include: {
      questions: true,
      responses: true,
      user: true
    }
  });

  if (!interview) { throw new HttpError(404, 'No interview found with id ' + interviewId); }

  if (interview.user.id !== context.user.id) { throw new HttpError(400); }

  return interview;
}

export const getUserInterviews = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { user } = context;

  return context.entities.Interview.findMany({
    where: {
      user: { id: user.id }
    }
  });
}