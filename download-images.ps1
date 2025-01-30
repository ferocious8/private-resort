$images = @{
    "ocean-view-villa.jpg" = "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg"
    "garden-suite.jpg" = "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
    "beachfront-bungalow.jpg" = "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg"
    "royal-penthouse.jpg" = "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg"
}

$outputPath = "public/images/accommodations"

foreach ($image in $images.GetEnumerator()) {
    $outputFile = Join-Path $outputPath $image.Key
    Invoke-WebRequest -Uri $image.Value -OutFile $outputFile
    Write-Host "Downloaded $($image.Key)"
}
