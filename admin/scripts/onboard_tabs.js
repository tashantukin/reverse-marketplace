(function() {
    var scriptSrc = document.currentScript.src;
    var packagePath = scriptSrc.replace('/scripts/manage.js', '').trim();
    var token = commonModule.getCookie('webapitoken');
    var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
    var packageId = re.exec(scriptSrc.toLowerCase())[1];
    var timezone_offset_minutes = new Date().getTimezoneOffset();
    timezone_offset_minutes = timezone_offset_minutes == 0 ? 0 : -timezone_offset_minutes;
    const baseURL = window.location.hostname;
    const protocol = window.location.protocol;
    var isEdit = false;


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



    //run on creation page only
  var tabs =  new Vue({
        el: "#main",
        data() {
            return {
                allOnboardTabs: [],
                allFreelancerFields: [],
                
            fieldName: '',
            fieldDescription: '',
            fieldType: '',
            placeholder: '',
            values: '',
            classification: ''
         
                
            }
        },
    
        filters: {
            capitalize: function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },
    
        },
    
        methods: {
        //save tabs/ steps
        //Custom table name : job_fields_tabs
        //tab_name, sort_order, Id

           async saveNewTab(action, e)
            {
                
                vm = this;

                if ($('#onbrd_tab_name').val()) {
                var data = { 'tab_name': $('#onbrd_tab_name').val(), 'sort_order' : -1 }
                console.log({data})
                $.ajax({
                    method: action,
                    url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/onboard_fields_tabs/rows`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    
                    data: JSON.stringify(data),
                    //  })
                    success: function (response)
                    {
                        console.log({ response })

                        vm.getAllTabs("modal");
                        vm.getAllTabs("list", "new");
                    

                    }
                
                
                })

            }else {
                $('#onbrd_tab_name').addClass('error-con')
            }
            },

            async getAllTabs(page, cond)
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
                    vm.allOnboardTabs = tabs.data.Records
    
                    console.log(vm.allOnboardTabs);

                    if (page == 'modal') {
                        $('#OnboardingSteps .ui-sortable').empty()
                        $.each(vm.allOnboardTabs, function (index, tab)
                        { 
                            $("#OnboardingSteps .ui-sortable").append(`
                            <li data-parent="" class="has-subitems" steps-id = ${tab.Id} v-on:click="testdrag">
                                    <div class="row-wrapper main-sub">
                                        <div class="row-details pull-left">
                                            <div>
                                                <i class="icon icon-arrange-icon" ></i>
                                            </div>
                                            <div class="name-area">
                                                <span class="item-name"> ${tab.tab_name} </span>
                                                <input type="text" class="form-control hide" name="onbrd_tab_name" id="onbrd_tab_name" />
                                            </div>
                                            
                                        </div>
                                        <div class="row-action pull-right">
                                            <div><a href="javascript:void(0)" onclick="editNameSteps(this)" id="cat_edit"><i class="icon icon-edit-2"></i></a></div>
                                            <div>
                                                <a class="delete-cat" href="javascript:void(0)" onclick="deleteSteps(this)" id="cat_delete"><i class="icon icon-delete-btn-user"></i></a>
                                                <a href="#" tab-id = ${tab.Id} class="blue-btn pull-right hide" id="save-edit-tab">Save</a>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                    
                            </li>
            
                            `);
                    

                        })
                    }
                    else {
                        
                          //index list
                        $('[role="tablist"]').empty();
                        $('.tab-content .custom-listing-table-onbrd').empty();
                        
                        $.each(vm.allOnboardTabs, function (index, tab)
                        { 
                         if (tab.sort_order == 0) {
                             classes = "tab-pane fade in active";
                             classHeader = 'active';

                            
                            } else {
                             classes = "tab-pane fade";
                             classHeader = '';
                            // backbutton =  `<button onclick="j_prevTab();" class="btn btn-jobform-outline">Back</button>`
                            }
                       
                        $('[role="tablist"]').append(`<li role="presentation" class="${classHeader}"><a href="#${tab.Id}" data-id="${tab.Id}"  aria-controls= ${tab.Id} role="tab" data-toggle="tab"> ${tab.tab_name} </a></li>`);
                            if (cond == "new") {
                                //do nothing
                            } else {
                                $(".tab-content").append(`
                             <div role="tabpanel" class="${classes}" id="${tab.Id}">
                                    <div class="panel-box tabular">
                                        <div class="custom-list-box-heading-onbrd white">

                                            <div class="cursor-sec cursor-repositioning-onbrd">
            
                                            </div>
            
                                            <div class="user-field-name-onbrd">
            
                                                Field Name
            
                                            </div>
            
                                            <div class="user-field-type-onbrd">
            
                                                Field Type
            
                                            </div>
            
                                            <div class="user-field-consumer-onbrd">
            
                                                <!-- Steps in lodging process -->
            
                                            </div>
            
                                            <div class="user-field-action-onbrd">
            
                                            </div>
            
                                            <div class="clearfix">
            
                                            </div>
            
                                        </div>

                                    </div>

                                      <div class="custom_list_wrapper">

                                
                                    <ul class="custom-listing-table-onbrd row-height-50">

                                    </ul>

                                </div>
                                </div>`);
                            
                                console.log(` 1 ${tab.sort_order} - ${vm.allOnboardTabs.length - 1}`)
                                if (tab.sort_order == vm.allOnboardTabs.length - 1) {
                                    console.log(` 2 ${tab.sort_order} - ${vm.allOnboardTabs.length - 1}`)
                                    var saveSettingsContainer = `<div class="custom_list_
                                 wrapper">

                                                <ul class="custom-listing-table-onbrd custom row-height-50">

                                                    <!-- <li class="all-cat added-description">
                                                        <div class="custom-list-box-onbrd custom">
                                                            <div class="cursor-sec cursor-repositioning-onbrd">
                                                                <div class="repositioning-icon-onbrd">
                                                                </div>
                                                            </div>
                                                            <div class="user-field-name-onbrd">Cancel</div>
                                                            <div class="user-field-type-onbrd">Button</div>
                                                            <div class="user-field-consumer-onbrd">
                                                            
                                                            </div>

                                                            <div class="user-field-action-onbrd">
                                                                <div class="row-action">
                                                                    <a href="javascript:void(0);" class="btn-edit-onbrdfields">
                                                                        <i class="icon icon-edit-2"></i>
                                                                    </a>       
                                                                </div>            
                                                            </div>            
                                                            <div class="clearfix">
                                                            </div>
                                                        </div>
                                                    </li> -->


                                                    <li class="all-cat added-description">
                                                        <div class="custom-list-box-onbrd">
                                                            <div class="cursor-sec cursor-repositioning-onbrd">
                                                                <div class="repositioning-icon-onbrd">
                                                                </div>
                                                            </div>
                                                            <div class="user-field-name-onbrd">Save</div>
                                                            <div class="user-field-type-onbrd">Button</div>
                                                            <div class="user-field-consumer-onbrd">
                                                                <!-- 2. Verification Details -->
                                                            </div>

                                                            <div class="user-field-action-onbrd">
                                                                <div class="row-action">
                                                                    <a href="javascript:void(0);" class="btn-edit-text">
                                                                        <i class="icon icon-edit-2"></i>
                                                                    </a>
                                                                            
                                                                </div>            
                                                            </div>            
                                                            <div class="clearfix">
                                                            </div>
                                                        </div>
                                                        <div class="clearfix"></div>
                                                    </li>

                                                </ul>
                                            
                                            </div>

                                            <div class="clearfix"> </div>

                                    </div>`
                                    $(`#${tab.Id} .custom_list_wrapper`).last().after(saveSettingsContainer);
                                }
                            }
                    
                           // vm.getAllFields(tab.Id);
                             waitForElement('.custom-listing-table-onbrd', function ()
                            {
                                vm.getAllFields(tab.Id);
                            
                            })
                         })
                   
                     }
                       
                    
    
                } catch (error) {
                    console.log("error", error);
                }
            },

            async sortTabs(tabId, indexPos, table)
            {    
                console.log('sort tabs vue')
                vm = this;
                 url = table == 'freelancer' ? `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_form/rows/${tabId}` : `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/onboard_fields_tabs/rows/${tabId}`
                var data = { 'sort_order': indexPos }
                console.log({data})
                $.ajax({
                    method: "PUT",
                    url: url,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    
                    data: JSON.stringify(data),
                    //  })
                    success: function (response)
                    {
                        console.log({ response })
                        if (table == 'tabs') {
                            vm.getAllTabs("list", "new");
                             
                        }
                    }
                
                
                })
            },

            async getAllFields(tabId)
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
                        const fieldDetails = fields.sort(GetSortOrder("sort_order"))
                        
                        $.each(fieldDetails, function (index, field)
                        {
                            fieldName = field.name,
                            fieldType = field.type_of_field,
                            fieldId = field.Id 
                            
                            $(`.tab-content #${tabId} .custom-listing-table-onbrd:not(.custom)`).append(`
            
                                                <li class="all-cat added-description" data-id="${fieldId}">
            
                                                    <div class="custom-list-box-onbrd">
            
                                                        <div class="cursor-sec cursor-repositioning-onbrd">
            
                                                            <div class="repositioning-icon-onbrd  ">
            
                                                                <div class="pull-left">
            
                                                                    <a class="panel-toggle" href="javascript:void(0);">
            
                                                                        <i class="icon icon-toggle arrow-up">
            
                                                                        </i>
            
                                                                    </a>
            
                                                                </div>
            
                                                                <div class="pull-left">
            
                                                                    <a class="panel-toggle" href="javascript:void(0);">
            
                                                                        <i class="icon icon-toggle arrow-down">
            
                                                                        </i>
            
                                                                    </a>
            
                                                                </div>
            
                                                            </div>
            
                                                        </div>
            
                                                        <div class="user-field-name-onbrd"> ${fieldName} </div>
            
                                                        <div class="user-field-type-onbrd"> ${fieldType} </div>
            
                                                        <div class="user-field-consumer-onbrd">
                                                            <!-- 2. Verification Details -->
            
                                                        </div>
            
                                                        <div class="user-field-action-onbrd">
            
                                                            <div class="row-action">
            
                                                                <a href="javascript:void(0);" class="btn-edit-onbrdfields" data-id="${fieldId}">
            
                                                                    <i class="icon icon-edit-2">
            
                                                                    </i>
            
                                                                </a>
            
                                                                <a class="delete-cat" href="javascript:void(0)" onclick="delete_opt(id,this)" data-id="${fieldId}">
            
                                                                    <i class="icon icon-delete-btn-user">
            
                                                                    </i>
            
                                                                </a>
            
                                                            </div>
            
                                                        </div>
            
                                                        <div class="clearfix">
            
                                                        </div>
            
                                                    </div>
            
                                                </li>
            
                            ` )
    
                        })

                        
                        
                    }
                   

                }
            
            
            })
            },

            async deleteTab(tabId)
            {
                 vm = this;
               // console.log({data})
                $.ajax({
                    method: "DELETE",
                    url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/onboard_fields_tabs/rows/${tabId}`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    
                   // data: JSON.stringify(data),
                    //  })
                    success: function (response)
                    {
                        console.log({ response })
                        vm.getAllTabs("list", "new");
                    }
                
                
                })
            },

            async editTab(e,tabId)
            {
                vm = this;
                var data = { 'tab_name': e.parents("li").find(".name-area input").val() }
                console.log({data})
                $.ajax({
                    method: "PUT",
                    url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/onboard_fields_tabs/rows/${tabId}`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    
                    data: JSON.stringify(data),
                    //  })
                    success: function (response)
                    {
                        console.log({ response })

                            e.parents("body").find(`.step-name-edit`).removeClass('step-name-edit');
                            e.parents("body").find(`.step-name-edit-tab`).removeClass('step-name-edit-tab');
                            e.parents("li").find(".name-area .item-name").text(e.parents("li").find(".name-area input").val());
                            e.parents("li").find(".name-area .item-name").removeClass("hide");
                            e.parents("li").find(".name-area input").addClass("hide");
                            e.parents("li").find(".row-action #cat_edit").removeClass("hide");
                            e.parents("li").find(".row-action .delete-cat").removeClass("hide");
                            e.parents("li").find(".row-action .blue-btn").addClass("hide");

                        vm.getAllTabs("modal");
                        vm.getAllTabs("list", "new");
                    

                    }
                
                
                })
            },
            async getFieldDetails(action, e){
                    vm = this;
                var data = [{ 'Name': 'Id', 'Operator': "equal", "Value": e.attr('data-id') }]
                
                $('#field-id').val(e.attr('data-id'));
                $('#field-action').val('edit');
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
                    
                        const fields = response
                        const fieldDetails = fields.Records[0]

                        vm.fieldName = fieldDetails.name;
                        vm.fieldDescription = fieldDetails.text,
                        vm.fieldType = fieldDetails.type_of_field,
                        vm.placeholder = fieldDetails.placeholder,
                            vm.values = JSON.parse(fieldDetails.values)   
                        vm.classification = fieldDetails.classification
                        
                        if (vm.fieldType == "checkbox" || vm.fieldType == "dropdown") {
                            $('.cstm-fieldpop-optarea').show();
                            $('#dropdown-opt-draggble').remove();
                            $.each(vm.values, function (index, option)
                            {
                            $('.cstm-fieldpop-optarea .addOpt').before(`<ul id="dropdown-opt-draggble" class="ui-sortable"><li class="maindiv ui-sortable-handle"><div class="virtual-table"><div class="virtual-table-cell"><a href="#" class="cursor-move"><i class="icon icon-draggble"></i></a></div> <div class="virtual-table-cell"><input type="text" value="${option}" name="checkbox-opt[]" id="optionName" class="required"></div> <div class="virtual-table-cell"><a href="#"  class="delete-opt"><i class="icon icon-delete"></i></a></div></div></li></ul>`)  
                            })
                            
                        }
                        
                    
                    }
                
                
                })
            },

             async getAllSellerFields(action) {
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
                    const forms = await response
                    vm.allFreelancerFields = forms.data.Records
    
                    console.log( vm.allFreelancerFields );
                    
    
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
    
    
      beforeMount()
      {
            
        this.getAllTabs("list");
        this.getAllTabs("modal");
        this.getAllSellerFields('GET')   
      },
    
    
    })
    
   

    $(document).ready(function ()
    {
    
        



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









       
    $("#OnboardingSteps .sortable-list").sortable({
        stop: function (e)
        {
            $(this).find('li').each(function ()
            {
                
                tabs.sortTabs($(this).attr('steps-id'), $(this).index(),"tabs")
            })

     
        }
    });


    $('body').on('click', '#btn-add-new-steps', function ()
    {
        tabs.getAllTabs('modal');
    })


     $('body').on('click', '#cat_delete', function ()
    {    $(this).parents('li').remove();
         tabs.deleteTab($(this).parents('li').attr('steps-id'));
         
     })
    
       $('body').on('click', '#save-edit-tab', function ()
    {    if ($('.name-area #onbrd_tab_name').val()){
           tabs.editTab($(this), $(this).attr('tab-id'));
    } else {
        $('.name-area #onbrd_tab_name').addClass('error-con');
    }
         
       }) 
    
      jQuery('body').on('click', '.icon.icon-toggle.arrow-up', function() {
        console.log('up')
        var current = $(this).closest(".custom-list-box-onbrd").parent('li');
         current.prev(".added-description").before(current);
         
         $(this).parents('ul').find('li').each(function ()
         {
              tabs.sortTabs($(this).attr('data-id'), $(this).index(),"freelancer")
         })
            
            
        });


        jQuery('body').on('click', '.icon.icon-toggle.arrow-down', function() {
            console.log('down')
            var current = $(this).closest(".custom-list-box-onbrd").parent('li');
            current.next(".added-description").after(current);

            $(this).parents('ul').find('li').each(function ()
         {
              tabs.sortTabs($(this).attr('data-id'), $(this).index(),"freelancer")
         })
        });
    

        jQuery('body').on('click', '.btn-edit-onbrdfields', function ()
                {

                   tabs.getFieldDetails('Edit', $(this))
            
        })
    


       

});
})();