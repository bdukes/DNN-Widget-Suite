@echo off

echo.
echo Setting up
echo.
set widgetsuiteversion=01.03.02
if exist packages\output\*.zip del packages\output\*.zip

echo.
echo Finding 7-Zip
echo.
if not defined zipexe set zipexe="%ProgramFiles%\7-zip\7z.exe"
if not exist %zipexe% set zipexe="%ProgramFiles(x86)%\7-zip\7z.exe"
if not exist %zipexe% echo Please install 7-Zip!
if not exist %zipexe% goto :EOF

echo.
echo Finding Microsoft Ajax Minifier
echo.
if not defined ajaxminexe set ajaxminexe="%ProgramFiles%\Microsoft\Microsoft Ajax Minifier 4\AjaxMin.exe"
if not exist %ajaxminexe% set ajaxminexe="%ProgramFiles(x86)%\Microsoft\Microsoft Ajax Minifier 4\AjaxMin.exe"
if not exist %ajaxminexe% echo Please install Microsoft Ajax Minifier 4!
if not exist %ajaxminexe% goto :EOF

echo.
echo Minifying scripts for "Install" packages
echo.
if exist packages\minjs rd /s /q packages\minjs
md packages\minjs
for %%f in (*.js) do %ajaxminexe% -clobber:true %%f -out packages\minjs\%%f

echo.
echo Packaging Install (with icons)
echo.
if exist resources.zip del resources.zip
%zipexe% a -tzip -xr@packages\ResourcesExcludeWithIcons.filelist resources.zip @packages\ResourcesCommon.filelist
cd packages\minjs
%zipexe% a -tzip -xr@..\ResourcesExcludeWithIcons.filelist ..\..\resources.zip @..\ResourcesScript.filelist
cd ..\..
%zipexe% a -tzip "packages\output\WillStrohl.WidgetSuite_%widgetsuiteversion%_Install(with Icons).zip" @packages\manifest.filelist

echo.
echo Packaging Install (no icons)
echo.
if exist resources.zip del resources.zip
%zipexe% a -tzip -xr@packages\ResourcesExcludeNoIcons.filelist resources.zip @packages\ResourcesCommon.filelist
cd packages\minjs
%zipexe% a -tzip -xr@..\ResourcesExcludeNoIcons.filelist ..\..\resources.zip @..\ResourcesScript.filelist
cd ..\..
%zipexe% a -tzip "packages\output\WillStrohl.WidgetSuite_%widgetsuiteversion%_Install(no Icons).zip" @packages\manifest.filelist

echo.
echo Packaging Source (with icons)
echo.
if exist resources.zip del resources.zip
%zipexe% a -tzip -xr@packages\ResourcesExcludeWithIcons.filelist resources.zip @packages\ResourcesCommon.filelist
%zipexe% a -tzip -xr@packages\ResourcesExcludeWithIcons.filelist resources.zip @packages\ResourcesScript.filelist
%zipexe% a -tzip "packages\output\WillStrohl.WidgetSuite_%widgetsuiteversion%_Source(with Icons).zip" @packages\manifest.filelist

echo.
echo Packaging Source (no icons)
echo.
if exist resources.zip del resources.zip
%zipexe% a -tzip -xr@packages\ResourcesExcludeNoIcons.filelist resources.zip @packages\ResourcesCommon.filelist
%zipexe% a -tzip -xr@packages\ResourcesExcludeNoIcons.filelist resources.zip @packages\ResourcesScript.filelist
%zipexe% a -tzip "packages\output\WillStrohl.WidgetSuite_%widgetsuiteversion%_Source(no Icons).zip" @packages\manifest.filelist

echo.
echo Cleaning up
echo.
del resources.zip
rd /s /q packages\minjs
