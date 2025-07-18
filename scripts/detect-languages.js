#!/usr/bin/env node

/**
 * 语言检测脚本
 * 用于检测项目中的多语言文件
 */

import fs from 'fs';
import path from 'path';

const LANGUAGES = {
  'en': {
    name: 'English',
    files: ['README.md', 'CONTRIBUTING.md', 'CHANGELOG.md']
  },
  'zh-CN': {
    name: '中文',
    files: ['README.zh-CN.md', 'CONTRIBUTING.zh-CN.md']
  }
};

function detectLanguages() {
  console.log('🔍 检测项目中的多语言文件...\n');
  
  const detected = {};
  
  for (const [code, lang] of Object.entries(LANGUAGES)) {
    detected[code] = {
      name: lang.name,
      files: []
    };
    
    for (const file of lang.files) {
      if (fs.existsSync(file)) {
        detected[code].files.push(file);
      }
    }
  }
  
  // 输出检测结果
  for (const [code, lang] of Object.entries(detected)) {
    if (lang.files.length > 0) {
      console.log(`✅ ${lang.name} (${code}):`);
      lang.files.forEach(file => {
        console.log(`   📄 ${file}`);
      });
      console.log('');
    }
  }
  
  // 检查是否有语言切换链接
  console.log('🔗 检查语言切换链接...');
  
  const readmeEn = fs.readFileSync('README.md', 'utf8');
  const readmeZh = fs.readFileSync('README.zh-CN.md', 'utf8');
  
  if (readmeEn.includes('[English]') && readmeEn.includes('[中文]')) {
    console.log('✅ README.md 包含语言切换链接');
  } else {
    console.log('❌ README.md 缺少语言切换链接');
  }
  
  if (readmeZh.includes('[English]') && readmeZh.includes('[中文]')) {
    console.log('✅ README.zh-CN.md 包含语言切换链接');
  } else {
    console.log('❌ README.zh-CN.md 缺少语言切换链接');
  }
  
  console.log('\n🎉 语言检测完成！');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  detectLanguages();
} 