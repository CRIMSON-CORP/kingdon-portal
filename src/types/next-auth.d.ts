import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      name?: string | null | undefined;
      email?: string | null | undefined;
      role?: Role;
      token?: string;
    };
  }
}
