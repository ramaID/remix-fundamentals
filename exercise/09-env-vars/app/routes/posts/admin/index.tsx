import { Link } from "@remix-run/react";

export default function AdminIndex() {
  return (
    <div>
      <Link to="new" className="text-blue-600 underline">
        Create a New Post
      </Link>
      <p>Admin email: {ENV.ADMIN_EMAIL}</p>
    </div>
  );
}
