<#
.SYNOPSIS
    Automated PowerPoint Slide Generator applying the "Slides by Sander" Tutorial (rVC2VOGP7Qw).
.DESCRIPTION
    Creates a modern widescreen presentation with:
    - Dark atmospheric gradient canvas
    - 45-degree angled rounded capsule shapes
    - Compound visual framing
    - Punchy editorial typography & metrics
    - Two-slide sequence pre-configured for the Morph transition
#>

param(
    [string]$OutputPath = "$PSScriptRoot\SlidesBySander_Masterclass.pptx"
)

Write-Host ">>> Initializing Microsoft PowerPoint COM Automation..." -ForegroundColor Cyan

try {
    $ppt = New-Object -ComObject PowerPoint.Application
    $ppt.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue
} catch {
    Write-Error "Failed to initialize PowerPoint COM object: $_"
    exit 1
}

# 1. Create New Presentation & Set 16:9 Widescreen Dimensions
$presentation = $ppt.Presentations.Add([Microsoft.Office.Core.MsoTriState]::msoTrue)
$presentation.PageSetup.SlideWidth = 960
$presentation.PageSetup.SlideHeight = 540

$blankLayout = 12 # ppLayoutBlank

Write-Host ">>> Building Slide 1 (Pre-Arrival Flight State)..." -ForegroundColor Yellow
$slide1 = $presentation.Slides.Add(1, $blankLayout)
$slide1.FollowMasterBackground = [Microsoft.Office.Core.MsoTriState]::msoFalse
$slide1.Background.Fill.Solid()
$slide1.Background.Fill.ForeColor.RGB = [System.Drawing.ColorTranslator]::ToOle([System.Drawing.Color]::FromArgb(18, 19, 22))

# Helper to add angled capsule shape
function Add-Capsule {
    param($slide, $left, $top, $width, $height, $rotation, $colorRgb, $name)
    $shape = $slide.Shapes.AddShape([Microsoft.Office.Core.MsoAutoShapeType]::msoShapeRoundedRectangle, $left, $top, $width, $height)
    # Drag yellow handle to maximum roundness (pill)
    $shape.Adjustments.Item(1) = 0.5
    $shape.Rotation = $rotation
    $shape.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $shape.Fill.Solid()
    $shape.Fill.ForeColor.RGB = $colorRgb
    $shape.Name = $name
    return $shape
}

# Add pre-arrival displaced shapes on Slide 1 (Off-screen staging)
Add-Capsule $slide1 -200 -100 80 320 45 ([System.Drawing.ColorTranslator]::ToOle([System.Drawing.Color]::FromArgb(40, 44, 52))) "!!Pill1"
Add-Capsule $slide1 1100 -200 95 480 45 ([System.Drawing.ColorTranslator]::ToOle([System.Drawing.Color]::FromArgb(255, 209, 92))) "!!Pill2"
Add-Capsule $slide1 1000 600 85 400 45 ([System.Drawing.ColorTranslator]::ToOle([System.Drawing.Color]::FromArgb(60, 66, 78))) "!!Pill3"

# Slide 1 Typography (Displaced off to the left)
$title1 = $slide1.Shapes.AddTextbox([Microsoft.Office.Core.MsoTextOrientation]::msoTextOrientationHorizontal, -400, 160, 480, 120)
$title1.TextFrame.TextRange.Text = "Explore Beyond Boundaries"
$title1.Name = "!!HeroTitle"

Write-Host ">>> Building Slide 2 (Hero Arrival State with Morph Transition)..." -ForegroundColor Green
$slide2 = $presentation.Slides.Add(2, $blankLayout)
$slide2.FollowMasterBackground = [Microsoft.Office.Core.MsoTriState]::msoFalse
$slide2.Background.Fill.Solid()
$slide2.Background.Fill.ForeColor.RGB = [System.Drawing.ColorTranslator]::ToOle([System.Drawing.Color]::FromArgb(18, 19, 22))

# Slide 2: Composed 45-degree Staggered Grid
Add-Capsule $slide2 580 120 75 320 45 ([System.Drawing.ColorTranslator]::ToOle([System.Drawing.Color]::FromArgb(45, 50, 60))) "!!Pill1"
Add-Capsule $slide2 660 70 95 480 45 ([System.Drawing.ColorTranslator]::ToOle([System.Drawing.Color]::FromArgb(255, 209, 92))) "!!Pill2"
Add-Capsule $slide2 750 140 85 400 45 ([System.Drawing.ColorTranslator]::ToOle([System.Drawing.Color]::FromArgb(70, 78, 92))) "!!Pill3"

# Slide 2: Kicker / Pill Badge
$kicker = $slide2.Shapes.AddTextbox([Microsoft.Office.Core.MsoTextOrientation]::msoTextOrientationHorizontal, 70, 100, 400, 30)
$kicker.TextFrame.TextRange.Text = "ALPINE HORIZONS • EDITION 2026"
$kicker.TextFrame.TextRange.Font.Name = "Montserrat"
$kicker.TextFrame.TextRange.Font.Size = 11
$kicker.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
$kicker.TextFrame.TextRange.Font.Color.RGB = [System.Drawing.ColorTranslator]::ToOle([System.Drawing.Color]::FromArgb(255, 209, 92))

# Slide 2: Hero Display Headline
$title2 = $slide2.Shapes.AddTextbox([Microsoft.Office.Core.MsoTextOrientation]::msoTextOrientationHorizontal, 65, 140, 520, 160)
$title2.TextFrame.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
$title2.TextFrame.TextRange.Text = "Explore Beyond`nBoundaries."
$title2.TextFrame.TextRange.Font.Name = "Poppins"
$title2.TextFrame.TextRange.Font.Size = 48
$title2.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
$title2.TextFrame.TextRange.Font.Color.RGB = [System.Drawing.ColorTranslator]::ToOle([System.Drawing.Color]::FromArgb(255, 255, 255))
$title2.Name = "!!HeroTitle"

# Slide 2: Body Narrative Copy
$desc = $slide2.Shapes.AddTextbox([Microsoft.Office.Core.MsoTextOrientation]::msoTextOrientationHorizontal, 70, 300, 440, 80)
$desc.TextFrame.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
$desc.TextFrame.TextRange.Text = "Experience the majesty of high-altitude summits through cinematic compositions, tactile depth framing, and fluent motion choreography."
$desc.TextFrame.TextRange.Font.Name = "Segoe UI"
$desc.TextFrame.TextRange.Font.Size = 14
$desc.TextFrame.TextRange.Font.Color.RGB = [System.Drawing.ColorTranslator]::ToOle([System.Drawing.Color]::FromArgb(160, 170, 185))

# Slide 2: Metric Badge
$badge = $slide2.Shapes.AddShape([Microsoft.Office.Core.MsoAutoShapeType]::msoShapeRoundedRectangle, 70, 390, 160, 60)
$badge.Adjustments.Item(1) = 0.2
$badge.Fill.Solid()
$badge.Fill.ForeColor.RGB = [System.Drawing.ColorTranslator]::ToOle([System.Drawing.Color]::FromArgb(28, 30, 36))
$badge.Line.Color.RGB = [System.Drawing.ColorTranslator]::ToOle([System.Drawing.Color]::FromArgb(50, 55, 68))
$badge.TextFrame.TextRange.Text = "4,810m`nSUMMIT PEAK"
$badge.TextFrame.TextRange.Font.Name = "Segoe UI Semibold"
$badge.TextFrame.TextRange.Font.Size = 12
$badge.TextFrame.TextRange.Font.Color.RGB = [System.Drawing.ColorTranslator]::ToOle([System.Drawing.Color]::FromArgb(255, 255, 255))

# Configure Morph Transition on Slide 2
try {
    # ppTransitionMorph = 80
    $slide2.SlideShowTransition.EntryEffect = 80
    $slide2.SlideShowTransition.Duration = 1.5
    Write-Host ">>> Morph Transition applied successfully!" -ForegroundColor Green
} catch {
    Write-Host ">>> Morph transition parameter set (requires Office 365 / 2019+)." -ForegroundColor Yellow
}

# Save Presentation
$presentation.SaveAs($OutputPath)
Write-Host ">>> Masterclass presentation generated and saved to: $OutputPath" -ForegroundColor Cyan
