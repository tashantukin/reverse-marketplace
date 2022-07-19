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
   var stripePayId;
   var quoted = 0;
   var  job_list = [];
   var sortedArray;
   var range_list = [];
   var totalFilteredJobs;
   
    //const token = getCookie('webapitoken');


    function paginator(items, current_page, per_page_items, tab) {
      let page = current_page || 1,
      per_page = per_page_items || 10,
      offset = (page - 1) * per_page,
     
  
      paginatedItems = items.slice(offset).slice(0, per_page_items),
      total_pages = Math.ceil(items.length / per_page);
      
     //$(`#${tab} #pagination-container-all`).find('.J-paginationjs-page').remove();
     
      //$(`#${tab}`).find('.following-row').remove();
  
      var pre_page = page - 1 ? page - 1 : null
      var next_page = (total_pages > page) ? page + 1 : null

      // $.each(sortedArray, function (index, id)
      // {
         //job_list.push(id[2]);s
       //  getJobDetail(id[2],'#tab-all','freelancer_quote', id[3]);
         //console.log();

      // })
      
     // if (tab == "followers") {
      $('#tab-all table tbody tr').remove();
        $.each(paginatedItems, function (index, jobId)
        {
         var jobs = jobData.getInstance();
         
         jobs.getJobDetail(jobId[0],'#tab-all','freelancer_quote', jobId[1]);
        
        })
     // }
     

     
      // var i = 1;
      // var pagination_list= "";
      // while (i <= total_pages) {
      //   if (i == 1) {
      //     pagination_list += `<li class=" paginationjs-page J-paginationjs-page active list" id="first-page" indx= ${i}><a href="javascript:void(0);">${i}</a></li>`; 
      //   } else {
      //     pagination_list += `<li indx= ${i}  class="paginationjs-page J-paginationjs-page list" data-num="5"><a href="javascript:void(0);">${i}</a></li>`
      //    // `<li indx= ${i} class="list"><a href="javascript:void(0);">${i}</a></li>`


      //   }
      //   i++;
      // }
      // console.log(`pages ${pagination_list} `)
      // $(`#${tab} #pagination-container-all #next`).before(pagination_list);
  
      // $(`#${tab} #pagination-container-all`).find('#previous').attr('indx', pre_page);
      // $(`#${tab} #pagination-container-all`).find('#next').attr('indx', next_page);
  
      return {
          page: page,
          per_page: per_page,
          pre_page: page - 1 ? page - 1 : null,
          next_page: (total_pages > page) ? page + 1 : null,
          total: items.length,
          total_pages: total_pages,
          data: paginatedItems
      };
    }


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
   

   function successfulView(x){
      jQuery('#paymentModal').modal('hide');
      jQuery('#paymentSuccessfulModal').modal('show');
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


   function chargeViewCod(quoteId, accessUrl)
   {
      //amount = Math.round(amount * 100)
      var apiUrl = packagePath + '/charge_cod.php';
      var data = { quoteId }
      $.ajax({
         url: apiUrl,
         method: 'POST',
         contentType: 'application/json',
         data: JSON.stringify(data),
         success: function (result)
         {
            //result = JSON.parse(result);
           // if (result.id) {

               console.log('charged cod');

               window.location = accessUrl;
               
           // }


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

   function chargeQuoteAcceptCod(quoteId, accessUrl)
   {
      //amount = Math.round(amount * 100)
      var apiUrl = packagePath + '/charge_cod.php';
      var data = { quoteId }
      $.ajax({
         url: apiUrl,
         method: 'POST',
         contentType: 'application/json',
         data: JSON.stringify(data),
         success: function (result)
         {
           // result = JSON.parse(result);
           // if (result.id) {

               console.log('charge');
               // window.location = $('#access-url').val();

                var quote = quoteData.getInstance();
                quote.quoteAction('Accepted', $('#paynowPackage').attr('job-id'), $('#paynowPackage').attr('user-id'), $('#paynowPackage').attr('quote-id'));
                  
           // }


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
               quote.quoteAction('Completed', $('#paynowPackageComplete').attr('job-id'), $('#paynowPackageComplete').attr('user-id'), $('#paynowPackageComplete').attr('quote-id'));
                  
            }


         },
         error: function (jqXHR, status, err)
         {
            //	toastr.error('Error!');
         }
      });

   }

    function chargeQuoteCompletedCod(quoteId, accessUrl)
   {
      //amount = Math.round($('#charge-amount-complete').text() * 100)
      var apiUrl = packagePath + '/charge_cod.php';
      //var merchantToken = $('#merchant-key').val();
                              
      //var adminCharge = amount;
      //var merchantCharge = Math.round($('#merchant-charge').val() * 100)
      var data = { quoteId }
      $.ajax({
         url: apiUrl,
         method: 'POST',
         contentType: 'application/json',
         data: JSON.stringify(data),
         success: function (result)
         {
            //result = JSON.parse(result);
            //if (result.id) {

               console.log('charge');
               // window.location = $('#access-url').val();

               var quote = quoteData.getInstance();
               quote.quoteAction('Completed', $('#paynowPackageComplete').attr('job-id'), $('#paynowPackageComplete').attr('user-id'), $('#paynowPackageComplete').attr('quote-id'));
                  
           // }


         },
         error: function (jqXHR, status, err)
         {
            //	toastr.error('Error!');
         }
      });

   }

  function  createStripeMember(card, stripe)
   {
       var quotes = $.parseJSON(localStorage.getItem('quote_details'))
         console.log(quotes);
         
         console.log(quotes.freelancer_id);
   
      //var addressInfo = JSON.parse(localStorage.getItem("address")) != null ? JSON.parse(localStorage.getItem("address")) : null;
   //console.log((addressInfo));
      var apiUrl = packagePath + '/createMember.php';
      var data = {
            'full_name': quotes.freelancer_id,
            'email': 'email@email.com',
            'contact_number': '00000',
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

                  createPaymentMethod(customerId, card, stripe)
      
               },
               error: function(jqXHR, status, err) {
               //	toastr.error('Error!');
               }
            });
      
   }


     function  createStripeMemberBuyer(card, stripe)
   {
      
   
      //var addressInfo = JSON.parse(localStorage.getItem("address")) != null ? JSON.parse(localStorage.getItem("address")) : null;
   //console.log((addressInfo));
      var apiUrl = packagePath + '/createMember.php';
      var data = {
            'full_name': '---',
            'email': 'email@email.com',
            'contact_number': '00000',
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

                  createPaymentMethodBuyer(customerId, card, stripe)
      
               },
               error: function(jqXHR, status, err) {
               //	toastr.error('Error!');
               }
            });
      
   }
       

   function createPaymentMethodBuyer(customerId, card, stripe)
    {
      
        // const customerId = custom  er_id;
        // Set up payment method for recurring usage
        //var quotes = $.parseJSON(localStorage.getItem('quote_details'))
        let billingName = $('----').val();
        
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
                createSubscriptionBuyer(
                customerId, result.paymentMethod.id);
            }
            });
        }
            
   function createSubscriptionBuyer(customerId, paymentId)
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
   }

   function chargeCustomer(customerId, amount)
   {

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

               //cache_save_job();  
               

            
            }


            },
            error: function (jqXHR, status, err)
            {
            //	toastr.error('Error!');
            }
      });

   }


   //creating a stripe member
   function createStripeMember(card, stripe)
  {
    //var addressInfo = JSON.parse(localStorage.getItem("address")) != null ? JSON.parse(localStorage.getItem("address")) : null;
   //console.log((addressInfo));
       var apiUrl = packagePath + '/createMember.php';
       var quotes = $.parseJSON(localStorage.getItem('quote_details'))
      var data = {
        'full_name': `=====`,
        'email': 'samplemail@gmail.com',
        'contact_number': '000000',
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

                createPaymentMethod(customerId, card, stripe)
      
			},
			error: function(jqXHR, status, err) {
			//	toastr.error('Error!');
			}
		});
	
   }
   
   function createPaymentMethod(customerId, card, stripe)
  {
      
      // const customerId = customer_id;
      // Set up payment method for recurring usage
      // var quotes = $.parseJSON(localStorage.getItem('quote_details'))
       var quotes = $.parseJSON(localStorage.getItem('quote_details'))
         console.log(quotes);
         
         console.log(quotes.freelancer_id);
      let billingName = quotes.freelancer_id;
    
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
            createSubscription(
              customerId,result.paymentMethod.id);
          }
        });
   }
   function createSubscription(customerId, paymentId)
   
   {
        var quotes = $.parseJSON(localStorage.getItem('quote_details'))
         console.log(quotes);
         
         console.log(quotes.freelancer_id);
         var apiUrl = packagePath + '/createSubscription.php';
         var data = { 'customer_id': customerId,  'payment_id' : paymentId, 'freelancer_id' : quotes.freelancer_id }
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
            "quoted-by" : $('#quoted-by').text(),
            
            "job_completion": $("#completion").text(),
            "availability_date": $('.avail-date span b').text(),
            "validity_date":  $('.valid-date span b').text(),
            
            
            "deposit_required": $("#deposit_required")[0].checked,
            "for_7_days": $("#7_days")[0].checked,
            "for_30_days" : $("#30_days")[0].checked, 
            "deposit_amount": $("#deposit_required").parents('.checkbox-row-flex').find('.qq-option span b').text(),
            "comments_on_terms": $("#payment_comments").val(),


            "payment_cod": $("#COD")[0].checked,
            "payment_credit_card": $("#credit_card")[0].checked,
            //"payment_paypal": $("#paypal")[0].checked,
            
         };
      localStorage.setItem('quote_details', JSON.stringify(quote_details))
     // localStorage.setItem('freelancer_id', JSON.stringify(quote_details))
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
                                       <a class="" role="button" data-toggle="collapse" href="#lodgedJobOne" aria-expanded="true" aria-controls="lodgedJobOne">Jobs lodged by buyers that I can quote on</a>
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
                                       <li class=""><a data-toggle="tab" href="#tab-cancelled" aria-expanded="false">Cancelled</a></li>
                                       <li class=""><a data-toggle="tab" href="#tab-completed" aria-expanded="false">Completed</a></li>
                                 </ul>
                              </div>
                            
                              </div>
                        <div class="tab-content">
                           <div id="tab-all" class="tab-pane fade active in">
                           <div class="result-found">
                                 <h5>Results found: <span class="text-theme" id="count-all"></span></h5>
                           </div>
                           <div class="scroll-table-container">
                              <table class="table table-freelancer scroll-table">
                                 <thead>
                                    <tr>
                                       <td>Status</td>
                                       <td>Job ID</td>
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
                           <div class="pagination-flex">
                           <div class="pagination-center"><nav class="text-center" id="pagination-container-all" aria-label="Page navigation"></nav></div>

                           
                           <div class="navtab-filter">
                            <label>Results per Page:</label><select class="form-control" id="page-all"><option value=10>10</option><option value=20>20</option><option value=30>30</option><option value=40>40</option></select>
                            </div>
                         </div>
                           
                           </div>

                           
                           <div id="tab-interested" class="tab-pane fade">
                            <div class="result-found">
                                 <h5>Results found: <span class="text-theme" id="count-interested"></span></h5>
                           </div>
                              <div class="scroll-table-container">
                                 <table class="table table-freelancer scroll-table">
                                    <thead>
                                       <tr>
                                          <td>Job ID</td>
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
                              <div class="pagination-center"><nav class="text-center" id="pagination-container-interested" aria-label="Page navigation"><div class="paginationjs"><div class="paginationjs-pages"><ul><li class="paginationjs-prev disabled"><a>«</a></li>   <li class="paginationjs-next J-paginationjs-next" data-num="2" title="Next page"><a href="">»</a></li></ul></div></div></nav></div>
                           </div>
                           <div id="tab-quoted" class="tab-pane fade">
                            <div class="result-found">
                                 <h5>Results found: <span class="text-theme" id="count-quoted"></span></h5>
                           </div>
                              <div class="scroll-table-container">
                                 <table class="table table-freelancer scroll-table">
                                 <thead>
                                    <tr onclick="window.location ='freelancer_quote.html'">
                                       <td>Job ID</td>
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
                           <div class="pagination-center"><nav class="text-center" id="pagination-container-quoted" aria-label="Page navigation"><div class="paginationjs"><div class="paginationjs-pages"><ul><li class="paginationjs-prev disabled"><a>«</a></li>   <li class="paginationjs-next J-paginationjs-next" data-num="2" title="Next page"><a href="">»</a></li></ul></div></div></nav></div>
                           </div>
         
                           <div id="tab-accepted" class="tab-pane fade">
                            <div class="result-found">
                                 <h5>Results found: <span class="text-theme" id="count-accepted"></span></h5>
                           </div>
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
                           <div class="pagination-center"><nav class="text-center" id="pagination-container-accepted" aria-label="Page navigation"><div class="paginationjs"><div class="paginationjs-pages"><ul><li class="paginationjs-prev disabled"><a>«</a></li>   <li class="paginationjs-next J-paginationjs-next" data-num="2" title="Next page"><a href="">»</a></li></ul></div></div></nav></div>
                           </div>


                           <div id="tab-rejected" class="tab-pane fade active in">
                            <div class="result-found">
                                 <h5>Results found: <span class="text-theme" id="count-rejected"></span></h5>
                           </div>
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
                        <div class="pagination-center"><nav class="text-center" id="pagination-container-rejected" aria-label="Page navigation"><div class="paginationjs"><div class="paginationjs-pages"><ul><li class="paginationjs-prev disabled"><a>«</a></li>   <li class="paginationjs-next J-paginationjs-next" data-num="2" title="Next page"><a href="">»</a></li></ul></div></div></nav></div>
                        </div>


                         <div id="tab-cancelled" class="tab-pane fade active in">
                          <div class="result-found">
                                 <h5>Results found: <span class="text-theme" id="count-cancelled"></span></h5>
                           </div>
                        
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
                        <div class="pagination-flex">
                        <div class="pagination-center"><nav class="text-center" id="pagination-container-cancelled" aria-label="Page navigation"><div class="paginationjs"><div class="paginationjs-pages"><ul><li class="paginationjs-prev disabled"><a>«</a></li>   <li class="paginationjs-next J-paginationjs-next" data-num="2" title="Next page"><a href="">»</a></li></ul></div></div></nav></div>
                        <div class="navtab-filter">
                            <label>Results per Page:</label><select class="form-control"><option>10</option><option>20</option><option>30</option><option>40</option></select>
                         </div>
                         </div>



                        </div>


                           <div id="tab-completed" class="tab-pane fade">
                            <div class="result-found">
                                 <h5>Results found: <span class="text-theme" id="count-completed"></span></h5>
                           </div>
                              <div class="scroll-table-container">
                                 <table class="table table-freelancer scroll-table">
                                 <thead>
                                    <tr>
                                       <td>Job ID</td>
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
                           <div class="pagination-center"><nav class="text-center" id="pagination-container-completed" aria-label="Page navigation"><div class="paginationjs"><div class="paginationjs-pages"><ul><li class="paginationjs-prev disabled"><a>«</a></li>   <li class="paginationjs-next J-paginationjs-next" data-num="2" title="Next page"><a href="">»</a></li></ul></div></div></nav></div>
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

               
               if ( (userDetails['status'] == 'Approved' && userDetails['approved_confirmed'] == 1 ) || (userDetails['status'] == 'Rejected') ) { 
                  //alter the user settings link to navigate to /subscribe.php

                  $('.login-nav li:nth-child(2) a').attr('href', '/subscribe');
      
                  
               } else {
                  
                  urls = `${protocol}//${baseURL}/subscribe`;
                  window.location.href = urls;
               }
                  
               }
               
            

            }
         })
         }


       async  function getUserCustomFields(userGuid, callback){

         var apiUrl = `/api/v2/users/${userGuid}`;
         // console.log(apiUrl);
         $.ajax({
            url: apiUrl,
            method: "GET",
            contentType: 'application/json',

            success: function (result)
            {
            if (result) {
               callback(result.CustomFields);

            }
            },
         });
         
      }
         
          return {
             getUserDetails: getUserDetails,
             getUserStatus: getUserStatus,
             getUserCustomFields: getUserCustomFields
        
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

           //pagination special methods

         function pageNavigate(p, NumPages, tab)
         {
            console.log({ p });
            console.log({NumPages})
               vm = this;
         // els1["p"].className = els2["p"].className = els1["p"].value = els2["p"].value = "";
         if (p < 1) p = 1;
         else if (p > NumPages) p = NumPages;
         //els1["p1"].disabled = els2["p1"].disabled = els1["pprev"].disabled = els2["pprev"].disabled = (p === 1);
         //els1["pnext"].disabled = els2["pnext"].disabled = els1["plast"].disabled = els2["plast"].disabled = (p ===
         ///    NumPages);
         // els1["pcurr"].value = els2["pcurr"].value = p;
         // if the server is handling this, insert NON-logarithmic page links here (can be just first, current, and last page).
         //plinks1 = document.getElementById("plinks1"),
            //       plinks1.innerHTML = plinks2.innerHTML = this.logarithmicPaginationLinks(NumPages, p, link);
            /// console.log(this.logarithmicPaginationLinks(NumPages, p, link))
            //$('.paginationjs-next').before(this.logarithmicPaginationLinks(NumPages, p, tab))
            if (tab == "jobListTwo") {
               $(`#${tab} #pagination-buyer #next`).before(logarithmicPaginationLinks(NumPages, p, tab));
                 waitForElement(`.paging`, function ()
               {
                  $(`#pagination-buyer .paging`).removeClass('active');
                  $(`#pagination-buyer .paginationjs-pages #${p}`).addClass('active');
               
               })
            } else {
               $(`#${tab} #pagination-container-all #next`).before(logarithmicPaginationLinks(NumPages, p, tab));
               waitForElement(`.paging`, function ()
               {
                 // $(`#pagination-container-all .paging`).removeClass('active');
                 // $(`#pagination-container-all .paginationjs-pages #${p}`).addClass('active');
               
               })
            }
         


            
             
                 
               //vm.fetchDataJobs(p, this.perPage);
         }
           

         function logarithmicPaginationLinks(lastPage, matchPage, tab)
         { 
                   if (tab == "jobListTwo") {
                     $(`#${tab} #pagination-buyer`).find('.J-paginationjs-page').remove();
                   } else {
                       $(`#${tab} #pagination-container-all`).find('.J-paginationjs-page').remove();
                  }
                 
                  //$('.paging').remove();
                  function pageLink(p, page) {
                     return ((p === page) ? `<li class="paging paginationjs-page J-paginationjs-page active list" id=${p} value=${p}
                                             ><a  href="javascript:void(0);">${p}</a>
                                          </li>` : `<li class="paging paginationjs-page J-paginationjs-page list" id=${p} value=${p}
                                             ><a  href="javascript:void(0);">${p}</a>
                                          </li>`);
                  }
         
                  function pageGap(x) {
                     if (x === 0) return "";
                     if (x === 1) return " ";
                     if (x <= 10) return "<li class='paging paginationjs-page J-paginationjs-page  list'> <a href='javascript:void(0);'>.</a></li>"; 
                     if (x <= 100) return "<li class='paging paginationjs-page J-paginationjs-page list'> <a href='javascript:void(0);'>..</a></li>";
                     return "<li class='paging paginationjs-page J-paginationjs-page  list'> <a href='javascript:void(0);'>...</a></li>";
                  }

                  var page = (matchPage ? matchPage : 1),
                     LINKS_PER_STEP = 5,
                     lastp1 = 1,
                     lastp2 = page,
                     p1 = 1,
                     p2 = page,
                     c1 = LINKS_PER_STEP + 1,
                     c2 = LINKS_PER_STEP + 1,
                     s1 = "",
                     s2 = "",
                     step = 1,
                     linkHTML = "";

                  while (true) {
                     if (c1 >= c2) {
                        s1 += pageGap(p1 - lastp1) + pageLink(p1, matchPage);
                        lastp1 = p1;
                        p1 += step;
                        c1--;
                     } else {
                        s2 = pageLink(p2, matchPage) + pageGap(lastp2 - p2) + s2;
                        lastp2 = p2;
                        p2 -= step;
                        c2--;
                     }
                     if (c2 === 0) {
                        step *= 10;
                        p1 += step - 1; // Round UP to nearest multiple of step
                        p1 -= (p1 % step);
                        p2 -= (p2 % step); // Round DOWN to nearest multiple of step
                        c1 = LINKS_PER_STEP;
                        c2 = LINKS_PER_STEP;
                     }
                     if (p1 > p2) {
                        linkHTML += s1 + pageGap(lastp2 - lastp1) + s2;
                        if ((lastp2 > page) || (page >= lastPage)) break;
                        lastp1 = page;
                        lastp2 = lastPage;
                        p1 = page + 1;
                        p2 = lastPage;
                        c1 = LINKS_PER_STEP;
                        c2 = LINKS_PER_STEP + 1;
                        s1 = '';
                        s2 = '';
                        step = 1;
                     }
                  }
                  return linkHTML;
         }
           

         function pageClick(e, el, pageCount)
         {
            
             vm = this
             $(`#pagination-container-all .paging`).removeClass('active');
              el.addClass('active');
               e = e || window.event;
               var s = e.target || e.srcElement,n, p, el;
               console.log({ s })
               n = el.attr('value');
               console.log({n})
            // pageNavigate(p.substring(n) >>> 0);
               // if (s.tagName === "A") {
               //     n = (p = s.href).lastIndexOf("=") + 1;
               //     console.log(`n ${n}`)
               //      console.log(`s ${s.name}`)
            pageNavigate(n, (totalFilteredJobs / pageCount));
            paginator(job_list, n, pageCount, 'tab-all');
            return false;
               // }
               //else if ((s.tagName !== "INPUT") || (s.type !== "submit")) return;


               // if (!(n = s.name)) {
               //     p = ((el = this.elements["p"]).value >>> 0);
               //     if ((p <= 0) || (p > vm.paginationcountAll)) {
               //         el.className = "err";
               //         return false;
               //     }
               // }
               
               //  if (n === "p1") p = 1;
               // else if (n === "pprev") p = (this.elements["pcurr"].value >>> 0) - 1;
               // else if (n === "pnext") p = (this.elements["pcurr"].value >>> 0) + 1;
               // else if (n === "plast") p = (this.elements["pcount"].value >>> 0);
               // pageNavigate(p);
               // return false;
           }


         function pageClickBuyer(e, el, pageCount)
         {
            
               vm = this
               
               e = e || window.event;
               var s = e.target || e.srcElement,n, p, el;
               console.log({ s })
               n = el.attr('value');
               console.log({n})
            var pages = Math.ceil($('#count-all-buyer').text() / pageCount)
            console.log({ pages });
              pageNavigate(n, pages);
           // paginator(job_list, n, pageCount, 'tab-all');
              fetchPaginatedJobs(n,pages)
            return false;
               // }
               //else if ((s.tagName !== "INPUT") || (s.type !== "submit")) return;


               // if (!(n = s.name)) {
               //     p = ((el = this.elements["p"]).value >>> 0);
               //     if ((p <= 0) || (p > vm.paginationcountAll)) {
               //         el.className = "err";
               //         return false;
               //     }
               // }
               
               //  if (n === "p1") p = 1;
               // else if (n === "pprev") p = (this.elements["pcurr"].value >>> 0) - 1;
               // else if (n === "pnext") p = (this.elements["pcurr"].value >>> 0) + 1;
               // else if (n === "plast") p = (this.elements["pcount"].value >>> 0);
               // pageNavigate(p);
               // return false;
           }
           

   
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
                
                  console.log({ viewBidBuyerEnabled });
                    
                  

                  if (charge_name == 'job_bid_buyer') {

                     buyerViewBidCharge = charge['value'];

                       waitForElement(`#paymentModal #charge-amount-view-bid`, function ()
                     {

                        $('#paymentModal #charge-amount-view-bid').text( (buyerViewBidCharge != null || buyerViewBidCharge != "") ? parseFloat(buyerViewBidCharge).toFixed(2) : "0.00")
                     })

                  }
                  



                  if (charge_name == 'job_accepted_buyer') {
                     buyerAcceptBidCharge = charge['value'];
                     buyerAcceptBidChargeEnabled = charge['status'];
                     
                     console.log({ buyerAcceptBidChargeEnabled });
                     waitForElement(`#paymentModal #charge-amount`, function ()
                     {

                        $('#paymentModal #charge-amount').text( (buyerAcceptBidCharge != null || buyerAcceptBidCharge != "") ? parseFloat(buyerAcceptBidCharge).toFixed(2) : "0.00")
                     })
                  }

                  if (charge_name == 'job_accepted_seller') {
                     sellerViewAcceptedCharge = charge['value'];
                     sellerViewAcceptedEnabled = charge['status'];
                     
                     console.log({ sellerViewAcceptedEnabled });
                    sellerViewAcceptedCharge = (sellerViewAcceptedCharge != null && sellerViewAcceptedCharge != "") ? parseFloat(sellerViewAcceptedCharge).toFixed(2) : "0"
                     waitForElement(`#payment #charge-amount`, function ()
                     {
                        $('#payment #charge-amount').text(sellerViewAcceptedCharge)
                       console.log({  sellerViewAcceptedCharge });
                     })
                  }


                  if (charge_name == 'job_paid_buyer') {
                     
                     buyerCompletedCharge = charge['value'];
                     buyerCompletedChargeEnabled = charge['status'];

                     waitForElement(`#paymentModalComplete #charge-amount-complete`, function ()
                     {
                        $('#paymentModalComplete #charge-amount-complete').text( (buyerCompletedCharge != null || buyerCompletedCharge != "") ? parseFloat(buyerCompletedCharge).toFixed(2) : "0.00")
                     })
                  }

                  

               


            

               }
            })
      
         }


         function getJobDetail(jobId,el,page,date,isPaid,quoteId){
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

                     }else if (job['status'] == 'Cancelled') {
                        status =`<td>Cancelled</td>`

                     }
                     
                     else {
                        status =`<td>--</td>`
                     }
                     switch (el) {


                        case '#tab-all':

                              var freelancerStatus;                                            
                            var data = [{ 'Name': 'job_id', 'Operator': "equal", "Value": jobId}, { 'Name': 'freelancer_id', 'Operator': "equal", "Value": $('#userGuid').val() }]
            
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
                                 const jobDetails = jobs.Records[0];
                                 if (jobDetails) {
                                        const jobStatus = jobDetails['status'];

                                    if (jobStatus == 'Available') {
                                     freelancerStatus = ` <td><select class="form-control"id ="status">
                                    <option selected="" disabled="" value="Available">Available</option>
                                    <option value="Interested">Interested</option>
                                    </select></td>`
                                    } else if (jobStatus == 'Interested') {
                                    freelancerStatus = ` <td><select class="form-control">
                                       <option selected="" disabled="" value="Available">Interested</option>
                                       <option selected="" value="Available">Interested</option>
                                       </select></td>`
                                    } else if (jobStatus== 'Quoted') {
                                       freelancerStatus =`<td>Quoted</td>`

                                       }else if (jobStatus == 'Accepted') {
                                       freelancerStatus =`<td>Accepted</td>`

                                       }else if (jobStatus == 'Completed') {
                                    freelancerStatus=`<td>Completed</td>`

                                    }else if (jobStatus == 'Cancelled') {
                                       freelancerStatus =`<td>Cancelled</td>`

                                    }
                                    
                                    else {
                                       freelancerStatus =`<td>--</td>`
                                    }

                                 } else {
                                      freelancerStatus = ` <td><select class="form-control"id ="status">
                                    <option selected="" disabled="" value="Available">Available</option>
                                    <option value="Interested">Interested</option>
                                    </select></td>`
                                 }
                                
                               allJobs = `<tr data-id="${job['Id']}">

                                 ${freelancerStatus}
                                 <td>${job['Id']}</td>
                                 <td>${job['job_validity']}</td>
                                 <td>${job['buyer_email']}</td>
                                 <td>${job['buyer_contact']}</td>
                                 <td class="width-location">${job['in_person_work_address']}</td>
                                 <td>${job['is_accepted'] == 1 ? 'Yes' : 'No'} </td>
                                 <td>-</td>
                              </tr>`;



                              }

                              })      




                        
                          


                           break;


                        case '#tab-interested' || '#tab-quoted' || '#tab-completed' || '#tab-cancelled':
                           allJobs = `<tr data-id="${job['Id']}" user-id="${userId}"> </td>
                        <td>${job['Id']} </td>
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
                           <td>${job['Id']} </td>
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
                                                               <option value="stripe">Stripe</option>
                                                               <option selected value="cod">Cash on Delivery</option>
                                                            </select>
                                                         </div>
                                       
                                                         <div class="common-text">
                                                            <p>You will be charged $<span id="charge-amount">${parseFloat(sellerViewAcceptedCharge).toFixed(2)}</span> to view an accepted quote.</p>
                                                            <p>Upon clicking the Pay button, you will be re-directed to the Payment Gateway to continue with your transaction</p>
                                                         
                                                         </div>

                                                         <div id="card-element" style="display:none"> </div>
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
                              
                              var paymentSuccessModal = `  <div class="modal fade payment-modal" id="paymentSuccessfulModal" role="dialog">
                              <div class="modal-dialog">
                                 <!-- Modal content-->
                                 <div class="modal-content">
                                    <div class="modal-body">
                                       
                                    <div id="paymentSuccessful" class="payment-con clearfix">
                                       <h3>Payment</h3>
                                       <div class="payment-middle-con ">
                                          <div class="common-text">
                                                <p><strong>Thank you for your purchase</strong></p>
                                                <p>We have successfully received your payment.<br>You can continue on with the process.</p>
                                          </div>
                                       </div>
                                          <div class="payment-bottom-con clearfix">
                                             <div class="next-tab-area pull-right">
                                                <span class="seller-btn"> <a data-dismiss="modal" class="my-btn btn-red" href="javascript:void(0);">Close</a> </span>
                                             </div>
                                          </div>
                                    </div>
                                       
                                       

                                    
                                    </div>
                                 </div>
                              </div>
                           </div>`;
                              

                              var lockFunction = `<script> function lockViewFreelancer(x){
                                    $('#paymentModalFreelancer').modal('show');
                                    $('#quoted-id-fl').val($(x).attr('data-id')); 
                                    $('#access-url-fl').val($(x).attr('return-url'))

                                    console.log($(x).attr('data-id'))
                                 }  </script>`
                              $('.footer').append(paymentModal);
                              $('.footer').append(paymentSuccessModal);
                              $('body').append(lockFunction);
                           
                           } else {
                              viewButtonTd = `<td class="text-right"><a href="${protocol}//${baseURL}/user/plugins/${packageId}/${page}.php?jobId=${job['Id']}&userId=${userId}" class="btn btn-jobform-outline">View</a></td>`;
                           }
                           allJobs = `<tr data-id="${job['Id']}" user-id="${userId}"> </td>
                           <td>${job['Id']} </td>
                           <td> <a href="#">${job['job_validity']}</a></td>
                           <td>${job['buyer_email']}</td>
                        
                           <td>${job['buyer_contact']}</td>
                           
                           <td class="width-location">${job['in_person_work_address']}</td>
                           <td>${new Date(date * 1000).format("dd/mm/yyyy")}</td>
                           
                           ${viewButtonTd}

                        </tr>`;
                           break;
                        default:
                           console.log( page + 'in default');
                           allJobs = `<tr data-id="${job['Id']}" user-id="${userId}"> </td>
                                    <td>${job['Id']} </td>
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
            url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_quotes?sort=-CreatedDateTime/`,
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
                     var validity = quote['status'] != null ? quote['status'] : `Valid to ${quote['validity_date']}`;

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
                                                   <option value="stripe">Stripe</option>
                                                      <option selected value="cod">Cash on Delivery</option>
                                                </select>
                                             </div>
                           
                                             <div class="common-text">
                                                <p>You will be charged $<span id="charge-amount-view-bid"></span> to View a Quote</p>
                                                <p>Upon clicking the Pay button, you will be re-directed to the Payment Gateway to continue with your transaction</p>
                                             
                                             </div>

                                             <div id="card-element" style="display:none"> </div>
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
                                             <span class="seller-btn"> <a onclick="successfulView(this)" class="my-btn btn-red" href="javascript:void(0);" id="paynowPackage">Pay Now</a> </span>
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
                     
                     var successModal = `<script>  function successfulView(x){
                     jQuery('#paymentModal').modal('hide');
                     jQuery('#paymentSuccessfulModal').modal('show');
                  }  </script>`
                     $('.footer').append(paymentModal);
                     $('body').append(lockFunction);
                     $('body').append(successModal);
                  
                  } else {
                     viewButtonTd =  `<td class="text-right"><a href="${protocol}//${baseURL}/user/plugins/${packageId}/${page}.php?jobId=${quote['job_id']}&userId=${quote['freelancer_id']}" class="btn btn-jobform-outline">View</a></td>`;
                  }
                     let allJobs = `<tr>
                     <td><div class="job-quotedtitle"><span class="qtitle">Quoted by</span><span class="qdesc">${quote['quote_by']}</span></div></td>
                     <td><div class="job-quotedtitle"><span class="qtitle">Date</span><span class="qdesc">${new Date( quote['CreatedDateTime']* 1000).format("dd/mm/yyyy")}</span></div></td>
                     <td><div class="job-quotedtitle"><span class="qtitle">Amount</span><span class="qdesc">$AUD${quote['all_total']}</span></div></td>
                     <td><div class="job-quotedtitle"><span class="qtitle">Availability</span><span class="qdesc">${quote['availability_date']}</span></div></td>
                     <td><div class="job-quotedtitle"><span class="qtitle">Status</span><span class="qdesc">${validity} </span></div></td>
                     
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
              

                var data = [{ 'Name': 'status', 'Operator': "equal", "Value": 'Available' }]
            
         
              $.ajax({

                  method: "POST",
                  url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_list?pageSize=1000`,
                  headers: {
                  "Content-Type": "application/json"
                 },
                   data: JSON.stringify(data),
                  
                 success: function (response)
                 { 

                    const locations = response;
                  
                 //var job_list = [];
                  $.each(locations.Records, function (index, coords)
                  {
                     var location_list = JSON.parse(coords['in_person_work_coords'])
                     console.log({ location_list });
                     var distance = distanceBetweenTwoPlace(lat, long, location_list[0], location_list[1], "K")
                     if (distance <= 1000) {
                              console.log(coords['Id']);
                             
                              range_list.push([parseFloat(location_list[0]), parseFloat(location_list[1]),coords['Id'],coords['CreatedDateTime'], distance ]);
                              
                                  
                      }
                   
                        // $.each(location_list, function (index, loc)
                        // {

                        //    if (distanceBetweenTwoPlace(lat, long, loc['lat'], loc['lng'], "K") <= 1000) {
                        //       console.log(coords['job_id']);
                              
                        //       getJobDetail(coords['job_id'],'#tab-all','freelancer_quote', coords['CreatedDateTime']);
                        //    }

                           
                        // })
                  })

                  console.log({range_list});
                 // var sortedArray = range_list.sort(sortLngLat);
                 //var  job_list = [];
                  sortedArray =  range_list.sort(function(a, b){
                     return a[4] - b[4];
                   });


                  console.log({sortedArray});

                  $.each(sortedArray, function (index, id)
                  {
                     job_list.push([id[2], id[3]]);
                    // getJobDetail(id[2],'#tab-all','freelancer_quote', id[3]);
                     //console.log();

                  })

                  //pagination
               
                  console.log({ job_list });
                  var pageCount =  $('#page-all :selected').val();
                  
                  var totalPages = Math.ceil(job_list.length / pageCount)  //change to dynamic value on select option 10,20.30
                  totalFilteredJobs = totalPages;
                  $('#count-all').text(job_list.length);

                  // pageNavigate(1, totalPages, `tab-all`)
                    
                  // paginator(job_list, 1, pageCount, 'tab-all');
                    
                     $('#pagination-container-all').pagination({
                            dataSource: job_list,
                            locator: "items",
                            totalNumber: job_list.length - 1,
                            pageSize: 10,
                            
                            
                        callback: function(data, pagination) {
                           $('#tab-all table tbody tr').remove();
                           $.each(data, function (index, jobId)
                           {
                              var jobs = jobData.getInstance();
                              
                              jobs.getJobDetail(jobId[0],'#tab-all','freelancer_quote', jobId[1]);
                           
                           })

                        }
                                      
                     });
                    

                    
                     
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
           async function getInterestedJobs()
           {
             $('#tab-interested table tr').remove();
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

                  var perPage = 20;
                  var page= 0
                  var currentPageAll = 1
                  var paginationcountAll= Math.ceil(jobs.TotalRecords / jobs.PageSize)
                  var totalItemsAll= jobs.TotalRecords
                  console.log({paginationcountAll})
                  let options='';
                  for (let i = 1; i <= paginationcountAll; i++) {
                     // some code
                   console.log({i})
                 // $.each(paginationcountAll, function (index, option)
                  
                    options += `<li class="paginationjs-page J-paginationjs-page active" data-num="${i}"><a>${i}</a></li>`
                  };
                  waitForElement('#pagination-container-interested', function ()
                  {
                     
                  $('#pagination-container-interested .paginationjs-prev').after(options)

                  })
                   
                  jobDetails.forEach(function (job, i)
                  {

                     getJobDetail(job['job_id'],'#tab-interested','freelancer_quote', job['CreatedDateTime']);
                     
                     
                  })
                  
                 
                  
                }
                 waitForElement('#count-interested', function ()
                 {
                    $('#count-interested').text(jobs.TotalRecords);
                   
                 })
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
                //  $('#count-quoted').text(jobs.TotalRecords);
                //if existing user, verify the status
                if (jobDetails.length != 0) {



                  var perPage = 20;
                  var page= 0
                  var currentPageQuoted = 1
                  var paginationcountPageQuoted= Math.ceil(jobs.TotalRecords / jobs.PageSize)
                  var totalItemsPageQuoted= jobs.TotalRecords
                  console.log({paginationcountPageQuoted})
                  let options='';
                  for (let i = 1; i <= paginationcountPageQuoted; i++) {
                     // some code
                   console.log({i})
                 // $.each(paginationcountAll, function (index, option)
                  
                    options += `<li class="paginationjs-page J-paginationjs-page active" data-num="${i}"><a>${i}</a></li>`
                  };
                  waitForElement('#pagination-container-quoted', function ()
                  {
                     
                  $('#pagination-container-quoted .paginationjs-prev').after(options)

                  })

                  jobDetails.forEach(function (job, i)
                  {

                     getJobDetail(job['job_id'],'#tab-quoted','freelancer_quoted', job['CreatedDateTime']);
                   
                 
                  })
                  
                 
                  
                }
               waitForElement('#count-quoted', function ()
                 {
                    $('#count-quoted').text(jobs.TotalRecords);
                   
                 })
        
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
                //  $('#count-accepted').text(jobs.TotalRecords);
                //if existing user, verify the status
                if (jobDetails.length != 0) {


                  var perPage = 20;
                  var page= 0
                  var currentPageAccepted = 1
                  var paginationcountPageAccepted= Math.ceil(jobs.TotalRecords / jobs.PageSize)
                  var totalItemsPageAccepted= jobs.TotalRecords
                  console.log({paginationcountPageAccepted})
                  let options='';
                  for (let i = 1; i <= paginationcountPageAccepted; i++) {
                     // some code
                   console.log({i})
                 // $.each(paginationcountAll, function (index, option)
                  
                    options += `<li class="paginationjs-page J-paginationjs-page active" data-num="${i}"><a>${i}</a></li>`
                  };
                  waitForElement('#pagination-container-accepted', function ()
                  {
                     
                  $('#pagination-container-accepted .paginationjs-prev').after(options)

                  })


                  jobDetails.forEach(function (job, i)
                  {

                     getJobDetail(job['job_id'],'#tab-accepted','freelancer_quoted', job['CreatedDateTime'],job['seller_view_paid'],job['Id']);
                   
                 
                  })
                  
                 
                  
                }
                  waitForElement('#count-accepted', function ()
                 {
                    $('#count-accepted').text(jobs.TotalRecords);
                   
                 })
        
              }
            })
           }

           async function getCompletedJobs(){
            var data = [{ 'Name': 'status', 'Operator': "equal", "Value": 'Completed' }, { 'Name': 'freelancer_id', 'Operator': "equal", "Value": $('#userGuid').val() }]
            
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
                //  $('#count-completed').text(jobs.TotalRecords);
                //if existing user, verify the status
                if (jobDetails.length != 0) {

                  var perPage = 20;
                  var page= 0
                  var currentPageCompleted = 1
                  var paginationcountPageCompleted= Math.ceil(jobs.TotalRecords / jobs.PageSize)
                  var totalItemsPageCompleted= jobs.TotalRecords
                  console.log({paginationcountPageCompleted})
                  let options='';
                  for (let i = 1; i <= paginationcountPageCompleted; i++) {
                     // some code
                   console.log({i})
                 // $.each(paginationcountAll, function (index, option)
                  
                    options += `<li class="paginationjs-page J-paginationjs-page active" data-num="${i}"><a>${i}</a></li>`
                  };
                  waitForElement('#pagination-container-completed', function ()
                  {
                     
                  $('#pagination-container-completed .paginationjs-prev').after(options)

                  })



                  jobDetails.forEach(function (job, i)
                  {

                     getJobDetail(job['job_id'],'#tab-completed','freelancer_quoted', job['CreatedDateTime'],job['seller_view_paid'],job['Id']);
                   
                 
                  })
                  
                 
                  
                }
               waitForElement('#count-completed', function ()
                 {
                    $('#count-completed').text(jobs.TotalRecords);
                   
                 })
        
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
               // $('#count-cancelled').text(jobs.TotalRecords);
                //if existing user, verify the status
                if (jobDetails.length != 0) {


                  var perPage = 20;
                  var page= 0
                  var currentPageRejected = 1
                  var paginationcountPageRejected= Math.ceil(jobs.TotalRecords / jobs.PageSize)
                  var totalItemsPageRejected= jobs.TotalRecords
                  console.log({paginationcountPageRejected})
                  let options='';
                  for (let i = 1; i <= paginationcountPageRejected; i++) {
                     // some code
                   console.log({i})
                 // $.each(paginationcountAll, function (index, option)
                  
                    options += `<li class="paginationjs-page J-paginationjs-page active" data-num="${i}"><a>${i}</a></li>`
                  };
                  waitForElement('#pagination-container-rejected', function ()
                  {
                     
                  $('#pagination-container-rejected .paginationjs-prev').after(options)

                  })

                  jobDetails.forEach(function (job, i)
                  {

                     getJobDetail(job['job_id'],'#tab-rejected','freelancer_quoted', job['CreatedDateTime']);
                   
                 
                  })
                  
                 
                  
                }
               waitForElement('#count-rejected', function ()
                 {
                    $('#count-rejected').text(jobs.TotalRecords);
                   
                 })
        
              }
            })
           }

           
         //cancelled jobs
           
           async function getCancelledJobs(){
            var data = [{ 'Name': 'status', 'Operator': "equal", "Value": 'Cancelled' }, { 'Name': 'freelancer_id', 'Operator': "equal", "Value": $('#userGuid').val() }]
            
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
                //  $('#count-cancelled').text(jobs.TotalRecords);
                //if existing user, verify the status
                if (jobDetails.length != 0) {
                  var perPage = 20;
                  var page= 0
                  var currentPageCancelled = 1
                  var paginationcountPageCancelled= Math.ceil(jobs.TotalRecords / jobs.PageSize)
                  var totalItemsPageCancelled= jobs.TotalRecords
                  console.log({paginationcountPageCancelled})
                  let options='';
                  for (let i = 1; i <= paginationcountPageCancelled; i++) {
                     // some code
                   console.log({i})
                 // $.each(paginationcountAll, function (index, option)
                  
                    options += `<li class="paginationjs-page J-paginationjs-page active" data-num="${i}"><a>${i}</a></li>`
                  };
                  waitForElement('#pagination-container-cancelled', function ()
                  {
                     
                  $('#pagination-container-cancelled .paginationjs-prev').after(options)

                  })

                  jobDetails.forEach(function (job, i)
                  {

                     getJobDetail(job['job_id'],'#tab-cancelled','freelancer_quoted', job['CreatedDateTime']);
                   
                 
                  })
                  
                 
                  
                }
               
                waitForElement('#count-cancelled', function ()
                 {
                    $('#count-cancelled').text(jobs.TotalRecords);
                   
                 })
                }
            })
           }


           function getJobLodges()
           {
              var jobId = localStorage.getItem("jobID"); 

              var stripeCustId = localStorage.getItem("stripe_payment_id"); 

              console.log({ jobId });
              if (jobId != null) {
                 //update the job cache
                 updateBuyerID(jobId)
                 
              }

              if (stripeCustId != null) {

                 updateBuyerStripeId(stripeCustId)
              }


           }


            
           function  updateBuyerStripeId(id)
           {
              waitForElement('#userGuid', function ()
              {
                 var user_details = {
      
                    "customerId": id,
                   
                 };
          
                 console.log({ user_details });
                 
              
              var settings = {
                  "url": packagePath + "/save_stripe_id_buyer.php",
                  "method": "POST",
                  "data": JSON.stringify(user_details )
              }
              $.ajax(settings).done(function(response){
                  //remove the existing job id in localstorage after saving
                 
                  localStorage.removeItem("stripe_payment_id"); 
              
              });
            })
          
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
                  
                 if (el.val() == 'Interested') {
                   getInterestedJobs(); 
                 }
              
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
                                      Jobs I have lodged to be quoted on by freelancers
                                   </a>
                               </h4>
                           </div>
                           <div id="jobListTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="jobList">
                               <div class="panel-body">
                                   <div class="blue-tabdesign">
                                     <div class="navtab-flex">
                                     <div class="navtab-design">
                                       <ul class="nav nav-tabs">
                                          <li class="active"><a data-toggle="tab" href="#tab-job-all" aria-expanded="true">All</a></li>
                                          <li class=""><a data-toggle="tab" href="#tab-job-active" aria-expanded="false">Active</a></li>
                                          <li class=""><a data-toggle="tab" href="#tab-job-paused" aria-expanded="false">Paused</a></li>
                                          <li class=""><a data-toggle="tab" href="#tab-job-done" aria-expanded="false">Done</a></li>
                                       </ul>
                                    </div>
                                      
                                         <div class="navtab-filter">
                                            <div class="lodgejob-menu"><a href="/user/plugins/${packageId}/lodge_job.php">Lodge a Job</a></div>
                                         </div>
                                    </div>

                                  <div class="tab-content">
                                  <div id="tab-job-all" class="tab-pane fade active in">
                                  <div class="cmn-table-freelancer">
                                    <div class="navtab-filter">
                                            <div class="result-found">
                                     <h5>Results found: <span class="text-theme" id="count-all-buyer"></span></h5>
                                     </div>
                                        </div>

                                  <div class="table-quoted-container">
                                  </div>
                                    <div class="pagination-flex">
                                    <div class="pagination-center"><nav class="text-center" id="pagination-buyer" aria-label="Page navigation"></nav></div>
                                    
                                    <div class="navtab-filter">
                                    <label>Results per Page:</label><select class="form-control" id="page-all-buyer"><option value=10>10</option><option value=20>20</option><option value=30>30</option><option value=40>40</option></select>
                                    </div>
                                    </div>
                                             
                                       
                                    </div>
                                 </div>



                                 <div id="tab-job-active" class="tab-pane fade active">
                                  <div class="cmn-table-freelancer">
                                    <div class="navtab-filter">
                                            <div class="result-found">
                                     <h5>Results found: <span class="text-theme" id="count-all-active"></span></h5>
                                     </div>
                                        </div>

                                  <div class="table-active-container">
                                  </div>
                                    <div class="pagination-flex">
                                    <div class="pagination-center"><nav class="text-center" id="pagination-active" aria-label="Page navigation"></nav></div>
                                    
                                    <div class="navtab-filter">
                                    <label>Results per Page:</label><select class="form-control" id="page-active-buyer"><option value=10>10</option><option value=20>20</option><option value=30>30</option><option value=40>40</option></select>
                                    </div>
                                    </div>
                                             
                                       
                                    </div>
                                 </div>



                                  <div id="tab-job-paused" class="tab-pane fade active">
                                  <div class="cmn-table-freelancer">
                                    <div class="navtab-filter">
                                            <div class="result-found">
                                     <h5>Results found: <span class="text-theme" id="count-all-paused"></span></h5>
                                     </div>
                                        </div>

                                  <div class="table-paused-container">
                                  </div>
                                    <div class="pagination-flex">
                                    <div class="pagination-center"><nav class="text-center" id="pagination-paused" aria-label="Page navigation"></nav></div>
                                    
                                    <div class="navtab-filter">
                                    <label>Results per Page:</label><select class="form-control" id="page-all-paused"><option value=10>10</option><option value=20>20</option><option value=30>30</option><option value=40>40</option></select>
                                    </div>
                                    </div>
                                             
                                       
                                    </div>
                                 </div>




                                 <div id="tab-job-done" class="tab-pane fade active">
                                  <div class="cmn-table-freelancer">
                                    <div class="navtab-filter">
                                            <div class="result-found">
                                     <h5>Results found: <span class="text-theme" id="count-all-buyer"></span></h5>
                                     </div>
                                        </div>

                                  <div class="table-done-container">
                                  </div>
                                    <div class="pagination-flex">
                                    <div class="pagination-center"><nav class="text-center" id="pagination-buyer" aria-label="Page navigation"></nav></div>
                                    
                                    <div class="navtab-filter">
                                    <label>Results per Page:</label><select class="form-control" id="page-all-buyer"><option value=10>10</option><option value=20>20</option><option value=30>30</option><option value=40>40</option></select>
                                    </div>
                                    </div>
                                             
                                       
                                    </div>
                                 </div>




                               
















                           

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
                 
                 var data = [{ 'Name': 'buyerID', 'Operator': "in", "Value": $('#userGuid').val() },
                    { 'Name': 'status', 'Operator': "equal", "Value": 'Available' },
                         
                 ]
                  //all jobs
                 $.ajax({
                    method: "POST",
                    url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_list?pageSize=1000&sort=-CreatedDateTime`,
                    headers: {
                       "Content-Type": "application/json"
                    },
            
                    data: JSON.stringify(data),
         
                    success: function (response)
                    {
                       console.log({ response })
              
                       const jobs = response
                       const jobDetails = jobs.Records
                       const totalJob = jobs.TotalRecords;
                       waitForElement('#count-all-buyer', function ()
                       {
                          $('#count-all-buyer').text(totalJob);
                          
                       })
                       //if existing user, verify the status
                      
                       var perPageCount = 10;
                       var totalPages = Math.ceil(totalJob / perPageCount)
                       console.log({ totalPages });

                    }
                 })


                  //active
                 var dataActive = [{ 'Name': 'buyerID', 'Operator': "in", "Value": $('#userGuid').val() },
                  { 'Name': 'status', 'Operator': "equal", "Value": 'Available' },
                    
                         
                 ]
                  $.ajax({
                    method: "POST",
                    url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_list?pageSize=1000&sort=-CreatedDateTime`,
                    headers: {
                       "Content-Type": "application/json"
                    },
            
                    data: JSON.stringify(dataActive),
         
                    success: function (response)
                    {
                       console.log({ response })
              
                       const jobs = response
                       const jobDetails = jobs.Records
                       const totalActiveJob = jobs.TotalRecords;
                       waitForElement('#count-all-active', function ()
                       {
                          $('#count-all-active').text(totalActiveJob);
                          
                       })
                       //if existing user, verify the status
                      
                       var perPageCount = 10;
                       var totalPages = Math.ceil(totalActiveJob / perPageCount)
                       console.log({ totalPages });

                    }
                  })
                 
                 //paused

                 
                 var dataPaused = [{ 'Name': 'buyerID', 'Operator': "in", "Value": $('#userGuid').val() },
                  { 'Name': 'status', 'Operator': "equal", "Value": 'Paused' },
                    
                         
                 ]
                  $.ajax({
                    method: "POST",
                    url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_list?pageSize=1000&sort=-CreatedDateTime`,
                    headers: {
                       "Content-Type": "application/json"
                    },
            
                    data: JSON.stringify(dataPaused),
         
                    success: function (response)
                    {
                       console.log({ response })
              
                       const jobs = response
                       const jobDetails = jobs.Records
                       const totalPausedJob = jobs.TotalRecords;
                       waitForElement('#count-all-paused', function ()
                       {
                          $('#count-all-paused').text(totalPausedJob);
                          
                       })
                       //if existing user, verify the status
                      
                       var perPageCount = 10;
                       var totalPages = Math.ceil(totalPausedJob / perPageCount)
                       console.log({ totalPages });

                    }
                  })


                      waitForElement(`#jobListTwo`, function ()
                     {
                          
                          //pageNavigate(1, totalPages, `jobListTwo`)
                          //fetchPaginatedJobs(1, perPageCount)

                      
                     
                        $('#pagination-buyer').pagination({
                            dataSource: function(done) {
                              $.ajax({
                                 method: "POST",
                                 url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_list?sort=-CreatedDateTime`,
                                 headers: {
                                    "Content-Type": "application/json"
                                 },
                           
                                 data: JSON.stringify(data),
                                 success: function(response) {
                                       done(response.Records);
                                 }
                              });
                           },
                             locator: "data.Records",
                            totalNumberLocator: function (response)
                            {
                                console.log({ response })
                               // vm.allFreelancers = response.Records;
                                            // you can return totalNumber by analyzing response content
                                            return response.TotalRecords;
                            },
                           pageSize: 10,
                            
                           callback: function (data, pagination)
                           {
                               // 
                              if (data.length != 0) {
                                 $('.table-quoted-container table').remove();

                          data.forEach(function (job, i)
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
                              jobTable = `<table class="table table-freelancer" id=${job['Id']}>
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
                             waitForElement(`#${job['Id']}`, function ()
                             {
                              getQuotedJobDetails(job['Id'], `#${job['Id']}`, 'applicant-quote')
                             })
                            
                          })
                  
                 
                  
                       }

                        }
                                      

                        });
                         

                        //active
                         
                          $('#pagination-active').pagination({
                            dataSource: function(done) {
                              $.ajax({
                                 method: "POST",
                                 url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_list?sort=-CreatedDateTime`,
                                 headers: {
                                    "Content-Type": "application/json"
                                 },
                           
                                 data: JSON.stringify(dataActive),
                                 success: function(response) {
                                       done(response.Records);
                                 }
                              });
                           },
                             locator: "data.Records",
                            totalNumberLocator: function (response)
                            {
                                console.log({ response })
                               // vm.allFreelancers = response.Records;
                                            // you can return totalNumber by analyzing response content
                                            return response.TotalRecords;
                            },
                           pageSize: 10,
                            
                           callback: function (data, pagination)
                           {
                               // 
                              if (data.length != 0) {
                                 $('.table-active-container table').remove();

                          data.forEach(function (job, i)
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
                              jobTable = `<table class="table table-freelancer" id=${job['Id']}>
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
                         
                             waitForElement('.table-active-container', function ()
                             {
                                
                               $('.table-active-container').append(jobTable);

                                
                             })
                             waitForElement(`#${job['Id']}`, function ()
                             {
                              getQuotedJobDetails(job['Id'], `#${job['Id']}`, 'applicant-quote')
                             })
                            
                          })
                  
                 
                  
                       }

                        }
                                      

                        });
                          
                         
                         //paused

                         
                          $('#pagination-paused').pagination({
                            dataSource: function(done) {
                              $.ajax({
                                 method: "POST",
                                 url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_list?sort=-CreatedDateTime`,
                                 headers: {
                                    "Content-Type": "application/json"
                                 },
                           
                                 data: JSON.stringify(dataPaused),
                                 success: function(response) {
                                       done(response.Records);
                                 }
                              });
                           },
                             locator: "data.Records",
                            totalNumberLocator: function (response)
                            {
                                console.log({ response })
                               // vm.allFreelancers = response.Records;
                                            // you can return totalNumber by analyzing response content
                                            return response.TotalRecords;
                            },
                           pageSize: 10,
                            
                           callback: function (data, pagination)
                           {
                               // 
                              if (data.length != 0) {
                                 $('.table-paused-container table').remove();

                          data.forEach(function (job, i)
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
                              jobTable = `<table class="table table-freelancer" id=${job['Id']}>
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
                         
                             waitForElement('.table-paused-container', function ()
                             {
                                
                               $('.table-paused-container').append(jobTable);

                                
                             })
                             waitForElement(`#${job['Id']}`, function ()
                             {
                              getQuotedJobDetails(job['Id'], `#${job['Id']}`, 'applicant-quote')
                             })
                            
                          })
                  
                 
                  
                       }

                        }
                                      

                        });
                     
                    })


              })

           }

           async function fetchPaginatedJobs(value, page)
           {

              $('.table-quoted-container .custom-content').remove();
               var data = [{ 'Name': 'buyerID', 'Operator': "in", "Value": $('#userGuid').val() }
                         
                 ]
            
                 $.ajax({
                    method: "POST",
                    url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_list?pageSize=${page}&pageNumber=${value}&&sort=-CreatedDateTime`,
                    headers: {
                       "Content-Type": "application/json"
                    },
            
                    data: JSON.stringify(data),
         
                    success: function (response)
                    {
                       console.log({ response })
              
                       const jobs = response
                       const jobDetails = jobs.Records
                       const totalJob = jobs.TotalRecords;
                       waitForElement('#count-all-buyer', function ()
                       {
                          $('#count-all-buyer').text(totalJob);
                          
                       })
                       //if existing user, verify the status
                       if (jobDetails.length != 0) {

                          jobDetails.forEach(function (job, i)
                          {

                             let jobTable = '';
                             if (job['no_of_quotes'] == 0) {
                                jobTable = `<table class="table table-freelancer custom-content">
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
                              jobTable = `<table class="table table-freelancer custom-content" id=${job['Id']}>
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
                             waitForElement(`#${job['Id']}`, function ()
                             {
                             getQuotedJobDetails(job['Id'], `#${job['Id']}`, 'applicant-quote')
                             })
                            
                          })
                  
                 
                  
                       }

                     //  var perPageCount = 10 //$('#page-all-buyer :selected').val();
                     //   var totalPages = Math.ceil(totalJob / perPageCount)
                     //   console.log({ totalPages });
                     //   waitForElement(`#jobListTwo`, function ()
                     //   {
                     //      pageNavigate(1, totalPages, `jobListTwo`)
                     //   })
                    }
                 })

           }


           async function updateJobStatus(jobId, status)
           {
            var job_details = {
            jobId,
            status

           };
   
           console.log({ job_details });
         
      
            var settings = {
                  "url": packagePath + "/update_job_toggle.php",
                  "method": "POST",
                  "data": JSON.stringify(job_details )
            }
            $.ajax(settings).done(function (response)
            {
         
              toastr.success(`Successfully ${status} job status`);
      
            });
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
             getChargeDetails: getChargeDetails,
             getCompletedJobs: getCompletedJobs,
             getCancelledJobs: getCancelledJobs,
             pageClick: pageClick,
             pageNavigate: pageNavigate,
             logarithmicPaginationLinks: logarithmicPaginationLinks,
             pageClickBuyer: pageClickBuyer,
             getQuotedJobDetails: getQuotedJobDetails,
             updateJobStatus: updateJobStatus 
            
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
             quoted = 1;
            var settings = {
                "url": packagePath + "/save_quote.php",
                "method": "POST",
                "data": localStorage.getItem('quote_details')
            }
            $.ajax(settings).done(function(response){
               //toastr.success('Your quote has been submitted');
              
                var allresponse = $.parseJSON(response)
                console.log(allresponse);
                urls = `${protocol}//${baseURL}/`;

               $('#paymentSuccessfulModal').modal('show');
               localStorage.removeItem('quote_details');
               $('#paymentSuccessfulModal #close').attr('href', urls);
              // window.location.href = urls;
               
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

      var paginationScript =  `<script src="https://cdnjs.cloudflare.com/ajax/libs/paginationjs/2.1.5/pagination.js" type="text/javascript">
      </script>`
      //$('head').appendChild(paginationScript);
      $('head').append(paginationScript);
      getMarketplaceCustomFields(function (result)
      {
         $.each(result, function (index, cf)
         {
         
         });
      });
        
      //quote charge
      if (urls.indexOf('/charge_quote.php') >= 0) {
 

         var quotes = $.parseJSON(localStorage.getItem('quote_details'))
         console.log(quotes);
         
         console.log(quotes.freelancer_id);

         $('body').on('change', "#paymentScheme", function () {
              $('#charged-default').remove();
            if ($('option:selected', $(this)).val() == 'stripe') {
             
               if ($('#stripe-pay-id').val() != null &&  $('#stripe-pay-id').val() != '') {

                  $('#card-element-charge').hide(); 
                  //if (!$('#charged-default').length) {
                      $('.common-text').append(`<p id="charged-default"> You will be charged on your default payment method. </p>`);
                   console.log('you will be charge on your default payment method')
                 // }
                 
               
               } else {
                   $('#card-element-charge').show()
                  console.log('Active')
              }
         
        } else {
            
            $('#card-element-charge').hide();
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

                     vm.jobListCharge = jobCharge[0].value != null || jobCharge[0].value != "" ? parseInt(jobCharge[0].value) : 0.00;
                     console.log(parseInt(jobCharge[0].value));
                  
                     //vm.jobListCharge = vm.jobListCharge;
                     vm.jobChargeEnabled = jobCharge[0].status;
                     payment_enabled = vm.jobChargeEnabled;
                     $('#charge-amount').text(vm.jobListCharge)

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
        // var script = document.createElement('script');
        // script.onload = function ()
         //{
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
            if ($('#card-element-charge').length) {
               card.mount('#card-element-charge');
            }
    
            // Create a token or display an error the form is submitted.
            var submitButtonCharge = document.getElementById('paynowPackageChargeQuote');
            if (submitButtonCharge) {
               submitButtonCharge.addEventListener('click',
                  function (event)
                  {
                    
                     console.log({quoted})
                     event.stopPropagation();
                     console.log("click");
                    // event.preventDefault();
                     $("#paynowPackageChargeQuote").attr("disabled", "disabled");

                     if ($('option:selected', $('#paymentScheme')).text() == 'Cash on Delivery') { 
                        if (quoted == 0) {
                            quoted = 1;
                           console.log('cod');
                          var quote = quoteData.getInstance();
                           quote.quoteJob();
                            // not working it's for bubbled events
                        }
                        
                     } else {

                        if ($('#stripe-pay-id').val() != null && $('#stripe-pay-id').val() != '') {
                           console.log('you will be charge on your default payment method')
                         //  $('#card-element-charge').hide();
                          // console.log('you will be charge on your default payment method')
                             chargeData.chargeCustomer($('#stripe-pay-id').val(), $('#charge-amount').text());
                             $("#paynowPackageChargeQuote").prop("disabled", true);
                        } else {

                           createStripeMember(card, stripe)
                          stripe.createToken(card).then(function (result)
                           {
                              if (result.error) {
                                 // Inform the user if there was an error
                                 var errorElement = document.getElementById('card-errors');
                                 errorElement.textContent = result.error.message;
         
                                 // $("#payNowButton").removeAttr("disabled");
                              } else {

                                 console.log({ result })
                                chargeData.charge(result.token, $('#charge-amount').text());
                                 $("#paynowPackageChargeQuote").prop("disabled", true);
                                       
                              }
                           }); 
                           
                        }
                        
                        
                        
                        
                        console.log('stripe')
                     }
                  
                  });
           // }
              
            card.on('change', function (event)
            {
               displayError(event);
            });
            //  }
            //});
         }
        // script.src = "https://js.stripe.com/v3/";

        // document.head.appendChild(script); //or something of the likes

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
               window.location = packagePath + `/charge_quote.php?userId=${$('#user-id').val()}`
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
               window.location = packagePath + `/charge_quote.php?userId=${$('#user-id').val()}`
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

         $('body').on('change', "#paymentScheme", function () {
            $('#charged-default').remove();
            if ($('option:selected', $(this)).val() == 'stripe') {
            
               if ($('#stripe-pay-id').val() != null && $('#stripe-pay-id').val() != '') {

                  $('#card-element').hide(); 
                  //if (!$('#charged-default').length) {
                        $('.common-text').append(`<p id="charged-default"> You will be charged on your default payment method. </p>`);
                     console.log('you will be charge on your default payment method')
                  // }
                  
               
               } else {
                     $('#card-element').show()
                  console.log('Active')
               }
      
            } else {
               
               $('#card-element').hide();
            }
         }); 
         
         //Mark as complete modal
           $('body').on('change', "#paymentSchemeCompleted", function () {
            $('#charged-default').remove();
            if ($('option:selected', $(this)).val() == 'stripe') {
            
               if ($('#stripe-pay-id').val() != null &&  $('#stripe-pay-id').val() != '') {

                  $('#card-element-complete').hide(); 
                  //if (!$('#charged-default').length) {
                        $('.common-text').append(`<p id="charged-default"> You will be charged on your default payment method. </p>`);
                     console.log('you will be charge on your default payment method')
                  // }
                  
               } else {
                     $('#card-element-complete').show()
                     console.log('Active')
               }
      
            } else {
               
               $('#card-element-complete').hide();
            }
         }); 

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
                     if ($('option:selected', $('#paymentScheme')).text() == 'Cash on Delivery') {
                        console.log('cod applicant quote');
                        chargeQuoteAcceptCod($('#quoted-id').val());
                        $("#paynowPackage").prop("disabled", true);
                     } else {
                        //with existing payment method
                        if ($('#stripe-pay-id').val() != null && $('#stripe-pay-id').val() != '') {
                           console.log('you will be charge on your default payment method')
                           chargeCustomer($('#stripe-pay-id').val(), $('#charge-amount').text());
                           chargeQuoteAcceptCod($('#quoted-id').val());
                           $("#paynowPackage").prop("disabled", true);
                        } else {
                           createStripeMemberBuyer(card, stripe)
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

                      if ($('option:selected', $('#paymentSchemeCompleted')).text() == 'Cash on Delivery') {
                         console.log('cod');
                         chargeQuoteCompletedCod($('#quoted-id').val());
                        //chargeQuoteAcceptCod($('#quoted-id').val());
                        $("#paynowPackageComplete").prop("disabled", true);
                      } else {

                        if ($('#stripe-pay-id').val() != null && $('#stripe-pay-id').val() != '') {
                           console.log('you will be charge on your default payment method')
                            chargeCustomer($('#stripe-pay-id').val(), $('#charge-amount').text());
                           // chargeQuoteCompleted(result.token, $('#charge-amount-completed').text(), $('#quoted-id').val());
                            //chargeQuoteCompletedCod($('#quoted-id').val());
                           //chargeQuoteAcceptCod($('#quoted-id').val());
                           $("#paynowPackageComplete").prop("disabled", true);
                        } else {
                           createStripeMemberBuyer(card, stripe)
                           stripe.createToken(card).then(function (result)
                           {
                              if (result.error) {
                                 // Inform the user if there was an error
                                 var errorElement = document.getElementById('card-errors');
                                 errorElement.textContent = result.error.message;
      
                              } else {

                                 //console.log({ result })
                                 chargeCustomer($('#stripe-pay-id').val(), $('#charge-amount').text());
                                 chargeQuoteCompleted(result.token, $('#charge-amount-completed').text(), $('#quoted-id').val());
                                 $("#paynowPackageComplete").prop("disabled", true);
                                          
                                          
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





         }

      

      //pause / delete job

      if (urls.indexOf('/job-details.php')) {

          var jobs = jobData.getInstance();

         //pause
         $('.activebutton').on('click', function (event)

         {   
            $(this).addClass('hidden');
            $('.paused').removeClass('hidden');
            console.log('paused');
            jobs.updateJobStatus($('#job-id').val(), 'Paused');
           // $(this).toggleClass('paused');
           // $(this).removeClass('btn-quote-active');
         })

         $('.paused').on('click', function (event)
         {
             console.log('unpaused');
            jobs.updateJobStatus($('#job-id').val(), 'Available');
            $(this).addClass('hidden');
            $('.activebutton').removeClass('hidden');
              //$(this).toggleClass('btn-quote-active');
            //$(this).removeClass('paused');
         })

          $('#delete-job').on('click', function (event)
         {
             console.log('delete');
             jobs.updateJobStatus($('#job-id').val(), 'Deleted');
             window.location.href = '/';

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

      // if (urls.indexOf('/subscribe') >= 0) {

      //    $('.main').append(`<script type="text/javascript" src="subscribe/${packageId}/scripts/users.js"></script>`)
          
      // }


      //reject modal
       $('#reject').on('click', function (event)
      {
        /// if (buyerAcceptBidChargeEnabled == "True") {
         //   lockView();

       //  } else {
             jQuery('#rejectModal').modal('show');
        // }      
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


      //cancel quote

       $('#cancel-quote').on('click', function (event)
      {
         
         var quote = quoteData.getInstance();
         quote.quoteAction('Cancelled', $(this).attr('job-id'), $(this).attr('user-id'), $(this).attr('quote-id'));
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
         jobs.getCompletedJobs()
         jobs.getCancelledJobs()
        
         
      
         
         if ($('#userGuid').length != 0) {
            user.getUserStatus(userId)
            user.getUserDetails(userId)
            user.getUserCustomFields(userId, function (result)
            {
               $.each(result, function (index, cf)
               {
                  if (cf.Name == 'stripe_payment_id') {

                  stripePayId = cf.Values[0];
                  console.log({ stripePayId });
                  
                  }
               })

            })
         }
       
         var buttons = `
            <div class="btnjob"><a href="${protocol}//${baseURL}/user/plugins/${packageId}/lodge_job.php" class="btn btn-lodge">Lodge a Job</a>
            <a href="/subscribe" class="btn btn-freelancer">I am a Merchant</a>
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
                  if ($('option:selected', $('#paymentScheme')).text() == 'Cash on Delivery') {
                     console.log('cod');
                     chargeViewCod($('#quoted-id').val(), $('#access-url').val());
         
                  } else {
                      if (stripePayId != null && stripePayId != '') {
                           console.log('you will be charge on your default payment method')
                         //  $('#card-element-charge').hide();
                          // console.log('you will be charge on your default payment method')
                         chargeCustomer(stripePayId, $('#charge-amount').text());
                         chargeViewCod($('#quoted-id').val(), $('#access-url').val());
                     
                             $("#paynowPackageChargeQuote").prop("disabled", true);
                      } else {
                         createStripeMember(card, stripe)
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

                  //cod
                   if ($('option:selected', $('#paymentModalFreelancer #paymentScheme')).text() == 'Cash on Delivery') {
                     console.log('cod');
                     chargeViewCod($('#quoted-id').val(), $('#access-url-fl').val());
         
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
                           chargeFreelancerView(result.token, $('#paymentModalFreelancer #charge-amount').text(), $('#quoted-id-fl').val(), $('#access-url-fl').val());
                           $("#paymentModalFreelancer #paynowPackageFl").prop("disabled", true);
                                    
                                    
                           //subscribe(card, stripe)
                                    
      
                           // Send the result.token.id to a php file and use the token to create the subscription
                           // SubscriptionManager.PayNowSubmit(result.token.id, e);
                        }
                     });



                      
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
 
      });

     
      $('body').on('change', "#paymentScheme", function () {
              $('#charged-default').remove();
            if ($('option:selected', $(this)).val() == 'stripe') {
             
               if (stripePayId != null && stripePayId != '') {

                  $('#card-element').hide(); 
                  //if (!$('#charged-default').length) {
                      $('.common-text').append(`<p id="charged-default"> You will be charged on your default payment method. </p>`);
                   console.log('you will be charge on your default payment method')
                 // }
                 
               
               } else {
                   $('#card-element').show()
                  console.log('Active')
              }
         
        } else {
            
            $('#card-element').hide();
        }
        });    




      }
       
   
      //pagination
      // $(document).on("click", "#pagination-container-all .list", function() {
      //    console.log('paginate please');

        

      //    paginator(job_list, parseInt($(this).attr('indx')), 20, 'tab-all');

      //    waitForElement('#pagination-container-all', function ()
      //    {

      //    $(this).siblings().removeClass('active');
      //    $(this).addClass('active');

      //    })

      // })

      // jQuery('body').on('click', '#pagination-container-all .paging', function (e)
      // {
      //    var jobs = jobData.getInstance();
      //    jobs.pageClick(e, $(this), $('#page-all :selected').val());
      //    //paginator(job_list, parseInt($(this).attr('indx')), 20, 'tab-all');
      // })


      //  jQuery('body').on('click', '#pagination-buyer .paging', function (e)
      // {
      //    var jobs = jobData.getInstance();
      //    jobs.pageClickBuyer(e, $(this), $('#page-all-buyer :selected').val());
      //    //paginator(job_list, parseInt($(this).attr('indx')), 20, 'tab-all');
      // })



        
      jQuery('body').on('change', '#page-all', function (e)
      {

       // var jobs = jobData.getInstance();
        var pageCount =  $('#page-all :selected').val();
                  
                 // var totalPages = Math.ceil(job_list.length / pageCount)  //change to dynamic value on select option 10,20.30
                 // totalFilteredJobs = totalPages;
                //  $('#count-all').text(job_list.length - 1);
                  
             //     jobs.pageNavigate(1, totalPages, `tab-all`)
                    
         // paginator(job_list, 1, pageCount, 'tab-all');
         
             $('#pagination-container-all').pagination({
                            dataSource: job_list,
                            locator: "items",
                            totalNumber: job_list.length - 1,
                            pageSize: pageCount,
                            
                            
                        callback: function(data, pagination) {
                           $('#tab-all table tbody tr').remove();
                           $.each(data, function (index, jobId)
                           {
                              var jobs = jobData.getInstance();
                              
                              jobs.getJobDetail(jobId[0],'#tab-all','freelancer_quote', jobId[1]);
                           
                           })

                        }
                                      
                     });
                    
  
      });


        
      jQuery('body').on('change', '#page-all-buyer', function (e)
      {

        //var jobs = jobData.getInstance();
        var pageCount =  $('#page-all-buyer :selected').val();
                  
         //          var totalPages = Math.ceil($('#count-all-buyer').text() / pageCount)  //change to dynamic value on select option 10,20.30
         //          console.log({totalPages})
         //          //totalFilteredJobs = totalPages;
         //          //$('#count-all').text(job_list.length - 1);
                  
         // jobs.pageNavigate(1, totalPages, `jobListTwo`)
         // jobs.fetchPaginatedJobs(n, pageCount)
                    
                  //paginator(job_list, 1, pageCount, 'tab-all');
         
   
                      waitForElement(`#jobListTwo`, function ()
                     {
                          
                          //pageNavigate(1, totalPages, `jobListTwo`)
                          //fetchPaginatedJobs(1, perPageCount)

                      
                     var data = [{ 'Name': 'buyerID', 'Operator': "in", "Value": $('#userGuid').val() }]
                        $('#pagination-buyer').pagination({
                            dataSource: function(done) {
                              $.ajax({
                                 method: "POST",
                                 url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_list?sort=-CreatedDateTime`,
                                 headers: {
                                    "Content-Type": "application/json"
                                 },
                           
                                 data: JSON.stringify(data),
                                 success: function(response) {
                                       done(response.Records);
                                 }
                              });
                           },
                             locator: "data.Records",
                            totalNumberLocator: function (response)
                            {
                                console.log({ response })
                               // vm.allFreelancers = response.Records;
                                            // you can return totalNumber by analyzing response content
                                            return response.TotalRecords;
                            },
                           pageSize: pageCount,
                            
                           callback: function (data, pagination)
                           {
                               // 
                              if (data.length != 0) {
                                 $('.table-quoted-container table').remove();

                          data.forEach(function (job, i)
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
                              jobTable = `<table class="table table-freelancer" id=${job['Id']}>
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
                             waitForElement(`#${job['Id']}`, function ()
                             {
                                var jobs = jobData.getInstance();
                              jobs.getQuotedJobDetails(job['Id'], `#${job['Id']}`, 'applicant-quote')
                             })
                            
                          })
                  
                 
                  
                       }

                        }
                                      

                        });
                          
                     



                    
                })









  
      });

      
   
     
   });
  })();
  