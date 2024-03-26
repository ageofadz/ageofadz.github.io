"use client";

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";

interface MDXContentProps {
  source: MDXRemoteProps;
}

export default function MDXContent({ source }: MDXContentProps) {
  return <MDXRemote {...source} />;
}