#!/usr/bin/env node
/**
 * Collects CSP hashes from a Qwik production build
 * 
 * Usage: node scripts/collect-csp-hashes.js
 * 
 * Run this after building the project to collect all inline script hashes
 * that need to be added to the CSP configuration.
 */

import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import { createHash } from 'crypto';

const DIST_DIR = './dist';
const HTML_FILES = [];

// Function to calculate SHA-256 hash
function calculateHash(content) {
  return 'sha256-' + createHash('sha256').update(content, 'utf8').digest('base64');
}

// Extract inline scripts from HTML
function extractInlineScripts(html) {
  const scriptRegex = /<script[^>]*>([^<]+)<\/script>/g;
  const scripts = [];
  let match;
  
  while ((match = scriptRegex.exec(html)) !== null) {
    const scriptContent = match[1].trim();
    if (scriptContent && !scriptContent.includes('src=')) {
      scripts.push(scriptContent);
    }
  }
  
  return scripts;
}

// Find all HTML files in dist
async function findHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await findHtmlFiles(fullPath);
    } else if (entry.name.endsWith('.html')) {
      HTML_FILES.push(fullPath);
    }
  }
}

// Main function
async function collectHashes() {
  console.log('🔍 Collecting CSP hashes from production build...\n');
  
  try {
    // Find all HTML files
    await findHtmlFiles(DIST_DIR);
    
    if (HTML_FILES.length === 0) {
      console.error('❌ No HTML files found in dist/. Please build the project first.');
      process.exit(1);
    }
    
    const allHashes = new Set();
    
    // Process each HTML file
    for (const file of HTML_FILES) {
      const content = await readFile(file, 'utf8');
      const scripts = extractInlineScripts(content);
      
      for (const script of scripts) {
        const hash = calculateHash(script);
        allHashes.add(hash);
      }
    }
    
    // Output results
    console.log('📋 Found', allHashes.size, 'unique inline script hashes:\n');
    
    const hashArray = Array.from(allHashes).sort();
    
    console.log('const QWIK_SCRIPT_HASHES = [');
    hashArray.forEach((hash, index) => {
      const comma = index < hashArray.length - 1 ? ',' : '';
      console.log(`  '${hash}'${comma}`);
    });
    console.log('];\n');
    
    console.log('✅ Copy the above array to src/utils/csp-config.ts');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
collectHashes();