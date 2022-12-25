import { Form, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { createPost } from "~/models/post.server";
import type { ActionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors = {
    title: validateTitle(title),
    slug: validateSlug(slug),
    markdown: validateMarkdown(markdown),
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json({ errors });
  }

  invariant(typeof title === "string", "title must be a string");
  invariant(typeof slug === "string", "title must be a string");
  invariant(typeof markdown === "string", "title must be a string");

  await createPost({ title, slug, markdown });
  return redirect("/posts/admin");
}

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

function validateTitle(title: FormDataEntryValue | null) {
  return title ? null : "Title is required";
}

function validateSlug(slug: FormDataEntryValue | null) {
  return slug ? null : "Title is required";
}

function validateMarkdown(markdown: FormDataEntryValue | null) {
  return markdown ? null : "Title is required";
}

export default function NewPost() {
  const actionData = useActionData<typeof action>();
  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          <input type="text" name="title" className={inputClassName} />
          {actionData?.errors?.title ? (
            <em className="text-red-500">{actionData.errors.title}</em>
          ) : null}
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          <input type="text" name="slug" className={inputClassName} />
          {actionData?.errors?.slug ? (
            <em className="text-red-500">{actionData.errors.slug}</em>
          ) : null}
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown: </label>
        <br />
        <textarea
          id="markdown"
          rows={8}
          name="markdown"
          className={`${inputClassName} font-mono`}
        />
        {actionData?.errors?.markdown ? (
          <em className="text-red-500">{actionData.errors.markdown}</em>
        ) : null}
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Create Post
        </button>
      </p>
    </Form>
  );
}
