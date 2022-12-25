import { Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireAdminUser } from "~/session.server";
import type { LoaderArgs } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  await requireAdminUser(request);
  return json({});
}

export default function AdminIndex() {
  return (
    <p>
      <Link to="new" className="text-blue-600 underline">
        Create a New Post
      </Link>
    </p>
  );
}
