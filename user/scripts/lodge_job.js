
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
                vm.jobDetails = vm.allJobDetails.Records.filter((data) => data.name === 'Task List')
                vm.taskOption = $.parseJSON(vm.jobDetails[0].values);
                
            } catch (error) {
                console.log("error", error);
            }

            
        }


    },
    beforeMount() {
        this.getAllJobData()
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