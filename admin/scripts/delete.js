(function() {
    var scriptSrc = document.currentScript.src;
    var packagePath = scriptSrc.replace('/scripts/delete.js', '').trim();
    var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
    var packageId = re.exec(scriptSrc.toLowerCase())[1];
    var userId = $('#userGuid').val();
    var customFieldPrefix = packageId.replace(/-/g, "");
    var timezone_offset_minutes = new Date().getTimezoneOffset();
    timezone_offset_minutes = timezone_offset_minutes == 0 ? 0 : -timezone_offset_minutes;
    var accessToken = 'Bearer ' + getCookie('webapitoken');
    const baseURL = window.location.hostname;
    const protocol = window.location.protocol;
    var urls = window.location.href.toLowerCase();

    function getCookie (name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

    

    function deleteData(customTableName)
    {
        var data = { 'table-name':  customTableName };
        var apiUrl = packagePath + '/delete_table_data.php';
        $.ajax({
            url: apiUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response)
            {
               console.log('deleted')
        
            },
            error: function (jqXHR, status, err)
            {
                toastr.error('---');
            }
        });

    }  

    
    $(document).ready(function ()
    {
        

        $("#delete-data").on("click", function ()
        {
            deleteData($('#table-name').val());
        })

       
    });
})();