var downloadSce1Button = document.querySelector('button.esc-1-start-download')
    , downloadSce2Button = document.querySelector('button.esc-2-start-download')
    , downloadSce3Button = document.querySelector('button.esc-3-start-download')
    ;


downloadSce1Button.addEventListener('click', function() {
    startDownloadOperationScene1('file1')
});


downloadSce2Button.addEventListener('click', function() {
    startDownloadOperationScene2('file1')
});


downloadSce3Button.addEventListener('click', function() {
    startDownloadOperationScene3(['file1', 'file2', 'file3', 'file4', 'file5'])
});
