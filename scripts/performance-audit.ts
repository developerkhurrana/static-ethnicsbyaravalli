#!/usr/bin/env tsx

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

interface PerformanceMetrics {
  timestamp: string
  lighthouseScore: {
    performance: number
    accessibility: number
    bestPractices: number
    seo: number
  }
  pageSize: number
  loadTime: number
}

class PerformanceAuditor {
  private resultsDir = path.join(process.cwd(), 'performance-results')
  private resultsFile = path.join(this.resultsDir, 'performance-metrics.json')

  constructor() {
    this.ensureResultsDirectory()
  }

  private ensureResultsDirectory() {
    if (!fs.existsSync(this.resultsDir)) {
      fs.mkdirSync(this.resultsDir, { recursive: true })
    }
  }

  async runLighthouseAudit(url: string): Promise<PerformanceMetrics> {
    console.log('🔍 Running Lighthouse audit...')
    
    try {
      // Run Lighthouse CLI
      const output = execSync(
        `npx lighthouse ${url} --output=json --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless"`,
        { encoding: 'utf8' }
      )

      const results = JSON.parse(output)
      
      const metrics: PerformanceMetrics = {
        timestamp: new Date().toISOString(),
        lighthouseScore: {
          performance: Math.round(results.lhr.categories.performance.score * 100),
          accessibility: Math.round(results.lhr.categories.accessibility.score * 100),
          bestPractices: Math.round(results.lhr.categories['best-practices'].score * 100),
          seo: Math.round(results.lhr.categories.seo.score * 100),
        },
        pageSize: Math.round(results.lhr.audits['total-byte-weight'].numericValue / 1024), // KB
        loadTime: Math.round(results.lhr.audits['largest-contentful-paint'].numericValue), // ms
      }

      this.saveResults(metrics)
      this.printResults(metrics)
      
      return metrics
    } catch (error) {
      console.error('❌ Error running Lighthouse audit:', error)
      throw error
    }
  }

  private saveResults(metrics: PerformanceMetrics) {
    let existingResults: PerformanceMetrics[] = []
    
    if (fs.existsSync(this.resultsFile)) {
      existingResults = JSON.parse(fs.readFileSync(this.resultsFile, 'utf8'))
    }
    
    existingResults.push(metrics)
    fs.writeFileSync(this.resultsFile, JSON.stringify(existingResults, null, 2))
  }

  private printResults(metrics: PerformanceMetrics) {
    console.log('\n📊 Performance Audit Results:')
    console.log('=' .repeat(50))
    console.log(`Timestamp: ${metrics.timestamp}`)
    console.log(`Performance Score: ${metrics.lighthouseScore.performance}/100`)
    console.log(`Accessibility Score: ${metrics.lighthouseScore.accessibility}/100`)
    console.log(`Best Practices Score: ${metrics.lighthouseScore.bestPractices}/100`)
    console.log(`SEO Score: ${metrics.lighthouseScore.seo}/100`)
    console.log(`Page Size: ${metrics.pageSize} KB`)
    console.log(`Load Time: ${metrics.loadTime} ms`)
    console.log('=' .repeat(50))
  }

  generateReport() {
    if (!fs.existsSync(this.resultsFile)) {
      console.log('❌ No performance data found. Run an audit first.')
      return
    }

    const results: PerformanceMetrics[] = JSON.parse(fs.readFileSync(this.resultsFile, 'utf8'))
    
    if (results.length < 2) {
      console.log('📈 Need at least 2 data points to generate a trend report.')
      return
    }

    const latest = results[results.length - 1]
    const previous = results[results.length - 2]

    console.log('\n📈 Performance Trend Report:')
    console.log('=' .repeat(50))
    
    const performanceChange = latest.lighthouseScore.performance - previous.lighthouseScore.performance
    const sizeChange = latest.pageSize - previous.pageSize
    const loadTimeChange = latest.loadTime - previous.loadTime

    console.log(`Performance Score: ${previous.lighthouseScore.performance} → ${latest.lighthouseScore.performance} (${performanceChange > 0 ? '+' : ''}${performanceChange})`)
    console.log(`Page Size: ${previous.pageSize} KB → ${latest.pageSize} KB (${sizeChange > 0 ? '+' : ''}${sizeChange} KB)`)
    console.log(`Load Time: ${previous.loadTime} ms → ${latest.loadTime} ms (${loadTimeChange > 0 ? '+' : ''}${loadTimeChange} ms)`)
    
    if (performanceChange > 0) {
      console.log('✅ Performance improved!')
    } else if (performanceChange < 0) {
      console.log('⚠️  Performance decreased. Consider reviewing recent changes.')
    } else {
      console.log('➡️  Performance unchanged.')
    }
  }
}

async function main() {
  const auditor = new PerformanceAuditor()
  const url = process.argv[2] || 'https://ethnicsbyaravalli.com'
  
  if (process.argv.includes('--report')) {
    auditor.generateReport()
    return
  }

  try {
    await auditor.runLighthouseAudit(url)
  } catch (error) {
    console.error('Failed to run performance audit:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
} 