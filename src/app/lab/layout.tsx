import { notFound } from "next/navigation";

// /lab and /lab/still are development test benches (they render third-party
// reference images from public/ref). They never exist in a production build.
export default function LabLayout({ children }: LayoutProps<"/lab">) {
  if (process.env.NODE_ENV === "production") notFound();
  return children;
}
