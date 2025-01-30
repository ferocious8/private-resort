$images = @{
    "ocean-view.jpg" = "https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg"
    "garden-suite.jpg" = "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg"
    "beachfront.jpg" = "https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg"
    "penthouse.jpg" = "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg"
}

$outputPath = "src/assets/images/rooms"

foreach ($image in $images.GetEnumerator()) {
    $outputFile = Join-Path $outputPath $image.Key
    Invoke-WebRequest -Uri $image.Value -OutFile $outputFile
    Write-Host "Downloaded $($image.Key)"
}
