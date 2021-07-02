yarn
ng build -c production
aws s3 sync dist\AppDownloadPortal s3://system-micromarket-app-download-portal --exclude "data" --delete --acl public-read
