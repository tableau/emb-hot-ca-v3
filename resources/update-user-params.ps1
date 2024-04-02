$tabUser = get-content 'c:\Users\Administrator\labUser.txt'
((Get-Content -path C:\Users\Administrator\Documents\HOT1860\emb-hot-ca-v3-tc24\EmbedPortal.py -Raw) -replace 'user_default',$tabUser) | Set-Content -Path C:\Users\Administrator\Documents\HOT1860\emb-hot-ca-v3-tc24\EmbedPortal.py
