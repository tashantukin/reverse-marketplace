const scriptSrc = document.currentScript.src;
console.log({ scriptSrc });
var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
const protocol = window.location.protocol;
const token = getCookie('webapitoken');
const baseURL = window.location.hostname;
var packageId = re.exec(scriptSrc.toLowerCase())[1];

var userId;
var userguid = $('#userGuid').val()
var taskFiles = [];
var allFiles = [];

var packagePath = scriptSrc.replace("/scripts/users.js", "").trim();

function getCookie(name){
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}  
function waitForElement(elementPath, callBack)
{
  window.setTimeout(function ()
  {
    if ($(elementPath).length) {
      callBack(elementPath, $(elementPath));
    } else {
      waitForElement(elementPath, callBack);
    }
  }, 500);
}

//retrieve dynamic fields
waitForElement('.tab-content', function ()
{
const sellerFields = new Vue({
    el: ".freelancer-content-main",

    data()
    {
        return {
            allSellerFields: [],
            fieldDetails: [],
            taskOption: [],
            uploadCustomFields: [],
            url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_form?sort=ModifiedDateTime`,
            registrationStatus: 'Pending',
            adminComment: '',
            companyName: '',
            address: '',
            country: '',
            state: '',
            city: '',
            postalCode: '',
            telephone: '',
            isEdit: 0,
            allTabs: []

        }
    },
    methods: {

        async getAllSellerFields()
        {
            try {
                vm = this;
                const response = await axios({
                    method: "GET",
                    url: vm.url,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const details = await response
                vm.allJobDetails = details.data
                vm.fieldDetails = vm.allJobDetails.Records
                vm.uploadCustomFields = vm.allJobDetails.Records.filter((field) => field.type_of_field === 'file')
                console.log(vm.uploadCustomFields)
                if ($('#userGuid').length != 0) {
                    vm.getUserDetails();
                }
               // vm.taskOption = $.parseJSON(vm.jobDetails[0].values);
                
            } catch (error) {
                console.log("error", error);
            }

            
        },

        async getUserDetails()
        {
            vm = this;
            var data = [{ 'Name': 'user_id', 'Operator': "equal", "Value": $('#userGuid').val() }]
                
            $.ajax({
                method: "POST",
                url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_details/`,
                headers: {
                    "Content-Type": "application/json"
                },
                
                data: JSON.stringify(data),
                //  })
                success: function (response)
                {
                    console.log({ response })
                
                    const users = response
                    const userDetails = users.Records[0]
              
                    if (userDetails) {
                        vm.isEdit = 1;
                        vm.adminComment = userDetails['admin_comment']
                        vm.registrationStatus = userDetails['status']

                        $('.nav-tabs li:nth-child(1)').removeClass('active');
                        $('.nav-tabs li:nth-child(3)').addClass('active');
                        $('#registration').removeClass('active in');
                        if (vm.registrationStatus == 'Approved') {
                            $('#approval').addClass('active in'); 
                        } else {
                            $('#verification').addClass('active in');
                        }
                       
                        //hide the back to registration button
                        $('#verification-details .btn-jobform-outline').hide();

                        $('#company-name').val(userDetails['company_name'])
                        $('#address').val(userDetails['full_address']);
                        $('#city').val( userDetails['city']);
                        $('#state').val( userDetails['state']);
                        $('#country').val(userDetails['country']);
                        $('#postal-code').val( userDetails['postal_code']);
                        $('#phone').val(userDetails['contact_number']);

                        //files 
                        var files = JSON.parse(userDetails['attached_files']);
                        console.log({ files });

                        files.forEach(function (file, i)
                        {
                            file['files'].forEach(function (filename, i)
                            {
                                $('.table-document tbody').append(`<tr>
                                <td class="action-icondelete"><a class="delete-cat" href="javascript:void(0)"><i class="icon icon-ndelete"></i></a></td>
                                <td>${filename['name']}</td>
                                <td><div class="text-right document-action"><a href="${filename['URL']}">View</a>|<a href="${filename['URL']}">Download</a></div></td>
                                </tr>`);
                            })
                        })
                    }
            
                
            
                }
            
            
            })
 
        },

        
        async getAllTabs()
            {
               
                try {
                    vm = this;
                    const response = await axios({
                        method: "GET",
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/onboard_fields_tabs?sort=sort_order`,
                        // data: data,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const tabs = await response
                    vm.allTabs = tabs.data.Records
                    var classes= "";
                    console.log(vm.allTabs);
                    
                    $.each(vm.allTabs, function (index, tab)
                    {  
                        if (tab.sort_order == 0) {
                            classes = "tab-pane fade in active";
                        } else {
                             classes = "tab-pane fade";
                        }
                        $(".tab-content").append(`
                        
                             <div id="${tab.Id}" class="${classes}"
                             classification-name="${tab.tab_name}">
                            <div class="jobform-form">

                             <hr>
                             <div class="next-tab-area"><span class="seller-btn"> <a onclick="j_nextTab();"
                                class="my-btn btn-red" href="javascript:void(0);">Next</a> </span></div>
                                </div>
                            </div>

                         `)
                          $(".my-btn").css({ padding: "0px" });
                          $(".fancy-checkbox label span").css({height: "0px"});
                        
                        vm.getAllFields(tab.Id, tab.tab_name)

                    })

    
                } catch (error) {
                    console.log("error", error);
                }
        },

        async getAllFields(tabId,tabName)
         {
                vm = this;
                var data = [{ 'Name': 'classification', 'Operator': "equal", "Value": tabId }]
            
                
            $.ajax({
                method: "POST",
                url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_form/`,
                headers: {
                    "Content-Type": "application/json"
                },
                
                data: JSON.stringify(data),
                //  })
                success: function (response)
                {
                    console.log({ response })
                
                    const fields = response.Records

                    if (fields.length > 0) {
                        const fieldDetails = fields;
                        
                        $.each(fieldDetails, function (index, field)
                        {
                            fieldName = field.name,
                            fieldType = field.type_of_field,
                            fieldId = field.Id 
                            var customFieldInput = '';
                            
                            switch (fieldType) {
                                case 'search':

                                customFieldInput = `<div class="search-abn">
                                <input type="search" class="form-control search" name="${fieldName}"
                                    placeholder="${field.placeholder}">
                                <button><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg></button>
                                </div>`
                                    break;
                                
                                case 'textfield':
                            
                                    customFieldInput = ` <input type="text" class="form-control" name="${fieldName}"id="${fieldName}" placeholder="${field.placeholder}">`
                                    break;
                               
                                case 'dropdown':
                                    let options;
                                   
                                    $.each(JSON.parse(field.values), function (index, option)
                                    {
                                        options += `<option name='${option}' value="${option}">${option}</option>`
                                    });
                                    customFieldInput = `<select id="${fieldId}" class="form-control"  name="${fieldName}" id="${fieldName}" type="dropdown">
                                      ${options}
                                    </select>`;
                                    break;    
                                       
                                case 'checkbox': 

                                    let chkoptions = '';
                                    $.each(cf.values, function (index, option)
                                    {
                                        chkoptions += `<div class="fancy-checkbox checkbox-sm">
                                        <input type="checkbox" id="${option}" name="${option}">
                                        <label for="${option}"><span>${option}</span>
                                        </label>  </div>`
                                    });
                                   customFieldInput = `<class="btn-hbox custom-fancyjb cdflex btn-hrmmargin customcheckbox" id="${fieldId}"> 
                                    ${chkoptions}
                                    </div>`;
                                    break;

                                case 'radiobutton': 
                                    break;
                                
                                case 'number': 
                            
                                    customFieldInput = ` <input type="number" class="form-control" name="${fieldName}"id="${fieldName}" placeholder="${field.placeholder}">`
                                    break;
                                
                                
                                
                            }
                            
                            var customField = `<h3>${tabName}</h3>
                            
                            <div class="form-group custom-details">
                            
                              <label for=${fieldName}>${fieldName}</label>       
                                ${customFieldInput}
                            </div>

                            `
                        
                            $(`.tab-content #${tabId} .jobform-form`).prepend(customField)


                        })

                        
                        
                    }
                   

                }
            
            
            })
        },

    },

    filters: {
        capitalize: function (str)
        {
          return str.charAt(0).toUpperCase() + str.slice(1);
        },

        hypenate : function (str)
        {
          return str.replace(" ","-").toLowerCase();
        },
      },
    beforeMount() {
        this.getAllTabs()
    },

    mounted() {
       // this.currentTime = 3;
    
        this.$nextTick(() => {
            this.getAllSellerFields()
            
           // this.getUserDetails();
        });
      }



    

})

})

//home page buyer
window.onload = function ()
{
    const jobDetails = new Vue({
        el: ".freelancer-content-main",

        data()
        {
            return {
                allJobs: [],
                url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_form?sort=ModifiedDateTime`

            }
        },
        methods: {

            async getAllJobs(action)
            {
                try {
                    vm = this;
                    const response = await axios({
                        method: action,
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_cache`,
                        // data: data,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const jobs = await response
                    vm.allJobs = jobs.data.Records

                    console.log(vm.allJobs);
                
                    // return templates

                } catch (error) {
                    console.log("error", error);
                }
            },


        },

        filters: {
            capitalize: function (str)
            {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },

            hypenate: function (str)
            {
                return str.replace(" ", "-").toLowerCase();
            },
        },
        beforeMount()
        {
            this.getAllJobs('GET')
          
        }

    })
    
}

var usersData = (function ()
  {
    var instance;
   
    var userToken, userId;


    function init()
    {
        function createUser(email, password, confPassword)
        {
            
            var apiUrl = packagePath + '/get_token.php';
            $.ajax({
                url: apiUrl,
                method: 'POST',
            
                contentType: 'application/json',
                // data: JSON.stringify(data),
                success: function (response)
                {
                    var adminToken = $.parseJSON(response);
                    var atoken = adminToken['token']['access_token'];
                   // console.log({ atoken })
                    uploadData = { 'Email': email, 'Password' : password, 'ConfirmPassword' : confPassword } 
                    var id = adminToken['id'];
                   // console.log({ id })
                    
                    console.log('data' + JSON.stringify(uploadData));
                    var url = `${protocol}//${baseURL}/api/v2/accounts/register`;
                    jQuery.ajax({
                    url: url,
                    data: JSON.stringify(uploadData),
                    cache: false,
                    contentType: false,
                    processData: false,
                    method: 'POST',
                    type: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                        },
                    beforeSend: function beforeSend(xhr)
                    {
                        xhr.setRequestHeader('Authorization', `Bearer ${atoken}`);
                    },
                    success: function success(result)
                    {
                        jQuery(".jobform-tab li.active").next('li').children('a').trigger('click');
                        $('#verification-details .btn-jobform-outline').hide()
                        $('#register-modal-consumer').hide();
                        $('#register-modal-seller').hide();
                        $('.cart-menu').hide();
                       // console.log(result);
                       
                      //  console.log(result['access_token']);
                        userId = result['UserId'];
                       

                        if (typeof successCallback === "function") {
                        if (result && result.length > 0) {
                    
                            // successCallback(result[0].SourceUrl);
                        } else {
                            //failedCallback(null);
                        }
                        }
                    },
                    error: function error(e)
                    {
                        if (typeof failedCallback === "function") {
                        failedCallback(e);
                        }
                        console.log(e.status)
                        console.log(e.responseText);
                        var res =  JSON.parse(e.responseText)
                        console.log(JSON.parse(e.responseText));
                        console.log(res['Message']);

                        if (res['Message'] == 'Username is already taken.') {
                            $('#email').addClass('error-con');
                            $('#email').after('<p class="warning-message">Email is already taken. </p>')
                        }

                        if (res['Message'] == 'The request is invalid.') {
                            console.log(Object.keys(res['ModelState']))
                        }
                        


                        //console.log(Object.values(e.responseText['ModelState']))
                       // toastr.error('An error occurred when saving event, please try again.', 'Oops!Something went wrong.');
                        return;
                    }
                    });

                
                }
            
            
            })
        
        }

        function saveUser(cf,location,files)
        {
            
            var user_details = {

                "user_id": userId,
                "custom_fields": cf,
                "servicing_area": location,
                "status": "Pending",
                'files': files,
                'full_address': `${$('#address').val()} ${$('#city').val()}  ${$('#country').val()} ${$('#state').val()} ${$('#postal-code').val()}`,
                'email': $('#email').val(),
                'company_name': $('#company-name').val(),
                'country':  $('#country').val(),
                'state' :$('#state').val(),
                'city' : $('#city').val(),
                'postal-code': $('#postal-code').val(),
                'contact-number' : $('#phone').val()
            };
        
            console.log(user_details);
            var settings = {
                "url": packagePath + "/save_user.php",
                "method": "POST",
                "data": JSON.stringify(user_details)
            }
            $.ajax(settings).done(function(response){
                
               // var allresponse = $.parseJSON(response)
                console.log($.parseJSON(response));
               // localStorage.setItem("jobID", allresponse.Id);
        
        
             
            });
        
        }



        function getCustomFieldValues()
        {
            //get all the textfields and dropdowns
            customfield_data = [];
            checkbox_data = [];
           
            $('.custom-details').find(':input').not('.search').each(function ()
            {
                textfield_data = [];
     
                        if ($(this).attr('type') != "search" && $(this).attr('type') != "checkbox" && $(this).attr('type') != "hidden" ) {
                        // if ($(this).attr('type') != 'checkbox') {
                                let custom_code = $(this).attr('name');
                                let custom_value = $(this).val();
                                textfield_data.push(custom_value);

                                customfield_data.push({ 'code': custom_code, 'Values': textfield_data })
                        //  }
                        }
            });
            
           
            //for checkboxes
            $('.customcheckbox').each(function ()
            {
            let chkoptions = [];
            $(this).find(':checkbox:checked').each(function ()
            {
                console.log($(this).attr('data-name'));
                chkoptions.push($(this).attr('data-name'));
            });
            customfield_data.push({ 'code': $(this).attr('id'), 'Values': chkoptions });
            });

            
            console.log(customfield_data);
            allFiles[0]['files'] = taskFiles;
            console.log({ allFiles });
            saveUser(customfield_data, $('#location').val(), allFiles);
           // saveCustomFiedldValues(customfield_data);
        }


        function confirmRegistration()
        {
            var details = {

                "Id": $('#userGuid').val()
                
            };
        
          
            var settings = {
                "url": packagePath + "/update_confirmation.php",
                "method": "POST",
                "data": JSON.stringify(details)
            }
            $.ajax(settings).done(function(response){
                
               
            
            });
    
        }

      
      return {
          createUser: createUser,
          saveUser: saveUser,
          getCustomFieldValues: getCustomFieldValues,
          confirmRegistration : confirmRegistration
     
      }
    }
      return {
        getInstance: function ()
        {
          if (!instance) {
          
              instance = init()
          
          }
          
          return instance
        }
      }

})()

var documentData = (function ()
  {
    var instance;
  //  var taskFiles = [];
    function init()
    {

        function getFile (category)       
        {   
            if ($("#uploads[type='file']") !== undefined && $("#uploads[type='file']") !== null && $("#uploads[type='file']").val() !== '') {

                totalfiles = document.getElementById('uploads').files.length;
                console.log({ totalfiles });
    
                var fileList = [];
                
                for (var index = 0; index < totalfiles; index++) {
    
                    fileList.push(document.getElementById('uploads').files[index])
                }
                
                fileList.forEach( function (file, i) {
                
                    sendFile(file, category);
                    console.log({ i });
                
                })
                allFiles.push({ "name": category, "files": ''})
 

            } 
        }

        function sendFile(file, category)
        {
            
            var apiUrl = packagePath + '/get_token.php';
            $.ajax({
                url: apiUrl,
                method: 'POST',
            
                contentType: 'application/json',
                // data: JSON.stringify(data),
                success: function (response)
                {
                    var adminToken = $.parseJSON(response);
                    var atoken = adminToken['token']['access_token'];
                    console.log({ atoken })
                    
                    var id = adminToken['id'];
                    console.log({ id })
                    
                    var data = new FormData();
                    data.set('file', file);

                    console.log('data' + JSON.stringify(data));
                    var url = '/api/v2/files/' +  id  + '/files/';
                    jQuery.ajax({
                    url: url,
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    method: 'POST',
                    type: 'POST',
                    beforeSend: function beforeSend(xhr)
                    {
                        xhr.setRequestHeader('Authorization', `Bearer ${atoken}`);
                    },
                    success: function success(result)
                    {
                        console.log(result);
                        taskFiles.push({ 'URL': result[0]['SourceUrl'], 'name': result[0]['Filename'] });
                        console.log({ taskFiles });

                        // allFiles.forEach(function (filename, i)
                        // {
                            $('.table-document tbody').append(`<tr>
                            <td class="action-icondelete"><a class="delete-cat" href="javascript:void(0)"><i class="icon icon-ndelete"></i></a></td>
                            <td>${result[0]['Filename']}</td>
                            <td><div class="text-right document-action"><a href="${result[0]['SourceUrl']}">View</a>|<a href="${result[0]['SourceUrl']}">Download</a></div></td>
                            </tr>`);
                            
                        // })

                        // i == (totalfiles - 1) ? saveFiles("POST") : '';
                        

                        if (typeof successCallback === "function") {
                        if (result && result.length > 0) {
                    
                            // successCallback(result[0].SourceUrl);
                        } else {
                            //failedCallback(null);
                        }
                        }
                    },
                    error: function error(e)
                    {
                        if (typeof failedCallback === "function") {
                        failedCallback(e);
                        }

                        toastr.error('An error occurred when saving event, please try again.', 'Oops!Something went wrong.');
                        return;
                    }
                    });

                
                }
            
            
            })
        
        }

        async function saveFiles(action, jobID)
        {
        try {
            
            const defaultURL = `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_custom_task_cache/rows`
            
            url =  defaultURL;
            
            uploadData = { 'all_tasks': JSON.stringify(allTasks), 'jobID' : jobID}
            
            const response = await axios({

                method: action,
                url: url,
                data:  uploadData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const uploadedData = await response
        

            console.log({ uploadedData  });
            

        } catch (error) {
            console.log("error", error);
        }
        
        }
        
        function saveTask()
        {
            allTasks.push({ 'task_name': $('#job_name').val(), 'address': $('#work_done').val(), 'remote': $('.modal-content #remote')[0].checked, 'in_person': $('.modal-content #in-person')[0].checked, 'files': taskFiles })
            console.log({ allTasks });
            $("#file-doc[type='file']").val('');

            taskFiles = [];

            var last = allTasks[allTasks.length - 1];
            var index = allTasks.indexOf(last);
            console.log({ index })
            
            
            console.log({ last });
            console.log(last['task_name']);
            var filec = last['files']
            var fileCount =  filec.length
          //  console.log(fileCount.length);

            //append task details below
            var jobBox =  `<div class="job-main-box"><a href="javascript:void(0);" class="action"><i class="icon icon-ndelete"></i></a> <div class="job-desc"><p>${last['task_name']}</p> <p class="text-gray">${last['address']}</p></div> <a href="javascript:void(0);" class="no-off-file">No. of File: ${fileCount}</a></div> `

            $('.job-list-box').append(jobBox);

        }

      return {
        sendFile: sendFile,
        getFile: getFile,
        saveFiles: saveFiles,
        saveTask :saveTask
      }
    }
      return {
        getInstance: function ()
        {
          if (!instance) {
          
              instance = init()
          
          }
          
          return instance
        }
      }

})()


$(document).ready(function ()
{
   // $('#register-modal-consumer').hide();
    $('#register-modal-seller').hide();
    $('.cart-menu').hide();
    $(".my-btn").css({ padding: "0px" });
    $('body').append('<input type ="hidden" id="location">');
    
    $('body').on('click', '.btn-register', function ()
    {
        $('#email').removeClass('error-con');
        $('#password').removeClass('error-con');
        $('#retype_password').removeClass('error-con');

        if ($('#email').val() == "" && $('#password').val() == "" && $('#retype_password').val() == "") {
            $('#email').addClass('error-con');
            $('#password').addClass('error-con');
            $('#retype_password').addClass('error-con')
        } else {
            var users = usersData.getInstance();
            users.createUser($('#email').val(), $('#password').val(), $('#retype_password').val());
        }
       
    })

    $('body').on('change', '#uploads', function (){
        var documents = documentData.getInstance();
        taskFiles = [];
        documents.getFile($(this).attr('upload-name'));
        
    })

    $('body').on('click', '#verification-details .jobform-form .next-tab-area .my-btn', function ()
    {
        //validation here

        //validation passed
        var users = usersData.getInstance();
        users.getCustomFieldValues();
        

    })

    $('body').on('click', '#start .seller-btn .my-btn', function ()
    {
        var users = usersData.getInstance();
        users.confirmRegistration();
    })

    


})