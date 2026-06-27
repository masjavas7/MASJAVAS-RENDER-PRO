; NSIS Installer Script for MASJAVAS RENDER PRO
; Built for version 1.7.2

!include "MUI2.nsh"
!include "FileFunc.nsh"

; Define Product Name, Version, and Publisher
!define PRODUCT_NAME "MASJAVAS RENDER PRO"
!define PRODUCT_VERSION "1.7.2"
!define PRODUCT_PUBLISHER "MASJAVAS Studio"
!define PRODUCT_DIR_REGKEY "Software\${PRODUCT_PUBLISHER}\${PRODUCT_NAME}"
!define PRODUCT_UNINST_KEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\${PRODUCT_NAME}"

Name "${PRODUCT_NAME}"
OutFile "MASJAVAS-RENDER-PRO-Setup-v${PRODUCT_VERSION}.exe"
InstallDir "$LOCALAPPDATA\Programs\${PRODUCT_NAME}"
InstallDirRegKey HKCU "${PRODUCT_DIR_REGKEY}" ""

; Request user privileges (AppData/Local install doesn't require admin, making it clean and standard)
RequestExecutionLevel user

; MUI Settings
!define MUI_ABORTWARNING
!define MUI_ICON "app.ico"
!define MUI_UNICON "app.ico"

; Pages
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES

; Finish Page Options
!define MUI_FINISHPAGE_RUN "$INSTDIR\MASJAVAS-RENDER-PRO.exe"
!define MUI_FINISHPAGE_RUN_TEXT "Jalankan ${PRODUCT_NAME}"
!insertmacro MUI_PAGE_FINISH

; Uninstaller Pages
!insertmacro MUI_UNPAGE_WELCOME
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_UNPAGE_FINISH

; Languages
!insertmacro MUI_LANGUAGE "English"
!insertmacro MUI_LANGUAGE "Indonesian"

; Installation Section
Section "DummySection" SEC01
  SetOutPath "$INSTDIR"
  SetOverwrite on

  ; Copy all portable application files recursively
  File /r "${__FILEdir__}\$PLUGINSDIR\app-64\*.*"

  ; Rename main executable to match product name requirements
  Rename "$INSTDIR\MASJAVAS V1.7.exe" "$INSTDIR\MASJAVAS-RENDER-PRO.exe"

  ; Create uninstaller
  WriteUninstaller "$INSTDIR\uninstall.exe"

  ; Write registry keys for install directory
  WriteRegStr HKCU "${PRODUCT_DIR_REGKEY}" "" "$INSTDIR"

  ; Write registry keys for Windows uninstaller (Add/Remove Programs)
  WriteRegStr HKCU "${PRODUCT_UNINST_KEY}" "DisplayName" "${PRODUCT_NAME}"
  WriteRegStr HKCU "${PRODUCT_UNINST_KEY}" "UninstallString" '"$INSTDIR\uninstall.exe"'
  WriteRegStr HKCU "${PRODUCT_UNINST_KEY}" "DisplayIcon" '"$INSTDIR\MASJAVAS-RENDER-PRO.exe"'
  WriteRegStr HKCU "${PRODUCT_UNINST_KEY}" "DisplayVersion" "${PRODUCT_VERSION}"
  WriteRegStr HKCU "${PRODUCT_UNINST_KEY}" "Publisher" "${PRODUCT_PUBLISHER}"

  ; Create Start Menu Shortcuts
  CreateDirectory "$SMPROGRAMS\${PRODUCT_NAME}"
  CreateShortcut "$SMPROGRAMS\${PRODUCT_NAME}\${PRODUCT_NAME}.lnk" "$INSTDIR\MASJAVAS-RENDER-PRO.exe" "" "$INSTDIR\resources\app.ico" 0
  CreateShortcut "$SMPROGRAMS\${PRODUCT_NAME}\Uninstall ${PRODUCT_NAME}.lnk" "$INSTDIR\uninstall.exe" "" "$INSTDIR\resources\app.ico" 0

  ; Create Desktop Shortcut
  CreateShortcut "$DESKTOP\${PRODUCT_NAME}.lnk" "$INSTDIR\MASJAVAS-RENDER-PRO.exe" "" "$INSTDIR\resources\app.ico" 0
SectionEnd

; Uninstaller Section
Section "Uninstall"
  ; Delete executable and shortcuts
  Delete "$DESKTOP\${PRODUCT_NAME}.lnk"
  Delete "$SMPROGRAMS\${PRODUCT_NAME}\${PRODUCT_NAME}.lnk"
  Delete "$SMPROGRAMS\${PRODUCT_NAME}\Uninstall ${PRODUCT_NAME}.lnk"
  RMDir "$SMPROGRAMS\${PRODUCT_NAME}"

  ; Delete registry keys
  DeleteRegKey HKCU "${PRODUCT_UNINST_KEY}"
  DeleteRegKey HKCU "${PRODUCT_DIR_REGKEY}"

  ; Delete all files recursively inside install directory
  RMDir /r "$INSTDIR"
SectionEnd
