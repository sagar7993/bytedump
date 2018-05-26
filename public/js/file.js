$(document).ready(function () {
    $('.button-collapse').sideNav(
    {
        menuWidth: 300,
        edge: 'left',
        closeOnClick: true
    });    
    $('.download-file').on('click', function() {
      var fileName = $(this).attr('data-file-name');
      var url = '/fileDownload/downloadFile'; var params = { url : fileName };
      $.ajax({
        type: "POST",
        url: url,
        data: params,
        success: function(response, status, request) {
          swal({
            title: "Are you sure?",
            text: "You are about to download " + fileName,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Download",
            cancelButtonText: "Cancel",
            closeOnConfirm: false,
            closeOnCancel: false
          }, function(isConfirm) {
            if (isConfirm) {
              var disp = request.getResponseHeader('Content-Disposition');
              if (disp && disp.search('attachment') != -1) {
                var form = $('<form method="POST" action="' + url + '">');
                $.each(params, function(k, v) {
                  form.append($('<input type="hidden" name="' + k + '" value="' + v + '">'));
                });
                $('body').append(form);
                form.submit();
              }
              swal("Downloaded", "Your file has been downloaded.", "success");
            } else {
              swal("Cancelled", "Download aborted.", "error");
            }
          });
        }
      });
    });
    document.getElementById('loading').style.display = "none";
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // FileSystem API Supported is by this browser
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
});
function validation()
{
    var files = $('#file').get(0).files;
    if (files.length > 0){
      var formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        formData.append('uploads[]', file, file.name);
      }
      $.ajax({
          url: '/fileUpload',
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          success: function(data){
            sweetAlert("Success", "Your file(s) have successfully been uploaded", "success");
          },
          error: function(error){
            sweetAlert("error", "Your file(s) could not be uploaded", "error");
            console.log(error);
          }
      });
    }
    else {
        sweetAlert("Error!", "Please upload a file", "error");
    }
}