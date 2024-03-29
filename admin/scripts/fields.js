(function() {
    var scriptSrc = document.currentScript.src;
    var urlss = window.location.href.toLowerCase();
    var packagePath = scriptSrc.replace('/scripts/manage.js', '').trim();
    //var indexPath = scriptSrc.replace('/scripts/package.js', '/index.php').trim();
  //  var pagelist = scriptSrc.replace('/scripts/package.js', '/pages_list.php').trim();
    var token = commonModule.getCookie('webapitoken');
    var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
    var packageId = re.exec(scriptSrc.toLowerCase())[1];
   // var marketplace = scriptSrc.replace('/admin/plugins/' + packageId + '/scripts/package.js', '/pages/').trim();
    var userId = $('#userGuid').val();
    var data1;
    var timezone_offset_minutes = new Date().getTimezoneOffset();
    timezone_offset_minutes = timezone_offset_minutes == 0 ? 0 : -timezone_offset_minutes;
    var pagedids;

    const baseURL = window.location.hostname;
    const protocol = window.location.protocol;

  

    //run on creation page only
    new Vue({
        el: "#job-fields",
        data() {
            return {
                allJobFields: [],
                
             
            }
        },
    
        filters: {
            capitalize: function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },
    
        },
    
        methods: {
            async getAllJobFields(action) {
                try {
                    vm = this;
                    const response = await axios({
                        method: action,
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_form`,
                        // data: data,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const forms = await response
                    vm.allJobFields = forms.data.Records
    
                    console.log( vm.allJobFields );
                    
    
                  //  vm.emailFields = vm.allFreelancers[0].custom_fields;
                   // console.log( vm.emailFields);
                    ///var addressfield = JSON.parse(vm.emailFields).filter((field) => field.code === 'Address')
                    //console.log( addressfield );
    
    
            
                    // return templates
    
                } catch (error) {
                    console.log("error", error);
                }
            },
    
    
            async getAllJobs(action) {
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
    
                    console.log( vm.allJobs);
                    
                    // return templates
    
                } catch (error) {
                    console.log("error", error);
                }
            },
    
            async getAllCustomFields(action) {
                try {
                    vm = this;
                    const response = await axios({
                        method: action,
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_form`,
                        // data: data,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const fields = await response
                    vm.allFields = fields.data
                   
                    vm.uploadCustomFields = vm.allFields.Records.filter((field) => field.type_of_field === 'file')
                  
                    console.log( vm.uploadCustomFields );
                  
                    // return templates
    
                } catch (error) {
                    console.log("error", error);
                }
            },
    
            searchFields: function (cf, header)
            {
               // console.log({ cf });
                var sample = JSON.parse(cf).filter((field) => field.code == header);
                console.log( {sample})
                return JSON.parse(cf).filter((field) => field.code == header)
               // return field.code == header;
             // })
            },
    
    
    
            updateStatus(action, e)
            {
                
                var user_details = {
    
                    "Id": e.currentTarget.getAttribute('data-id'),
                    'status' : action
                };
            
                console.log({ user_details });
                var settings = {
                    "url": packagePath + "/update_status.php",
                    "method": "POST",
                    "data": JSON.stringify(user_details)
                }
                $.ajax(settings).done(function(response){
                    
                    e.currentTarget.parentElement().hide();
    
                    console.log($.parseJSON(response));
               
                });
    
            
            }
    
    
    
    
    
    
    
        },
    
        computed: {
           
          },
    
    
        beforeMount() {
            this.getAllJobFields('GET')
            
        },
    
    
    })
    
   
    

    

    

    $(document).ready(function() {

        $('.paging').css('margin', 'auto');

        // var pathname = (window.location.pathname + window.location.search).toLowerCase();

        // const index1 = '/admin/plugins/' + packageId;
        // const index2 = '/admin/plugins/' + packageId + '/';
        // const index3 = '/admin/plugins/' + packageId + '/index.php';
        // if (pathname == index1 || pathname == index2 || pathname == index3) {
        //     window.location = pagelist + '?tz=' + timezone_offset_minutes;
        // }

        //save the page contents
        $('#save').click(function() {

            //add field validations
            savePageContent($(this));
            // }
        });
        //save modified page contents
        $('#edit').click(function() {

            if ($("#title").val() == "" || data1 == "") {
                console.log('true');
                toastr.error('Please fill in empty fields.');

            } else {
                saveModifiedPageContent($(this));
            }
        });

        //delete the page contents
        $('#popup_btnconfirm').click(function() {

            pagedids = $('.record_id').val();
            deletePage();
            //
        });

        $('#popup_sendMail').click(function() {
            sendMail();

        });


        //cancel button
        $('#popup_btnconfirm_cancel').click(function ()
        {
            
            if ($(this).attr('redirect') == 'admin') {
                window.location.href = emailTemplatePath;
            } else {
                window.location.href = indexPath;
            }

            
        });


       



        

    });
})();