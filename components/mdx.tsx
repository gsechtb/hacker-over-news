import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";

const components = {
  a: (props: ComponentProps<"a">) => (
    <a {...props} target={props.href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" />
  ),
};

export function MDXContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
