(function ()
{
    const scriptSrc = document.currentScript.src;
    const re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
    const packageId = re.exec(scriptSrc.toLowerCase())[1];
    const packagePath = scriptSrc.replace('/scripts/scripts3.js', '').trim();
    var accessToken = 'Bearer ' + getCookie('webapitoken');
    let optionList = [];
    let selectedValue = '';
    let conf_message = '';
    let custom_id = '';
    var token = commonModule.getCookie('webapitoken');

    const baseURL = window.location.hostname;
    const protocol = window.location.protocol;

 //run on creation page only
 








    $(document).ready(function ()
    {



        getMarketplaceCustomFields(function (result)
        {
            
            if (result.some(item => item.Name === 'is_installed')) {
                console.log('saved already')
               
            } else {
                console.log('not saved already')
                updatePluginStatus()
                saveURL();
                savePluginId(packageId);
            }
            
          });


        $('#onbrd_field_type').on('change', function ()
        {
            jQuery('.cstm-fieldpop-optarea').hide();
            //append an empty textbox if the selected value is !'number' or 'text'
            selectedValue = $("option:selected", $(this)).val();
            console.log(selectedValue);

            if (selectedValue == 'checkbox' || selectedValue == 'dropdown' || selectedValue == 'radiobutton' ) {

                $('.cstm-fieldpop-optarea').show();

            }

        })
        //add options
        $('.cstm-fieldpop-optarea .addOpt').on('click', function ()
        {
            console.log('del option');
            var xc = jQuery('.cstm-fieldpop-optarea .maindiv').eq(0).clone(true);
            jQuery('input[type="text"]', xc).val('');
            jQuery('.cstm-fieldpop-optarea #dropdown-opt-draggble').append(xc);
            $(this).parents('.cstm-fieldpop-optarea').find('#dropdown-opt-draggble li:last').addClass('newOption');
            $(this).parents('.cstm-fieldpop-optarea').find('#dropdown-opt-draggble li .delete-opt:last').addClass('newDelete');

        });
        //delete options field
        $('.cstm-fieldpop-optarea .icon-delete').on('click', function ()
        {   console.log('del option ')
            if (jQuery('.cstm-fieldpop-optarea .maindiv').length == 1) {
                jQuery(this).closest('.virtual-table').find('input[type="text"]').val('');
                console.log('if')
            }
            else {
                jQuery(this).parents('.maindiv').remove();
                console.log('del else')
            }
        });
        //save button
        $('body').on('click', '#saveCustomDetails', function ()
        {
            let customName = $('#custom_name').val();
            let optionName = $('#optionName').val();
            let hasOptions = 0;
            if ($("#customType option:selected").text() == 'Dropdown' || $("#customType option:selected").text() == 'Checkbox') {
                hasOptions = 1;
            }

            if ((hasOptions == 1 && optionName != '') || (hasOptions == 0 && customName != '')) {

                jQuery('.cstm-fieldpop-optarea .virtual-table').find('input[type = "text"]').each(function ()
                {
                    if (jQuery(this).val() != '') {

                        let optionText = $(this).val()
                        let option = { 'Name': optionText, 'Translations': null };
                        console.log(option);
                        optionList.push(option);
                    }
                });

                let action = $('.custom_id').attr('dir');
                if (action != 'update') {
                    const generateRandomString = (length = 6) => Math.random().toString(20).substr(2, length)
                    const cfCode = (`${packageId}-${generateRandomString(10)}-${customName.replace(/\s+/g, '')}-REV_INPUT`)
                    conf_message = 'Custom field successfully added.';
                    selectedValue = $("option:selected", $('#customType')).val();
                    saveCustomField(cfCode, 'add', $('#custom_name').val(), selectedValue, optionList, 'Users', conf_message, $('#is-required')[0].checked)
                } else {
                    const custom_code = $('.custom_id').val();
                    selectedValue = $("option:selected", $('#customType')).val();
                    conf_message = 'Custom field successfully updated.';
                    saveCustomField(custom_code, action, $('#custom_name').val(), selectedValue, optionList, 'Users', conf_message, $('#is-required')[0].checked)
                }


            }

        });


        //new seller onboarding

        $('body').on('click', '#btn-save-onbrdfields', function ()
        {
            let customName = $('#onbrd_field_name').val();
            let optionName = $('#optionName').val();
            let hasOptions = 0;
            if ($("#onbrd_field_type option:selected").text() == 'Dropdown' || $("#onbrd_field_type option:selected").text() == 'Checkbox') {
                hasOptions = 1;
            }


            if ((hasOptions == 1 && optionName != '') || (hasOptions == 0 && customName != '')) {

                jQuery('.cstm-fieldpop-optarea .virtual-table').find('input[type = "text"]').each(function ()
                {
                    if (jQuery(this).val() != '') {

                        let optionText = $(this).val()
                        let option = optionText;
                        console.log(option);
                        optionList.push(option);
                    }
                });

                let action = $('#field-action').val();
                if (action != 'edit') {
                    const generateRandomString = (length = 6) => Math.random().toString(20).substr(2, length)
                    const cfCode = (`${packageId}-${generateRandomString(10)}-${customName.replace(/\s+/g, '')}-REV_INPUT`)
                    conf_message = 'Custom field successfully added.';
                    selectedValue = $("option:selected", $('#onbrd_field_type')).val();
                    selectedStep = $("option:selected", $('#onbrd_steps')).val();
                    saveCustomField(cfCode, 'add', $('#onbrd_field_name').val(), selectedValue, selectedStep, JSON.stringify(optionList), 'Users', conf_message,$('#is-required')[0].checked)
                } else {
                    const custom_code = $('.custom_id').val();
                    selectedValue = $("option:selected", $('#onbrd_field_type')).val();
                    selectedStep = $("option:selected", $('#onbrd_steps')).val();
                    conf_message = 'Custom field successfully updated.';
                    saveCustomField(custom_code, action, $('#onbrd_field_name').val(), selectedValue, selectedStep, JSON.stringify(optionList), 'Users', conf_message,$('#is-required')[0].checked)
                }


            }

        });


        //job lodging details

        $('body').on('click', '#btn-save-jobfields', function ()
        {

        
         jQuery('.job-fields-modal .required').removeClass('error-con');

         var er = 0;

         jQuery('.job-fields-modal .required').each(function(){  

             var tv = jQuery(this).val();
             //var tv_select =  $("option:selected", jQuery(this)).val();

            if (tv == '' || tv == null)

            {
                console.log({tv})
                console.log(jQuery(this).attr('id'));
                jQuery(this).addClass('error-con');

                er = 1;

            } 

            });

            console.log({er})

            if (er) {

                return false;

            } else {
             

        
                let customName = $('#onbrd_field_name').val();
                let optionName = $('#optionName').val();
                let hasOptions = 0;
                if ($("#onbrd_field_type option:selected").text() == 'Dropdown' || $("#onbrd_field_type option:selected").text() == 'Checkbox') {
                    hasOptions = 1;
                }


                if ((hasOptions == 1 && optionName != '') || (hasOptions == 0 && customName != '')) {

                    jQuery('.cstm-fieldpop-optarea .virtual-table').find('input[type = "text"]').each(function ()
                    {
                        if (jQuery(this).val() != '') {

                            let optionText = $(this).val()
                            let option = optionText;
                            console.log(option);
                            optionList.push(option);
                        }
                    });

                    let action = $('#field-action').val();
                    if (action != 'edit') {
                        const generateRandomString = (length = 6) => Math.random().toString(20).substr(2, length)
                        const cfCode = (`${packageId}-${generateRandomString(10)}-${customName.replace(/\s+/g, '')}-REV_INPUT`)
                        conf_message = 'Custom field successfully added.';
                        selectedValue = $("option:selected", $('#onbrd_field_type')).val();
                        selectedStep = $("option:selected", $('#onbrd_steps')).val();
                        saveCustomField(cfCode, 'add', $('#onbrd_field_name').val(), selectedValue, selectedStep, optionList, 'Jobs', conf_message, $('#is-required')[0].checked)
                    } else {
                        const custom_code = $('.custom_id').val();
                        selectedValue = $("option:selected", $('#onbrd_field_type')).val();
                        selectedStep = $("option:selected", $('#onbrd_steps')).val();
                        conf_message = 'Custom field successfully updated.';
                        saveCustomField(custom_code, action, $('#onbrd_field_name').val(), selectedValue, selectedStep, optionList, 'Jobs', conf_message, $('#is-required')[0].checked)
                    }


                }
            }

        });

        jQuery("#removecatok #job-delete").click(function ()
        {
            
            deleteCustomField($('#field-id').val())
            //row.remove();
            //jQuery("#removecatok").fadeOut();
            //jQuery("#cover").fadeOut();
        });


        jQuery("#removecatok #seller-delete").click(function ()
        {
            
            deleteCustomFieldSeller($('#field-id').val())
           // row.remove();
            //jQuery("#removecatok").fadeOut();
            //jQuery("#cover").fadeOut();
        });



        //delete customfield 
        $('body').on('click', '#del', function ()
        {
            $('#DeleteCustomMethod').show();
            $('#cover').show();
            custom_id = $(this).attr('dir');

        });
        //edit custom field
        $("#customfieldslist").on('click', '#edit', function ()
        {
            let custom_id = $(this).attr('dir');
            $('.custom_id').val(custom_id);
            $('.custom_id').attr('dir', 'update');
            loadCustomField(custom_id);
        });
        //close pop up
        $("body").on('click', '.close', function ()
        {
            location.reload(true);
        });

        $('#popup_btnconfirm').click(function ()
        {
            deleteCustomField(custom_id);
            $('#DeleteCustomMethod').hide();
            $('#cover').hide();
        });

        $('#comment-button').click(function ()
        {
            
            saveComment();

            
        });

        $('#save-comment-list').click(function ()
        {
            
            saveCommentList();

            
        });

        

    });

    //MAIN CRUD
    function saveCustomField(customCode, action, customName, type, steps, options, referenceTable, conf_message,required)
    {
        var data = { 'action': action, 'custom_name': customName, 'type': type, 'options': options, 'reference_table': referenceTable, 'code': customCode, 'classification' : steps, 'text': $('#onbrd_field_text').val(), 'placeholder' : $('#onbrd_field_placeholder').val(), 'field-id':$('#field-id').val(),'is-required' : required  };
        console.log(data);
        var apiUrl = packagePath + '/save_customfields.php';
        $.ajax({
            url: apiUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (result)
            {
                toastr.success(conf_message);
                var response = JSON.stringify(result);
                console.log(response);
                $('#DeleteCustomMethod').hide();
                $('#cover').hide();
                location.reload(true);

            },
            error: function (jqXHR, status, err)
            {

            }
        });
    }
    function loadCustomField(customFieldCode)
    {
        var data = { 'code': customFieldCode };
        console.log(data);
        var apiUrl = packagePath + '/get_customfields.php';
        $.ajax({
            url: apiUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (result)
            {
                var response = $.parseJSON(result);
                console.log(response);
                $('#custom_name').val(response.result.Name);
                $('#customType').val(response.result.Type);

                if (response.result.Options !== null) {
                    $('.cstm-fieldpop-optarea').show();
                    $('.maindiv').remove();
                    $.each(response.result.Options, function (index, option)
                    {
                        let options = `<li class="maindiv ui-sortable-handle">
                        <div class="virtual-table">
                            <div class="virtual-table-cell"><a href="#" class="cursor-move"><i class="icon icon-draggble"></i></a></div>
                            <div class="virtual-table-cell"><input type="text" value="${option.Name}" name="checkbox-opt[]" class="required"></div>
                            <div class="virtual-table-cell"><a href="#" class="delete-opt" onclick="delete_opt(this)"><i class="icon icon-delete"></i></a></div>
                        </div>
                    </li>`;
                        $('#dropdown-opt-draggble').append(options);

                    });


                }
            },
            error: function (jqXHR, status, err)
            {

            }
        });
    }
    function deleteCustomField(fieldId)
    {
        var data = { 'code': fieldId };
        console.log(data);
        var apiUrl = packagePath + '/delete_customfield.php';
        $.ajax({
            url: apiUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (result)
            {
                toastr.success('Custom field successfully deleted.');
                console.log(result);
                location.reload(true);
            },
            error: function (jqXHR, status, err)
            {

            }
        });
    }

    function deleteCustomFieldSeller(fieldId)
    {
        var data = { 'code': fieldId };
        console.log(data);
        var apiUrl = packagePath + '/delete_customfield_seller.php';
        $.ajax({
            url: apiUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (result)
            {
                toastr.success('Custom field successfully deleted.');
                console.log(result);
                location.reload(true);
            },
            error: function (jqXHR, status, err)
            {

            }
        });
    }

    function saveURL() {
        var apiUrl = packagePath + '/save_custom_url.php';
       $.ajax({
           url: apiUrl,          
           headers: {
               'Authorization':  accessToken,
           },
           method: 'POST',
           contentType: 'application/json',
         //  data: JSON.stringify(data),
           success: function(response) {
               console.log({ response })
             
           },
           error: function (jqXHR, status, err) {
               //  toastr.error('---');
           }
       });
     
    }
    function getCookie (name) {
        var value = '; ' + document.cookie;
        var parts = value.split('; ' + name + '=');
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function savePluginId(id) {
        var data = { 'userId': userId, 'id': id };
         var apiUrl = packagePath + '/save_plugin_id.php';
        $.ajax({
            url: apiUrl,          
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
              
              
            },
            error: function (jqXHR, status, err) {
                //  toastr.error('---');
            }
        });
    }

    function updatePluginStatus() {
        var data = { 'userId': userId };
         var apiUrl = packagePath + '/update_plugin_status.php';
        $.ajax({
            url: apiUrl,          
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
              
              
            },
            error: function (jqXHR, status, err) {
                //  toastr.error('---');
            }
        });
    }

    function  saveComment()
    {
        
        var comment_details = {

            "Id": $('#comment').attr('data-id'),
            'comment' : $('#comment').val()
        };
    
        console.log({ comment_details });
        var settings = {
            "url": packagePath + "/update_comment.php",
            "method": "POST",
            "data": JSON.stringify(comment_details)
        }
        $.ajax(settings).done(function(response){
            
           
        
        });

    
    }

    function  saveCommentList()
    {
        
        var comment_details = {

            "Id": $('#comment-id').val(),
            'comment' : $('#comment-content').val()
        };
    
        console.log({ comment_details });
        var settings = {
            "url": packagePath + "/update_comment.php",
            "method": "POST",
            "data": JSON.stringify(comment_details)
        }
        $.ajax(settings).done(function(response){
            
            console.log('list comment saved');
        
        });

    
    }


    function getMarketplaceCustomFields(callback) {
        var apiUrl = "/api/v2/marketplaces";
        $.ajax({
          url: apiUrl,
          method: "GET",
          contentType: "application/json",
          success: function (result) {
            if (result) {
                callback(result.CustomFields);
                console.log(result.CustomFields)

                console.log(result.CustomFields.some(item => item.Name === 'plugin_id'));
                console.log(result.CustomFields.some(item => item.Name === 'is_installed'));
            }
          },
        });
      }

})();
