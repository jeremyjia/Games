$url = 'https://www.21voa.com/'
try {
    $response = Invoke-WebRequest -Uri $url
    $htmlContent = $response.Content
    $lrcLinks = [regex]::Matches($htmlContent, 'href="([^"]+\.lrc)"')

    if ($lrcLinks.Count -gt 0) {
        Write-Host "找到了 LRC 文件链接："
        foreach ($link in $lrcLinks) {
            Write-Host $link.Groups[1].Value
        }
    } else {
        Write-Host "未找到 LRC 文件链接。"
    }
} catch {
    Write-Host "请求发生错误：$($_.Exception.Message)"
}