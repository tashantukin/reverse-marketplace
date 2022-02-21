
const scriptSrc = document.currentScript.src;
var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
 const protocol = window.location.protocol;
const token = getCookie('webapitoken');
const baseURL = window.location.hostname;
var packageId = re.exec(scriptSrc.toLowerCase())[1];
var userId = $("#userGuid").val();
var packagePath = scriptSrc.replace("/scripts/lodge_job.js", "").trim();

//document upload vars
var allFiles = [];
var allTasks = [];
var totalfiles;


function getCookie(name){
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}  

function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
        }    
    } 
 
function cache_save_job()
{
    var baseUrl = window.location.href;  
    var packagePath = baseUrl.replace('/lodge_job.php', '').trim();
    var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
    var packageId = re.exec(baseUrl.toLowerCase())[1];
    var buyer_registered;
    var buyerID = $("#userGuid").val();

   
    // if(buyerID == undefined){
    //     buyer_ID = Date.now();
    //     document.cookie = "buyerID:" + buyerID;
    // }
    var selectedTasks = new Array();
    $("#task-list input[name='tasks']:checked").each(function ()
    {
        var text = $(this).closest('div').find('span').text();
        console.log({ text })
        selectedTasks.push(text);
   });

    var job_details = {
        "remote_work": $("#remote_work")[0].checked,
        "inperson_work": $("#in_person_work")[0].checked,
        "inperson_work_address": $("#location_details").val(),
        "job_type_full_time": $("#full_time")[0].checked,
        "job_type_contract": $("#contract")[0].checked,
        "payment_fixed": $("#payment_fixed")[0].checked,
        "payment_fixed_value": $("#payment_fixed_value").val(),
        "payment_hourly": $("#payment_hourly")[0].checked,
        "payment_hourly_value": $("#payment_hourly_value").val(),
        "job_availability" : $("#job_valid").val(), 
       
        "time_frame_urgent": $("#urgent")[0].checked,
        "time_frame_nohurry": $("#no_hurry")[0].checked,
        "time_frame_timestamp": $("#date-valid").val(),
        "comments": $("#comments").val(),
        "acknowledged_legal": $("#acknowledge")[0].checked,
        "buyer_email": $("#email").val(),
        "buyer_name": $("#name").val(),
        "buyer_contact_no": $("#contact_number").val(),
        "provide_personal_details_to_merchant": $("#provide_applicant")[0].checked,
        "buyerID": buyerID,
        "task_type_list" : JSON.stringify(selectedTasks)
    };

    console.log(job_details);
    var settings = {
        "url": packagePath + "/save_job.php",
        "method": "POST",
        "data": JSON.stringify(job_details)
    }
    $.ajax(settings).done(function(response){
        
        var allresponse = $.parseJSON(response)
        console.log($.parseJSON(response));
        localStorage.setItem("jobID", allresponse.Id);


        var documents = documentData.getInstance();
       // documents.getFile();
        documents.saveFiles("POST", allresponse.Id);
       // document.cookie = "jobID: " + response.Id 
    });


}

const jobData = new Vue({
    el: ".freelancer-content-main",

    data()
    {
        return {
            allJobDetails: [],
            totalTabs: 0,
            jobDetails: [],
            taskOption: [],
            locationFields: [],
            timeframeFields: [],
            getquoteFields: [],
            contactFields: [],
            allTabs: [],
            allJobCustomDetails: {},
            url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_form/`

        }
    },
    methods: {

        async getAllJobData()
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
                vm.jobDetails = vm.allJobDetails.Records.filter((data) => data.name === 'Task Lists')
                vm.taskOption = $.parseJSON(vm.jobDetails[0].values);
                
            } catch (error) {
                console.log("error", error);
            }

            
        },

        async getFields(tabName, tabId)
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
                vm.jobDetails = vm.allJobDetails.Records.filter((data) => data.classification === tabName)
                vm.taskOption = $.parseJSON(vm.jobDetails[0].values);


                $("#task-list input[name='tasks']:checked").each(function ()
                {
                    
                })
                
            } catch (error) {
                console.log("error", error);
            }
        },

        async getLocationFields()
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
                vm.locationFields = vm.allJobDetails.Records.filter((data) => data.classification === "Location")
               // vm.taskOption = $.parseJSON(vm.jobDetails[0].values);


    
            } catch (error) {
                console.log("error", error);
            }
        },

        async getQuotationFields()
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
                vm.getquoteFields = vm.allJobDetails.Records.filter((data) => data.classification === "Get Quote")
               // vm.taskOption = $.parseJSON(vm.jobDetails[0].values);


    
            } catch (error) {
                console.log("error", error);
            }
        },


        async getTimeFrameFields()
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
                vm.timeframeFields  = vm.allJobDetails.Records.filter((data) => data.classification === "Time Frame")
              //  vm.taskOption = $.parseJSON(vm.jobDetails[0].values);


    
            } catch (error) {
                console.log("error", error);
            }
        },


        async getContactDetailsFields()
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
                vm.contactFields= vm.allJobDetails.Records.filter((data) => data.classification === "Contact Details")
               // vm.taskOption = $.parseJSON(vm.jobDetails[0].values);


    
            } catch (error) {
                console.log("error", error);
            }
        },

      
        async getAllTabs()
            {
               
                try {
                    vm = this;
                    const response = await axios({
                        method: "GET",
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_fields_tabs?sort=sort_order`,
                        // data: data,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const tabs = await response
                    vm.allTabs = tabs.data.Records
                    vm.totalTabs = tabs.data.TotalRecords;
                    var classes = "";
                    var backbutton = "";
                    console.log(vm.allTabs);
                    
                    $.each(vm.allTabs, function (index, tab)
                    {  
                        if (tab.sort_order == 0) {
                            classes = "tab-pane fade in active";
                           
                            
                        } else {
                            classes = "tab-pane fade";
                             backbutton =  `<button onclick="j_prevTab();" class="btn btn-jobform-outline">Back</button>`
                        }
                        //if last tab, text is Save, else, Next
                        var buttonText = vm.totalTabs == (index + 1) ? 'Save' : 'Next'
                        var buttonId = vm.totalTabs == (index + 1) ? 'save' : ""
                        console.log( `${vm.totalTabs}  ${(index + 1)}` )
                    
                        $(".tab-content").append(`
                        
                             <div id="${tab.Id}" class="${classes}"
                             classification-name="${tab.tab_name}">
                                ${backbutton}

                            <div class="jobform-form">
                            <h3>${tab.tab_name}</h3>

                             <hr>
                             <div class="next-tab-area"><span class="seller-btn"> <a onclick="j_nextTab();"
                                class="my-btn btn-red" href="javascript:void(0);" id="${buttonId}">${ buttonText }</a> </span></div>
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
                url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_form?sort=-sort_order`,
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
                        const fieldDetails = fields.sort(GetSortOrder("sort_order"));
                        
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
                            
                                    customFieldInput = `<div class="form-group custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}"> <label for=${fieldId}>${fieldName}</label>  <input type="text" class="form-control" name="${fieldName}"id="${fieldName}" placeholder=""></div>`
                                    break;
                               
                                case 'dropdown':
                                    let options;
                                   
                                    $.each(JSON.parse(field.values), function (index, option)
                                    {
                                        options += `<option name='${option}' value="${option}">${option}</option>`
                                    });
                                    customFieldInput = `<div class="form-group custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}"> <label for=${fieldId}>${fieldName}</label> <select id="${fieldId}" class="form-control"  name="${fieldName}" id="${fieldName}" type="dropdown">
                                      ${options}
                                    </select> </div>`;
                                    break;    
                                       
                                case 'checkbox': 

                                    let chkoptions = '';
                                    $.each(JSON.parse(field.values), function (index, option)
                                    {
                                        chkoptions += `<div class="fancy-checkbox checkbox-sm">
                                        <input type="checkbox" id="${option}" name="${fieldId}">
                                        <label for="${option}"><span>${option}</span>
                                        </label>  </div>`
                                    });
                                    customFieldInput = `<div class="form-group custom-fancyjb custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}"> 
                                    <label for=${fieldId}>${fieldName}</label>    
                                    ${chkoptions}
                                    </div>`;
                                    break;

                                case 'radiobutton': 
                                     let radioOptions = '';
                                    $.each(JSON.parse(field.values), function (index, option)
                                    {
                                        radioOptions += `<div class="fancy-radio radio-sm">
                                        <input type="radio" id="${option}" name="${option}">
                                        <label for="${option}"><span>${option}</span>
                                        </label>  </div>`
                                    });
                                    customFieldInput = `<div class="custom-fancyjb custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}"> 
                                    <label for=${fieldId}>${fieldName}</label>    
                                    ${radioOptions}
                                    </div>`;

                                    break;
                                
                                case 'number': 
                            
                                    customFieldInput = `<div class="form-group custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}"> <label for=${fieldId}>${fieldName}</label>  <input type="number" class="form-control" name="${fieldName}"id="${fieldName}" placeholder=""></div>`
                                    break;
                               
                                case 'datepicker':

                                    customFieldInput = `<div class="form-group custom-details" id="${fieldId}" custom-name="${fieldName}"  custom-type="${fieldType}"><label for=${fieldId}>${fieldName}</label><input type="text" class="form-control datepicker" name="${fieldName}" id="${fieldName}" placeholder="DD/MM/YYYY"> </div>`
                                    jQuery('.datepicker').datetimepicker({
                                    viewMode: 'days',
                                    format: 'DD/MM/YYYY'
                                    });
                                    break;
                                
                                case 'textarea':
                                    
                                    customFieldInput = `<div class="form-group custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}">
                                   <label for=${fieldId}>${fieldName}</label>
                                    <textarea class="form-control" name="${fieldName}" id="${fieldName}" rows="5" placeholder=""></textarea>
                                    </div>`
                                    break;
                               
                                case 'checkconfirm':

                                    customFieldInput = `<div class="form-group custom-fancyjb custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}">
                                    <div class="fancy-checkbox checkbox-sm">
                                        <input type="checkbox" name="${fieldId}" id="${fieldName}">
                                         <label for=${fieldId}>${fieldName}</label>
                                    </div>
                                    </div>`
                                    break;
                            
                                case 'file':

                                    customFieldInput = `<div class="form-group custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}">
                                        <div class="custom-fancyjb">
                                            <div class="fancy-checkbox checkbox-sm">
                                                <input type="checkbox" checked="checked" name="${fieldName}"
                                                    data-id="${fieldId}" >
                                                <label for="${fieldId}"><span> ${fieldName}
                                                    </span></label>
                                            </div>
                                        </div>

                                        <div class="driver_license_director_input">
                                            <div class="form-group">
                                                <label>Upload Documents</label>
                                                <div class="browse-control">
                                                    <a class="model-btn">
                                                        <input type="text" class="form-control" value="">
                                                        <div class="browse-btn">
                                                            <input type="file" value="Browse..." multiple
                                                                onchange="readURL(this);" id="file-doc"
                                                                upload-name="${fieldName}" field-id="${fieldId}">
                                                            <span id="logo_add2">Upload</span>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <table class="table table-document">
                                                    <tbody>


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>`
                                    break;
                                
                                case 'note':

                                    customFieldInput = `<div class="jobform-note">
                                    <p><u>Note</u></p>
                                    <p>${fieldName}</p> 
                                    <p></p>
                                </div>`
                                    break;
                                case 'location':
                                     customFieldInput = `<div class="btn-hbox custom-fancyjb cdflex">
                       
                              <div class="fancy-radio radio-sm">
                                 <input type="radio" name="remote_work" id="remote_work" value="0" checked="">
                                 <label for="remote_work"><span>Remote Work</span></label>
                              </div>
                              <div class="fancy-radio radio-sm">
                                 <input type="radio" name="remote_work" id="in_person_work" value="1">
                                 <label for="in_person_work"><span>In-Person Work</span></label>
                              </div>
                           </div>


                            <div class="location-map-hide-show" style="">
                            
                            <div class="form-group">
                                    <label for="location_details">Location Details</label>
                                    <input type="text" class="form-control" name="location_details" id="location_details" placeholder="" value="Sample Address 13, SY123">
                                    </div>
                            <div class="mapcontainer">
                                <div id="map">

                                </div>
                            </div>

                            </div>`
                        
                            }
                            
                            var customField = `
                                ${customFieldInput}
                            `
                        
                            $(`.tab-content #${tabId} .jobform-form hr`).before(customField)


                        })

                        
                        
                    }
                   

                }
            
            
            })
        },

        async getAllFieldData(el)
        {
            //
             el.find('.tab-pane').each(function ()
             {
                 var tabData = [];
                 var $this = $(this);
                 var customValue;
                 $(this).find('.custom-details').each(function ()
                      
                 {
                     switch ($(this).attr('custom-type')) {
                        
                         case 'textfield':
                             customValue = $(this).find('input').val();
                             break;
                         case 'number':
                            customValue = $(this).find('input').val();
                             break;
                         case 'datepicker': 
                            customValue = $(this).find('input').val();
                             break;
                         case 'textarea': 
                            customValue = $(this).find('textarea').val();
                             break;
                         case 'dropdown': 
                            customValue = $(this).find('select').val();
                             break;
                         case 'radiobutton': 
                            customValue = $(this).find("input:checked").attr('name');
                             break;
                         case 'checkbox': 
                            var checkvalues = [];
                            $(this).find('input:checkbox').each(function() 
                            {    
                                if($(this).is(':checked'))
                                checkvalues.push($(this).attr('id'));
                            });
                            customValue = checkvalues;
                             break;
                         
                         case 'checkconfirm': 
                            var checkvalues = [];
                            $(this).find('input:checkbox').each(function() 
                            {    
                                if($(this).is(':checked'))
                                checkvalues.push($(this).attr('id'));
                            });
                            customValue = checkvalues;
                             break;

                    }


                     tabData.push({ 'tab_name': $this.attr('classification-name'), 'customfield_id': $(this).attr('id'), 'customfield_name' : $(this).attr('custom-name'), 'values' : customValue})
                 })


                 vm.allJobCustomDetails[$(this).attr('id')] = tabData;   
            })
            console.log( `${ JSON.stringify(vm.allJobCustomDetails) }`)
        }
        

    },
    beforeMount() {
        // this.getAllJobData()
        // this.getLocationFields()
        // this.getQuotationFields()
        // this.getTimeFrameFields()
        // this.getContactDetailsFields()
        this.getAllTabs()
    }

})


//document upload func

var documentData = (function ()
  {
    var instance;
    var taskFiles = [];
    function init()
    {

        function getFile (el)       
        {   
            if ($("#file-doc[type='file']") !== undefined && $("#file-doc[type='file']") !== null && $("#file-doc[type='file']").val() !== '') {

                totalfiles = document.getElementById('file-doc').files.length;
                console.log({ totalfiles });
                var fieldId = el.attr('field-id');
                var tabId =  el.parents('.tab-pane').attr('id');
    
                var fileList = [];

                if (totalfiles > 5) {
                    alert("You can select only 5 files");
                } else {
                    for (var index = 0; index < totalfiles; index++) {
    
                    fileList.push(document.getElementById('file-doc').files[index])
                }
                
                fileList.forEach( function (file, i) {
                
                    sendFile(file, fieldId, tabId, i);
                    console.log({ i });
                
                })
                  
                }
                
                

            } 
        }

        function sendFile(file, fId, tId, i)
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
                    //console.log({ atoken })
                    
                    var id = adminToken['id'];
                   // console.log({ id })
                    
                    var data = new FormData();
                    data.set('file', file);

                   // console.log('data' + JSON.stringify(data));
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
                            taskFiles.push({ 'URL': result[0]['SourceUrl'], 'name': result[0]['Filename'], 'field-id': fId, 'tab-id': tId });
                            console.log({taskFiles})
                        // allFiles.forEach(function (filename, i)
                        // {
                            $('.table-document tbody').append(`<tr>
                            <td class="action-icondelete"><a class="delete-cat" href="javascript:void(0)"><i class="icon icon-ndelete"></i></a></td>
                            <td>${result[0]['Filename']}</td>
                            <td><div class="text-right document-action"><a href="${result[0]['SourceUrl']}" target="_blank">View</a>|<a href="${result[0]['SourceUrl']}" target="_blank">Download</a></div></td>
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

           // taskFiles = [];

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
    //getToken()
    $(".my-btn").css({ padding: "0px" });
    $(".fancy-checkbox label span").css({height: "0px"});

    $('body').on('change', '#file-doc', function (){
        var documents = documentData.getInstance();
        documents.getFile($(this));
        
    })
    
    $('body').on('click', '.btn-quote-submit', function ()
    {
        var documents = documentData.getInstance();
        documents.saveTask();
    })


    $('body').on('focus',".datepicker", function(){
            $(this).datetimepicker({
                viewMode: 'days',
                format: 'DD/MM/YYYY'
            })
    });


    $('body').on('click', '#save', function ()
    {
        jobData.getAllFieldData($('.tab-content'));

    })

        $('body').on('change', '#in_person_work', function() {
        console.log('in person click')
        if ($(this).is(':checked')) {
            $('.location-map-hide-show').fadeIn('slow');
           // newMap()
        } else {
            $('.location-map-hide-show').fadeOut('slow');
        }
    });

    $('body').on('change', '#remote_work', function() {
            console.log('remote work click')
            if ($(this).is(':checked')) {
                $('.location-map-hide-show').fadeOut('slow');

            } else {
                $('.location-map-hide-show').fadeIn('slow');
            }
        });


    


})