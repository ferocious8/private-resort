$outputPath = "src/assets/images/rooms"
$imageUrl = "https://images.pexels.com/photos/3209035/pexels-photo-3209035.jpeg"
$outputFile = Join-Path $outputPath "garden-suite.jpg"
Invoke-WebRequest -Uri $imageUrl -OutFile $outputFile
Write-Host "Downloaded new garden suite image"
