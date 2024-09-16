export { default } from "next-auth/middleware";

export const config = {
  // :id* = zero or more params
  // :id+ = one or more params
  // :id? = zero or one
  matcher: ["/issues/new", "/issues/edit/:id+"],
};
