(function () {
    /* globals $ */
    var scriptSrc = document.currentScript.src;
    var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
    var packageId = re.exec(scriptSrc.toLowerCase())[1];
    var packagePath = scriptSrc.replace("/scripts/scripts.js", "").trim();
    var customFieldPrefix = packageId.replace(/-/g, "");
    const HOST = window.location.host;
    var hostname = window.location.hostname;
    var urls = window.location.href.toLowerCase();
    var userId = $("#userGuid").val();
    const protocol = window.location.protocol;
   const baseURL = window.location.hostname;
   var chargeEnabled = "False";
   var viewBidBuyerEnabled = "False";
   var buyerViewBidCharge;
   var buyerAcceptBidCharge;
   var buyerAcceptBidChargeEnabled;
   var sellerViewAcceptedCharge;
   var sellerViewAcceptedEnabled;
   var buyerCompletedCharge;
   var buyerCompletedChargeEnabled;
   var lat;
   var long;
   var accuracy;
   
    //const token = getCookie('webapitoken');
   function distanceBetweenTwoPlace(firstLat, firstLon, secondLat, secondLon, unit) {
         var firstRadlat = Math.PI * firstLat/180
         var secondRadlat = Math.PI * secondLat/180
         var theta = firstLon-secondLon;
         var radtheta = Math.PI * theta/180
         var distance = Math.sin(firstRadlat) * Math.sin(secondRadlat) + Math.cos(firstRadlat) * Math.cos(secondRadlat) * Math.cos(radtheta);
         if (distance > 1) {
               distance = 1;
         }
         distance = Math.acos(distance)
         distance = distance * 180/Math.PI
         distance = distance * 60 * 1.1515
         if (unit=="K") { distance = distance * 1.609344 }
         if (unit=="N") { distance = distance * 0.8684 }
         return distance
   }

   function getPosition(position)
   {
      // console.log(position)
      lat = position.coords.latitude
      long = position.coords.longitude
      accuracy = position.coords.accuracy

      // if (marker) {
      //    map.removeLayer(marker)
      // }

      // if (circle) {
      //    map.removeLayer(circle)
      // }

      // marker = L.marker([lat, long])
      // circle = L.circle([lat, long], {
      //    radius: accuracy
      // })

      // var featureGroup = L.featureGroup([marker, circle]).addTo(map)

      // map.fitBounds(featureGroup.getBounds())

      console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy)
      var jobs = jobData.getInstance();
      jobs.getAllJobs();
    //  sellerFields.getNearestLocations(lat, long, 100)

   }
    
    function waitForElement(elementPath, callBack) {
      window.setTimeout(function () {
        if ($(elementPath).length) {
          callBack(elementPath, $(elementPath));
        } else {
          waitForElement(elementPath, callBack);
        }
      }, 500);
    }
  
    function getMarketplaceCustomFields(callback) {
      var apiUrl = "/api/v2/marketplaces";
      $.ajax({
        url: apiUrl,
        method: "GET",
        contentType: "application/json",
        success: function (result) {
          if (result) {
            callback(result.CustomFields);
          }
        },
      });
    }
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
    function lockView(x) {
        jQuery('#paymentModal').modal('show');
   }
     function lockViewFreelancer(x) {
        jQuery('#paymentModalFreelancer').modal('show');
    }

  function charge(token, amount, quoteId, accessUrl)
   {
      amount = Math.round(amount * 100)
      var apiUrl = packagePath + '/stripe_charge.php';
      var data = { token, amount, quoteId }
      $.ajax({
         url: apiUrl,
         method: 'POST',
         contentType: 'application/json',
         data: JSON.stringify(data),
         success: function (result)
         {
            result = JSON.parse(result);
            if (result.id) {

               console.log('charge');

               window.location = accessUrl;
               
            }


         },
         error: function (jqXHR, status, err)
         {
            //	toastr.error('Error!');
         }
      });

   }


    function chargeFreelancerView(token, amount, freelancerQuoteId, accessUrl)
   {
      amount = Math.round(amount * 100)
      var apiUrl = packagePath + '/stripe_charge.php';
      var data = { token, amount, freelancerQuoteId }
      $.ajax({
         url: apiUrl,
         method: 'POST',
         contentType: 'application/json',
         data: JSON.stringify(data),
         success: function (result)
         {
            result = JSON.parse(result);
            if (result.id) {

               console.log('charge');

              window.location = accessUrl;
               
            }


         },
         error: function (jqXHR, status, err)
         {
            //	toastr.error('Error!');
         }
      });

   }

  

   function chargeQuoteAccept(token, amount, quoteId, accessUrl)
   {
      amount = Math.round(amount * 100)
      var apiUrl = packagePath + '/stripe_charge.php';
      var data = { token, amount, quoteId }
      $.ajax({
         url: apiUrl,
         method: 'POST',
         contentType: 'application/json',
         data: JSON.stringify(data),
         success: function (result)
         {
            result = JSON.parse(result);
            if (result.id) {

               console.log('charge');
               // window.location = $('#access-url').val();

                var quote = quoteData.getInstance();
                quote.quoteAction('Accepted', $('#paynowPackage').attr('job-id'), $('#paynowPackage').attr('user-id'), $('#paynowPackage').attr('quote-id'));
                  
            }


         },
         error: function (jqXHR, status, err)
         {
            //	toastr.error('Error!');
         }
      });

   }

      function chargeQuoteCompleted(token, amount, quoteId, accessUrl)
      {
         amount = Math.round($('#charge-amount-complete').text() * 100)
         var apiUrl = packagePath + '/stripe_charge_complete.php';
         var merchantToken = $('#merchant-key').val();
                               
         var adminCharge = amount;
         var merchantCharge = Math.round($('#merchant-charge').val() * 100)
         var data = { token, adminCharge, merchantCharge, merchantToken, quoteId }
         $.ajax({
            url: apiUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (result)
            {
               result = JSON.parse(result);
               if (result.id) {

                  console.log('charge');
                  // window.location = $('#access-url').val();

                  var quote = quoteData.getInstance();
                  quote.quoteAction('Completed', $('#paynowPackageCompleted').attr('job-id'), $('#paynowPackageCompleted').attr('user-id'), $('#paynowPackageCompleted').attr('quote-id'));
                     
               }


            },
            error: function (jqXHR, status, err)
            {
               //	toastr.error('Error!');
            }
         });

      }






   function getQuoteData()
   {
       var jobTasks = new Array();
         $(".qq-total-sum .saved").each(function ()
         {
               var title = $(this).find('.title').text();
               var price = $(this).find('.qq-option span b').text();
               console.log({ title })
            
            jobTasks.push({ title, price });
            
         });

         var quote_details = {

            "job_id": $('#job-id').val(),
            "freelancer_id": $('#user-id').val(),
            "job_summary": jobTasks,
            "total": $(".qq-total").find('span b').text(),
            "all_discount": $(".qq-discount .qq-option").find('span b').text(),
            "all_total": $(".qq-subtotal").find('span b').text(),
            "quoted-by" : '--',
            
            "job_completion": $("#completion").text(),
            "availability_date": $("#availability").val(),
            "validity_date": $("#validity").val(),
            
            
            "deposit_required": $("#deposit_required")[0].checked,
            "for_7_days": $("#7_days")[0].checked,
            "for_30_days" : $("#30_days")[0].checked, 
            "deposit_amount": $("#deposit_required").parents('.checkbox-row-flex').find('.qq-option span b').text(),
            "comments_on_terms": $("#payment_comments").val(),


            "payment_cod": $("#COD")[0].checked,
            "payment_credit_card": $("#credit_card")[0].checked,
            "payment_paypal": $("#paypal")[0].checked,
            
         };
         localStorage.setItem('quote_details', JSON.stringify(quote_details))
   }
  
   var userData = (function ()
    {
      var instance;
      
      function init()
      {
      
        async function getUserDetails(userId)
        {
           var data = [{ 'Name': 'user_id', 'Operator': "equal", "Value": userId },
           { 'Name': 'status', 'Operator': "equal", "Value": 'Approved' },
           { 'Name': 'approved_confirmed', 'Operator': "equal", "Value": "1" },
           ]
          
          $.ajax({
            method: "POST",
            url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_details/`,
            headers: {
              "Content-Type": "application/json"
            },
          
            data: JSON.stringify(data),
       
            success: function (response)
            {
              console.log({ response })
            
              const users = response
              const userDetails = users.Records[0]
              //if existing user, verify the status
               if (userDetails) {
                  $('.navigation li').first().remove();
                  $('.btnjob').hide();
               // if (userDetails['status'] == 'Approved' && userDetails['approved_confirmed'] == 1) {
                  //show the table
                  
                  if (!navigator.geolocation) {
                                console.log("Your browser doesn't support geolocation feature!")
                            } else {
                                //setInterval(() => {
                                navigator.geolocation.getCurrentPosition(getPosition)
                                //}, 5000);
                  }

                  var jobLodgesDiv =   `<div class="content-pages">
                  <div class="freelancer-content-main">
         
                     <div class="container">
                        <!--
                        <div class="page-reverse-title">
                           <h1>Welcome, Freelancer1</h1>
                        </div>
                       --> 
         
                        <div class="freelancer-panel">
                       <div class="panel-group" id="accordion" role="lodgedJob">
                           <div class="panel panel-default">
                               <div class="panel-heading" role="tab" id="lodgedJob">
                                   <h4 class="panel-title">
                                       <a class="" role="button" data-toggle="collapse" href="#lodgedJobOne" aria-expanded="true" aria-controls="lodgedJobOne">Lodged Job</a>
                                   </h4>
                               </div>
                               <div id="lodgedJobOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="lodgedJob" aria-expanded="true" style="">
                                   <div class="panel-body">
                                       
                                       <div class="blue-tabdesign">
                              <div class="navtab-flex">
                              <div class="navtab-design">
                                 <select class="nav nav-tabs-dropdown">
                                   <option selected="" value="All">All</option>
                                   <option value="Interested">Interested</option>
                                   <option value="Quoted">Quoted</option>
                                   <option value="Accepted">Accepted</option>
                                   <option value="Rejected">Accepted</option>
                                   <option value="Completed">Completed</option>
                                 </select>
         
                                 <ul class="nav nav-tabs">
                                       <li class="active"><a data-toggle="tab" href="#tab-all" aria-expanded="true">All</a></li>
                                       <li class=""><a data-toggle="tab" href="#tab-interested" aria-expanded="false">Interested</a></li>
                                       <li class=""><a data-toggle="tab" href="#tab-quoted" aria-expanded="false">Quoted</a></li>
                                       <li class=""><a data-toggle="tab" href="#tab-accepted" aria-expanded="false">Accepted</a></li>
                                       <li class=""><a data-toggle="tab" href="#tab-rejected" aria-expanded="false">Rejected</a></li>
                                       <li class=""><a data-toggle="tab" href="#tab-completed" aria-expanded="false">Completed</a></li>
                                 </ul>
                              </div>
                              <div class="navtab-filter">
                                 <label>Results per Page:</label><select class="form-control"><option>10</option><option>20</option><option>30</option><option>40</option></select>
                              </div>
                              </div>
                        <div class="tab-content">
                           <div id="tab-all" class="tab-pane fade active in">
                           <div class="scroll-table-container">
                              <table class="table table-freelancer scroll-table">
                                 <thead>
                                    <tr>
                                       <td>Status</td>
                                       <td>Date</td>
                                       <td>Email</td>
                                       <td>Contact No.</td>
                                       <td>Location</td>
                                       <td>Accepted</td>
                                       <td>Quoted Date</td>
                                       <td></td>
                                    </tr>
                                 </thead>
                                 <tbody>
                                   
                                    
                                    
                                 </tbody>
                              </table>
         
                           </div>
                           </div>
                           <div id="tab-interested" class="tab-pane fade">
                              <div class="scroll-table-container">
                                 <table class="table table-freelancer scroll-table">
                                    <thead>
                                       <tr>
                                          <td>Date</td>
                                          <td>Email</td>
                                          <td>Contact No.</td>
                                          <td>Location</td>
                                          <td>Accepted</td>
                                          <td>Quoted Date</td>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                           <div id="tab-quoted" class="tab-pane fade">
                              <div class="scroll-table-container">
                                 <table class="table table-freelancer scroll-table">
                                 <thead>
                                    <tr onclick="window.location ='freelancer_quote.html'">
                                       <td>Date</td>
                                       <td>Email</td>
                                       <td>Contact No.</td>
                                       <td>Location</td>
                                       <td>Accepted</td>
                                       <td>Quoted Date</td>
                                    </tr>
                                 </thead>
                                 <tbody>
                                   
                                 </tbody>
                              </table>
                           </div>
                           </div>
         
                           <div id="tab-accepted" class="tab-pane fade">
                              <div class="scroll-table-container">
                                 <table class="table table-freelancer scroll-table">
                                 <thead>
                                    <tr>
                                       <td>Date</td>
                                       <td>Email</td>
                                       <td>Contact No.</td>
                                       <td>Location</td>
                                       <td>Quoted Date</td>

                                    </tr>
                                 </thead>
                                 <tbody>
                                   
                                    
                                 </tbody>
                              </table>
                           </div>
                           </div>


                           <div id="tab-rejected" class="tab-pane fade active in">
                           <div class="scroll-table-container">
                              <table class="table table-freelancer scroll-table">
                              <thead>
                                 <tr>
                                    <td>Job ID</td>
                                    <td>Date</td>
                                    <td>Email</td>
                                    <td>Contact No.</td>
                                    <td>Location</td>
                                    <td>Quoted Date</td>
                                 </tr>
                              </thead>
                              <tbody>
                              
                                 
                              </tbody>
                           </table>
                        </div>
                        </div>



                           <div id="tab-completed" class="tab-pane fade">
                              <div class="scroll-table-container">
                                 <table class="table table-freelancer scroll-table">
                                 <thead>
                                    <tr>
                                       <td>Date</td>
                                       <td>Email</td>
                                       <td>Contact No.</td>
                                       <td>Location</td>
                                       <td>Accepted</td>
                                       <td>Quoted Date</td>
                                    </tr>
                                 </thead>
                                 <tbody>
                                 <tr>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td><span class="no-lodge">No lodge job/quote here</span></td>
                              </tr>
                                    
                                 </tbody>
                              </table>
                           </div>
                           </div>
                         
                        </div>
                                   </div>
                               </div>
                           </div>
                           
                      
         
                  </div>
                   </div>`
                  
                  $('.reverse-slider').after(jobLodgesDiv);


                  
               // } else {
                  
              //urls = `${protocol}//${baseURL}/subscribe`;
              //window.location.href = urls;
            //  }
                
               }
               
            }
         })
         }

         async function getUserStatus(userId)
        {
           var data = [{ 'Name': 'user_id', 'Operator': "equal", "Value": userId }
           ]
          
          $.ajax({
            method: "POST",
            url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_details/`,
            headers: {
              "Content-Type": "application/json"
            },
          
            data: JSON.stringify(data),
       
            success: function (response)
            {
              console.log({ response })
            
              const users = response
              const userDetails = users.Records[0]
              //if existing user, verify the status
              if (userDetails) {

                
                
               if (userDetails['status'] == 'Approved' && userDetails['approved_confirmed'] == 1) { 
                

                 
               } else {
                  
                  urls = `${protocol}//${baseURL}/subscribe`;
                  window.location.href = urls;
             }
                
               }
               
          
      
            }
         })
         }
         
          return {
             getUserDetails: getUserDetails,
             getUserStatus: getUserStatus
        
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

  
   var jobData = (function () {
       var instance;
       
        function init()
        {
           
           async function getChargeDetails(charge_name)
           {
              var data = [{ 'Name': 'charge_name', 'Operator': "in", "Value": charge_name }]
              
              $.ajax({
                 method: "POST",
                 url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/charges_configuration/`,
                 headers: {
                    "Content-Type": "application/json"
                 },
            
                 data: JSON.stringify(data),
         
                 success: function (response)
                 {
                    const charge = response.Records[0];
                    viewBidBuyerEnabled = charge['status'];
                    buyerViewBidCharge = charge['value'];
                    console.log({ viewBidBuyerEnabled });



                    if (charge_name == 'job_accepted_buyer') {
                       buyerAcceptBidCharge = charge['value'];
                        buyerAcceptBidChargeEnabled = charge['status'];
                       
                       console.log({ buyerAcceptBidChargeEnabled });

                     $('#paymentModal #charge-amount').text(parseFloat(buyerAcceptBidCharge).toFixed(2))
                      
                    }

                     if (charge_name == 'job_accepted_seller') {
                       sellerViewAcceptedCharge = charge['value'];
                       sellerViewAcceptedEnabled = charge['status'];
                       
                       console.log({  sellerViewAcceptedEnabled });

                     $('#paymentModalFreelancer #charge-amount').text(parseFloat(sellerViewAcceptedCharge).toFixed(2))
                      
                    }


                    if (charge_name == 'job_paid_buyer') {
                       
                       buyerCompletedCharge = charge['value'];
                       buyerCompletedChargeEnabled = charge['status'];

                       $('#paymentModalComplete #charge-amount-complete').text(parseFloat(buyerCompletedCharge).toFixed(2))
                  
                    }

                    

                  


               

                 }
               })
         
           }


          async function getJobDetail(jobId,el,page,date,isPaid,quoteId){
              var data = [{ 'Name': 'Id', 'Operator': "in", "Value": jobId }]
              
              $.ajax({
                method: "POST",
                url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_list/`,
                headers: {
                  "Content-Type": "application/json"
                },
              
                data: JSON.stringify(data),
           
                success: function (response)
                {
                  console.log({ response })
                
                  const jobs = response
                  const job = jobs.Records[0]
                  //if existing user, verify the status
                   if (job) {
                      let allJobs = ''
                        var status;
                    
                        if (job['status'] == 'Available') {
                           status = ` <td><select class="form-control"id ="status">
                           <option selected="" disabled="" value="Available">Available</option>
                           <option value="Interested">Interested</option>
                           </select></td>`
                        } else if (job['status'] == 'Interested') {
                           status = ` <td><select class="form-control">
                           <option selected="" disabled="" value="Available">Available</option>
                           <option selected="" value="Interested">Interested</option>
                           </select></td>`
                        } else if (job['status'] == 'Quoted') {
                           status =`<td>Quoted</td>`

                           }else if (job['status'] == 'Accepted') {
                           status =`<td>Accepted</td>`

                           }else if (job['status'] == 'Completed') {
                           status =`<td>Completed</td>`

                        } else {
                           status =`<td>--</td>`
                        }
                      switch (el) {


                         case '#tab-all':
                            allJobs = `<tr data-id="${job['Id']}">

                              ${status}
                              <td>${job['job_validity']}</td>
                              <td>${job['buyer_email']}</td>
                              <td>${job['buyer_contact']}</td>
                              <td class="width-location">${job['in_person_work_address']}</td>
                              <td>${job['is_accepted'] == 1 ? 'Yes' : 'No'} </td>
                              <td>-</td>
                           </tr>`;


                            break;


                         case '#tab-interested' || '#tab-quoted':
                            allJobs = `<tr data-id="${job['Id']}" user-id="${userId}"> </td>
                           <td> <a href="${protocol}//${baseURL}/user/plugins/${packageId}/${page}.php?jobId=${job['Id']}&userId=${userId}">${job['job_validity']}</a></td>
                           <td>${job['buyer_email']}</td>
                        
                           <td>${job['buyer_contact']}</td>
                           <td class="width-location">${job['in_person_work_address']}</td>

                           <td>${job['is_accepted'] == 1 ? 'Yes' : 'No'} </td>

                         
                           <td>${new Date(date * 1000).format("dd/mm/yyyy")}</td>
                          </tr>`;
                            break;
                         case '#tab-quoted':
                           allJobs = `<tr data-id="${job['Id']}" user-id="${userId}"> </td>
                           <td> <a href="${protocol}//${baseURL}/user/plugins/${packageId}/${page}.php?jobId=${job['Id']}&userId=${userId}">${job['job_validity']}</a></td>
                           <td>${job['buyer_email']}</td>
                        
                           <td>${job['buyer_contact']}</td>
                           <td class="width-location">${job['in_person_work_address']}</td>

                           <td>${job['is_accepted'] == 1 ? 'Yes' : 'No'} </td>

                         
                           <td>${new Date(date * 1000).format("dd/mm/yyyy")}</td>
                          </tr>`;

                            break;
                         
                         case '#tab-accepted':
                            var viewButtonTd = "";
                            console.log({ sellerViewAcceptedEnabled });
                            if (sellerViewAcceptedEnabled == 'True' && isPaid != 'TRUE') {
                               viewButtonTd = `<td class="text-right"><a href="javascript:void(0);" class="btn btn-jobform-outline" id="charge-modal" onclick="lockViewFreelancer(this)" data-id="${quoteId}" return-url="user/plugins/${packageId}/${page}.php?jobId=${job['Id']}&userId=${userId}"><i class="icon lock-icon"></i>View</a></td>`
                               var paymentModal = `
                                       <div class="modal fade payment-modal" id="paymentModalFreelancer" role="dialog">
                                       <input type ="hidden" id ="quoted-id-fl"/ >
                                       <input type ="hidden" id="access-url-fl" />

                                          <div class="modal-dialog">
                                             <!-- Modal content-->
                                             <div class="modal-content">
                                                <div class="modal-body">
                                                   
                                                   <div id="payment" class="payment-con clearfix">
                                          
                                                      <h3>Payment</h3>
                                                      <div class="payment-middle-con ">
                                             
                                                            <div class="form-group">
                                                               <label for="paymentMethod">Payment Method</label>
                                                               <select class="form-control required" name="payment" id="paymentScheme">
                                                                  <option selected value="stripe">Stripe</option>
                                                               </select>
                                                            </div>
                                          
                                                            <div class="common-text">
                                                               <p>You will be charged $<span id="charge-amount">${parseFloat(buyerViewBidCharge).toFixed(2)}</span> to view an accepted quote.</p>
                                                               <p>Upon clicking the Pay button, you will be re-directed to the Payment Gateway to continue with your transaction</p>
                                                            
                                                            </div>

                                                            <div id="card-element"> </div>
                                                            <!-- Used to display Element errors. -->
                                                            <div id="card-errors" role="alert"></div>
                                                            <p id="card-errors"
                                                               style="margin-bottom: 10px; line-height: inherit; color: #eb1c26; font-weight: bold;">
                                                            </p>



                                                      <hr>



                                                         
                                                         
                                                      </div>
                                                      
                                                      <div class="payment-bottom-con clearfix">
                                                         <div class="next-tab-area pull-right">
                                                            <span class="seller-btn"> <a  class="my-btn btn-clear" data-dismiss="modal" href="javascript:void(0);">Cancel</a> </span>
                                                            <span class="seller-btn"> <a  class="my-btn btn-red" href="javascript:void(0);" id="paynowPackageFl">Pay Now</a> </span>
                                                         </div>
                                                      </div>
                                                </div>
                                                   
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="modal-overlay"></div>
                                    `
                               var lockFunction = `<script> function lockViewFreelancer(x){
                                       $('#paymentModalFreelancer').modal('show');
                                       $('#quoted-id-fl').val($(x).attr('data-id')); 
                                       $('#access-url-fl').val($(x).attr('return-url'))

                                       console.log($(x).attr('data-id'))
                                    }  </script>`
                               $('.footer').append(paymentModal);
                               $('body').append(lockFunction);
                              
                            } else {
                               viewButtonTd = `<td class="text-right"><a href="${protocol}//${baseURL}/user/plugins/${packageId}/${page}.php?jobId=${job['Id']}&userId=${userId}" class="btn btn-jobform-outline">View</a></td>`;
                            }
                            allJobs = `<tr data-id="${job['Id']}" user-id="${userId}"> </td>
                              <td> <a href="${protocol}//${baseURL}/user/plugins/${packageId}/${page}.php?jobId=${job['Id']}&userId=${userId}">${job['job_validity']}</a></td>
                              <td>${job['buyer_email']}</td>
                           
                              <td>${job['buyer_contact']}</td>
                              
                              <td class="width-location">${job['in_person_work_address']}</td>
                              <td>${new Date(date * 1000).format("dd/mm/yyyy")}</td>
                              
                              ${viewButtonTd}

                           </tr>`;
                            break;
                         default:
                            console.log( page + 'in default');
                        allJobs = `<tr data-id="${job['Id'] }" user-id="${userId}"> </td>
                                    <td> <a href="${protocol}//${baseURL}/user/plugins/${packageId}/${page}.php?jobId=${job['Id'] }&userId=${userId}">${job['job_validity']}</a></td>
                                    <td>${job['buyer_email']}</td>
                                 
                                    <td>${job['buyer_contact']}</td>
                                    
                                    <td class="width-location">${job['in_person_work_address']}</td>
                                    <td>${new Date(date * 1000).format("dd/mm/yyyy")}</td>
                                    
                                 </tr>`;
                  
                      }
            
                        waitForElement(`${el}`, function ()
                        {
                           $(`${el} table tbody`).append(allJobs);
                       
                        })
                    
                    
                  }
              
                
            
                }
          
          
              })
           }
           

           async function getQuotedJobDetails(jobId, el, page)
           {
            var data = [{ 'Name': 'job_id', 'Operator': "in", "Value": jobId }]
              
            $.ajax({
              method: "POST",
              url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_quotes/`,
              headers: {
                "Content-Type": "application/json"
              },
            
              data: JSON.stringify(data),
         
              success: function (response)
              {
                console.log({ response })
              
                const jobs = response
                const job = jobs.Records
                //if existing user, verify the status
                 if (job) {
                  

                    job.forEach(function (quote, i)
                    {

                    var viewButtonTd = "";
                    if (viewBidBuyerEnabled == 'True' && quote['buyer_view_paid'] != 'TRUE') {
                        viewButtonTd =   `<td class="text-right"><a href="javascript:void(0);" class="btn btn-jobform-outline" id="charge-modal" onclick="lockView(this)" data-id="${quote['Id']}" return-url="${protocol}//${baseURL}/user/plugins/${packageId}/${page}.php?jobId=${quote['job_id']}&userId=${quote['freelancer_id']}"><i class="icon lock-icon"></i>View</a></td>`
                         var paymentModal = `
                           <div class="modal fade payment-modal" id="paymentModal" role="dialog">
                           <input type ="hidden" id ="quoted-id"/ >
                           <input type ="hidden" id="access-url" />

                              <div class="modal-dialog">
                                 <!-- Modal content-->
                                 <div class="modal-content">
                                    <div class="modal-body">
                                       
                                       <div id="payment" class="payment-con clearfix">
                              
                                          <h3>Payment</h3>
                                          <div class="payment-middle-con ">
                                 
                                                <div class="form-group">
                                                   <label for="paymentMethod">Payment Method</label>
                                                   <select class="form-control required" name="payment" id="paymentScheme">
                                                      <option selected value="stripe">Stripe</option>
                                                   </select>
                                                </div>
                              
                                                <div class="common-text">
                                                   <p>You will be charged $<span id="charge-amount">${parseFloat(buyerViewBidCharge).toFixed(2)}</span> to View a Quote</p>
                                                   <p>Upon clicking the Pay button, you will be re-directed to the Payment Gateway to continue with your transaction</p>
                                                
                                                </div>

                                                <div id="card-element"> </div>
                                                <!-- Used to display Element errors. -->
                                                <div id="card-errors" role="alert"></div>
                                                <p id="card-errors"
                                                   style="margin-bottom: 10px; line-height: inherit; color: #eb1c26; font-weight: bold;">
                                                </p>



                                          <hr>



                                             
                                             
                                          </div>
                                          
                                          <div class="payment-bottom-con clearfix">
                                             <div class="next-tab-area pull-right">
                                                <span class="seller-btn"> <a  class="my-btn btn-clear" data-dismiss="modal" href="javascript:void(0);">Cancel</a> </span>
                                                <span class="seller-btn"> <a  class="my-btn btn-red" href="javascript:void(0);" id="paynowPackage">Pay Now</a> </span>
                                             </div>
                                          </div>
                                    </div>
                                       
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="modal-overlay"></div>
                        `
                        var lockFunction = `<script> function lockView(x){
                           $('#paymentModal').modal('show');
                           $('#quoted-id').val($(x).attr('data-id')); 
                           $('#access-url').val($(x).attr('return-url'))

                           console.log($(x).attr('data-id'))
                        }  </script>`
                        $('.footer').append(paymentModal);
                        $('body').append(lockFunction);
                   
                    } else {
                        viewButtonTd =  `<td class="text-right"><a href="${protocol}//${baseURL}/user/plugins/${packageId}/${page}.php?jobId=${quote['job_id']}&userId=${quote['freelancer_id']}" class="btn btn-jobform-outline">View</a></td>`;
                    }
                       let allJobs = `<tr>
                       <td><div class="job-quotedtitle"><span class="qtitle">Quoted by</span><span class="qdesc">${quote['quote_by']}</span></div></td>
                       <td><div class="job-quotedtitle"><span class="qtitle">Date</span><span class="qdesc">${new Date( quote['CreatedDateTime']* 1000).format("dd/mm/yyyy")}</span></div></td>
                       <td><div class="job-quotedtitle"><span class="qtitle">Amount</span><span class="qdesc">$AUD${quote['all_total']}</span></div></td>
                       <td><div class="job-quotedtitle"><span class="qtitle">Availability</span><span class="qdesc">${quote['availability_date']}</span></div></td>
                       <td><div class="job-quotedtitle"><span class="qtitle">Status</span><span class="qdesc">Valid to ${quote['validity_date']} </span></div></td>
                      
                         ${ viewButtonTd }
                    </tr>`;
                       
                       
                       waitForElement(`${el}`, function ()
                       {
                          $(`${el} tbody`).append(allJobs);
                     
                       })
                  
                    })
                  
                }
            
              
          
              }
        
        
            })
              
              
              
           }
          
           async function getAllJobs() //with nearest locations.
           {
              $.ajax({

                  method: "GET",
                  url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_locations?pageSize=1000`,
                  headers: {
                  "Content-Type": "application/json"
                 },
                  
                 success: function (response)
                 { 

                    const locations = response;

                  $.each(locations.Records, function (index, coords)
                  {
                        var location_list = JSON.parse(coords['location_list'])

                        $.each(location_list, function (index, loc)
                        {

                           if (distanceBetweenTwoPlace(lat, long, loc['lat'], loc['lng'], "K") <= 1000) {
                              console.log(coords['job_id']);
                              
                              getJobDetail(coords['job_id'],'#tab-all','freelancer_quote', coords['CreatedDateTime']);
                           }

                           
                        })
                  })

                 }
              })
              
           
            
            // $.ajax({
            //   method: "GET",
            //   url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_list/`,
            //   headers: {
            //     "Content-Type": "application/json"
            //   },
            
            //   success: function (response)
            //   {
            //     console.log({ response })
              
            //     const jobs = response
            //     const jobDetails = jobs.Records
            //     console.log({ jobDetails });
            //     //if existing user, verify the status
            //     if (jobDetails.length != 0) {

            //       jobDetails.forEach(function (job, i)
            //       {
            //         var status;
                    
            //         if (job['status'] == 'Available') {
            //           status = ` <td><select class="form-control"id ="status">
            //           <option selected="" disabled="" value="Available">Available</option>
            //           <option value="Interested">Interested</option>
            //           </select></td>`
            //         } else if (job['status'] == 'Interested') {
            //           status = ` <td><select class="form-control">
            //           <option selected="" disabled="" value="Available">Available</option>
            //           <option selected="" value="Interested">Interested</option>
            //           </select></td>`
            //         } else if (job['status'] == 'Quoted') {
            //           status =`<td>Quoted</td>`

            //          }else if (job['status'] == 'Accepted') {
            //           status =`<td>Accepted</td>`

            //          }else if (job['status'] == 'Completed') {
            //           status =`<td>Completed</td>`

            //         } else {
            //           status =`<td>--</td>`
            //         }
                    
            //         let allJobs = `<tr data-id="${job['Id']}">

            //       ${status}
            //       <td>${job['job_validity']}</td>
            //       <td>${job['buyer_email']}</td>
            //       <td>${job['buyer_contact']}</td>
            //       <td class="width-location">${job['in_person_work_address']}</td>
            //       <td>${job['is_accepted'] == 1 ? 'Yes' : 'No'} </td>
            //       <td>-</td>
            //      </tr>`;
            //          waitForElement('#tab-all', function ()
            //          {
            //             $('#tab-all table tbody').append(allJobs);
            //          })

            //       })
                  
            //     }
                  
               
            //   }
        
        
            // })
          }

          // get all available jobs
          async function getInterestedJobs(){
            var data = [{ 'Name': 'status', 'Operator': "equal", "Value": 'Interested' }, { 'Name': 'freelancer_id', 'Operator': "equal", "Value": $('#userGuid').val() }]
            
            $.ajax({
              method: "POST",
              url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_quotes/`,
              headers: {
                "Content-Type": "application/json"
              },
            
              data: JSON.stringify(data),
         
              success: function (response)
              {
                console.log({ response })
              
                const jobs = response
                const jobDetails = jobs.Records
                //if existing user, verify the status
                if (jobDetails.length != 0) {

                  jobDetails.forEach(function (job, i)
                  {

                     getJobDetail(job['job_id'],'#tab-interested','freelancer_quote', job['CreatedDateTime']);
                   
                 
                  })
                  
                 
                  
                }
               
        
              }
            })
           }

           async function getQuotedJobs(){
            var data = [{ 'Name': 'status', 'Operator': "equal", "Value": 'Quoted' }, { 'Name': 'freelancer_id', 'Operator': "equal", "Value": $('#userGuid').val() }]
            
            $.ajax({
              method: "POST",
              url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_quotes/`,
              headers: {
                "Content-Type": "application/json"
              },
            
              data: JSON.stringify(data),
         
              success: function (response)
              {
                console.log({ response })
              
                const jobs = response
                const jobDetails = jobs.Records
                //if existing user, verify the status
                if (jobDetails.length != 0) {

                  jobDetails.forEach(function (job, i)
                  {

                     getJobDetail(job['job_id'],'#tab-quoted','freelancer_quoted', job['CreatedDateTime']);
                   
                 
                  })
                  
                 
                  
                }
               
        
              }
            })
           }

           async function getAcceptedJobs(){
            var data = [{ 'Name': 'status', 'Operator': "equal", "Value": 'Accepted' }, { 'Name': 'freelancer_id', 'Operator': "equal", "Value": $('#userGuid').val() }]
            
            $.ajax({
              method: "POST",
              url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_quotes/`,
              headers: {
                "Content-Type": "application/json"
              },
            
              data: JSON.stringify(data),
         
              success: function (response)
              {
                console.log({ response })
              
                const jobs = response
                const jobDetails = jobs.Records
                //if existing user, verify the status
                if (jobDetails.length != 0) {

                  jobDetails.forEach(function (job, i)
                  {

                     getJobDetail(job['job_id'],'#tab-accepted','freelancer_quoted', job['CreatedDateTime'],job['seller_view_paid'],job['Id']);
                   
                 
                  })
                  
                 
                  
                }
               
        
              }
            })
           }

           //rejected

           async function getRejectedJobs(){
            var data = [{ 'Name': 'status', 'Operator': "equal", "Value": 'Rejected' }, { 'Name': 'freelancer_id', 'Operator': "equal", "Value": $('#userGuid').val() }]
            
            $.ajax({
              method: "POST",
              url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_quotes/`,
              headers: {
                "Content-Type": "application/json"
              },
            
              data: JSON.stringify(data),
         
              success: function (response)
              {
                console.log({ response })
              
                const jobs = response
                const jobDetails = jobs.Records
                //if existing user, verify the status
                if (jobDetails.length != 0) {

                  jobDetails.forEach(function (job, i)
                  {

                     getJobDetail(job['job_id'],'#tab-rejected','freelancer_quoted', job['CreatedDateTime']);
                   
                 
                  })
                  
                 
                  
                }
               
        
              }
            })
           }

           function getJobLodges()
           {
              var jobId = localStorage.getItem("jobID"); 
              console.log({ jobId });
              if (jobId != null) {
                 //update the job cache
                 updateBuyerID(jobId)
                 
              }
           }
           
           function  updateBuyerID(id)
           {
              waitForElement('#userGuid', function ()
              {
                 var status_details = {
      
                    "jobId": id,
                    'userId': $('#userGuid').val()
                 };
          
                 console.log({ status_details });
                 
              
              var settings = {
                  "url": packagePath + "/update_job_buyer_id.php",
                  "method": "POST",
                  "data": JSON.stringify(status_details )
              }
              $.ajax(settings).done(function(response){
                  //remove the existing job id in localstorage after saving
                 
                  localStorage.removeItem("jobID"); 
              
              });
            })
          
          }

          function  saveStatus(el)
          {
              
              var status_details = {
      
                 "Id": el.parents('tr').attr('data-id'),
                 "userId" : $('#userGuid').val(),
                 'status' : el.val()
              };
          
              console.log({ status_details });
              var settings = {
                  "url": packagePath + "/update_job_status.php",
                  "method": "POST",
                  "data": JSON.stringify(status_details )
              }
              $.ajax(settings).done(function(response){
                  
                 
              
              });
      
          
           }
           
         // buyer render
           
           async function getUserJobList()
           {
              waitForElement('#userGuid', function ()
              {
               $('.btnjob').hide();
                 var jobListDiv =  `<div class="content-pages">
                 <div class="freelancer-content-main">
        
                    <div class="container">
                 <div class="content-pages">
                    <div class="freelancer-panel">
                   <div class="panel-group" id="accordion" role="lodgedJob">
                       
                       <div class="panel panel-default">
                           <div class="panel-heading" role="tab" id="jobList">
                               <h4 class="panel-title">
                                   <a class="collapsed" role="button" data-toggle="collapse" href="#jobListTwo" aria-expanded="false" aria-controls="jobListTwo">
                                       Job List
                                   </a>
                               </h4>
                           </div>
                           <div id="jobListTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="jobList">
                               <div class="panel-body">
                                   <div class="blue-tabdesign">
                                     <div class="navtab-flex">
                                        <div class="navtab-filter">
                                           <label>View:</label><select class="form-control"><option>2019</option><option>2020</option><option selected="">2021</option></select>
                                        </div>
                                         <div class="navtab-filter">
                                            <label>Results per Page:</label><select class="form-control"><option>10</option><option>20</option><option>30</option><option>40</option></select>
                                            <div class="lodgejob-menu"><a href="/user/plugins/${packageId}/lodge_job.php">Lodge a Job</a></div>
                                         </div>
                                    </div>
                                  <div class="table-quoted-container">
                                    
   
                                  <div class="pagination-center"><nav class="text-center" id="pagination-container" aria-label="Page navigation"></nav></div>
                                  </div>
                               </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   </div>
                       <!----22222 --> 
     
   
                </div>
     
              </div></div>
           `
                 if (!$('.freelancer-panel').length > 0) {
                  waitForElement('.reverse-slider', function ()
                  {
                     $('.reverse-slider').after(jobListDiv);
                  })
 
                 }
                 
                 var data = [{ 'Name': 'buyerID', 'Operator': "in", "Value": $('#userGuid').val() }
                         
                 ]
            
                 $.ajax({
                    method: "POST",
                    url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_list/`,
                    headers: {
                       "Content-Type": "application/json"
                    },
            
                    data: JSON.stringify(data),
         
                    success: function (response)
                    {
                       console.log({ response })
              
                       const jobs = response
                       const jobDetails = jobs.Records
                       //if existing user, verify the status
                       if (jobDetails.length != 0) {

                          jobDetails.forEach(function (job, i)
                          {

                             let jobTable = '';
                             if (job['no_of_quotes'] == 0) {
                                jobTable = `<table class="table table-freelancer">
                             <thead>
                           <tr data-id="${job['Id']}">
                              <th colspan="5">Job #${job['Id']}</th>
                              <th class="text-right"><a href="${protocol}//${baseURL}/user/plugins/${packageId}/job-details.php?jobId=${job['Id']}">Details &gt;&gt;</a></th>
                           </tr>
                        </thead>
                        <tbody>
                        <tr>
                           <td colspan="6"><div class="quoted-notfound">No one has quoted on this job yet.</div></td>
                        </tr>
                     </tbody>
                     </table>`
                             } else {
                              jobTable = `<table class="table table-freelancer" id="quoted-table">
                              <thead>
                                 <tr>
                                    <th colspan="5">Job #${job['Id']}</th>
                                    <th class="text-right"><a href="user/plugins/${packageId}/job-details.php?jobId=${job['Id']}"">Details &gt;&gt;</a></th>
                                 </tr>
                              </thead>
                              <tbody>
                                
                              </tbody>
                           </table> `
                                
                              
                             }

                             waitForElement('.table-quoted-container', function ()
                             {
                                $('.table-quoted-container').append(jobTable);

                                
                    
                             })
                             waitForElement('#quoted-table', function ()
                             {
                             getQuotedJobDetails(job['Id'], '#quoted-table', 'applicant-quote')
                             })
                            
                          })
                  
                 
                  
                       }
               
        
                    }
                 })


              })

           }

          return {
            getAllJobs :getAllJobs,
            getJobDetail: getJobDetail,
            saveStatus: saveStatus,
            getInterestedJobs: getInterestedJobs,
             getQuotedJobs: getQuotedJobs,
             updateBuyerID: updateBuyerID,
             getJobLodges: getJobLodges,
             getUserJobList: getUserJobList,
             getAcceptedJobs: getAcceptedJobs,
             getRejectedJobs: getRejectedJobs,
             getChargeDetails:  getChargeDetails
            
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
   

   var quoteData =  (function () {
      var instance;
      
       function init()
       {
       
         // save the quoted job 
        
         function quoteJob()
         {
            var settings = {
                "url": packagePath + "/save_quote.php",
                "method": "POST",
                "data": localStorage.getItem('quote_details')
            }
            $.ajax(settings).done(function(response){
               toastr.success('Your quote has been submitted');
                var allresponse = $.parseJSON(response)
               console.log(allresponse);
               urls = `${protocol}//${baseURL}/`;
               window.location.href = urls;
               localStorage.removeItem('quote_details');
               
            
            });
         
          }
          
          function quoteAction(status, jobId, freelancerId, quoteId)
          {
            var quote_details = {
      
               jobId,
               freelancerId,
               quoteId,
               status
            };
     
            console.log({ quote_details });
            
         
         var settings = {
             "url": packagePath + "/update_quotation.php",
             "method": "POST",
             "data": JSON.stringify(quote_details )
         }
             $.ajax(settings).done(function (response)
             {
            
                toastr.success('Successfully accepted the quotation');
                window.location = "/";

             //remove the existing job id in localstorage after saving
            
             //localStorage.removeItem("jobID"); 
         
         });
             
          }

         return {
      
            quoteJob: quoteJob,
            quoteAction : quoteAction
          
       
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
  
   
  //charges of quotation
   
   $(document).ready(function ()
   {
      getMarketplaceCustomFields(function (result)
      {
         $.each(result, function (index, cf)
         {
         
         });
      });
        
      //quote charge
      if (urls.indexOf('/charge_quote.php') >= 0) {

         $("#paymentScheme").change(function() {
            if ($('option:selected', $(this)).val() == 'stripe') {
            $('#card-element').show()
               console.log('Active')
            } else {
               
               $('#card-element').hide();
            }
         });    
      
         const chargeData = new Vue({
            el: "#payment",

            data()
            {
               return {
               
                  jobListCharge: 0,
                  jobChargeEnabled: ''
               

               }
            },
            methods: {
               async getChargeRate()
               {
                  try {
                     vm = this;
                     const response = await axios({
                        method: "GET",
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/charges_configuration/`,

                     })
                     const details = await response
                     var jobCharges = details.data
                     var jobCharge = jobCharges.Records.filter((data) => data.charge_name === 'job_bid_seller')
                     console.log({ jobCharge });

                     vm.jobListCharge = parseInt(jobCharge[0].value);
                     console.log(parseInt(jobCharge[0].value));
                  
                     //vm.jobListCharge = vm.jobListCharge;
                     vm.jobChargeEnabled = jobCharge[0].status;
                     payment_enabled = vm.jobChargeEnabled;
                     

                  } catch (error) {
                     console.log("error", error);
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
                     success: function (result)
                     {
                        result = JSON.parse(result);
                        if (result.id) {

                           // if (vm.jobChargeEnabled == 'True') {
                           //send the quote
                           var quote = quoteData.getInstance();
                           quote.quoteJob();
                           // cache_save_job();  
                           //  }
                           //if there is a charge id returned, save the job details and redirect to the finish page
                              
                     
                           //complete the lodge

                           
                              

                        }

            
                     },
                     error: function (jqXHR, status, err)
                     {
                        //	toastr.error('Error!');
                     }
                  });
         
               }
            

            },
            beforeMount()
            {
            
               this.getChargeRate()
            
         
            }

         })

         //waitForElement('#payment', function ()
         // {
         var script = document.createElement('script');
         script.onload = function ()
         {
            // getMarketplaceCustomFields(function(result) {
            //   $.each(result, function(index, cf) {
            
            //       if (cf.Name == 'stripe_pub_key' && cf.Code.startsWith(customFieldPrefix)) {
            //        stripePubKey = cf.Values[0];
            //       }
            //   })

            //if (stripePubKey) {
            //do stuff with the script
            var stripe = Stripe('pk_test_51IDN6ALQSWMKUO5eXiY7nrd6P3dE6oLh42AQpfpUxz64OgHjaSiME8LLPmyWuaPOlUIAT0H0sLjfMkPWd4eBUbxC00gi2lcEOX');
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
                          var quote = quoteData.getInstance();
                           quote.quoteJob();
                     } else {
                          stripe.createToken(card).then(function (result)
                        {
                           if (result.error) {
                              // Inform the user if there was an error
                              var errorElement = document.getElementById('card-errors');
                              errorElement.textContent = result.error.message;
      
                              // $("#payNowButton").removeAttr("disabled");
                           } else {

                              console.log({ result })
                              chargeData.charge(result.token, $('#charge-amount').val());
                              $("#paynowPackage").prop("disabled", true);
                                    
                           }
                         }); 
                        
                        
                        
                        console.log('stripe')
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
         //})
      }
      
      //freelancer quote
   
      if (urls.indexOf('/freelancer_quote.php') >= 0) {
          
         const chargeData = new Vue({
            el: "#freelancer-quote",

            data()
            {
               return {
               
                  jobListCharge: 0,
                  jobChargeEnabled: ''
               
               }
            },
            methods: {
               async getChargeRate()
               {
                  try {
                     vm = this;
                     const response = await axios({
                        method: "GET",
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/charges_configuration/`,

                     })
                     const details = await response
                     var jobCharges = details.data
                     var jobCharge = jobCharges.Records.filter((data) => data.charge_name === 'job_bid_seller')
                    
                     //vm.jobListCharge = vm.jobListCharge;
                     vm.jobChargeEnabled = jobCharge[0].status;
                     chargeEnabled = jobCharge[0].status;
                     console.log({ chargeEnabled })
                    
                     

                  } catch (error) {
                     console.log("error", error);
                  }

                  
               },

         
            

            },
            beforeMount()
            {
            
               this.getChargeRate()
            
            }

         })
      

         $('#submit-top').on('click', function (event)
         {
            event.stopPropagation();
            event.stopImmediatePropagation();
            getQuoteData();

            if (chargeEnabled == 'True') {
               window.location = packagePath + "/charge_quote.php"
            } else {
               var quote = quoteData.getInstance();
               quote.quoteJob();
            }
         
      
         })

         $('#submit-bottom').on('click', function (event)
         {
            event.stopPropagation();
            event.stopImmediatePropagation();
            getQuoteData();

            if (chargeEnabled == 'True') {
               window.location = packagePath + "/charge_quote.php"
            } else {
               var quote = quoteData.getInstance();
               quote.quoteJob();
            }
         
         })
      }

       //quotation page
      if (urls.indexOf('/applicant-quote.php')) {

         var jobs = jobData.getInstance();

         jobs.getChargeDetails('job_accepted_buyer');
         jobs.getChargeDetails('job_paid_buyer');


         // waitForElement('#paymentModal', function ()
         // {
         var script = document.createElement('script');
         script.onload = function ()
         {
            // getMarketplaceCustomFields(function(result) {
            //   $.each(result, function(index, cf) {
               
            //       if (cf.Name == 'stripe_pub_key' && cf.Code.startsWith(customFieldPrefix)) {
            //        stripePubKey = cf.Values[0];
            //       }
            //   })

            //if (stripePubKey) {
            //do stuff with the script
            var stripe = Stripe('pk_test_51IDN6ALQSWMKUO5eXiY7nrd6P3dE6oLh42AQpfpUxz64OgHjaSiME8LLPmyWuaPOlUIAT0H0sLjfMkPWd4eBUbxC00gi2lcEOX');
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
              // card.mount('#card-element-complete');
            }
      
            // Create a token or display an error the form is submitted.
            var submitButton = document.getElementById('paynowPackage');
            if (submitButton) {
               submitButton.addEventListener('click',
                  function (event)
                  {
                     event.preventDefault();
                     $("#paynowPackage").attr("disabled", "disabled");
                     stripe.createToken(card).then(function (result)
                     {
                        if (result.error) {
                           // Inform the user if there was an error
                           var errorElement = document.getElementById('card-errors');
                           errorElement.textContent = result.error.message;
      
                           // $("#payNowButton").removeAttr("disabled");
                        } else {

                           console.log({ result })
                           chargeQuoteAccept(result.token, $('#charge-amount').text(), $('#quoted-id').val());
                           $("#paynowPackage").prop("disabled", true);
                                    
                                    
                           //subscribe(card, stripe)
                                    
      
                           // Send the result.token.id to a php file and use the token to create the subscription
                           // SubscriptionManager.PayNowSubmit(result.token.id, e);
                        }
                     });
      
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
   
         // });


         waitForElement('#paymentModalComplete', function ()
         {
             var script = document.createElement('script');
         script.onload = function ()
         {
            // getMarketplaceCustomFields(function(result) {
            //   $.each(result, function(index, cf) {
               
            //       if (cf.Name == 'stripe_pub_key' && cf.Code.startsWith(customFieldPrefix)) {
            //        stripePubKey = cf.Values[0];
            //       }
            //   })

            //if (stripePubKey) {
            //do stuff with the script
            var stripe = Stripe('pk_test_51IDN6ALQSWMKUO5eXiY7nrd6P3dE6oLh42AQpfpUxz64OgHjaSiME8LLPmyWuaPOlUIAT0H0sLjfMkPWd4eBUbxC00gi2lcEOX');
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
              // card.mount('#card-element');
               card.mount('#card-element-complete');
            }
      
            // Create a token or display an error the form is submitted.
            var submitButton = document.getElementById('paynowPackageComplete');
            if (submitButton) {
               submitButton.addEventListener('click',
                  function (event)
                  {
                     event.preventDefault();
                     $("#paynowPackageComplete").attr("disabled", "disabled");
                     stripe.createToken(card).then(function (result)
                     {
                        if (result.error) {
                           // Inform the user if there was an error
                           var errorElement = document.getElementById('card-errors');
                           errorElement.textContent = result.error.message;
      
                           // $("#payNowButton").removeAttr("disabled");
                        } else {

                           console.log({ result })
                           chargeQuoteCompleted(result.token, $('#charge-amount-completed').text(), $('#quoted-id').val());
                           $("#paynowPackageComplete").prop("disabled", true);
                                    
                                    
                           //subscribe(card, stripe)
                                    
      
                           // Send the result.token.id to a php file and use the token to create the subscription
                           // SubscriptionManager.PayNowSubmit(result.token.id, e);
                        }
                     });
      
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





         }

      $('#accept').on('click', function (event)
      {
         if (buyerAcceptBidChargeEnabled == "True") {
            lockView();

         } else {
             jQuery('#acceptModal').modal('show');
         }      
      })
        


      //accept button

      $('#accept-confirm').on('click', function (event)
      {
         
         var quote = quoteData.getInstance();
         quote.quoteAction('Accepted', $(this).attr('job-id'), $(this).attr('user-id'), $(this).attr('quote-id'));
      })
       
      //reject confirm
      $('#reject-confirm').on('click', function (event)
      {
         
         var quote = quoteData.getInstance();
         quote.quoteAction('Rejected', $(this).attr('job-id'), $(this).attr('user-id'), $(this).attr('quote-id'));
      })


      //home page

      if (document.body.className.includes('page-home')) {

        
          localStorage.removeItem("userID");
         localStorage.removeItem("stripe-onboarded");
         $('#register-modal-seller').hide();
         $('.cart-menu').hide();
         
          
         //for newly registered buyers after lodging a job

         //check if there is an existing lodge job on local storage, if there is, update the job cache with the buyer id (user id)

         var user = userData.getInstance();
         var jobs = jobData.getInstance();
         jobs.getChargeDetails('job_bid_buyer');
         jobs.getChargeDetails('job_accepted_seller');
        // jobs.getAllJobs()
         jobs.getInterestedJobs()
         jobs.getQuotedJobs()
         jobs.getAcceptedJobs()
         jobs.getRejectedJobs()
         jobs.getJobLodges()
         jobs.getUserJobList()
         
        
         
         if ($('#userGuid').length != 0) {
            user.getUserStatus(userId)
            user.getUserDetails(userId)
         }
       

         var buttons = `
            <div class="btnjob"><a href="${protocol}//${baseURL}/user/plugins/${packageId}/lodge_job.php" class="btn btn-lodge">Lodge a Job</a>
            <a href="/subscribe" class="btn btn-freelancer">I am a Freelancer</a>
             </div>`

         $('.home-banner').addClass('reverse-slider');

         $('.home-banner .banner-quote  p').after(buttons);
            
         $('.section-category').parent('div').hide();

         $('.home-serach').hide();

         $('.section-shop').hide();
        


         //changing status on ALL tabs available to interested

         $(document).on('change', '#status', function ()
 {
            var jobs = jobData.getInstance();
            var $this = $(this);
            jobs.saveStatus($this);
         });

      waitForElement('#paymentModal', function ()
      {
      var script = document.createElement('script');
      script.onload = function ()
      {
         // getMarketplaceCustomFields(function(result) {
         //   $.each(result, function(index, cf) {
            
         //       if (cf.Name == 'stripe_pub_key' && cf.Code.startsWith(customFieldPrefix)) {
         //        stripePubKey = cf.Values[0];
         //       }
         //   })

         //if (stripePubKey) {
         //do stuff with the script
         var stripe = Stripe('pk_test_51IDN6ALQSWMKUO5eXiY7nrd6P3dE6oLh42AQpfpUxz64OgHjaSiME8LLPmyWuaPOlUIAT0H0sLjfMkPWd4eBUbxC00gi2lcEOX');
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
                  stripe.createToken(card).then(function (result)
                  {
                     if (result.error) {
                        // Inform the user if there was an error
                        var errorElement = document.getElementById('card-errors');
                        errorElement.textContent = result.error.message;
    
                        // $("#payNowButton").removeAttr("disabled");
                     } else {

                        console.log({ result })
                        charge(result.token, $('#charge-amount').text(), $('#quoted-id').val(), $('#access-url').val());
                        $(" #paynowPackage").prop("disabled", true);
                                 
                                  
                        //subscribe(card, stripe)
                                  
    
                        // Send the result.token.id to a php file and use the token to create the subscription
                        // SubscriptionManager.PayNowSubmit(result.token.id, e);
                     }
                  });
    
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
 
      });
         







      // freelancer charges
       waitForElement('#paymentModalFreelancer', function ()
      {
      var script = document.createElement('script');
      script.onload = function ()
      {
         // getMarketplaceCustomFields(function(result) {
         //   $.each(result, function(index, cf) {
            
         //       if (cf.Name == 'stripe_pub_key' && cf.Code.startsWith(customFieldPrefix)) {
         //        stripePubKey = cf.Values[0];
         //       }
         //   })

         //if (stripePubKey) {
         //do stuff with the script
         var stripe = Stripe('pk_test_51IDN6ALQSWMKUO5eXiY7nrd6P3dE6oLh42AQpfpUxz64OgHjaSiME8LLPmyWuaPOlUIAT0H0sLjfMkPWd4eBUbxC00gi2lcEOX');
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
         var submitButton = document.getElementById('paynowPackageFl');
         if (submitButton) {
            submitButton.addEventListener('click',
               function (event)
               {
                  event.preventDefault();
                  $("#paymentModalFreelancer #paynowPackageFl").attr("disabled", "disabled");
                  stripe.createToken(card).then(function (result)
                  {
                     if (result.error) {
                        // Inform the user if there was an error
                        var errorElement = document.getElementById('card-errors');
                        errorElement.textContent = result.error.message;
    
                        // $("#payNowButton").removeAttr("disabled");
                     } else {

                        console.log({ result })
                        chargeFreelancerView(result.token, $('#paymentModalFreelancer #charge-amount').text(), $('#quoted-id-fl').val(), $('#access-url-fl').val());
                        $("#paymentModalFreelancer #paynowPackageFl").prop("disabled", true);
                                 
                                  
                        //subscribe(card, stripe)
                                  
    
                        // Send the result.token.id to a php file and use the token to create the subscription
                        // SubscriptionManager.PayNowSubmit(result.token.id, e);
                     }
                  });
    
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
 
      });

      }
       
     
   

      //stripe
   
     
   });
  })();
  