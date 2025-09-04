import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

async function prebuild() {
  try {
    console.log('🔧 Running pre-build fixes...')
    
    // Check if contentlayer generated files exist and fix them
    const contentlayerPath = join(process.cwd(), '.contentlayer/generated')
    if (existsSync(contentlayerPath)) {
      console.log('🔧 Fixing contentlayer assert syntax...')
      execSync('node ./scripts/fix-contentlayer-asserts.mjs', { stdio: 'inherit' })
      console.log('✅ Contentlayer assert syntax fixed')
    }
    
    console.log('✅ Pre-build fixes completed')
  } catch (error) {
    console.log('⚠️ Pre-build fixes failed:', error.message)
    // Don't exit with error, just continue
  }
}

prebuild()
