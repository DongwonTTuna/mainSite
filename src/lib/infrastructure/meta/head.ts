export type PageMeta = {
  title: string;
  description?: string;
};

export function createPageMeta(meta: PageMeta): PageMeta {
  return meta;
}
