import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const blog = defineDocs({
  dir: 'src/content/blog',
});

export default defineConfig();
