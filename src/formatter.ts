import { FileInfo } from './scanner';

export function formatToPrompt(files: FileInfo[]): string {
  let output = '# Project Context\n\n';
  
  // 生成文件树
  output += '## File Tree\n```\n';
  const tree = generateFileTree(files.map(f => f.path));
  output += tree;
  output += '\n```\n\n';
  
  // 文件内容
  output += '## File Contents\n\n';
  
  files.forEach(file => {
    output += `<file path="${file.path}">\n`;
    output += file.content;
    output += '\n</file>\n\n';
  });
  
  return output;
}

function generateFileTree(paths: string[]): string {
  const tree: Record<string, any> = {};
  
  paths.forEach(p => {
    const parts = p.split('/');
    let current = tree;
    
    parts.forEach((part, idx) => {
      if (idx === parts.length - 1) {
        current[part] = null; // 文件
      } else {
        current[part] = current[part] || {};
        current = current[part];
      }
    });
  });
  
  return renderTree(tree, 0);
}

function renderTree(node: Record<string, any>, depth: number): string {
  let result = '';
  const indent = '  '.repeat(depth);
  
  Object.keys(node).sort().forEach(key => {
    if (node[key] === null) {
      result += `${indent}├── ${key}\n`;
    } else {
      result += `${indent}├── ${key}/\n`;
      result += renderTree(node[key], depth + 1);
    }
  });
  
  return result;
}
