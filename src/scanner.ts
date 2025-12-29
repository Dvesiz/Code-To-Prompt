import { glob } from 'fast-glob';
import fs from 'fs';
import path from 'path';
import ignore from 'ignore';

export interface FileInfo {
  path: string;
  content: string;
}

export async function getFiles(
  dir: string,
  extensions?: string[]
): Promise<FileInfo[]> {
  // 1. 读取 .gitignore
  const ig = ignore();
  const gitignorePath = path.join(dir, '.gitignore');
  
  if (fs.existsSync(gitignorePath)) {
    ig.add(fs.readFileSync(gitignorePath).toString());
  }

  // 2. 默认忽略常见垃圾文件
  ig.add([
    '.git',
    'node_modules',
    'dist',
    'build',
    'coverage',
    '*.lock',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    '.DS_Store',
    '.env',
    '.env.local'
  ]);

  // 3. 扫描所有文件
  let pattern: string | string[];
  if (extensions && extensions.length > 0) {
    // 如果只有一个扩展名，使用简单模式；多个则使用大括号
    pattern = extensions.length === 1
      ? `**/*.${extensions[0]}`
      : `**/*.{${extensions.join(',')}}`;
  } else {
    pattern = '**/*';
  }

  const allFiles = await glob(pattern, {
    cwd: dir,
    dot: false,
    onlyFiles: true,
    ignore: ['node_modules/**', '.git/**']
  });

  // 4. 过滤并读取内容
  const files: FileInfo[] = [];
  
  for (const file of allFiles) {
    if (ig.ignores(file)) continue;

    const fullPath = path.join(dir, file);
    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      files.push({ path: file, content });
    } catch (err) {
      // 跳过无法读取的文件（如二进制文件）
      continue;
    }
  }

  return files;
}
