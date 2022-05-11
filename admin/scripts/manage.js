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
   var manageFields =  new Vue({
        el: "#main",
        data() {
            return {
                allJobs: [],
                allFreelancers: [],
                uploadCustomFields: [],
                emailFields: "",
                chargesListBuyer: [],
                chargesListSeller: [],
                perPage: 20,
                page: 0,
                paginationcountJobs: 0,
                currentPageJobs: 1,
                totalItemsJobs: 0,

                paginationcountApproval: 0,
                currentPageApproval: 1,
                totalItemsApproval: 0,
             
            }
        },

        filters: {
            capitalize: function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },

        },

        methods: {
            async getAllFreelancers(action) {
                try {
                    vm = this;
                    const response = await axios({
                        method: action,
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_details?sort=-CreatedDateTime&pageSize=100`,
                        // data: data,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const users = await response
                    vm.allFreelancers = users.data.Records

                    console.log(vm.allFreelancers);
                    

                    vm.emailFields = vm.allFreelancers[0].custom_fields;
                    console.log( vm.emailFields);
                    var addressfield = JSON.parse(vm.emailFields).filter((field) => field.code === 'Address')
                    console.log( addressfield );


                
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
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_list?sort=-CreatedDateTime&pageSize=100`,
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

            async getAllCharges(user) {
                try {
                    vm = this;
                    const response = await axios({
                        method: "GET",
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/charges_configuration`,
                    })
                    const charges = await response
                    let allCharges = charges.data
                   
                    user == 'buyer' ?
                    vm.chargesListBuyer = allCharges.Records.filter((field) => field.user ===  user)
                        : vm.chargesListSeller = allCharges.Records.filter((field) => field.user === user)
                    
                    console.log( vm.chargesListBuyer );
                    console.log( vm.chargesListSeller );
                    // return templates

                } catch (error) {
                    console.log("error", error);
                }
            },
             
            async saveCharges(chargeId, type, value, status)
            {
                
                try {
                    vm = this;
                    var data = { value , type, status }
                    const response = await axios({
                        method: "PUT",
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/charges_configuration/rows/${chargeId}`,
                        headers: {
                        "Content-Type": "application/json"
                        },
                    
                    data: JSON.stringify(data),
                    })
                    const charges = await response
                    
                    console.log({charges})

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

                onboardingModalAccept(action)
            
                console.log({ user_details });
                var settings = {
                    "url": packagePath + "/update_status.php",
                    "method": "POST",
                    "data": JSON.stringify(user_details)
                }
                $.ajax(settings).done(function(response){
                    
                   // e.currentTarget.parentElement().hide();

                    console.log($.parseJSON(response));
                   
               
                });

            
            },

            //pagination

            async fetchDataJobs(value, pageCount)
            {
              //this.currentPage = pageNumber
              // this.isActive = !this.isActive;
              this.perPage = pageCount ? pageCount : this.perPage;
              this.currentPageJobs = value;
              let apiUrl = `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_list?sort=-CreatedDateTime`;
              let actualUrl = apiUrl + `&pageNumber=${value}&pageSize=${this.perPage}`;
             
              try {
                vm = this;
                const response = await axios({
                    method: "GET",
                    url: actualUrl,
                    // data: data,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const jobs = await response
                vm.allJobs = jobs.data.Records
                
                console.log( vm.allJobs);
                vm.totalItemsJobs = jobs.data.TotalRecords
                vm.paginationcountJobs = Math.ceil(jobs.data.TotalRecords / jobs.data.PageSize)

                console.log(vm.paginationcountJobs);
                // return templates

            } catch (error) {
                console.log("error", error);
            }
             

            },

            async fetchDataApprovals(value, pageCount)
            {
              //this.currentPage = pageNumber
              // this.isActive = !this.isActive;
              this.perPage = pageCount ? pageCount : this.perPage;
              this.currentPageApproval = value;
              let apiUrl = `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_details?sort=-CreatedDateTime`;
              let actualUrl = apiUrl + `&pageNumber=${value}&pageSize=${this.perPage}`;
             
              try {
                vm = this;
                const response = await axios({
                    method: "GET",
                    url: actualUrl,
                    // data: data,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const users = await response
                vm.allFreelancers = users.data.Records
                
                console.log( vm.allJobs);
                vm.totalItemsApproval = users.data.TotalRecords
                vm.paginationcountApproval = Math.ceil(users.data.TotalRecords / users.data.PageSize)

                console.log(vm.paginationcountApproval);
                // return templates

            } catch (error) {
                console.log("error", error);
            }
             

            },

        },

        computed: {
           
          },
        mounted: function ()
         {
      //  
        this.fetchDataJobs().catch(error => {
        console.error(error)
        }),

        this.fetchDataApprovals().catch(error => {
            console.error(error)
            })
      },

 
        beforeMount() {
            this.getAllFreelancers('GET')
            this.getAllCustomFields('GET')
            this.getAllJobs('GET');
            this.getAllCharges('buyer');
            this.getAllCharges('seller');
        },


    })

    function savePageContent(el) {
        $('#save').addClass('disabled');

        var cc ='', bcc='';
        //cc 
      if ($('#cc_email').val()) {
          var ccTrim = $('#cc_email').val().trim();
           cc = ccTrim.split();
      }
        
        //bcc
      if ($('#bcc_email').val()) {
          var bccTrim = $('#bcc_email').val().trim();
          bcc = bccTrim.split(); 
            
      }

        data1 = CKEDITOR.instances.editor1.getData();
        console.log(data1);
      

        var data = { 'userId': userId, 'title': $('#title').val(), 'content': data1, 'subject': $('#subject').val(), 'description': $('#description').val(), 'type': $("#email-type option:selected").text(), 'cc' : cc, 'bcc' : bcc};
        var apiUrl = packagePath + '/save_new_content.php';
        $.ajax({
            url: apiUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(result) {
                console.log(JSON.stringify(result));
                toastr.success('New email template successfully saved.');
                $('#title').val('');
                $('#save').removeClass('disabled');

                if (el.attr('redirect') == 'admin') {
                    window.location.href = emailTemplatePath;
                } else {
                    window.location.href = indexPath;
                }
                //window.location.href = indexPath;
            },
            error: function(jqXHR, status, err) {}
        });
    }

    function saveModifiedPageContent(el) {
        data1 = CKEDITOR.instances.editor1.getData();
        var cc ='', bcc='';
        //cc 
      if ($('#cc_email').val()) {
          var ccTrim = $('#cc_email').val().trim();
           cc = ccTrim.split();
      }
        
        //bcc
      if ($('#bcc_email').val()) {
          var bccTrim = $('#bcc_email').val().trim();
          bcc = bccTrim.split(); 
            
      }

        var data = { 'pageId': $('#pageid').val(), 'userId': userId, 'title': $('#title').val(), 'content': data1, 'subject': $('#subject').val(), 'description': $('#description').val(), 'template-id': $('#pageid').val(), 'type': $("#email-type option:selected").text(), 'cc' : cc, 'bcc' : bcc };
        var apiUrl = packagePath + '/save_modified_content.php';
        $.ajax({
            url: apiUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(result) {
                console.log(JSON.stringify(result));
                toastr.success('Page Contents successfully updated.');
                $('#title').val('');
                if (el.attr('redirect') == 'admin') {
                    window.location.href = emailTemplatePath;
                } else {
                    window.location.href = indexPath;
                }
                
            },
            error: function(jqXHR, status, err) {}
        });
    }

    function deletePage() {
        var data = { 'pageId': pagedids, 'userId': userId };
        console.log(pagedids);
        var apiUrl = packagePath + '/delete_content.php';
        $.ajax({
            url: apiUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(result) {
                console.log(JSON.stringify(result));
                toastr.success('Page Content successfully deleted.');
                location.reload();
            },
            error: function(jqXHR, status, err) {}
        });
    }

    function sendMail() {
        var data = { 'template': $('.record_id').val(), 'userId': userId, 'to': $('#to').val(), 'from': $('#from').val(), 'buyerName': $('#buyerName').val(), 'merchantName': $('#merchantName').val(), 'invoice': $('#invoiceID').val() };
        var apiUrl = packagePath + '/send_edm.php';
        $.ajax({
            url: apiUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(result) {
                console.log(JSON.stringify(result));
                toastr.success('Sample Email has been sent. Please check your email.');
                location.reload();
            },
            error: function(jqXHR, status, err) {}
        });
    }

    function onboardingModalAccept(action){
       

        if (action == "Approved") {
            $(".btn-accept-reject .btn.blue-btn.active").parents("tr").find(`td[data-th="Approval Status"] a`).remove();
            $(".btn-accept-reject .btn.blue-btn.active").parents("tr").find(`td[data-th="Approval Status"]`).append(`<a href="freelancer-details.html"><span class="status-approve">Approved</span></a>`);
        } else {
            $(".btn-accept-reject .btn.gre-btn.active").parents("tr").find(`td[data-th="Approval Status"] a`).remove();
            $(".btn-accept-reject .btn.gre-btn.active").parents("tr").find(`td[data-th="Approval Status"]`).append(`<a href="freelancer-details.html"><span class="status-rejected">Rejected</span></a>`);
        }
        
    
        $(".btn-accept-reject .btn.blue-btn.active").removeClass("active").parent().addClass("hide");
        $(".btn-accept-reject .btn.gre-btn.active").removeClass("active").parent().addClass("hide");

    }

    

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



    
        $('#btn-save-charges').click(function ()
        {

            $('.job_customise .panel-box').find('.form-group').each(function ()
            {
                var charge_id = $(this).find('input[type=text]').attr('id')
                var charge_type = $(this).attr('charge-type') == 1 ? 'fixed' : $(`input[name="${charge_id}"]:checked`).val();
                var status =  $(this).find('.onoffswitch-checkbox')[0].checked
                
                var charge_value = $(this).find('input[type=text]').val();
                manageFields.saveCharges(charge_id, charge_type, charge_value,status);

            })
          
            
        });



       


        

    });
})();