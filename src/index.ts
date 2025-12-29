import cac from 'cac';
import { getFiles } from './scanner';
import { formatToPrompt } from './formatter';
import clipboardy from 'clipboardy';
import ora from 'ora';
import { encode } from 'gpt-tokenizer';

const cli = cac('code2prompt');

cli
  .command('[dir]', 'Convert codebase to LLM prompt')
  .option('-e, --extensions <exts>', 'File extensions to include (e.g., ts,vue,js)')
  .option('-o, --output <file>', 'Output to file instead of clipboard')
  .option('--max-tokens <number>', 'Maximum tokens (default: no limit)', { default: 0 })
  .option('--dry-run', 'Show file count and token estimate without generating output')
  .action(async (dir = '.', options) => {
    const spinner = ora('Scanning files...').start();
    
    try {
      // 解析扩展名
      const extensions = options.extensions
        ? options.extensions.split(',').map((e: string) => e.trim())
        : undefined;
      
      // 扫描文件
      const files = await getFiles(dir, extensions);
      spinner.text = `Found ${files.length} files, formatting...`;
      
      // 格式化
      const prompt = formatToPrompt(files);
      
      // 计算 token
      const tokens = encode(prompt).length;
      
      // Dry run 模式
      if (options.dryRun) {
        spinner.succeed('Dry run completed');
        console.log(`📊 Statistics:`);
        console.log(`   Files: ${files.length}`);
        console.log(`   Tokens: ~${tokens.toLocaleString()}`);
        console.log(`   Characters: ${prompt.length.toLocaleString()}`);
        
        if (tokens > 200000) {
          console.log(`\n⚠️  CRITICAL: ${tokens.toLocaleString()} tokens is too large!`);
          console.log(`   Recommendation: Use -e to filter file types or scan specific directories`);
        } else if (tokens > 100000) {
          console.log(`\n⚠️  Warning: ${tokens.toLocaleString()} tokens exceeds most LLM context windows`);
          console.log(`   Recommendation: Consider filtering with -e parameter`);
        } else if (tokens > 50000) {
          console.log(`\n💡 Tip: ${tokens.toLocaleString()} tokens is large but manageable for Claude 3`);
        } else {
          console.log(`\n✅ ${tokens.toLocaleString()} tokens is a good size for most LLMs`);
        }
        return;
      }
      
      // 检查 max-tokens 限制
      const maxTokens = parseInt(options.maxTokens) || 0;
      if (maxTokens > 0 && tokens > maxTokens) {
        spinner.fail('Token limit exceeded');
        console.log(`❌ Error: Output has ${tokens.toLocaleString()} tokens, exceeds limit of ${maxTokens.toLocaleString()}`);
        console.log(`\n💡 Suggestions:`);
        console.log(`   1. Use -e to filter file types (e.g., -e ts,tsx)`);
        console.log(`   2. Scan a specific subdirectory`);
        console.log(`   3. Increase --max-tokens limit`);
        process.exit(1);
      }
      
      spinner.succeed(`Processed ${files.length} files`);
      
      // 输出
      if (options.output) {
        const fs = await import('fs');
        fs.writeFileSync(options.output, prompt);
        console.log(`✅ Saved to ${options.output}`);
      } else {
        await clipboardy.write(prompt);
        console.log('✅ Copied to clipboard!');
      }
      
      console.log(`ℹ️  Total tokens: ~${tokens.toLocaleString()}`);
      
      // Token 警告和建议
      if (tokens > 200000) {
        console.log('🚨 CRITICAL: This is too large for any LLM!');
        console.log('   See LARGE-PROJECT-GUIDE.md for strategies');
      } else if (tokens > 100000) {
        console.log('⚠️  Warning: This exceeds most LLM context windows!');
        console.log('   Consider using -e to filter file types');
      } else if (tokens > 50000) {
        console.log('💡 Tip: This works with Claude 3 (200k context)');
      }
      
    } catch (error) {
      spinner.fail('Failed to process files');
      console.error(error);
      process.exit(1);
    }
  });

cli.help();
cli.version('0.1.0');

cli.parse();
