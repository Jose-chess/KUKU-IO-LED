Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

exePath = "C:\KUKU-IO LED\frontend\src-tauri\target\release\KUKU-IO LED.exe"

If fso.FileExists(exePath) Then
    shell.Run Chr(34) & exePath & Chr(34), 0, False
Else
    MsgBox "No se encontró la app compilada. Ejecuta primero npm run tauri:build.", 48, "KUKU-IO LED"
End If
