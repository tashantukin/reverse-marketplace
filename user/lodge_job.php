<!-- begin header -->
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>Market Place :: Lodge</title>
   <!-- core js -->
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/jquery-min.js"></script>
   <!-- bootstrap js -->
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/moment.min.js"></script>
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/bootstrap.min.js"></script>
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/bootstrap-datetimepicker.min.js"></script>
   <!-- bootbox js -->
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/bootbox.min.js"></script>
   <link href="https://bootstrap.arcadier.com/spacetime/css/importFonts.css" rel="stylesheet" type="text/css">
   <link href="https://bootstrap.arcadier.com/spacetime/css/style.css" rel="stylesheet" type="text/css">
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/jquery.nicescroll.min.js"></script>
   <!-- flying element js -->
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/codex-fly.js"></script>
   <!-- mobile-menu js -->
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/mobile-menu.js"></script>
   <script type="text/javascript" src="scripts/jquery.maphilight.min.js"></script>
   <!-- custom js -->
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/custom.js"></script>
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/jquery.ddslick.js"></script>
   <!-- bootstrap style -->
   <link href="https://bootstrap.arcadier.com/spacetime/css/bootstrap.min.css" rel="stylesheet" type="text/css">
   <link href="https://bootstrap.arcadier.com/spacetime/css/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css">
   <link href="https://bootstrap.arcadier.com/spacetime/css/fancy-radio.css" rel="stylesheet" type="text/css">

   <!-- custom style-->
   <link href="https://bootstrap.arcadier.com/spacetime/css/style.css" rel="stylesheet" type="text/css">
   <!-- responsive style-->
   <link href="https://bootstrap.arcadier.com/spacetime/css/responsive.css" rel="stylesheet" type="text/css">
   <link href="css/custom.css" rel="stylesheet" type="text/css">
   <!-- modal style-->
   <link href="https://bootstrap.arcadier.com/spacetime/css/modal.css" rel="stylesheet" type="text/css">

   <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.js"></script>
   <script src="https://unpkg.com/vue/dist/vue.min.js"></script>
   <link href="/user/plugins/8e94739d-b260-41ec-9496-dfa98bb8cdc0/css/style.css" rel="stylesheet" type="text/css">
   
    <!-- map js -->
   <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js"
            charset="utf-8"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.min.js" charset="utf-8"></script>
  
   <!-- <script src="/user/plugins/8e94739d-b260-41ec-9496-dfa98bb8cdc0/scripts/maps/france_departments.js" charset="utf-8"></script>
   <script src="/user/plugins/8e94739d-b260-41ec-9496-dfa98bb8cdc0/scripts/maps/world_countries.js" charset="utf-8"></script>
   <script src="/user/plugins/8e94739d-b260-41ec-9496-dfa98bb8cdc0/scripts/maps/usa_states.js" charset="utf-8"></script> -->
   <script type="text/javascript" src="scripts/jquery.mapael.js"></script>
   <script type="text/javascript" src="scripts/usa_states.js"></script>

   
 </head>
<!-- end header -->
<div class="freelancer-content-main">
<div class="lodge-tab-design ">
    <div class="jobform-tab">
        <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#select_location"><span>Select Location</span></a></li>
            <li><a data-toggle="tab" href="#get_quote"><span>Get Quote</span></a></li>
            <li><a data-toggle="tab" href="#time_frame"><span>Time Frame</span></a></li>
            <li><a data-toggle="tab" href="#contact_details"><span>Contact Details</span></a></li>
        </ul>
    </div>
    <div class="tab-content">
        <div id="select_location" class="tab-pane fade in active" classification-name="Location">
                <div class="jobform-form">

                    <div v-for="field in locationFields" class="form-group custom-details" :field-type="field.type_of_field">
                                <label v-if="field.type_of_field !=='file'" :for="field.name">{{ field.name }}</label>

                                <!-- for search fields -->
                                <div v-if="field.type_of_field ==='search'" class="search-abn">
                                    <input type="search" class="form-control search" :name="field.name | hypenate"  :placeholder="field.placeholder" >
                                    <button><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
                                </div>

                                <input v-if="field.type_of_field ==='search'" type="text" class="form-control required" :name="field.name | hypenate" :id="field.name | hypenate" :placeholder="field.placeholder">

                                <!-- for dropdown fields -->
                                <select v-else-if="field.type_of_field ==='dropdown'" class="form-control required" :name="field.name | hypenate" :id="field.name | hypenate" type="dropdown">
                                    <option v-for="option in JSON.parse(field.values)" >{{option}}</option>
                                </select>

                                    <!-- for checkbox fields -->
                                <div v-else-if="field.type_of_field ==='checkbox'" class="btn-hbox custom-fancyjb cdflex btn-hrmmargin customcheckbox" :id="field.name | hypenate">

                                <div v-for="option in JSON.parse(field.values)" class="fancy-checkbox checkbox-sm" >
                                    <input type="checkbox" :id="option | hypenate" :name="option | hypenate">
                                    <label :for="option | hypenate"><span>{{option}}</span></label>
                                </div>

                                </div>

                                <!-- to hide the type of field = file -->
                                <input v-else-if="field.type_of_field ==='file'" type="hidden">

                                
                                <input v-else  type="text" class="form-control required" :name="field.name" :id="field.name | hypenate" :placeholder="field.placeholder">

                            
                    </div>


                    <!-- <h3>Select Location</h3>
                    <div class="btn-hbox custom-fancyjb cdflex">
                        <div class="fancy-checkbox checkbox-sm">
                            <input type="checkbox" name="remote_work" id="remote_work">
                            <label for="remote_work"><span>Remote Work</span></label>
                        </div>
                        <div class="fancy-checkbox checkbox-sm">
                            <input type="checkbox" name="in_person_work" id="in_person_work">
                            <label for="in_person_work"><span>In-Person Work</span></label>
                        </div>
                    </div>
                    <div class="location-map-hide-show" style="display: none;">
                        <div class="form-group">
                            <label for="location_details">Location Details</label>
                            <input type="text" class="form-control" name="location_details" id="location_details" placeholder="" value="Sample Address 13, SY123">
                        </div>

                        <div class="mapcontainer">
                                <div class="map"></div>
                                </div>
                    
                    </div> -->
                    <hr>
                    <div class="next-tab-area"><span class="seller-btn"> <a onclick="j_nextTab();" class="my-btn btn-red" href="javascript:void(0);">Next</a> </span></div>
                </div>
       </div>
        <div id="get_quote" class="tab-pane fade" classification-name="Get Quote">
            <button onclick="j_prevTab();" class="btn btn-jobform-outline">Back</button>
            <div class="jobform-form">
                 <h3>Get Quote</h3>


                 <div v-for="field in getquoteFields" class="form-group custom-details" :field-type="field.type_of_field">
                                <label v-if="field.type_of_field !=='file'" :for="field.name">{{ field.name }}</label>

                                <!-- for search fields -->
                                <div v-if="field.type_of_field ==='search'" class="search-abn">
                                    <input type="search" class="form-control search" :name="field.name | hypenate"  :placeholder="field.placeholder" >
                                    <button><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
                                </div>

                                <input v-if="field.type_of_field ==='search'" type="text" class="form-control required" :name="field.name | hypenate" :id="field.name | hypenate" :placeholder="field.placeholder">

                                <!-- for dropdown fields -->
                                <select v-else-if="field.type_of_field ==='dropdown'" class="form-control required" :name="field.name | hypenate" :id="field.name | hypenate" type="dropdown">
                                    <option v-for="option in JSON.parse(field.values)" >{{option}}</option>
                                </select>

                                    <!-- for checkbox fields -->
                                <div v-else-if="field.type_of_field ==='checkbox'" class="btn-hbox custom-fancyjb cdflex btn-hrmmargin customcheckbox" :id="field.name | hypenate">

                                <div v-for="option in JSON.parse(field.values)" class="fancy-checkbox checkbox-sm" >
                                    <input type="checkbox" :id="option | hypenate" :name="option | hypenate">
                                    <label :for="option | hypenate"><span>{{option}}</span></label>
                                </div>

                                </div>

                                <!-- to hide the type of field = file -->
                                <input v-else-if="field.type_of_field ==='file'" type="hidden">

                                
                                <input v-else  type="text" class="form-control required" :name="field.name" :id="field.name | hypenate" :placeholder="field.placeholder">

                            
                    </div>













                <!-- <div class="form-group custom-fancyjb">
                    <label>Job Type</label>
                    <div class="fancy-checkbox checkbox-sm">
                        <input type="checkbox" name="full_time" id="full_time">
                        <label for="full_time"><span>Full time</span></label>
                    </div>
                    <div class="fancy-checkbox checkbox-sm">
                        <input type="checkbox" name="contract" id="contract">
                        <label for="contract"><span>Contract</span></label>
                     </div>
                </div>
                <div class="custom-fancyjb">
                    <label>Payment</label>
                    <div class="fancy-radio radio-sm">
                        <input type="radio" name="payment_fixed_hourly" id="payment_fixed" value="fixed">
                        <label for="payment_fixed"><span>Fixed</span></label>
                    </div>
                    <div class="form-group payment-fixed" style="display: none;">
                        <input type="text" class="form-control" name="fixed" id="payment_fixed_value" value="" placeholder="$">
                    </div>
                </div>
                
                <div class="custom-fancyjb">
                    <div class="fancy-radio radio-sm">
                        <input type="radio" name="payment_fixed_hourly" id="payment_hourly" value="hourly">
                        <label for="payment_hourly"><span>Hourly</span></label>
                    </div>
                    <div class="form-group payment-hourly" style="display: none;">
                        <input type="text" class="form-control" name="fixed" id="payment_hourly_value" value="" placeholder="$">
                    </div>
                </div>


                <div class="form-group custom-fancyjb" id="task-list" >
                <label>Select one or more type of tasks</label>


                <div v-for="task in taskOption" class="fancy-checkbox checkbox-sm" >
                    <input type="checkbox" :id="task" name="tasks">
                    <label :for="task"><span>{{task}}</span></label>
                </div>


                <div class="add-job-btn-flex">
                    <div class="fancy-checkbox checkbox-sm">
                        <input type="checkbox" name="others" id="others">
                        <label for="others"><span>Other(s)</span></label>
                    </div>
                    <button class="btn" data-toggle="modal" data-target="#addJobModal">Add Task</button>
                </div>
                 </div>

                <div class="job-list-box">
                   
                </div> -->

            
                  <hr>

                <div class="next-tab-area"><span class="seller-btn"> <a onclick="j_nextTab();" class="my-btn btn-red" href="javascript:void(0);">Next</a> </span></div>
            </div>
        </div>
        <div id="time_frame" class="tab-pane fade" classification-name="Time Frame">
            <button onclick="j_prevTab();" class="btn btn-jobform-outline">Back</button>
            <div class="jobform-form">
                <h3>Time Frame</h3>

                <div v-for="field in timeframeFields" class="form-group custom-details" :field-type="field.type_of_field">
                                <label v-if="field.type_of_field !=='file'" :for="field.name">{{ field.name }}</label>

                                <!-- for search fields -->
                                <div v-if="field.type_of_field ==='search'" class="search-abn">
                                    <input type="search" class="form-control search" :name="field.name | hypenate"  :placeholder="field.placeholder" >
                                    <button><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
                                </div>

                                <input v-if="field.type_of_field ==='search'" type="text" class="form-control required" :name="field.name | hypenate" :id="field.name | hypenate" :placeholder="field.placeholder">

                                <!-- for dropdown fields -->
                                <select v-else-if="field.type_of_field ==='dropdown'" class="form-control required" :name="field.name | hypenate" :id="field.name | hypenate" type="dropdown">
                                    <option v-for="option in JSON.parse(field.values)" >{{option}}</option>
                                </select>

                                    <!-- for checkbox fields -->
                                <div v-else-if="field.type_of_field ==='checkbox'" class="btn-hbox custom-fancyjb cdflex btn-hrmmargin customcheckbox" :id="field.name | hypenate">

                                <div v-for="option in JSON.parse(field.values)" class="fancy-checkbox checkbox-sm" >
                                    <input type="checkbox" :id="option | hypenate" :name="option | hypenate">
                                    <label :for="option | hypenate"><span>{{option}}</span></label>
                                </div>

                                </div>

                                <!-- to hide the type of field = file -->
                                <input v-else-if="field.type_of_field ==='file'" type="hidden">

                                
                                <input v-else  type="text" class="form-control required" :name="field.name" :id="field.name | hypenate" :placeholder="field.placeholder">

                            
                    </div>

                

                <!-- <div class="form-group custom-fancyjb">
                    <label>By when do you need the job completed?</label>
                    <div class="fancy-radio radio-sm">
                        <input type="radio" name="urgent" id="urgent">
                        <label for="urgent"><span>Urgent</span></label>
                    </div>
                    <div class="fancy-radio radio-sm">
                        <input type="radio" name="urgent" id="no_hurry">
                        <label for="no_hurry"><span>No hurry</span></label>
                    </div>
                    <div class="fancy-radio radio-sm">
                                <input type="radio" name="urgent" id="completed_date">
                                <label for="completed_date"><span><input type="text" disabled name="completed_datetime" placeholder="DD/MM/YYYY" class="datepicker form--control" id="date-valid"></span></label>
                    </div>
                </div>


                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="job_valid">When is the job valid until?</label>
                            <input type="text" class="form-control datepicker" name="job_valid" id="job_valid" placeholder="DD/MM/YYYY" >
                        </div>
                    </div>
                </div>


                <div class="form-group">
                    <label for="comments">Comments to the applicant:</label>
                    <textarea class="form-control" name="comments" id="comments" rows="5" placeholder=""></textarea>
                </div>-->
                <div class="form-group custom-fancyjb">
                    <div class="fancy-checkbox checkbox-sm">
                        <input type="checkbox" name="acknowledge" id="acknowledge">
                        <label for="acknowledge"><span>I acknowledge that the request I am asking is a legally permitted activity.</span></label>
                    </div>
                </div>
                <hr>

                <div class="next-tab-area"><span class="seller-btn"> <a onclick="j_nextTab();" class="my-btn btn-red" href="javascript:void(0);">Next</a> </span></div>
          </div>
        </div>
        <div id="contact_details" class="tab-pane fade" classification-name="Contact Details">
            <button onclick="j_prevTab();" class="btn btn-jobform-outline">Back</button>
            <div class="jobform-form">
                <h3>Contact Details</h3>


                <div v-for="field in contactFields" class="form-group custom-details" :field-type="field.type_of_field">
                                <label v-if="field.type_of_field !=='file'" :for="field.name">{{ field.name }}</label>

                                <!-- for search fields -->
                                <div v-if="field.type_of_field ==='search'" class="search-abn">
                                    <input type="search" class="form-control search" :name="field.name | hypenate"  :placeholder="field.placeholder" >
                                    <button><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
                                </div>

                                <input v-if="field.type_of_field ==='search'" type="text" class="form-control required" :name="field.name | hypenate" :id="field.name | hypenate" :placeholder="field.placeholder">

                                <!-- for dropdown fields -->
                                <select v-else-if="field.type_of_field ==='dropdown'" class="form-control required" :name="field.name | hypenate" :id="field.name | hypenate" type="dropdown">
                                    <option v-for="option in JSON.parse(field.values)" >{{option}}</option>
                                </select>

                                    <!-- for checkbox fields -->
                                <div v-else-if="field.type_of_field ==='checkbox'" class="btn-hbox custom-fancyjb cdflex btn-hrmmargin customcheckbox" :id="field.name | hypenate">

                                <div v-for="option in JSON.parse(field.values)" class="fancy-checkbox checkbox-sm" >
                                    <input type="checkbox" :id="option | hypenate" :name="option | hypenate">
                                    <label :for="option | hypenate"><span>{{option}}</span></label>
                                </div>

                                </div>

                                <!-- to hide the type of field = file -->
                                <input v-else-if="field.type_of_field ==='file'" type="hidden">

                                
                                <input v-else  type="text" class="form-control required" :name="field.name" :id="field.name | hypenate" :placeholder="field.placeholder">

                            
                    </div>




                <!-- <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" class="form-control required" name="email" id="email" placeholder="">
                    </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control required" name="name" id="name" placeholder="">
                    </div>
                <div class="form-group">
                    <label for="contact_number">Contact Number</label>
                    <input type="text" class="form-control required" name="contact_number" id="contact_number" placeholder="">
                    </div>

                    <div class="form-group custom-fancyjb">
                    <div class="fancy-checkbox checkbox-sm">
                        <input type="checkbox" name="provide_applicant" id="provide_applicant">
                        <label for="provide_applicant"><span>Provide to Applicant</span></label>
                    </div>
                </div> -->
                <hr>
                <div class="next-tab-area"><span class="seller-btn"> <a onclick="j_finishedTab(); cache_save_job();" class="my-btn btn-red" href="javascript:void(0);">Lodge</a> </span></div>
            </div>
        </div>
        
    </div>

</div>
</div>

<!--modal register-->
<div class="modal-frame model-register">
<div class="mymodal">
    <div class="modal-inset">
        <div class="modal-body">
        <div class="modal-wrapper">
            <div class="modal-logo text-center"><img
                    src="https://bootstrap.arcadier.com/spacetime/images/logo.png">
            </div>
            <div class="modal-head">Register / Sign in</div>
            <div class="modal-main">
                <ul>
                    <li><a href="#"><img src="https://bootstrap.arcadier.com/spacetime/images/fb_login.svg"></a>
                    </li>
                    <li><a href="#"><img src="https://bootstrap.arcadier.com/spacetime/images/goo_login.svg"></a>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    </div>
    <button class="modal-close close"></button>
</div>
</div>


<div class="modal fade" id="addJobModal" role="dialog">
<div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
        <div class="modal-body">
            <div class="modal-job-popup">
                <div class="modal-title">
                    <h4>Add Task</h4>
                </div>
                <div class="form-group">
                    <label for="job_name">Task Name</label>
                    <input type="text" class="form-control required" name="job_name" id="job_name" placeholder="">
                </div>
                <div class="form-group">
                    <label for="work_done">Address of work to be done</label>
                    <input type="text" class="form-control required" name="work_done" id="work_done" >
                </div>

                <div class="form-group custom-fancyjb">
                    <div class="fancy-checkbox checkbox-sm">
                    <input type="checkbox" name="remote" id="remote">
                    <label for="remote"><span>Remote</span></label>
                    <input type="checkbox" name="remote" id="in-person">
                    <label for="remote"><span>In-Person</span></label>
                    </div>
                </div>

                <div class="form-group">
                    <label>Upload Documents</label>
                    <div class="browse-control">
                        <a class="model-btn">
                            <input type="text" class="form-control" value="" placeholder="Browse...">
                            <div class="browse-btn">
                                <input type="file" id="file-doc"
                              accept="" class="inputfile"
                              data-multiple-caption="{count} Upload File" multiple value="Browse..." onchange="readURL(this);">
                                <span id="logo_add">Upload</span>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="form-group">
                <table class="table table-document">
                    <tbody>
                        <!-- <tr>
                            <td class="action-icondelete"><a class="delete-cat" href="javascript:void(0)"><i class="icon icon-ndelete"></i></a></td>
                            <td>file1.pdf</td>
                            <td><div class="text-right document-action"><a href="javascript:void(0);">View</a>|<a href="javascript:void(0);">Download</a></div></td>
                        </tr>
                        <tr>
                            <td class="action-icondelete"><a class="delete-cat" href="javascript:void(0)"><i class="icon icon-ndelete"></i></a></td>
                            <td>file2.pdf</td>
                            <td><div class="text-right document-action"><a href="javascript:void(0);">View</a>|<a href="javascript:void(0);">Download</a></div></td>
                        </tr>
                        <tr>
                            <td class="action-icondelete"><a class="delete-cat" href="javascript:void(0)"><i class="icon icon-ndelete"></i></a></td>
                            <td>file3.pdf</td>
                            <td><div class="text-right document-action"><a href="javascript:void(0);">View</a>|<a href="javascript:void(0);">Download</a></div></td>
                        </tr> -->
                    </tbody>
                </table>
            </div>
            <hr>
                <div class="navtab-filter">
                    <button type="button" class="btn btn-quote-cancel" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-quote-submit" data-dismiss="modal">Add</button>
                </div>
            </div>


        </div>
    </div>
</div>
</div>


<!--modal register-->

 <!-- begin footer --> 
<div class="modal-overlay"></div>
<script type="text/javascript">
    $(function () { var ddlData = [{ text: "EN", value: 1, imageSrc: "images/gb.svg" }, { text: "CN", value: 2, imageSrc: "images/cn.svg" }, { text: "FR", value: 3, imageSrc: "images/fr.svg" }]; $('.language-list').ddslick({ data: ddlData, width: 100, imagePosition: "left", onSelected: function (selectedData) { } }); });
    
    function j_nextTab() {
        jQuery(".jobform-tab li.active").next('li').children('a').trigger('click');
    }
    function j_finishedTab() {
        var tab = jQuery(".jobform-tab li.active a").attr('href');
        validateTab(tab);
        if (validateTab(tab) == 0 ) {
            jQuery(".jobform-tab").removeClass('prevTab');
            jQuery('.jobform-tab .nav-tabs li').addClass('check');
            jQuery('.jobform-tab .nav-tabs li').prevAll().addClass('check');
            jQuery('.jobform-tab .nav-tabs li').removeClass('active');
            setTimeout(function(){ 
               window.location.href = "/user/plugins/8e94739d-b260-41ec-9496-dfa98bb8cdc0/lodged.html";
            },1000);
        } else {
            return false
        }
        
    }
    function j_prevTab() {
        jQuery(".jobform-tab").addClass('prevTab');
        jQuery(".jobform-tab li.active").prev('li').children('a').trigger('click');
    }
    function j_disAllTab(target) {
        target.find('li').addClass('disabled');
        target.find('li > a').removeAttr('data-toggle');
    }
    function validateTab(tab) {
        var validate = 0;
        var target = jQuery(".job-form-tab-design .tab-content "+tab+" ").find('.jobform-form');
        switch (tab) {
            case '#select_location':
            target.find('.required').each(function () {
                var val = jQuery(this).val();
                if (!jQuery.trim(val)) {
                    validate = 1;
                    jQuery(this).addClass('error-con');
                }
            });
            break;
            case '#get_quote':
            target.find('.required').each(function () {
                var val = jQuery(this).val();
                if (!jQuery.trim(val)) {
                    validate = 1;
                    jQuery(this).addClass('error-con');
                }
            });
            break;
            case '#time_frame':
            target.find('.required').each(function () {
                var val = jQuery(this).val();
                if (!jQuery.trim(val)) {
                    validate = 1;
                    jQuery(this).addClass('error-con');
                }
            });

            if (!jQuery("#acknowledge").prop("checked") ) {
                validate = 1;
                jQuery("#acknowledge").addClass('error-con');
            }

            break;
            case '#contact_details':
            var nEmail = jQuery("#email");
            target.find('.required').each(function () {
                var val = jQuery(this).val();
                if (!jQuery.trim(val)) {
                    validate = 1;
                    jQuery(this).addClass('error-con');
                }
            });
            if (!validateEmail(nEmail.val())) {
                validate = 1;
                nEmail.addClass('error-con');
            }

            break;
        }
        return validate;
    }
    function readURL(input) {
        console.log(input.files[0])
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                /*console.log(e.target);
                var container = $(input).closest(".full-width").find(".layout-logo-container");
                container.html('');
                var pImage = "<img src=" + e.target.result + " alt='image'>";
                container.append(pImage);*/
                $(input).closest(".browse-control").find("input[type=text]").val(input.files[0]['name']);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    function jobTabTimeline() {
         var width = ($('.jobform-tab .nav-tabs li:eq(1)').offset().left - $('.jobform-tab .nav-tabs li:eq(0)').offset().left) - $('.jobform-tab .nav-tabs li:eq(1)').width();
         $('style#job-timeline').remove();
         $('head').append('<style id="job-timeline">.lodge-tab-design .jobform-tab .nav-tabs>li>a:before{ width: '+width+'px !important;} .lodge-tab-design .jobform-tab .nav-tabs>li.active>a:after{width: '+width+'px !important;} </style>');
      }
    jQuery(document).ready(function () {


        jobTabTimeline();

        $(window).on('resize', jobTabTimeline);



        jQuery('body').on('change','#in_person_work', function (event) {
            if($(this).is(':checked')){
                $('.location-map-hide-show').fadeIn('slow');
                newMap()
            }else{
                $('.location-map-hide-show').fadeOut('slow');
            }
        });

        jQuery('body').on('change','#remote_work', function (event) {
            if($(this).is(':checked')){
               $('.location-map-hide-show').fadeOut('slow');
                
            }else{
               $('.location-map-hide-show').fadeIn('slow');
            }
         });


        jQuery('.jobform-tab .nav-tabs a').on('show.bs.tab', function (event) {
            var tab = jQuery(".jobform-tab li.active a").attr('href');
            console.log(tab);
            if (validateTab(tab) == 0 || jQuery(".jobform-tab").hasClass('prevTab') ) {
            jQuery(".jobform-tab").removeClass('prevTab');
            $(this).parent().addClass('check');
            $(this).parent().prevAll().addClass('check');
            $(this).parent().nextAll().removeClass('check');
            return true;
            } else {
            return false
            }
        });


        $('input[name="payment_fixed_hourly"]').change(function() { 
            $('.payment-hourly').fadeOut();
            $('.payment-fixed').fadeOut();
            if ($('input[name="payment_fixed_hourly"]:checked').val() == 'fixed') {
            $('.payment-fixed').fadeIn();
            } else if ($('input[name="payment_fixed_hourly"]:checked').val() == 'hourly') {
            $('.payment-hourly').fadeIn();
            }
        }).trigger('change');

        // $('input[name="completed_date"]').change(function() { 
        //     if ($(this).is(':checked')) {
        //     $(this).closest('.fancy-checkbox').find('label input').prop("disabled",false);
        //     } else {
        //     $(this).closest('.fancy-checkbox').find('label input').prop("disabled",true);
        //     }
        // }).trigger('change');


        $('#urgent, #no_hurry').change(function() { 
               var $this = $(this); 
            if ($this.is(':checked')) {
               $this.parents(".custom-fancyjb").find('.datepicker').prop("disabled",true);
            } else {
               $this.parents(".custom-fancyjb").find('.datepicker').prop("disabled",false);
            }
         });
         

         $('#completed_date').change(function() { 
               var $this = $(this);
            if ($this.is(':checked')) {
               $this.closest('.fancy-radio').find('label input').prop("disabled",false);
            } else {
               $this.closest('.fancy-radio').find('label input').prop("disabled",true);
            }
         }).trigger('change');
         





        jQuery("#mobi-search").click(function () {
            jQuery(".search-bar").slideToggle();
            if (jQuery("#mobile-menu").is(":visible")) {
            jQuery("#mobile-menu").hide();
            }
            if (jQuery(".category-menu").is(":visible")) {
            jQuery(".category-menu").hide();
            }
        });

        /*nice scroll */
        jQuery("#mobile-menu > ul").niceScroll({ cursorcolor: "#000", cursorwidth: "6px", cursorborderradius: "5px", cursorborder: "1px solid transparent", touchbehavior: true });

        jQuery("#menu-toggle").click(function () {
            var target = jQuery(".category-items");
            var parent = jQuery(".category-menu");
            jQuery(parent).show();
            jQuery(target).slideToggle();
            if (jQuery("#mobile-menu").is(":visible")) {
            jQuery("#mobile-menu").hide();
            }
        });

        jQuerymodal = jQuery('.modal-frame');
        jQueryoverlay = jQuery('.modal-overlay');
        jQuerymodal.bind('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
            if (jQuerymodal.hasClass('state-leave')) {
            jQuerymodal.removeClass('state-leave');
            }
        });
        jQuery('.close').on('click', function () {
            jQueryoverlay.removeClass('state-show');
            jQuerymodal.removeClass('state-appear').addClass('state-leave');
            jQuery('body').removeClass('modal-open')
        });
        jQuery('#register-modal').on('click', function () {
            jQueryoverlay.addClass('state-show');
            jQuerymodal.removeClass('state-leave').addClass('state-appear');
            jQuery('html, body').animate({ scrollTop: 0 }, 0);
            jQuery('body').addClass('modal-open');

        });
        jQuery('.datepicker').datetimepicker({
            viewMode: 'days',
            format: 'DD/MM/YYYY'
        });


        function newMap(){
         var newData = {
              'areas': {}
         };
         $(".mapcontainer").mapael({
           map: {
               name: "usa_states",
               zoom: {
                   enabled: true
               },
               defaultArea: {
                   attrs: {
                       fill: "#5ba4ff",
                       stroke: "#99c7ff",
                       cursor: "pointer"
                   },
                   attrsHover: {
                       animDuration: 0
                   },
                   text: {
                       attrs: {
                           cursor: "pointer",
                           "font-size": 10,
                           fill: "#000"
                       },
                       attrsHover: {
                           animDuration: 0
                       }
                   },
                   eventHandlers: {
                       click: function (e, id, mapElem, textElem) {
                        $.map( newData.areas, function( val, i ) {
                           newData.areas[i] = {
                                   attrs: {
                                       fill: "#5ba4ff"
                                   }
                           };
                        });
                        
                        $(".mapcontainer").trigger('update', [{mapOptions: newData}]);
                        newData = {
                           'areas': {}
                        };
                           
                           if (mapElem.originalAttrs.fill == "#5ba4ff") {
                               newData.areas[id] = {
                                   attrs: {
                                       fill: "#00c8b2"
                                   }
                               };
                           } 
                           $(".mapcontainer").trigger('update', [{mapOptions: newData}]);

                           console.log({newData})
                   
                       }
                   }
               }
           },
           areas: {
               "HI": {
                           text: {content: "Hawaii", attrs: {"font-size": 14}},
                           tooltip: {content: "Hawaii"}
               },

               "AK" : {
                           text: {content: "Alaska", attrs: {"font-size": 14}},
                           tooltip: {content: "Alaska"}
               },
               "FL" : {
                           text: {content: "Florida", attrs: {"font-size": 14}},
                           tooltip: {content: "Florida"}
               },
               "NH" : {
                           text: {content: "New Hampshire", attrs: {"font-size": 14}},
                           tooltip: {content: "New Hampshire"}
               },
               "MI" : {
                           text: {content: "Michigan", attrs: {"font-size": 14}},
                           tooltip: {content: "Michigan"}
               },
               "VT" : {
                           text: {content: "Vermont", attrs: {"font-size": 14}},
                           tooltip: {content: "Vermont"}
               },
               "ME" : {
                           text: {content: "Maine", attrs: {"font-size": 14}},
                           tooltip: {content: "Maine"}
               },
               "RI" : {
                           text: {content: "Rhode Island", attrs: {"font-size": 14}},
                           tooltip: {content: "Rhode Island"}
               },
               "NY" : {
                           text: {content: "New York", attrs: {"font-size": 14}},
                           tooltip: {content: "New York"}
               },
               "PA" : {
                           text: {content: "Pennsylvania", attrs: {"font-size": 14}},
                           tooltip: {content: "Pennsylvania"}
               },
               "NJ" : {
                           text: {content: "New Jersey", attrs: {"font-size": 14}},
                           tooltip: {content: "New Jersey"}
               },
               "DE" : {
                           text: {content: "Delaware", attrs: {"font-size": 14}},
                           tooltip: {content: "Delaware"}
               },
               "MD" : {
                           text: {content: "Maryland", attrs: {"font-size": 14}},
                           tooltip: {content: "Maryland"}
               },
               "VA" : {
                           text: {content: "Virginia", attrs: {"font-size": 14}},
                           tooltip: {content: "Virginia"}
               },
               "WV" : {
                           text: {content: "West Virginia", attrs: {"font-size": 14}},
                           tooltip: {content: "West Virginia"}
               },
               "OH" : {
                           text: {content: "Ohio", attrs: {"font-size": 14}},
                           tooltip: {content: "Ohio"}
               },
               "IN" : {
                           text: {content: "Indiana", attrs: {"font-size": 14}},
                           tooltip: {content: "Indiana"}
               },
               "IL" : {
                           text: {content: "Illinois", attrs: {"font-size": 14}},
                           tooltip: {content: "Illinois"}
               },
               "CT" : {
                           text: {content: "Connecticut", attrs: {"font-size": 14}},
                           tooltip: {content: "Connecticut"}
               },
               "WI" : {
                           text: {content: "Wisconsin", attrs: {"font-size": 14}},
                           tooltip: {content: "Wisconsin"}
               },
               "NC" : {
                           text: {content: "North Carolina", attrs: {"font-size": 14}},
                           tooltip: {content: "North Carolina"}
               },
               "DC" : {
                           text: {content: "District of Columbia", attrs: {"font-size": 14}},
                           tooltip: {content: "District of Columbia"}
               },
               "MA" : {
                           text: {content: "Massachusetts", attrs: {"font-size": 14}},
                           tooltip: {content: "Massachusetts"}
               },
               "TN" : {
                           text: {content: "Tennessee", attrs: {"font-size": 14}},
                           tooltip: {content: "Tennessee"}
               },
               "AR" : {
                           text: {content: "Arkansas", attrs: {"font-size": 14}},
                           tooltip: {content: "Arkansas"}
               },
               "MO" : {
                           text: {content: "Missouri", attrs: {"font-size": 14}},
                           tooltip: {content: "Missouri"}
               },
               "GA" : {
                           text: {content: "Georgia", attrs: {"font-size": 14}},
                           tooltip: {content: "Georgia"}
               },
               "SC" : {
                           text: {content: "South Carolina", attrs: {"font-size": 14}},
                           tooltip: {content: "South Carolina"}
               },
               "KY" : {
                           text: {content: "Kentucky", attrs: {"font-size": 14}},
                           tooltip: {content: "Kentucky"}
               },
               "AL" : {
                           text: {content: "Alabama", attrs: {"font-size": 14}},
                           tooltip: {content: "Alabama"}
               },
               "LA" : {
                           text: {content: "Louisiana", attrs: {"font-size": 14}},
                           tooltip: {content: "Louisiana"}
               },
               "MS" : {
                           text: {content: "Mississippi", attrs: {"font-size": 14}},
                           tooltip: {content: "Mississippi"}
               },
               "IA" : {
                           text: {content: "Iowa", attrs: {"font-size": 14}},
                           tooltip: {content: "Iowa"}
               },
               "MN" : {
                           text: {content: "Minnesota", attrs: {"font-size": 14}},
                           tooltip: {content: "Minnesota"}
               },
               "OK" : {
                           text: {content: "Oklahoma", attrs: {"font-size": 14}},
                           tooltip: {content: "Oklahoma"}
               },
               "TX" : {
                           text: {content: "Texas", attrs: {"font-size": 14}},
                           tooltip: {content: "Texas"}
               },
               "NM" : {
                           text: {content: "New Mexico", attrs: {"font-size": 14}},
                           tooltip: {content: "New Mexico"}
               },
               "KS" : {
                           text: {content: "Kansas", attrs: {"font-size": 14}},
                           tooltip: {content: "Kansas"}
               },
               "NE" : {
                           text: {content: "Nebraska", attrs: {"font-size": 14}},
                           tooltip: {content: "Nebraska"}
               },
               "SD" :  {
                           text: {content: "South Dakota", attrs: {"font-size": 14}},
                           tooltip: {content: "South Dakota"}
               },
               "ND" : {
                           text: {content: "North Dakota", attrs: {"font-size": 14}},
                           tooltip: {content: "North Dakota"}
               },
               "WY" : {
                           text: {content: "Wyoming", attrs: {"font-size": 14}},
                           tooltip: {content: "Wyoming"}
               },
               "MT" : {
                           text: {content: "Montana", attrs: {"font-size": 14}},
                           tooltip: {content: "Montana"}
               },
               "CO" : {
                           text: {content: "Colorado", attrs: {"font-size": 14}},
                           tooltip: {content: "Colorado"}
               },
               "ID" : {
                           text: {content: "Idaho", attrs: {"font-size": 14}},
                           tooltip: {content: "Idaho"}
               },
               "UT" : {
                           text: {content: "Utah", attrs: {"font-size": 14}},
                           tooltip: {content: "Utah"}
               },
               "AZ" : {
                           text: {content: "Arizona", attrs: {"font-size": 14}},
                           tooltip: {content: "Arizona"}
               },
               "NV" : {
                           text: {content: "Nevada", attrs: {"font-size": 14}},
                           tooltip: {content: "Nevada"}
               },
               "OR" : {
                           text: {content: "Oregon", attrs: {"font-size": 14}},
                           tooltip: {content: "Oregon"}
               },
               "WA" : {
                           text: {content: "Washington", attrs: {"font-size": 14}},
                           tooltip: {content: "Washington"}
               },
               "CA" : {
                           text: {content: "California", attrs: {"font-size": 14}},
                           tooltip: {content: "California"}
               }
               
           }
       });
      }






























        // $('.cmaphilight').maphilight({
        //     // fill the shape
        //     fill: true,

        //     // fill color
        //     fillColor: '000000',

        //     // fill opacity
        //     fillOpacity: 0.2,

        //     // outline the shape
        //     stroke: true,

        //     // stroke color
        //     strokeColor: 'ff0000',

        //     // stroke opacity
        //     strokeOpacity: 1,

        //     // stroke width
        //     strokeWidth: 1,

        //     // fade in the shapes on mouseover
        //     fade: true,

        //     // always show the hilighted areas
        //     alwaysOn: false,

        //     // never show the hilighted areas
        //     neverOn: false,

        //     // The name of an attribute to group areas by, or a selector for elements in the map to group. 
        //     // Or an array of the same
        //     // If this is present then all areas in the map which have the same attribute value as the hovered area will hilight as well
        //     groupBy: false,

        //     // If true, applies the class on the <img> to the wrapper div maphilight created.
        //     // If a string, that string is used as a class on the wrapper div.
        //     wrapClass: true,

        //     // apply a shadow to the shape
        //     shadow: false,
        //     shadowX: 0,
        //     shadowY: 0,
        //     shadowRadius: 6,
        //     shadowColor: '000000',
        //     shadowOpacity: 0.8,
        //     // Can be 'outside', 'inside', or 'both'.
        //     shadowPosition: 'outside',
        //     // Can be 'stroke' or 'fill'
        //     shadowFrom: false,

        // });
});
</script>
<script type="text/javascript" src="scripts/jquery.mapael.js"></script>
<script type="text/javascript" src="scripts/usa_states.js"></script>
<script type="text/javascript" src="scripts/maps/world_countries.js"></script>
<script type="text/javascript" src="scripts/lodge_job.js"></script>


<!-- end footer --> 

<!-- <script src="/user/plugins/8e94739d-b260-41ec-9496-dfa98bb8cdc0/scripts/jquery.mapael.js" charset="utf-8"></script> -->

<!-- vue js production cdn -->
