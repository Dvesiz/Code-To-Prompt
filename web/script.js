// 全局变量
let processedOutput = '';
let fileStats = {
    fileCount: 0,
    tokenCount: 0,
    charCount: 0
};

// DOM 元素
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const resultsSection = document.getElementById('resultsSection');
const loading = document.getElementById('loading');
const extensionsInput = document.getElementById('extensions');
const maxTokensInput = document.getElementById('maxTokens');
const respectGitignore = document.getElementById('respectGitignore');

// 统计元素
const fileCountEl = document.getElementById('fileCount');
const tokenCountEl = document.getElementById('tokenCount');
const charCountEl = document.getElementById('charCount');
const warningBox = document.getElementById('warningBox');
const previewContent = document.getElementById('previewContent');

// 按钮
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');

// 默认忽略的文件和目录
const DEFAULT_IGNORE = [
    'node_modules',
    'dist',
    'build',
    '.git',
    '.next',
    '.cache',
    'coverage',
    '*.log',
    '.DS_Store',
    '.env',
    '.env.local',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml'
];

// 拖拽事件
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    
    const items = e.dataTransfer.items;
    if (items) {
        handleFiles(items);
    }
});

// 文件选择事件
fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files).map(file => ({
        file: file,
        path: file.webkitRelativePath || file.name
    }));
    processFiles(files);
});

// 处理拖拽的文件
async function handleFiles(items) {
    const files = [];
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i].webkitGetAsEntry();
        if (item) {
            await traverseFileTree(item, files);
        }
    }
    
    processFiles(files);
}

// 遍历文件树
async function traverseFileTree(item, files, path = '') {
    if (item.isFile) {
        return new Promise((resolve) => {
            item.file((file) => {
                files.push({ file, path: path + file.name });
                resolve();
            });
        });
    } else if (item.isDirectory) {
        const dirReader = item.createReader();
        return new Promise((resolve) => {
            dirReader.readEntries(async (entries) => {
                for (const entry of entries) {
                    await traverseFileTree(entry, files, path + item.name + '/');
                }
                resolve();
            });
        });
    }
}

// 处理文件
async function processFiles(files) {
    // 显示加载状态
    loading.style.display = 'block';
    resultsSection.style.display = 'none';
    
    try {
        // 获取选项
        const extensions = extensionsInput.value.trim();
        const maxTokens = parseInt(maxTokensInput.value) || 0;
        const useGitignore = respectGitignore.checked;
        
        // 过滤文件
        let filteredFiles = files;
        
        // 应用 .gitignore 规则
        if (useGitignore) {
            filteredFiles = filteredFiles.filter(f => {
                const path = f.path || f.name || '';
                return !shouldIgnore(path);
            });
        }
        
        // 应用扩展名过滤
        if (extensions) {
            const exts = extensions.split(',').map(e => e.trim().toLowerCase());
            filteredFiles = filteredFiles.filter(f => {
                const fileName = (f.file ? f.file.name : f.name || '').toLowerCase();
                return exts.some(ext => fileName.endsWith('.' + ext));
            });
        }
        
        // 检查是否有文件
        if (filteredFiles.length === 0) {
            loading.style.display = 'none';
            alert('没有找到符合条件的文件。请检查文件类型过滤设置。');
            return;
        }
        
        // 读取文件内容
        const fileContents = [];
        for (const f of filteredFiles) {
            try {
                const fileObj = f.file || f;
                const content = await readFileContent(fileObj);
                const path = f.path || fileObj.webkitRelativePath || fileObj.name;
                fileContents.push({ path, content });
            } catch (err) {
                console.error('Error reading file:', f, err);
            }
        }
        
        // 检查是否成功读取文件
        if (fileContents.length === 0) {
            loading.style.display = 'none';
            alert('无法读取文件。请确保选择的是文本文件。');
            return;
        }
        
        // 生成输出
        processedOutput = formatOutput(fileContents);
        
        // 计算统计信息
        fileStats = {
            fileCount: fileContents.length,
            tokenCount: estimateTokens(processedOutput),
            charCount: processedOutput.length
        };
        
        // 检查 token 限制
        if (maxTokens > 0 && fileStats.tokenCount > maxTokens) {
            showWarning('danger', `⚠️ Token 数量 (${fileStats.tokenCount.toLocaleString()}) 超过限制 (${maxTokens.toLocaleString()})！请使用文件类型过滤或选择更小的目录。`);
            loading.style.display = 'none';
            return;
        }
        
        // 显示结果
        displayResults();
        
        loading.style.display = 'none';
        resultsSection.style.display = 'block';
    } catch (error) {
        loading.style.display = 'none';
        console.error('处理文件时出错:', error);
        alert('处理文件时出错: ' + error.message);
    }
}

// 判断是否应该忽略文件
function shouldIgnore(path) {
    const pathLower = path.toLowerCase();
    return DEFAULT_IGNORE.some(pattern => {
        if (pattern.includes('*')) {
            const regex = new RegExp(pattern.replace('*', '.*'));
            return regex.test(pathLower);
        }
        return pathLower.includes(pattern.toLowerCase());
    });
}

// 读取文件内容
function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

// 格式化输出
function formatOutput(files) {
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

// 生成文件树
function generateFileTree(paths) {
    const tree = {};
    
    paths.forEach(p => {
        const parts = p.split('/');
        let current = tree;
        
        parts.forEach((part, idx) => {
            if (idx === parts.length - 1) {
                current[part] = null;
            } else {
                current[part] = current[part] || {};
                current = current[part];
            }
        });
    });
    
    return renderTree(tree, 0);
}

function renderTree(node, depth) {
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

// 估算 token 数（简单估算：英文约 4 字符/token，中文约 1.5 字符/token）
function estimateTokens(text) {
    // 简单估算：平均 3 字符/token
    return Math.round(text.length / 3);
}

// 显示结果
function displayResults() {
    fileCountEl.textContent = fileStats.fileCount.toLocaleString();
    tokenCountEl.textContent = fileStats.tokenCount.toLocaleString();
    charCountEl.textContent = fileStats.charCount.toLocaleString();
    
    // 显示警告
    if (fileStats.tokenCount > 200000) {
        showWarning('danger', '🚨 Token 数量过大！建议使用文件类型过滤或选择特定目录。');
    } else if (fileStats.tokenCount > 100000) {
        showWarning('warning', '⚠️ Token 数量较大，可能超出大多数 AI 模型的上下文窗口。');
    } else if (fileStats.tokenCount > 50000) {
        showWarning('info', '💡 Token 数量适中，适合 Claude 3 等大上下文模型。');
    } else {
        showWarning('info', '✅ Token 数量合适，可以用于大多数 AI 模型。');
    }
    
    // 显示预览（前 1000 字符）
    previewContent.textContent = processedOutput.substring(0, 1000) + '\n\n... (预览前 1000 字符)';
}

// 显示警告
function showWarning(type, message) {
    warningBox.className = `warning ${type}`;
    warningBox.textContent = message;
    warningBox.style.display = 'flex';
}

// 复制到剪贴板
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(processedOutput);
        copyBtn.textContent = '✅ 已复制！';
        setTimeout(() => {
            copyBtn.textContent = '📋 复制到剪贴板';
        }, 2000);
    } catch (err) {
        alert('复制失败，请手动复制预览内容');
    }
});

// 下载文件
downloadBtn.addEventListener('click', () => {
    const blob = new Blob([processedOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-context.txt';
    a.click();
    URL.revokeObjectURL(url);
});

// 重置
resetBtn.addEventListener('click', () => {
    resultsSection.style.display = 'none';
    fileInput.value = '';
    processedOutput = '';
    fileStats = { fileCount: 0, tokenCount: 0, charCount: 0 };
});
