(function () {
const scriptSrc = document.currentScript.src;
var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
 const protocol = window.location.protocol;
const token = getCookie('webapitoken');
const baseURL = window.location.hostname;
var packageId = re.exec(scriptSrc.toLowerCase())[1];
var userId = $("#userGuid").val();
var packagePath = scriptSrc.replace("/scripts/lodge_job.js", "").trim();
var payment_enabled;
var pub_key;

// Add an instance of the card Element into the `card-element` <div>.
//document upload vars
var allFiles = [];
var allTasks = [];
var totalfiles;
var taskFiles = [];
var locationList = new Array();

const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
});
    
 function displayError(event) {
  // changeLoadingStatePrices(false);
    let displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  }
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
    $("[custom-name='Type of Tasks'] input:checked").each(function ()
    {
        var text = $(this).closest('div').find('span').text();
        console.log({ text })
        selectedTasks.push(text);
   });
    console.log({ selectedTasks });
    var job_details = {

        "custom_fields": JSON.stringify(jobData.allJobCustomDetails),
        "location_list":  JSON.stringify(locationList),
        "document_list": JSON.stringify(taskFiles),
        
        //locations
        "is_remote_work": $("#remote_work")[0].checked,
        "is_inperson_work": $("#in_person_work")[0].checked,
        "in_person_work_address": $("#location_details").val(),
        'in_person_work_coords' : Array($("#address-lat").val(),$("#address-long").val()),


        //job type
        "is_job_type_fulltime": $("#full_time")[0].checked,
        "is_job_type_contract": $("#contract")[0].checked,

        //payemnt
        "is_payment_fixed": $("#payment_fixed")[0].checked,
        "is_payment_hourly": $("#payment_hourly")[0].checked,
        "payment_amount"  : $("#amount").val(),

        //task type list
        "task_type_list" : JSON.stringify(selectedTasks),

        //time frame

        "time_frame_urgent": $("#job_completion_urgent")[0].checked,
        "time_frame_nohurry": $("#job_completion_no_hurry")[0].checked,
        "time_frame_date": $("#job_completion_specify_date")[0].checked,
        "completion_date" : $("#completion_date").val(),
        "job_validity" : $("#job_validity").val(), 
        //'comments': $("#comments_to_the_applicant").val(), 
         "comments" : $("textarea[name='Comments to the applicant']").val(),
        
        //contact info

        'buyer_name': $('#name').val(),
        'buyer_email': $('#email').val(),
        'buyer_contact' : $('#contact_number').val(),
        
        //'will_provide_info' 
    
        // "comments": $("#comments").val(),
        // "acknowledged_legal": $("#acknowledge")[0].checked,
        // "buyer_email": $("#email").val(),
        // "buyer_name": $("#name").val(),
        // "buyer_contact_no": $("#contact_number").val(),
        // "provide_personal_details_to_merchant": $("#provide_applicant")[0].checked,
        // "buyerID": buyerID,
        // "task_type_list" : JSON.stringify(selectedTasks)
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

        jQuery(".jobform-tab li.active a").attr('href');
        jQuery(".jobform-tab").removeClass('prevTab');
        jQuery('.jobform-tab .nav-tabs li').addClass('check');
        jQuery('.jobform-tab .nav-tabs li').prevAll().addClass('check');
        jQuery('.jobform-tab .nav-tabs li').removeClass('active');
        $('#register-account').attr('href', `${protocol}//${baseURL}/user/marketplace/customlogin?isSeller=false&returnUrl=${baseURL}`)
        $('#sign-up').attr('href', `${protocol}//${baseURL}/user/marketplace/customlogin?isSeller=false&returnUrl=${baseURL}`)
        
        if ( !$('#userGuid').length ) {
             setTimeout(function(){ 
             // window.location.href = "lodged.html";
        },1000);
        } else {
          //  window.location.href = '/'
        }
       
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
            url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_form/`,
            jobListCharge: 0,
            jobChargeEnabled: '',
            stripe_api_key: '',
            stripe_pub_key: '',
            stripe_client_id: ''

        }
    },
    methods: {


        async getStripeDetails()
        {
            vm = this;
            
            var apiUrl = packagePath + '/get_stripe_details.php';
            
            $.ajax({
                url: apiUrl,
                method: 'POST',
                contentType: 'application/json',
                success: function (result)
                {
                    var results = JSON.parse(result);
                    console.table(`result ${results.result.api_key}`);
                    this.stripe_api_key = results.result.api_key;
                    this.stripe_pub_key = results.result.pub_key;
                    pub_key = this.stripe_pub_key;
                    this.stripe_client_id = results.result.client_id;
                   
                 }
            })

        },

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

        async getChargeRate()
        {
            try {
                vm = this;
                const response = await axios({
                    method: "GET",
                    url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/charges_configuration/`,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const details = await response
                var jobCharges = details.data
                var jobCharge = jobCharges.Records.filter((data) => data.charge_name === 'job_listed_buyer')
                console.log({ jobCharge });

                vm.jobListCharge = parseInt(jobCharge[0].value);
            
                vm.jobListCharge = vm.jobListCharge;
                vm.jobChargeEnabled = jobCharge[0].status;
                payment_enabled = vm.jobChargeEnabled;
                this.getAllTabs();

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
                            backbutton = `<button onclick="j_prevTab();" class="btn btn-jobform-outline">Back</button>`
                        }
                        //if last tab, text is Save, else, Next
                        var buttonText = (vm.totalTabs == (index + 1) && vm.jobChargeEnabled == 'False') ? $('#button-text').val() : 'Next'
                        console.log(vm.jobChargeEnabled)
                        var buttonId = vm.totalTabs == (index + 1) ? 'save' : ""
                        console.log(`${vm.totalTabs}  ${(index + 1)}`)
                    
                        $(".tab-content").append(`
                        
                             <div id="${tab.Id}" class="${classes}"
                             classification-name="${tab.tab_name}">
                                ${backbutton}

                            <div class="jobform-form">
                            <h3>${tab.tab_name}</h3>

                             <hr>
                             <div class="next-tab-area"><span class="seller-btn"> <a onclick="j_nextTab();"
                                class="my-btn btn-red" href="javascript:void(0);" id="${buttonId}">${buttonText}</a> </span></div>
                                </div>
                            </div>

                         `)
                        $(".my-btn").css({ padding: "0px" });
                        $(".fancy-checkbox label span").css({ height: "0px" });
                        
                        vm.getAllFields(tab.Id, tab.tab_name)

                         if (vm.jobChargeEnabled == 'True') {
                            
                        
                            if (vm.totalTabs == index + 1) {

                                var paymentTab = `<div id="payment" class="tab-pane fade">
                                    <button onclick="j_prevTab();" class="btn btn-jobform-outline">Back</button>
                                    <div class="jobform-form">
                                        <h3>Payment</h3>
                                        <div class="form-group">
                                        <label for="paymentMethod">Payment Method</label>
                                        <select class="form-control required" name="payment" id="paymentScheme">
                                            <option selected="" value="stripe">Stripe</option>
                                            <option selected="" value="cod">Cash on Delivery</option>
                                        </select>
                                        </div>

                                        <div class="common-text">
                                        <p>You will be charged $ <span id="charge-amount">${formatter.format(vm.jobListCharge)} </span> to list this job</p>
                                        <p>Upon clicking the Pay button, you will be re-directed to the Payment Gateway to continue with your transaction</p>
                                        
                                        </div>
                                        <div id="card-element" style="display:none"> </div>
                                                <!-- Used to display Element errors. -->
                                                <div id="card-errors" role="alert"></div>
                                                <p id="card-errors" style="margin-bottom: 10px; line-height: inherit; color: #eb1c26; font-weight: bold;"></p>
                                            
                                                
                                                <div  id ="paynowPackage" class="next-tab-area"><span class="seller-btn"> <a onclick=""  class="my-btn btn-red" href="javascript:void(0);">Pay Now</a> </span></div>
                                                                
                                            <hr>
                                            
                                        </div>
                                    </div>`


                                    $('.tab-content').append(paymentTab);
                                    $(".my-btn").css({ padding: "0px" });
                                
                                }
                             }

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
                            fieldRequired = field.is_required;
                            var customFieldInput = '';
                            var isrequired = fieldRequired == 'True' ? 'required' : "";
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
                            
                                    customFieldInput = `<div class="form-group custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}"> <label for=${fieldId}>${fieldName}</label>  <input type="text" class="form-control ${isrequired}" name="${fieldName}"id="${fieldName.replace(" ","_").toLowerCase()}" placeholder=""></div>`
                                    break;
                               
                                case 'dropdown':
                                    let options;
                                   
                                    $.each(JSON.parse(field.values), function (index, option)
                                    {
                                        options += `<option name='${option}' value="${option}">${option}</option>`
                                    });
                                    customFieldInput = `<div class="form-group custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}"> <label for=${fieldId}>${fieldName}</label> <select id="${fieldId}" class="form-control ${isrequired}"  name="${fieldName}" id="${fieldName}" type="dropdown">
                                      ${options}
                                    </select> </div>`;
                                    break;    
                                       
                                case 'checkbox': 
                                    isrequired  = isrequired == 'required' ? 'req-chkbx' : '';
                                    let chkoptions = ''; 
                                    $.each(JSON.parse(field.values), function (index, option)
                                    {
                                        chkoptions += `<div class="fancy-checkbox checkbox-sm">
                                        <input type="checkbox" id="${option.replace(" ","_").toLowerCase()}" name="${fieldId}" >
                                        <label for="${option.replace(" ","_").toLowerCase()}"><span>${option}</span>
                                        </label>  </div>`
                                    });
                                    customFieldInput = `<div class="form-group custom-fancyjb custom-details ${isrequired}" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}"> 
                                    <label for=${fieldId}>${fieldName}</label>    
                                    ${chkoptions}
                                    </div>`;
                                    break;

                                case 'radiobutton': 
                                     let radioOptions = '';
                                    $.each(JSON.parse(field.values), function (index, option)
                                    {
                                        radioOptions += `<div class="fancy-radio radio-sm">
                                        <input type="radio" id="${fieldName.replace(" ","_").toLowerCase()}_${option.replace(" ","_").toLowerCase()}" name="${fieldId}">
                                        <label for="${fieldName.replace(" ","_").toLowerCase()}_${option.replace(" ","_").toLowerCase()}"><span>${option}</span>
                                        </label>  </div>`
                                    });
                                    customFieldInput = `<div class="custom-fancyjb custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}"> 
                                    <label for=${fieldId}>${fieldName}</label>    
                                    ${radioOptions}
                                    </div>`;

                                    break;
                                
                                case 'number': 
                            
                                    customFieldInput = `<div class="form-group custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}"> <label for=${fieldId}>${fieldName}</label>  <input type="number" class="form-control ${isrequired}" name="${fieldName}"id="${fieldName}" placeholder=""></div>`
                                    break;
                               
                                case 'datepicker':

                                    customFieldInput = `<div class="form-group custom-details" id="${fieldId}" custom-name="${fieldName}"  custom-type="${fieldType}"><label for=${fieldId}>${fieldName}</label><input type="text" class="form-control datepicker ${isrequired}" name="${fieldName}" id="${fieldName.replace(" ","_").toLowerCase()}" placeholder="DD/MM/YYYY"> </div>`
                                    jQuery('.datepicker').datetimepicker({
                                    viewMode: 'days',
                                    format: 'DD/MM/YYYY'
                                    });
                                    break;
                                
                                case 'textarea':
                                    
                                    customFieldInput = `<div class="form-group custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}">
                                   <label for=${fieldId}>${fieldName}</label>
                                    <textarea class="form-control ${isrequired}" name="${fieldName}" id="${fieldName.replace(" ","_").toLowerCase()}" rows="5" placeholder=""></textarea>
                                    </div>`
                                    break;
                               
                                case 'checkconfirm':

                                    customFieldInput = `<div class="form-group custom-fancyjb" id="" custom-name="${fieldName}" custom-type="${fieldType}">
                                    <div class="fancy-checkbox checkbox-sm">
                                        <input type="checkbox" name="${fieldId}" id="${fieldId}" class="acknowledge ${isrequired}">
                                         <label for="${fieldId}"><span>${fieldName}</span></label>
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
                                                            <input type="file" value="Browse..."
                                                                onchange="readURL(this);" id="file-doc"
                                                                upload-name="${fieldName}" field-id="${fieldId}" class="${isrequired}">
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

                            <div class="location-map-hide-show" style="display: none;">
                            
                            <div class="form-group">
                                    <label for="location_details">Location Details</label>
                                    <input type="text" class="form-control" name="location_details" id="location_details" onfocusout="codeAddress()" placeholder="" value="Sample Address 13, SY123">
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
            console.log(`${JSON.stringify(vm.allJobCustomDetails)}`)
               if (vm.jobChargeEnabled == 'False') {
                          cache_save_job();  
                }
            
        },

       async charge(token, amount)
       { 
           vm = this;
            amount = Math.round(amount * 100)
            var apiUrl = packagePath + '/stripe_charge.php';
            var data = { token, amount }
                $.ajax({
                    url: apiUrl,
                    method: 'POST',
                    contentType: 'application/json',
                     data: JSON.stringify(data),
                success: function(result) {
                    result = JSON.parse(result);
                    if (result.id) {

                        if (vm.jobChargeEnabled == 'True') {
                            cache_save_job();  
                        }
                //if there is a charge id returned, save the job details and redirect to the finish page
                        
                
                        //complete the lodge

                      
                        

                }

      
			},
			error: function(jqXHR, status, err) {
			//	toastr.error('Error!');
			}
		});
	
        },
       
       async  createStripeMember(card, stripe)
       {
           
           vm = this;
            //var addressInfo = JSON.parse(localStorage.getItem("address")) != null ? JSON.parse(localStorage.getItem("address")) : null;
        //console.log((addressInfo));
            var apiUrl = packagePath + '/createMember.php';
            var data = {
                'full_name': $('#name').val(),
                'email': $('#email').val(),
                'contact_number': $('#contact_number').val(),
                'line1':  '',
                'city':   '' , 
                'country':  '',
                'state':  '',
                'postal_code':'' 
                }
                $.ajax({
                    url: apiUrl,
                    
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: function(result) {
                        result = JSON.parse(result);    
                        var customerId = result.result
                        localStorage.setItem('stripe_payment_id', customerId);

                        vm.createPaymentMethod(customerId, card, stripe)
            
                    },
                    error: function(jqXHR, status, err) {
                    //	toastr.error('Error!');
                    }
                });
            
        },
       

        async createPaymentMethod(customerId, card, stripe)
    {
            vm = this;
        // const customerId = custom  er_id;
        // Set up payment method for recurring usage
        //var quotes = $.parseJSON(localStorage.getItem('quote_details'))
        let billingName = $('#name').val();
        
        stripe
            .createPaymentMethod({
            type: 'card',
            card: card,
            billing_details: {
                name: billingName,
            },
            })
            .then((result) => {
            if (result.error) {
                displayError(result);
            } else {
                // console.log(result.paymentMethod.id);
                console.log({ customerId })

                console.log(result.paymentMethod.id);
                vm.createSubscription(
                customerId, result.paymentMethod.id);
            }
            });
        },
            
        async createSubscription(customerId, paymentId)
        {
                var apiUrl = packagePath + '/createSubscription_buyer.php';
                var data = { 'customer_id': customerId,  'payment_id' : paymentId}
                $.ajax({
                    url: apiUrl,
                    
                method: 'POST',
                    contentType: 'application/json',
                        data: JSON.stringify(data),
                success: function(result) {
                    result = JSON.parse(result);
                    console.log({result})
                    

                },
                error: function(jqXHR, status, err) {
                //	toastr.error('Error!');
                }
            });
        },

        async chargeCustomer(customerId, amount)
        {
        vm = this;
        amount = Math.round(amount * 100)
        var apiUrl = packagePath + '/stripe_charge_customer.php';
        var data = { customerId, amount }
            $.ajax({
                url: apiUrl,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (result)
                {
                result = JSON.parse(result);

                console.log({ result });
                if (result) {

                    cache_save_job();  
                   

                
                }


                },
                error: function (jqXHR, status, err)
                {
                //	toastr.error('Error!');
                }
            });

        }
        

    },
    beforeMount() {
       
        this.getChargeRate()
        this.getStripeDetails()
        
     
    }

})

//document upload func

var documentData = (function ()
  {
    var instance;
   
    function init()
    {

        function getFile (el)       
        {   
            if ($("#file-doc[type='file']") !== undefined && $("#file-doc[type='file']") !== null && $("#file-doc[type='file']").val() !== '') {

                totalfiles = document.getElementById('file-doc').files.length;
                console.log({ totalfiles });
                var fieldId = el.attr('field-id');
                var tabId =  el.parents('.tab-pane').attr('id');
                var fileId =  Math.floor( Math.random() * 1000 ) + Date.now();
                var fileList = [];

                if (totalfiles > 5) {
                    alert("You can select only 5 files");
                } else {
                    for (var index = 0; index < totalfiles; index++) {
    
                    fileList.push(document.getElementById('file-doc').files[index])
                }
                
                fileList.forEach( function (file, i) {
                
                    sendFile(file, fieldId, tabId, fileId, i);
                    console.log({ i });
                
                })
                  
                }
                
                

            } 
        }

        function sendFile(file, fId, tId, fileId, i)
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
                            taskFiles.push({ 'Id': fileId, 'URL': result[0]['SourceUrl'], 'name': result[0]['Filename'], 'field-id': fId, 'tab-id': tId });
                            console.log({taskFiles})
                        // allFiles.forEach(function (filename, i)
                        // {
                            $('.table-document tbody').append(`<tr id = ${fileId}>
                            <td class="action-icondelete"><a class="delete-cat" id="delete-file" href="javascript:void(0)"><i class="icon icon-ndelete"></i></a></td>
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


        function deleteFile(el)
        {
            
            var id = el.parents('tr').attr('id');

            console.log({id})
            
            taskFiles = taskFiles.filter((file) => file.Id !== parseInt(id));

            el.parents('tr').remove();

            console.log({ taskFiles });
        }


      return {
        sendFile: sendFile,
        getFile: getFile,
        saveFiles: saveFiles,
        saveTask: saveTask,
        deleteFile: deleteFile
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
    const url = window.location.href.toLowerCase();
    if (url.indexOf("/lodge_job.php") >= 0) {
        var map;
        var search_group = new L.LayerGroup();
        var clickArr = new Array();


        waitForElement('#map', function ()
        {
            // map = L.map('map').fitWorld();
            // // L.map('map').setView([0, 0], 6);

            // //osm layer
            // var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // });
            // osm.addTo(map);

            // // map.on('click', onMapClick);

            // var markers = new Array();



            // map.addLayer(search_group);


            // map.on('click', function (e)
            // {
            //     var clickPositionMarker = L.marker([e.latlng.lat, e.latlng.lng], {
            //         color: 'red',
            //         fillColor: '#f03',
            //         fillOpacity: 0.5,
            //         radius: 500
            //     });
            //     clickArr.push(clickPositionMarker);
            //     mapLat = e.latlng.lat;
            //     mapLon = e.latlng.lng;
            //     clickPositionMarker.addTo(search_group).bindPopup("<a name='removeClickM' id=" + e
            //         .latlng.lat +
            //         "_" + e.latlng.lng + "></a>")
            //         .openPopup();
            //     $('.leaflet-popup-close-button').attr('id', e
            //         .latlng.lat +
            //         "_" + e.latlng.lng)

            //     /*   clickPositionMarker.on('click', function(e) {
            //       markerDelAgain(); 
            //     }); */

            //     locationList.push(e.latlng);
            //     console.log({
            //         locationList
            //     });

            // });

            if (!navigator.geolocation) {
                console.log("Your browser doesn't support geolocation feature!")
            } else {
                //setInterval(() => {
                navigator.geolocation.getCurrentPosition(getPosition)
                //}, 5000);
            }

            // var marker, circle;

            function getPosition(position)
            {
                // console.log(position)
                var lat = position.coords.latitude
                var long = position.coords.longitude
                var accuracy = position.coords.accuracy

                // if (marker) {
                //     map.removeLayer(marker)
                // }

                // if (circle) {
                //     map.removeLayer(circle)
                // }

                // marker = L.marker([lat, long])
                // circle = L.circle([lat, long], {
                //     radius: accuracy
                // })

                // var featureGroup = L.featureGroup([marker, circle]).addTo(map)

                // map.fitBounds(featureGroup.getBounds())

                console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy)


                

            }



        })

    }

    //getToken()
    $(".my-btn").css({ padding: "0px" });
    $(".fancy-checkbox label span").css({ height: "0px" });

    $('body').on('change', '#file-doc', function ()
    {
        var documents = documentData.getInstance();
        documents.getFile($(this));
        
    })

    //delete an uploaded file from fe
    $('body').on('click', '#delete-file', function ()
        {
            var documents = documentData.getInstance();
            documents.deleteFile($(this));
        
        })

    
    $('body').on('click', '.btn-quote-submit', function ()
    {
        var documents = documentData.getInstance();
        documents.saveTask();
    })


    $('body').on('focus', ".datepicker", function ()
    {
        $(this).datetimepicker({
            viewMode: 'days',
            format: 'DD/MM/YYYY'
        })
    });


    $('body').on('click', '#save', function ()
    {
        if (payment_enabled = "True") {
            jobData.getAllFieldData($('.tab-content'));

        }
        

    })

    $('body').on('change', '#in_person_work', function ()
    {
        console.log('in person click')
        if ($(this).is(':checked')) {
            $('.location-map-hide-show').fadeIn('slow');
            // newMap()
        } else {
            $('.location-map-hide-show').fadeOut('slow');
        }
    });

    $('body').on('change', '#remote_work', function ()
    {
        console.log('remote work click')
        if ($(this).is(':checked')) {
            $('.location-map-hide-show').fadeOut('slow');

        } else {
            $('.location-map-hide-show').fadeIn('slow');
        }
    });


    //Redirection

     $('body').on('click', '#register-account', function ()
     {
         
         console.log('click')
         window.location =  `${protocol}//${baseURL}/user/marketplace/customlogin?isSeller=false&returnUrl=${baseURL}`;
          // $('#register-account').attr('href',`${protocol}//${baseURL}/user/marketplace/customlogin?isSeller=false&returnUrl=${baseURL}`)
        
     })


        $('body').on('click', '#sign-up', function ()
        {
           
            window.location =  `${protocol}//${baseURL}/user/marketplace/customlogin?isSeller=false&returnUrl=${baseURL}`;
           //$('#register-account').attr('href',`${protocol}//${baseURL}/user/marketplace/customlogin?isSeller=false&returnUrl=${baseURL}`)
        
  
           // window.location =  `${protocol}//${baseURL}/user/marketplace/customlogin?isSeller=false&returnUrl=${baseURL}`;
           //$('#register-account').attr('href',`${protocol}//${baseURL}/user/marketplace/customlogin?isSeller=false&returnUrl=${baseURL}`)
        
     })





    waitForElement('#payment', function ()
    {
    var script = document.createElement('script');
    script.onload = function ()
    {
       

        //if (stripePubKey) {
        //do stuff with the script
        var stripe = Stripe(pub_key);
        var elements = stripe.elements();
        var card = elements.create('card', { hidePostalCode: true, style: style });
        var style = {
            base: {
                'lineHeight': '1.35',
                'fontSize': '1.11rem',
                'color': '#495057',
                'fontFamily': 'apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
            }
        };
        if ($('#card-element').length) {
            card.mount('#card-element');
        }
    
        // Create a token or display an error the form is submitted.
        var submitButton = document.getElementById('paynowPackage');
        if (submitButton) {
            submitButton.addEventListener('click',
                function (event)
                {
                    event.preventDefault();
                    $("#paynowPackage").attr("disabled", "disabled");

                     if ($('option:selected', $('#paymentScheme')).text() == 'Cash on Delivery'){
                        console.log('cod');
                           cache_save_job();  
                     } else {

                         if ($('#stripe-id').val() != null && $('#stripe-id').val() != '') {
                            console.log('you will be charge on your default payment method')
                             jobData.chargeCustomer($('#stripe-id').val(), $('#charge-amount').text());
                             $("#paynowPackageChargeQuote").prop("disabled", true);
                         } else {
                             jobData.createStripeMember(card, stripe)
                            stripe.createToken(card).then(function (result)
                            {
                                if (result.error) {
                                    // Inform the user if there was an error
                                    var errorElement = document.getElementById('card-errors');
                                    errorElement.textContent = result.error.message;
            
                                    // $("#payNowButton").removeAttr("disabled");
                                } else {

                                    console.log({ result })
                                    jobData.charge(result.token,$('#charge-amount').text() );
                                    $("#paynowPackage").prop("disabled", true);
                                        
                                    //subscribe(card, stripe)
                                    
                                    // Send the result.token.id to a php file and use the token to create the subscription
                                    // SubscriptionManager.PayNowSubmit(result.token.id, e);
                                }
                            });
                             
                         }
                        
                     }


                 
    
                });
        }
              
        card.on('change', function (event)
        {
            displayError(event);
        });
        //  }
        //});
     }
      script.src = "https://js.stripe.com/v3/";

            document.head.appendChild(script); //or something of the likes

                  // Create an instance of the card Element
            $('#card-element').css("width", "30em");
    })
    

    //payment method selection
      $('body').on('change', "#paymentScheme", function () {
        $('#charged-default').remove();
          if ($('option:selected', $(this)).val() == 'stripe') {

              if ($('#stripe-id').val() != null && $('#stripe-id').val() != '') {
                  $('#card-element-charge').hide();
                  //if (!$('#charged-default').length) {
                  $('.common-text').append(`<p id="charged-default"> You will be charged on your default payment method. </p>`);
                  console.log('you will be charge on your default payment method')
                  // }
                
              } else {
            
                  $('#card-element').show()
                  console.log('Active stripe')
              }
          }else {
            
            $('#card-element-charge').hide();
        }
        });    
           

})

  })();