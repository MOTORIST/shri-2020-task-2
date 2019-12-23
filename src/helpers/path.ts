export type Path = string[];

export interface PathInfo {
  path: Path;
  blockPosition: number;
  blockName: string;
}

export function setPath(path: Path, part: string | number): Path {
  return path.concat([part.toString()]);
}

export function splitPath(path: Path): PathInfo {
  return {
    path: path.slice(0, -2),
    blockPosition: Number.parseInt(path[path.length - 2], 10),
    blockName: path[path.length - 1],
  };
}

export function hasParent(path: Path, parent: string): boolean {
  return path.indexOf(parent) !== -1;
}

export function getStringPath(path: Path) {
  return path.slice(0, -2).join('|');
}
