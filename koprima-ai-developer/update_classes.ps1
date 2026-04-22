$content = Get-Content -Path "src/App.tsx" -Raw

# 1. card-balance
$content = $content -replace 'bg-gradient-to-br from-primary to-primary-container (p-\d+ rounded-\[.*?\] )text-white', 'card-balance $1'
$content = $content -replace 'bg-gradient-to-br from-primary to-primary-container (rounded-\[.*?\] p-\d+ )text-white', 'card-balance $1'
$content = $content -replace 'bg-primary-container (p-6 rounded-3xl text-center space-y-1)', 'card-balance $1'

# 2. btn-primary
$content = $content -replace 'bg-gradient-to-r from-primary to-primary-container text-white', 'btn-primary'
$content = $content -replace 'bg-primary text-white', 'btn-primary'
# Clean up some shadow/border utilities that are now in btn-primary
$content = $content -replace 'shadow-lg shadow-primary/20', ''
$content = $content -replace 'shadow-xl', ''

# 3. card-green
$content = $content -replace 'bg-secondary text-white (p-6 rounded-3xl flex items-center gap-4)', 'card-green $1'
$content = $content -replace 'bg-surface-container-low (p-6 rounded-3xl text-center space-y-1)', 'card-green $1'

# 4. badge-active
$content = $content -replace 'bg-secondary-container text-primary', 'badge-active'
$content = $content -replace 'bg-secondary-container px-4 py-2', 'badge-active px-4 py-2'
$content = $content -replace 'bg-secondary-container text-on-secondary-container', 'badge-active'

# 5. Clean up profiling texts
$content = $content -replace 'text-on-primary-container/70', 'text-white/70'
$content = $content -replace 'text-[10px] text-on-surface-variant/70', 'text-[10px] opacity-70'

# 6. Shadows (editorial-shadow -> card)
$content = $content -replace 'editorial-shadow', 'card'

Set-Content -Path "src/App.tsx" -Value $content
