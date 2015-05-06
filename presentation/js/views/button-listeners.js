var downloadSce1Button = document.querySelector('button.esc-1-start-download')
    , downloadSce2Button = document.querySelector('button.esc-2-start-download')
    , downloadSce3Button = document.querySelector('button.esc-3-start-download')
    , downloadSce4Button = document.querySelector('button.esc-4-start-download')
    , downloadSce5Button = document.querySelector('button.esc-5-start-download')
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

downloadSce4Button.addEventListener('click', function() {
    startDownloadOperationScene4(['file1', 'file2', 'file3', 'file4', 'file5'])
});

downloadSce5Button.addEventListener('click', function() {
    startDownloadOperationScene5(['file1', 'file2', 'file3', 'file4', 'file5'])
});