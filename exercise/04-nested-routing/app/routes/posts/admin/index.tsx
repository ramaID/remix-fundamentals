import { Link } from "@remix-run/react";

export default function AdminRoute() {
  return (
    <p>
      <Link to="new" className="text-blue-600 underline">
        Create a New Post
      </Link>
    </p>
  );
}
