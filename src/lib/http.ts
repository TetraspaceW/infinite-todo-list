export const serverError = (error: unknown) =>
  new Response(error instanceof Error ? error.message : String(error), {
    status: 500,
  });
