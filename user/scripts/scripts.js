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
    //const token = getCookie('webapitoken');

    
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
               // if (userDetails['status'] == 'Approved' && userDetails['approved_confirmed'] == 1) { 
                  //show the table

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
        
          async function getJobDetail(jobId,el,page,date){
              var data = [{ 'Name': 'Id', 'Operator': "in", "Value": jobId }]
              
              $.ajax({
                method: "POST",
                url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_cache/`,
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
                      if (page == '#tab-interested' || page == '#tab-quoted') {
                         allJobs = `<tr data-id="${job['Id'] }" user-id="${userId}"> </td>
                        <td> <a href="user/plugins/${packageId}/${page}.php?jobId=${job['Id'] }&userId=${userId}">${job['job_availability']}</a></td>
                        <td>${job['buyer_email']}</td>
                      
                        <td>${job['buyer_contact_no']}</td>
                        
                        <td>${job['is_accepted'] == 1 ? 'Yes' : 'No'} </td>

                        <td class="width-location">${job['buyer_contact_no']}</td>
                        <td>${new Date( date* 1000).format("dd/mm/yyyy")}</td>
                       </tr>`;
                      } else {
                        allJobs = `<tr data-id="${job['Id'] }" user-id="${userId}"> </td>
                        <td> <a href="user/plugins/${packageId}/${page}.php?jobId=${job['Id'] }&userId=${userId}">${job['job_availability']}</a></td>
                        <td>${job['buyer_email']}</td>
                      
                        <td>${job['buyer_contact_no']}</td>
                        
                        <td class="width-location">${job['inperson_work_address']}</td>
                        <td>${new Date( date* 1000).format("dd/mm/yyyy")}</td>
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
                   
                       let allJobs = `<tr>
                       <td><div class="job-quotedtitle"><span class="qtitle">Quoted by</span><span class="qdesc">${quote['quote_by']}</span></div></td>
                       <td><div class="job-quotedtitle"><span class="qtitle">Date</span><span class="qdesc">${new Date( quote['CreatedDateTime']* 1000).format("dd/mm/yyyy")}</span></div></td>
                       <td><div class="job-quotedtitle"><span class="qtitle">Amount</span><span class="qdesc">$AUD${quote['all_total']}</span></div></td>
                       <td><div class="job-quotedtitle"><span class="qtitle">Availability</span><span class="qdesc">${quote['availability_date']}</span></div></td>
                       <td><div class="job-quotedtitle"><span class="qtitle">Status</span><span class="qdesc">Valid to ${quote['validity_date']} </span></div></td>
                       <td class="text-right"><a href="user/plugins/${packageId}/${page}.php?jobId=${quote['job_id'] }&userId=${quote['freelancer_id']}" class="btn btn-jobform-outline">View</a></td>
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
          

          async function getAllJobs(){
           
            
            $.ajax({
              method: "GET",
              url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_cache/`,
              headers: {
                "Content-Type": "application/json"
              },
            
              success: function (response)
              {
                console.log({ response })
              
                const jobs = response
                const jobDetails = jobs.Records
                console.log({ jobDetails });
                //if existing user, verify the status
                if (jobDetails.length != 0) {

                  jobDetails.forEach(function (job, i)
                  {
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
                    
                    let allJobs = `<tr data-id="${job['Id']}">

                  ${status}
                  <td>${job['job_availability']}</td>
                  <td>${job['buyer_email']}</td>
                  <td>${job['buyer_contact_no']}</td>
                  <td class="width-location">${job['inperson_work_address']}</td>
                  <td>${job['is_accepted'] == 1 ? 'Yes' : 'No'} </td>
                  <td>-</td>
                 </tr>`;
                     waitForElement('#tab-all', function ()
                     {
                        $('#tab-all table tbody').append(allJobs);
                     })

                  })
                  
                 
                  
                }
                  
                
            
              
          
              }
        
        
            })
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

                     getJobDetail(job['job_id'],'#tab-interested','freelancer_quote');
                   
                 
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

                     getJobDetail(job['job_id'],'#tab-accepted','freelancer_quoted',job['CreatedDateTime']);
                   
                 
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
                                            <div class="lodgejob-menu"><a href="lodge.html">Lodge a Job</a></div>
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
                    url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_cache/`,
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
                              <th class="text-right"><a href="user/plugins/${packageId}/job-details.php?jobId=${job['Id']}">Details &gt;&gt;</a></th>
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
             getRejectedJobs : getRejectedJobs
            
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

            var jobTasks = new Array();
            $(".qq-total-sum .saved").each(function ()
            {
                var title = $(this).find('.title').text();
                var price = $(this).find('.qq-option span b').text();
                console.log({ title })
               
               jobTasks.push({ title, price });
               
            });

            console.log({ jobTasks })
             
            var quote_details = {

               "job_id": $('#job-id').val(),
               "freelancer_id": $('#user-id').val(),
               "job_summary": jobTasks,
               "total": $(".qq-total").find('span b').text(),
               "all_discount": $(".qq-discount .qq-option").find('span b').text(),
               "all_total": $(".qq-subtotal").find('span b').text(),
               "quoted-by" : $("#quoted-by").text(),
               
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

            console.log(quote_details);
            var settings = {
                "url": packagePath + "/save_quote.php",
                "method": "POST",
                "data": JSON.stringify(quote_details)
            }
            $.ajax(settings).done(function(response){
               toastr.success('Your quote has been submitted');
                var allresponse = $.parseJSON(response)
               console.log(allresponse);
               urls = `${protocol}//${baseURL}/`;
               window.location.href = urls;
               
               
        
      
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
         $.ajax(settings).done(function(response){
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
  
  
  
    $(document).ready(function () {
      getMarketplaceCustomFields(function (result) {
        $.each(result, function (index, cf) {
         
        });
      });
        
        
        //home page

       if (document.body.className.includes('page-home')) {
         
          
          //for newly registered buyers after lodging a job

          //check if there is an existing lodge job on local storage, if there is, update the job cache with the buyer id (user id)



        var user = userData.getInstance();
        var jobs = jobData.getInstance();
        jobs.getAllJobs()
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
            <div class="btnjob"><a href="user/plugins/${packageId}/lodge_job.php" class="btn btn-lodge">Lodge a Job</a>
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

       }
       
       //quotation page


       $('#submit-top').on('click', function (event)
       {
         event.stopPropagation();
         event.stopImmediatePropagation();
         var quote = quoteData.getInstance();
          quote.quoteJob();
       })

       $('#submit-bottom').on('click', function (event)
       {
         event.stopPropagation();
         event.stopImmediatePropagation();
          var quote = quoteData.getInstance();
          quote.quoteJob();
       })



       //accept button

       $('#accept-confirm').on('click', function (event)
       {
         
          var quote = quoteData.getInstance();
          quote.quoteAction('Accepted', $(this).attr('job-id'),$(this).attr('user-id'),$(this).attr('quote-id'));
       })
       

       //reject confirm
       $('#reject-confirm').on('click', function (event)
       {
         
          var quote = quoteData.getInstance();
          quote.quoteAction('Rejected', $(this).attr('job-id'),$(this).attr('user-id'),$(this).attr('quote-id'));
       })
      
      
    });
  })();
  