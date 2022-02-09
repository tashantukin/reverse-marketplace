
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
            jobDetails: [],
            taskOption: [],
            locationFields: [],
            timeframeFields: [],
            getquoteFields: [],
            contactFields: [],
            allTabs: [],
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
                            <h3>${tab.tab_name}</h3>

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
                                    $.each(JSON.parse(field.values), function (index, option)
                                    {
                                        chkoptions += `<div class="fancy-checkbox checkbox-sm">
                                        <input type="checkbox" id="${option}" name="${option}">
                                        <label for="${option}"><span>${option}</span>
                                        </label>  </div>`
                                    });
                                    customFieldInput = `<div class="form-group custom-fancyjb custom-details" id="${fieldId}"> 
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
                                    customFieldInput = `<div class="custom-fancyjb custom-details" id="${fieldId}"> 
                                    <label for=${fieldId}>${fieldName}</label>    
                                    ${radioOptions}
                                    </div>`;

                                    break;
                                
                                case 'number': 
                            
                                    customFieldInput = ` <input type="number" class="form-control" name="${fieldName}"id="${fieldName}" placeholder="${field.placeholder}">`
                                    break;
                                
                                
                                
                            }
                            
                            var customField = `
                                ${customFieldInput}
                            `
                        
                            $(`.tab-content #${tabId} .jobform-form .next-tab-area`).before(customField)


                        })

                        
                        
                    }
                   

                }
            
            
            })
        },
        

    },
    beforeMount() {
        this.getAllJobData()
        this.getLocationFields()
        this.getQuotationFields()
        this.getTimeFrameFields()
        this.getContactDetailsFields()
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

        function getFile ()       
        {   
            if ($("#file-doc[type='file']") !== undefined && $("#file-doc[type='file']") !== null && $("#file-doc[type='file']").val() !== '') {

                totalfiles = document.getElementById('file-doc').files.length;
                console.log({ totalfiles });
    
                var fileList = [];
                
                for (var index = 0; index < totalfiles; index++) {
    
                    fileList.push(document.getElementById('file-doc').files[index])
                }
                
                fileList.forEach( function (file, i) {
                
                    sendFile(file, i);
                    console.log({ i });
                
                })

            } 
        }

        function sendFile(file, i)
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
                        taskFiles.push({ 'URL' : result[0]['SourceUrl'], 'name' : result[0]['Filename'] });

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
        documents.getFile();
        
    })
    
    $('body').on('click', '.btn-quote-submit', function ()
    {
        var documents = documentData.getInstance();
        documents.saveTask();
    })
    

})