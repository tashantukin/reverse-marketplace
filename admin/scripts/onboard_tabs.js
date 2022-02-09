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



    //run on creation page only
  var tabs =  new Vue({
        el: "#main",
        data() {
            return {
              allTabs : []
         
                
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
                        vm.getAllTabs("list");
                    

                    }
                
                
                })
            },

            async getAllTabs(page)
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
                        $('.custom-listing-table-onbrd').empty();
                        
                    $.each(vm.allTabs, function (index, tab){ 
                       
                        $('[role="tablist"]').append(`<li role="presentation"><a href="#${tab.Id}" data-id="${tab.Id}"  aria-controls= ${tab.Id} role="tab" data-toggle="tab"> ${tab.tab_name} </a></li>`);
                        
                         $(".tab-content").append(`
                             <div role="tabpanel" class="tab-pane" id="${tab.Id}">
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
                                </div>`);
                        
                    
                        vm.getAllFields(tab.Id);
                    })
                   
                    }
                       
                    
    
                } catch (error) {
                    console.log("error", error);
                }
            },

            async sortTabs(tabId, indexPos)
            {    
                console.log('sort tabs vue')
                 vm = this;
                var data = { 'sort_order': indexPos }
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
                        vm.getAllTabs("list");
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
                        const fieldDetails = fields;
                        
                        $.each(fieldDetails, function (index, field)
                        {
                            fieldName = field.name,
                            fieldType = field.type_of_field,
                            fieldId = field.Id 
                            
                            $(`.tab-content #${tabId}`).append(`<div class="custom_list_wrapper">

                                            <ul class="custom-listing-table-onbrd row-height-50">
            
                                                
                                                <li class="all-cat added-description">
            
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
            
                                            </ul>
            
                                        </div>


                                    </div>
                                </div>` )
    
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
                        vm.getAllTabs("list");
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
                        vm.getAllTabs("list");
                    

                    }
                
                
                })
            }

        },
    
        computed: {
           
          },
    
    
      beforeMount()
      {
            
        this.getAllTabs("list");
            
      },
    
    
    })
    
   

$(document).ready(function() {

       
    $("#OnboardingSteps .sortable-list").sortable({
        stop: function (e)
        {
            $(this).find('li').each(function ()
            {
                
                tabs.sortTabs($(this).attr('steps-id'), $(this).index())
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
    {    
           tabs.editTab($(this), $(this).attr('tab-id'));
           
         
    })

       

});
})();