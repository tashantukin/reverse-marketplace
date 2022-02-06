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
                var data = { 'tab_name': $('#onbrd_tab_name').val(), 'sort_order' : 0 }
                console.log({data})
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

                        vm.getAllTabs();
                    

                    }
                
                
                })
            },

            async getAllTabs()
            {
               
                try {
                    vm = this;
                    const response = await axios({
                        method: "GET",
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_fields_tabs`,
                        // data: data,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const tabs = await response
                    vm.allTabs = tabs.data.Records
    
                    console.log(vm.allTabs);
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
                                            <a href="javascript:void(0)" onclick="saveNameSteps(this)" class="blue-btn pull-right hide">Save</a>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                
                         </li>
        
                         `);

                    })
                    
    
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
                    url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_fields_tabs/rows/${tabId}`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    
                    data: JSON.stringify(data),
                    //  })
                    success: function (response)
                    {
                        console.log({ response })

                    }
                
                
                })
            }

    
        },
    
        computed: {
           
          },
    
    
        beforeMount() {
           
            
        },
    
    
    })
    
   
    

    

    

    $(document).ready(function() {

       

    $("#OnboardingSteps .sortable-list").sortable({
        sort: function (e)
        {
            $(this).find('li').each(function ()
            {
                
                tabs.sortTabs($(this).attr('steps-id'), $(this).index())
            })

     
        }
    });
       

    });
})();