# ---
# PowerShell Script to create the React project structure
# ---

Write-Host "1. Creating base directories..."
mkdir "src\components\ui", "src\components\layout", "src\components\common", "src\pages\auth", "src\pages\client", "src\pages\admin", "src\config", "src\hooks"

Write-Host "2. Creating component files..."
New-Item "src\components\ui\Button.jsx", "src\components\ui\Input.jsx", "src\components\ui\LoadingSpinner.jsx" -ItemType File
New-Item "src\components\layout\Navbar.jsx", "src\components\layout\Sidebar.jsx", "src\components\layout\ProtectedRoute.jsx" -ItemType File
New-Item "src\components\common\ServiceCard.jsx", "src\components\common\BookingForm.jsx" -ItemType File

Write-Host "3. Creating page files..."
New-Item "src\pages\auth\Login.jsx", "src\pages\auth\Signup.jsx" -ItemType File
New-Item "src\pages\client\Home.jsx", "src\pages\client\Services.jsx", "src\pages\client\Booking.jsx", "src\pages\client\Confirmation.jsx" -ItemType File
New-Item "src\pages\admin\AdminDashboard.jsx", "src\pages\admin\AgentBookings.jsx", "src\pages\admin\AddService.jsx" -ItemType File
New-Item "src\pages\NotFound.jsx" -ItemType File

Write-Host "4. Creating config and hooks files..."
New-Item "src\config\firebase.js" -ItemType File
New-Item "src\hooks\useAuth.js" -ItemType File # (Example hook file)

Write-Host "Project structure created successfully!"

