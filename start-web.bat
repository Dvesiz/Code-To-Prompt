@echo off
echo ========================================
echo 🌐 启动 Code-To-Prompt Web 界面
echo ========================================
echo.

echo 正在启动本地服务器...
echo.
echo 浏览器将自动打开 http://localhost:8000
echo.
echo 按 Ctrl+C 停止服务器
echo.

cd web
start http://localhost:8000
python -m http.server 8000
