export type TreeNode<T> = T & { children: TreeNode<T>[] };

/**
 * Convierte una lista plana en un árbol en O(n) usando un Map.
 * - getId: identificador único del elemento.
 * - getParentId: id del padre, o null/undefined si es raíz.
 * Los elementos cuyo padre no existe en la lista se tratan como raíces.
 */
export function flatToTree<T>(
  items: T[],
  getId: (item: T) => string,
  getParentId: (item: T) => string | null | undefined,
): TreeNode<T>[] {
  const nodes = new Map<string, TreeNode<T>>();
  for (const item of items) {
    nodes.set(getId(item), { ...item, children: [] });
  }

  const roots: TreeNode<T>[] = [];
  for (const item of items) {
    const node = nodes.get(getId(item))!;
    const parentId = getParentId(item);
    const parent = parentId != null ? nodes.get(parentId) : undefined;
    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}
