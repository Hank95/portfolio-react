#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

class BundleAnalyzer {
  constructor() {
    this.distPath = path.join(process.cwd(), 'dist');
    this.assetsPath = path.join(this.distPath, 'assets');
  }

  async analyzeBundles() {
    console.log('🔍 Analyzing bundle sizes...\n');

    try {
      // Build the project first
      console.log('Building project...');
      await execAsync('npm run build');
      
      // Analyze the built files
      const analysis = await this.analyzeFiles();
      
      // Generate report
      this.generateReport(analysis);
      
    } catch (error) {
      console.error('Error analyzing bundles:', error);
    }
  }

  async analyzeFiles() {
    const files = await fs.readdir(this.assetsPath);
    const analysis = {
      js: [],
      css: [],
      total: 0,
      gzipTotal: 0
    };

    for (const file of files) {
      const filePath = path.join(this.assetsPath, file);
      const stats = await fs.stat(filePath);
      const size = stats.size;
      
      // Estimate gzip size (typically 25-30% of original)
      const gzipSize = Math.round(size * 0.3);
      
      const fileInfo = {
        name: file,
        size,
        gzipSize,
        sizeKB: (size / 1024).toFixed(2),
        gzipKB: (gzipSize / 1024).toFixed(2)
      };

      if (file.endsWith('.js')) {
        analysis.js.push(fileInfo);
      } else if (file.endsWith('.css')) {
        analysis.css.push(fileInfo);
      }

      analysis.total += size;
      analysis.gzipTotal += gzipSize;
    }

    // Sort by size (largest first)
    analysis.js.sort((a, b) => b.size - a.size);
    analysis.css.sort((a, b) => b.size - a.size);

    return analysis;
  }

  generateReport(analysis) {
    console.log('📊 Bundle Analysis Report\n');
    console.log('='.repeat(50));
    
    // JavaScript files
    console.log('\n📦 JavaScript Bundles:');
    console.log('-'.repeat(30));
    analysis.js.forEach(file => {
      const status = this.getSizeStatus(file.size);
      console.log(`${status} ${file.name}`);
      console.log(`   Size: ${file.sizeKB} KB (${file.gzipKB} KB gzipped)`);
    });

    // CSS files
    if (analysis.css.length > 0) {
      console.log('\n🎨 CSS Files:');
      console.log('-'.repeat(30));
      analysis.css.forEach(file => {
        const status = this.getSizeStatus(file.size);
        console.log(`${status} ${file.name}`);
        console.log(`   Size: ${file.sizeKB} KB (${file.gzipKB} KB gzipped)`);
      });
    }

    // Summary
    console.log('\n📈 Summary:');
    console.log('-'.repeat(30));
    console.log(`Total Bundle Size: ${(analysis.total / 1024).toFixed(2)} KB`);
    console.log(`Total Gzipped: ${(analysis.gzipTotal / 1024).toFixed(2)} KB`);
    
    // Recommendations
    console.log('\n💡 Recommendations:');
    console.log('-'.repeat(30));
    this.generateRecommendations(analysis);
  }

  getSizeStatus(size) {
    const sizeKB = size / 1024;
    if (sizeKB < 100) return '✅';
    if (sizeKB < 250) return '⚠️ ';
    return '❌';
  }

  generateRecommendations(analysis) {
    const recommendations = [];
    const totalKB = analysis.total / 1024;

    // Check for large bundles
    analysis.js.forEach(file => {
      const sizeKB = file.size / 1024;
      if (sizeKB > 250) {
        recommendations.push(`Consider code splitting for ${file.name} (${file.sizeKB} KB)`);
      }
    });

    // Check total bundle size
    if (totalKB > 500) {
      recommendations.push('Total bundle size is large. Consider implementing more aggressive code splitting.');
    }

    // Check for vendor chunks
    const hasVendorChunk = analysis.js.some(file => file.name.includes('vendor'));
    if (!hasVendorChunk) {
      recommendations.push('Consider creating a separate vendor chunk for better caching.');
    }

    if (recommendations.length === 0) {
      console.log('✅ Bundle sizes look good! No immediate optimizations needed.');
    } else {
      recommendations.forEach(rec => {
        console.log(`• ${rec}`);
      });
    }

    // Performance budgets
    console.log('\n🎯 Performance Budget Check:');
    console.log('-'.repeat(30));
    
    // Calculate actual initial load (excluding three.js and other lazy chunks)
    const initialLoad = analysis.js
      .filter(file => !file.name.includes('three') && !file.name.includes('Globe'))
      .reduce((sum, file) => sum + file.size, 0) / 1024;
    
    const budget = {
      'Initial Load (no lazy)': { limit: 200, actual: initialLoad },
      'Main Bundle': { limit: 100, actual: analysis.js.find(f => f.name.includes('index'))?.size / 1024 || 0 },
      'Vendor Bundle': { limit: 150, actual: analysis.js.find(f => f.name.includes('vendor'))?.size / 1024 || 0 },
      'Total Bundle': { limit: 1500, actual: totalKB },
      'Gzipped Total': { limit: 450, actual: analysis.gzipTotal / 1024 }
    };

    Object.entries(budget).forEach(([name, { limit, actual }]) => {
      const status = actual <= limit ? '✅' : '❌';
      console.log(`${status} ${name}: ${actual.toFixed(2)} KB / ${limit} KB`);
    });
  }
}

// Run analyzer
const analyzer = new BundleAnalyzer();
analyzer.analyzeBundles();