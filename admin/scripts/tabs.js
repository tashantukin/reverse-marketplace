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

    function waitForElement(elementPath, callBack) {
      window.setTimeout(function () {
        if ($(elementPath).length) {
          callBack(elementPath, $(elementPath));
        } else {
          waitForElement(elementPath, callBack);
        }
      }, 500);
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


    //run on creation page only
    var tabs = new Vue({
        el: "#job-fields",
        data()
        {
            return {
            allTabs: [],
              fieldName: '',
                fieldType: '',
                fieldSteps: '',
                values: '',
                fieldId: '',
                placeholder: '',
                description :'',
                isRequired : ''
                
            }
        },
    
        filters: {
            capitalize: function (str)
            {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },
    
        },
    
        methods: {
            //save tabs/ steps
            //Custom table name : job_fields_tabs
            //tab_name, sort_order, Id

            async saveNewTab(action, e)
            {
                if ($('#onbrd_tab_name').val()){
                    var data = { 'tab_name': $('#onbrd_tab_name').val(), 'sort_order': -1 }
                    console.log({ data })
                    $.ajax({
                        method: action,
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_fields_tabs/rows`,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        
                        data: JSON.stringify(data),
                        //  })
                        success: function (response)
                        {
                            console.log({ response })
    
                            vm.getAllTabs("modal","");
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
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_fields_tabs?sort=sort_order`,
                        // data: data,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const tabs = await response
                    vm.allTabs = tabs.data.Records
    
                    console.log(vm.allTabs);

                    if (page == 'modal') {
                        $('#OnboardingSteps .ui-sortable').empty()
                        $.each(vm.allTabs, function (index, tab)
                        {

                          
                            $("#OnboardingSteps .ui-sortable").append(`
                            <li data-parent="" class="has-subitems" steps-id = ${tab.Id} v-on:click="testdrag" >
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
                        // $('.tab-content .custom-list-box-onbrd').empty();
                        
                        $.each(vm.allTabs, function (index, tab)
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
                            }else {
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
                                </div>
                               
                                
                                `);
                             if (tab.sort_order == vm.allTabs.length - 1) {
                            //append the save button text settings below
                            var saveSettingsContainer =  `<div class="custom_list_wrapper">

                                    <ul class="custom-listing-table-onbrd custom row-height-50">

                                        <li class="all-cat added-description">
                                            <div class="custom-list-box-onbrd custom">
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
                                        </li>

                                    </ul>
                                
                                </div>

                                <div class="clearfix">

                            </div>`

                            $(`#${tab.Id} .custom_list_wrapper`).last().after(saveSettingsContainer);
                            }
                        }
                            waitForElement('.custom-listing-table-onbrd', function ()
                            {
                               // if (cond == "new") {
                                    //do nothing
                               // }else {
                                    vm.getAllFields(tab.Id);
                                //}
                                
                            
                            })

                       // }
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
                var data = { 'sort_order': indexPos }
                url = table == 'jobs' ? `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_form/rows/${tabId}` : `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_fields_tabs/rows/${tabId}`
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
                            vm.getAllTabs("list","new");
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
                url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_form?sort=sort_order`,
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
                    url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_fields_tabs/rows/${tabId}`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    
                   // data: JSON.stringify(data),
                    //  })
                    success: function (response)
                    {
                        console.log({ response })
                        vm.getAllTabs("list","new");
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
                    url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_fields_tabs/rows/${tabId}`,
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

                        vm.getAllTabs("modal",""); 
                        vm.getAllTabs("list","new");
                    

                    }
                
                
                })
            },
             //for updating
            async getFieldDetails(action, e)
            {
                
                vm = this;
                var data = [{ 'Name': 'Id', 'Operator': "equal", "Value":  e.attr('data-id') }]
                
                  $('#field-id').val(e.attr('data-id'));
                  $('#field-action').val('edit');
                
            $.ajax({
                method: "POST",
                url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_form/`,
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

                    vm.fieldName = fieldDetails.name,
                    vm.fieldSteps = fieldDetails.classification,
                    vm.values =  JSON.parse(fieldDetails.values),   
                    vm.fieldType = fieldDetails.type_of_field,
                    vm.fieldId = fieldDetails.Id
                    vm.description = fieldDetails.text
                    vm.isRequired = fieldDetails.is_required
                    vm.placeholder =  fieldDetails.placeholder
                    
                    if (vm.fieldType == "checkbox" || vm.fieldType == "dropdown" || vm.fieldType ==  'radiobutton' ) {
                        $('.cstm-fieldpop-optarea').show();
                        $('#dropdown-opt-draggble').remove();
                        $.each(vm.values, function (index, option)
                        {
                         $('.cstm-fieldpop-optarea .addOpt').before(`<ul id="dropdown-opt-draggble" class="ui-sortable"><li class="maindiv ui-sortable-handle"><div class="virtual-table"><div class="virtual-table-cell"><a href="#" class="cursor-move"><i class="icon icon-draggble"></i></a></div> <div class="virtual-table-cell"><input type="text" value="${option}" name="checkbox-opt[]" id="optionName" class="required"></div> <div class="virtual-table-cell"><a href="#"  class="delete-opt"><i class="icon icon-delete"></i></a></div></div></li></ul>`)  
                        })
                        
                    }
                    vm.isRequired == 'True' ? $("#is-required").prop("checked", true) : $("#is-required").prop("checked", false);

                    

                }
            
            
            })
            },

        },
    
        computed: {
           
          },
    
    
      beforeMount()
      {
            
        this.getAllTabs("list","");
        this.getAllTabs("modal","");
            
      },
    
    
    })
    
   
$(document).ready(function() {

       
    $("#OnboardingSteps .sortable-list").sortable({
        stop: function (e)
        {
            $(this).find('li').each(function ()
            {
                
                tabs.sortTabs($(this).attr('steps-id'), $(this).index(), "tabs")
            })

     
        }
    });


    $('body').on('click', '#btn-add-new-steps', function ()
    {
        tabs.getAllTabs('modal',"");
    })


     $('body').on('click', '#cat_delete', function ()
    {    $(this).parents('li').remove();
         tabs.deleteTab($(this).parents('li').attr('steps-id'));
         
     })
    
    $('body').on('click', '#save-edit-tab', function ()
{    
    if ($('.name-area #onbrd_tab_name').val()){
        tabs.editTab($(this), $(this).attr('tab-id'));
    }else {
        $('.name-area #onbrd_tab_name').addClass('error-con');
    }
       
        
        
    })
    

     jQuery('body').on('click', '.icon.icon-toggle.arrow-up', function() {
        console.log('up')
        var current = $(this).closest(".custom-list-box-onbrd").parent('li');
         current.prev(".added-description").before(current);
         
         $(this).parents('ul').find('li').each(function ()
         {
              tabs.sortTabs($(this).attr('data-id'), $(this).index(),"jobs")
         })
            
            
    });


    jQuery('body').on('click', '.icon.icon-toggle.arrow-down', function() {
        console.log('down')
        var current = $(this).closest(".custom-list-box-onbrd").parent('li');
        current.next(".added-description").after(current);

        $(this).parents('ul').find('li').each(function ()
        {
            tabs.sortTabs($(this).attr('data-id'), $(this).index(),"jobs")
        })
    });


    jQuery('body').on('click', '.btn-edit-onbrdfields', function ()
    {

        $('.cstm-fieldpop-optarea ul').remove();
         $("#onbrd_field_type").prop("disabled", true);
       
        tabs.getFieldDetails('Edit', $(this))
            
    })




    
});
})();