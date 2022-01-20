
<!DOCTYPE html
   PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">


<!-- begin headerr --> 
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>Market Place :: Job Form</title>
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
   <script type="text/javascript" src="js/jquery.maphilight.min.js"></script>
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/codex-fly.js"></script>
   <!-- mobile-menu js -->
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/mobile-menu.js"></script>

   <!-- map js -->
   <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js"
            charset="utf-8"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.min.js" charset="utf-8"></script>
   


   <!-- custom js -->
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/custom.js"></script>
   <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/jquery.ddslick.js"></script>

  
   <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.js"></script>

   <script type="text/javascript" src="subscribe/8e94739d-b260-41ec-9496-dfa98bb8cdc0/scripts/users.js"></script>


   

   <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.js"></script>
   <script src="https://unpkg.com/vue/dist/vue.min.js"></script> -->

   <!-- bootstrap style -->
   <link href="https://bootstrap.arcadier.com/spacetime/css/bootstrap.min.css" rel="stylesheet" type="text/css">
   <link href="https://bootstrap.arcadier.com/spacetime/css/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css">
   <link href="https://bootstrap.arcadier.com/spacetime/css/fancy-radio.css" rel="stylesheet" type="text/css">

   <!-- custom style-->
   <link href="https://bootstrap.arcadier.com/spacetime/css/style.css" rel="stylesheet" type="text/css">
   <!-- responsive style-->
   <link href="https://bootstrap.arcadier.com/spacetime/css/responsive.css" rel="stylesheet" type="text/css">
   <link href="css/map.css" rel="stylesheet" type="text/css">
   <link href="css/custom.css" rel="stylesheet" type="text/css">
   <!-- modal style-->
   <link href="https://bootstrap.arcadier.com/spacetime/css/modal.css" rel="stylesheet" type="text/css">
</head>

<!-- end headerr --> 

<body class="seller-items">
   <!-- header -->
  
   <!-- header -->
   <div class="main">
      <div class="content-pages">
         <div class="container">
            <div class="freelancer-content-main">
               <div class="job-form-tab-design">
                  <div class="jobform-tab">
                     <ul class="nav nav-tabs">
                        <li class="active"><a data-toggle="tab" href="#registration"><span>Registration</span></a></li>
                        <li><a data-toggle="tab" href="#verification-details"><span>Verification Details</span></a></li>
                        <li><a data-toggle="tab" href="#verification"><span>Verification</span></a></li>
                        <li><a data-toggle="tab" href="#approval"><span>Approval</span></a></li>
                        <li><a data-toggle="tab" href="#start"><span>Start</span></a></li>
                     </ul>
                  </div>
                  <div class="tab-content">
                     <div id="registration" class="tab-pane fade in active">
                        <div class="jobform-form">
                           <h3>Registration</h3>
                           <div class="form-group">
                              <label for="email">Email Address</label>
                              <input type="text" class="form-control" name="email" id="email" placeholder="">
                           </div>
                           <div class="form-group">
                              <label for="password">Set a Password</label>
                              <input type="password" class="form-control" name="password" id="password" placeholder="">
                           </div>
                           <div class="form-group">
                              <label for="retype_password">Retype Password</label>
                              <input type="password" class="form-control" name="retype_password" id="retype_password" placeholder="">
                           </div>

                           <div class="jobform-note">
                              <p><u>Note</u></p>
                              <p>To be verified, please have a copy of the following documents ready. </p>
                              <p>Current ABN and Current Insurance Certificate.</p>
                           </div>

                           <div class="register-btn">
                              <button  class="btn btn-register">Register</button>
                              <!-- <button onclick="j_nextTab();" class="btn btn-facebook"><svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="M17.525,9H14V7c0-1.032,0.084-1.682,1.563-1.682h1.868v-3.18C16.522,2.044,15.608,1.998,14.693,2 C11.98,2,10,3.657,10,6.699V9H7v4l3-0.001V22h4v-9.003l3.066-0.001L17.525,9z"/></svg><span>Register using Facebook</span></button>
                              <button onclick="j_nextTab();" class="btn btn-google"><svg fill="#fff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 64 64" width="24px" height="24px"><path d="M 32.521484 6 C 18.158484 6 6.515625 17.642 6.515625 32 C 6.515625 46.358 18.158484 58 32.521484 58 C 54.209484 58 59.098453 37.865969 57.064453 27.667969 L 51.181641 27.667969 L 49.269531 27.667969 L 32.515625 27.667969 L 32.515625 36.333984 L 49.279297 36.333984 C 47.351759 43.804816 40.588119 49.332031 32.515625 49.332031 C 22.943625 49.332031 15.181641 41.572 15.181641 32 C 15.181641 22.428 22.943625 14.667969 32.515625 14.667969 C 36.868625 14.667969 40.834906 16.283594 43.878906 18.933594 L 50.033203 12.779297 C 45.410203 8.5672969 39.266484 6 32.521484 6 z"/></svg><span>Register using Google</span></button> -->
                           </div>
                        </div>
                     </div>
                     <div id="verification-details" class="tab-pane fade">
                        <button onclick="j_prevTab();" class="btn btn-jobform-outline">Back</button>
                        <div class="jobform-form">
                           <h3>Verification Details</h3>
                           

                           <!-- default fields -->

                           <div field-type="search" class="form-group"><label for="ABN lookup">Company lookup</label> <div class="search-abn">
                              <input type="search" name="abn-lookup" placeholder="Enter Company name" class="form-control search"> <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                           </div> <input type="text"  name="abn-lookup" id="company-name" placeholder="" class="form-control required"></div>

                           <div field-type="textfield" class="form-group"><label for="Address">Address</label> 
                           <input type="text"  name="Address" id="address" placeholder="" class="form-control required"></div>
                           

                           <div field-type="dropdown" class="form-group"><label for="Country">Country</label> 
                           <select  name="country" id="country" type="dropdown" class="form-control required"><option>Australia</option></select></div>

                           <div field-type="textfield" class="form-group"><label for="State">State</label> <!----> 
                           <input  type="text" name="State" id="state" placeholder="" class="form-control required"></div>

                           <div field-type="textfield" class="form-group"><label for="City">City</label> <!---->
                           <input  type="text" name="City" id="city" placeholder="" class="form-control required"></div>

                           <div field-type="textfield" class="form-group"><label for="Postal Code ">Postal Code </label> <!----> 
                           <input  type="text" name="Postal Code " id="postal-code" placeholder="" class="form-control required"></div>  

                           <div field-type="textfield" class="form-group"><label for="Telephone">Telephone ( We shall be calling this number as we verify you.)</label>
                           <input  type="text" name="phone" id="phone" placeholder="" class="form-control required"></div>

                           <!-- end default fields -->


						         <div v-for="field in fieldDetails" class="form-group custom-details" :field-type="field.type_of_field">
                              <label v-if="field.type_of_field !=='file'" :for="field.name">{{ field.text }}</label>

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

                            
                           <div class="form-group"> 
                              <label for="servicing_area">Servicing Area</label>
                            <div class="btn-hbox custom-fancyjb cdflex btn-hrmmargin">
                                <div class="fancy-checkbox checkbox-sm">
                                    <input type="checkbox" name="servicing_area_all" id="servicing_area_all">
                                     <label for="servicing_area_all"><span>Select all</span></label>
                                </div>
                                <div class="fancy-checkbox checkbox-sm">
                                    <input type="checkbox" name="servicing_area_remote" id="servicing_area_remote">
                                        <label for="servicing_area_remote"><span>Remote</span></label>
                                </div>
                            </div>
                           </div>
                           <div class="location-map-hide-show">
                              <div class="mapcontainer">
                                 <div class="map"></div>
                              </div>
                           
                           </div>
                           
                           <div class="form-group custom-fancyjb">
                              <label>Select verification method of upload</label>
                                 <!-- <div>
                                    <div class="fancy-checkbox checkbox-sm">
                                       <input type="checkbox" checked="checked" name="certificate_currency" id="certificate_currency">
                                       <label for="certificate_currency"><span>Certificate of Currency</span></label>
                                    </div>
                              </div> -->
                           </div>

                          <!-- dynamic upload custom fields start-->

                          <div v-for="field in uploadCustomFields" class="form-group" :id="field.Id"> 
                                 <div class="custom-fancyjb">
                                    <div class="fancy-checkbox checkbox-sm">
                                       <input type="checkbox" checked="checked" :name="field.name" :id="field.name | hypenate" >
                                       <label :for="field.name | hypenate"><span>{{ field.text }} </span></label>
                                    </div>
                              </div>
                          
                        <div class="driver_license_director_input">
                           <div class="form-group">
                              <label>Upload Documents</label>
                              <div class="browse-control">
                                 <a class="model-btn">
                                       <input type="text" class="form-control" value="">
                                       <div class="browse-btn">
                                          <input type="file" value="Browse..." multiple onchange="readURL(this);" id="uploads"  :upload-name="field.name">
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
                     </div>




                          <!-- dynamic upload custom fields end-->


                        




                           <div class="form-group custom-fancyjb">
                           
                              <div>
                                 <p>Credit Card Details</p>
                                 <p>Your credit card shall only be charged if your provided quotes got accepted. A fee of AUD 10.00 per accepted quote will be debited.</p>
                                 <div class="fancy-checkbox checkbox-sm">
                                    <input type="checkbox" name="credit_card" id="credit_card">
                                    <label for="credit_card"><span>I don’t have a credit card.</span></label>
                                 </div>
                              </div>
                           </div>


                           <div class="credit_card_input">
                           <div class="row">
                           <div class="col-sm-8">
                              <div class="form-group">
                                 <label for="card_no">Card No.</label>
                                 <input type="text" class="form-control" name="card_no" id="card_no" placeholder="">
                              </div>
                           </div>
                           <div class="col-sm-4">
                              <div class="form-group">
                                 <label for="csv">CSV</label>
                                 <input type="text" class="form-control" name="csv" id="csv" placeholder="">
                              </div>
                           </div>
                           </div>
                           <div class="row">
                           <div class="col-sm-6">
                              <div class="form-group">
                                 <label for="expiry">Expiry</label>
                                 <div class="form-group">
                                    <div class='input-group date'>
                                       <input type="text" class="form-control" id="datepicker" name="expiry" id="expiry" placeholder="DD / MM ">
                                       <span class="input-group-addon">
                                       <span>
                                          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                             <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                                          </svg>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           </div>
                           </div>

                           <div class="same_address_input">
                              <div class="form-group">
                                 <label for="billing_address_1">Billing Address</label>
                                 <input type="text" class="form-control required" name="billing_address_1" id="billing_address_1" placeholder="">
                                 <input type="text" class="form-control required" name="billing_address_1" id="billing_address_2" placeholder="">
                              </div>
                           </div>

                           <div class="custom-fancyjb">
                           <div class="fancy-checkbox checkbox-sm">
                              <input type="checkbox" checked="checked" name="same_address" id="same_address">
                              <label for="same_address"><span>Same as my address</span></label>
                           </div>
                           </div>
                        <hr>
                           <div class="next-tab-area"><span class="seller-btn"> <a onclick="j_nextTab();" class="my-btn btn-red" href="javascript:void(0);">Next</a> </span></div>
                        </div>
                     </div>
                     <div id="verification" class="tab-pane fade">
                        <button onclick="j_prevTab();" class="btn btn-jobform-outline">Back</button>
                        <div class="jobform-form">
                           <h3>Verification</h3>

                           <div class="verification-box"><p>Waiting for verification.<br>We are currently assessing the data you have filled in.</p></div>
                           <div v-if="adminComment != ''" class="form-group">
                              <label for="comments">Additional admin comments:</label>
                              <div class="comment-desc">{{ adminComment }}</div>
                           </div>
                           <hr>
                            <div v-if="registrationStatus != 'Pending' && registrationStatus != 'Rejected' " class="next-tab-area"><span class="seller-btn"> <a onclick="j_nextTab();" class="my-btn btn-red" href="javascript:void(0);">Next</a> </span></div>
                        </div>
                     </div>
                    <div id="approval" class="tab-pane fade">
                        <button onclick="j_prevTab();" class="btn btn-jobform-outline">Back</button>
                        <div class="jobform-form">
                           <h3>Approval</h3>
                           <div class="form-group">
                              <label for="approval">Description</label>
                              <textarea class="form-control required" rows="5" name="approval" id="approval" placeholder="">Your registration has been approved. </textarea>
                           </div>
                           <hr>
                           <div class="next-tab-area"><span class="seller-btn"> <a onclick="j_nextTab();" class="my-btn btn-red" href="javascript:void(0);">Next</a> </span></div>
                        </div>
                     </div>
                     <div id="start" class="tab-pane fade">
                        <button onclick="j_prevTab();" class="btn btn-jobform-outline">Back</button>
                        <div class="jobform-form">
                           <h3>Start</h3>
                           <div class="form-group">
                              <label for="start">Description</label>
                              <textarea class="form-control required" rows="5" name="start" id="start" placeholder=""></textarea>
                           </div>
                           <hr>
                           <div class="next-tab-area"><span class="seller-btn"> <a onclick="j_finishedTab();" class="my-btn btn-red" href="javascript:void(0);">Finished</a> </span></div>
                     </div>                  
                     </div>
                  </div>

               </div>
            </div>
         </div>
      </div>
   </div>
   <!-- End Item form-->
   </div>
   </div>
   <!-- footer -->
   <div class="footer">
      <div class="container">
         <div class="row">
            <div class="footer-wrapper">
               <div class="footer-navigation">
                  <ul>
                     <li><a href="https://bootstrap.arcadier.com/spacetime/about-us.html">ABOUT</a></li>
                     <li><a href="https://bootstrap.arcadier.com/spacetime/return-policy.html">SERVICE TERMS</a></li>
                     <li><a href="https://bootstrap.arcadier.com/spacetime/privacy-policy.html">PRIVACY</a></li>
                     <li><a href="https://bootstrap.arcadier.com/spacetime/terms-of-service.html">RETURNS</a></li>
                     <li><a href="https://bootstrap.arcadier.com/spacetime/contact.html">CONTACT</a></li>
                     <li><a href="https://bootstrap.arcadier.com/spacetime/faq.html">FAQ</a></li>
                  </ul>
                  <div class="clearfix"></div>
               </div>
               <div class="footer-bottom">
                  <h6>MARKETPLACENAMELIMIT30CHARSTOO</h6>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="backTop"><a href="javascript:void(0);" onclick="ScrollTop();"><img
            src="https://bootstrap.arcadier.com/spacetime/images/mobile_top.svg"></a></div>
   <div class="modal fade model-img-crop" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-body">
               <div id="modaldialog" class="html5imageupload" data-download="true" data-save="false" data-resize="true"
                  data-width="150" data-height="150" data-url="canvas.php" style="width: 100%;">
                  <input type="file" name="thumb" />
               </div>
            </div>
         </div>
      </div>
   </div>
   <!-- footer -->
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
   <!--modal register-->
   <div class="modal-overlay"></div>

   <!-- begin footer --> 
   <script type="text/javascript">
      $(function () { var ddlData = [{ text: "EN", value: 1, imageSrc: "images/gb.svg" }, { text: "CN", value: 2, imageSrc: "images/cn.svg" }, { text: "FR", value: 3, imageSrc: "images/fr.svg" }]; $('.language-list').ddslick({ data: ddlData, width: 100, imagePosition: "left", onSelected: function (selectedData) { } }); });

      function j_nextTab() {
         jQuery(".jobform-tab li.active").next('li').children('a').trigger('click');
         setTimeout(function() {
            newMap();
         }, 500);
         
      }
      function j_prevTab() {
         jQuery(".jobform-tab").addClass('prevTab');
         jQuery(".jobform-tab li.active").prev('li').children('a').trigger('click');
      }

      function j_disAllTab(target) {
         target.find('li').addClass('disabled');
         target.find('li > a').removeAttr('data-toggle');
      }
      
      function j_finishedTab() {
        setTimeout(function(){ 
          window.location.href = "registration-done";
        },1000);
      }

      function jobTabTimeline() {
         var width = ($('.jobform-tab .nav-tabs li:eq(1)').offset().left - $('.jobform-tab .nav-tabs li:eq(0)').offset().left) - $('.jobform-tab .nav-tabs li:eq(1)').width();
         $('style#job-timeline').remove();
         $('head').append('<style id="job-timeline">.jobform-tab .nav-tabs>li>a:before{ width: '+width+'px;} .jobform-tab .nav-tabs>li.active>a:after{width: '+width+'px;} </style>');
      }

      function validateTab(tab) {
         var validate = 0;
         var target = jQuery(".job-form-tab-design .tab-content "+tab+" ").find('.jobform-form');
         switch (tab) {
            case '#registration':
               /*var nEmail = jQuery("#email");
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
               }*/
               break;
            case '#verification-details':
               
               target.find('.required').each(function () {
                  var val = jQuery(this).val();
                  if (!jQuery.trim(val)) {
                     validate = 1;
                     jQuery(this).addClass('error-con');
                  }
               });
               
               
               break;
            case '#verification':
               target.find('.required').each(function () {
                  var val = jQuery(this).val();
                  if (!jQuery.trim(val)) {
                     validate = 1;
                     jQuery(this).addClass('error-con');
                  }
               });
               break;
            case '#approval':
               target.find('.required').each(function () {
                  var val = jQuery(this).val();
                  if (!jQuery.trim(val)) {
                     validate = 1;
                     jQuery(this).addClass('error-con');
                  }
               });
            break;
            case '#start':
               target.find('.required').each(function () {
                  var val = jQuery(this).val();
                  if (!jQuery.trim(val)) {
                     validate = 1;
                     jQuery(this).addClass('error-con');
                  }
               });
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

      jQuery(document).ready(function () {
         jobTabTimeline();

         $(window).on('resize', jobTabTimeline);

        jQuery('body').on('change','#servicing_area_all', function (event) {
            if($(this).is(':checked')){
               //  $('.location-map-hide-show').fadeIn('slow');
               newMapSelectedAll();
            }else{
               newMap();
               //  $('.location-map-hide-show').fadeOut('slow');
            }
         });

         jQuery('body').on('change','#servicing_area_remote', function (event) {
            if($(this).is(':checked')){
               //  $('.location-map-hide-show').fadeIn('slow');
                newMap();
            }else{
               newMap();
               //  $('.location-map-hide-show').fadeOut('slow');
            }
         });
         jQuery('#datepicker').datetimepicker({
            viewMode: 'years',
            format: 'MM/YYYY'
         });

         $('#credit_card').change(function() { 
            $('.credit_card_input input').removeClass("error-con");
            if ($(this).is(':checked')) {
               $('.credit_card_input input').prop("disabled",true);
               $('.credit_card_input input').removeClass("required");
            } else {
               $('.credit_card_input input').prop("disabled",false);
              // $('.credit_card_input input').addClass("required");
            }
         }).trigger('change');

       

         $('#certificate_currency').change(function() { 
            $('.certificate_currency_input input').removeClass("error-con");
            if ($(this).is(':checked')) {
               $('.certificate_currency_input').fadeIn();
               $('.certificate_currency_input input').addClass("required");
               $('.certificate_currency_input input').prop("disabled",false);
            } else {
               $('.certificate_currency_input').fadeOut();
               $('.certificate_currency_input input').prop("disabled",true);
               $('.certificate_currency_input input').removeClass("required");
            }
         }).trigger('change');

         $('#driver_license_director').change(function() { 
            $('.driver_license_director_input input').removeClass("error-con");
            if ($(this).is(':checked')) {
               $('.driver_license_director_input').fadeIn();
               $('.driver_license_director_input input').prop("disabled",false);
               $('.driver_license_director_input input').addClass("required");
            } else {
               $('.driver_license_director_input').fadeOut();
               $('.driver_license_director_input input').prop("disabled",true);
               $('.driver_license_director_input input').removeClass("required");
            }
         }).trigger('change');

         $('#same_address').change(function() { 
            $('.same_address_input input').removeClass("error-con");
            if ($(this).is(':checked')) {
               $('.same_address_input input').prop("disabled",true);
               $('.same_address_input input').removeClass("required");
            } else {
               $('.same_address_input input').prop("disabled",false);
               $('.same_address_input input').addClass("required");;
            }
         }).trigger('change');
         jQuery('.jobform-tab .nav-tabs a').on('show.bs.tab', function (event) {
            var tab = jQuery(".jobform-tab li.active a").attr('href');
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
         $('.jobform-tab .nav-tabs a').on('shown.bs.tab', function(){
            if( jQuery(".jobform-tab li.active a").attr('href') == '#verification-details' ){
               // $('.cmaphilight').maphilight({
               //    fill: true,
               //    fillColor: '000000',
               //    fillOpacity: 0.2,
               //    stroke: true,
               //    strokeColor: 'ff0000',
               //    strokeOpacity: 1,
               //    strokeWidth: 1,
               //    fade: true,
               //    alwaysOn: false,
               //    neverOn: false,
               //    groupBy: false,
               //    wrapClass: true,
               //    shadow: false,
               //    shadowX: 0,
               //    shadowY: 0,
               //    shadowRadius: 6,
               //    shadowColor: '000000',
               //    shadowOpacity: 0.8,
               //    shadowPosition: 'outside',
               //    shadowFrom: false,
               // });
            }

         });


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

         
      });

      function newMap(){
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
                           var newData = {
                               'areas': {}
                           };
                           if (mapElem.originalAttrs.fill == "#5ba4ff") {
                               newData.areas[id] = {
                                   attrs: {
                                       fill: "#00c8b2"
                                   }
                               };
                           } else {
                               newData.areas[id] = {
                                   attrs: {
                                       fill: "#5ba4ff"
                                   }
                               };
                           }
                           $(".mapcontainer").trigger('update', [{mapOptions: newData}]);
                           console.log(newData['areas']);
                           console.log(Object.keys(newData['areas'])[0]);
                           $('#location').val(Object.keys(newData['areas'])[0]);
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


      function newMapSelectedAll(){
         $(".mapcontainer").mapael({
           map: {
               name: "usa_states",
               zoom: {
                   enabled: true
               },
               defaultArea: {
                   attrs: {
                       fill: "#00c8b2",
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
                  //  eventHandlers: {
                  //      click: function (e, id, mapElem, textElem) {
                  //          var newData = {
                  //              'areas': {}
                  //          };
                  //          if (mapElem.originalAttrs.fill == "#5ba4ff") {
                  //              newData.areas[id] = {
                  //                  attrs: {
                  //                      fill: "#00c8b2"
                  //                  }
                  //              };
                  //          } else {
                  //              newData.areas[id] = {
                  //                  attrs: {
                  //                      fill: "#5ba4ff"
                  //                  }
                  //              };
                  //          }
                  //          $(".mapcontainer").trigger('update', [{mapOptions: newData}]);
                  //      }
                  //  }
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
      
   </script>
                




<script type="text/javascript" src="subscribe/8e94739d-b260-41ec-9496-dfa98bb8cdc0/scripts/jquery.mapael.js"></script>
<script type="text/javascript" src="subscribe/8e94739d-b260-41ec-9496-dfa98bb8cdc0/scripts/usa_states.js"></script>
   




<!-- <script type="text/javascript" src="subscribe/scripts/maps/world_countries.js"></script> -->
<!-- end footer --> 
</body>

</html> 