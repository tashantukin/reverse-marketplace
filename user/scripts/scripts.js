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
          var data = [{ 'Name': 'user_id', 'Operator': "in", "Value": userId }]
          
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
                                   <option value="Completed">Completed</option>
                                 </select>
         
                                 <ul class="nav nav-tabs">
                                       <li class="active"><a data-toggle="tab" href="#tab-all" aria-expanded="true">All</a></li>
                                       <li class=""><a data-toggle="tab" href="#tab-interested" aria-expanded="false">Interested</a></li>
                                       <li class=""><a data-toggle="tab" href="#tab-quoted" aria-expanded="false">Quoted</a></li>
                                       <li class=""><a data-toggle="tab" href="#tab-accepted" aria-expanded="false">Accepted</a></li>
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
                                       <td>No. of Images</td>
                                       <td>No. of Quotes</td>
                                       <td>Accepted</td>
                                       <td>Quoted Date</td>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <tr>
                                       <td><select class="form-control">
                                          <option selected="" disabled="" value="Available">Available</option>
                                          <option value="Interested">Interested</option>
                                       </select></td>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>Yes</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td><select class="form-control">
                                          <option disabled="" value="Available">Available</option>
                                          <option selected="" value="Interested">Interested</option>
                                       </select></td>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>Yes</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td><select class="form-control">
                                          <option selected="" disabled="" value="Available">Available</option>
                                          <option value="Interested">Interested</option>
                                       </select></td>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>Yes</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>Quoted</td>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>Yes</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td><select class="form-control">
                                          <option selected="" disabled="" value="Available">Available</option>
                                          <option value="Interested">Interested</option>
                                       </select></td>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>Yes</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td><select class="form-control">
                                          <option disabled="" value="Available">Available</option>
                                          <option selected="" value="Interested">Interested</option>
                                       </select></td>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>Yes</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td><select class="form-control">
                                          <option selected="" disabled="" value="Available">Available</option>
                                          <option value="Interested">Interested</option>
                                       </select></td>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>Yes</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>Quoted</td>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>Yes</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td><select class="form-control">
                                          <option selected="" disabled="" value="Available">Available</option>
                                          <option value="Interested">Interested</option>
                                       </select></td>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>Yes</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td><select class="form-control">
                                          <option selected="" disabled="" value="Available">Available</option>
                                          <option value="Interested">Interested</option>
                                       </select></td>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>Yes</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    
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
                                          <td>No. of Images</td>
                                          <td>No. of Quotes</td>
                                          <td>Accepted</td>
                                          <td>Quoted Date</td>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr onclick="window.location ='freelancer_quote.html'">
                                          <td>DD/MM/YYYY</td>
                                          <td>sample@gemail.com</td>
                                          <td>89100122</td>
                                          <td class="width-location">Location Location Location 123</td>
                                          <td>1</td>
                                          <td>1</td>
                                          <td>Yes</td>
                                          <td>DD/MM/YYYY</td>
                                       </tr>
                                       <tr onclick="window.location ='freelancer_quote.html'">
                                          <td>DD/MM/YYYY</td>
                                          <td>sample@gemail.com</td>
                                          <td>89100122</td>
                                          <td class="width-location">Location Location Location 123</td>
                                          <td>1</td>
                                          <td>1</td>
                                          <td>No</td>
                                          <td>DD/MM/YYYY</td>
                                       </tr>
                                       <tr onclick="window.location ='freelancer_quote.html'">
                                          <td>DD/MM/YYYY</td>
                                          <td>sample@gemail.com</td>
                                          <td>89100122</td>
                                          <td class="width-location">Location Location Location 123</td>
                                          <td>1</td>
                                          <td>1</td>
                                          <td>No</td>
                                          <td>DD/MM/YYYY</td>
                                       </tr>
                                       <tr onclick="window.location ='freelancer_quote.html'">
                                          <td>DD/MM/YYYY</td>
                                          <td>sample@gemail.com</td>
                                          <td>89100122</td>
                                          <td class="width-location">Location Location Location 123</td>
                                          <td>1</td>
                                          <td>1</td>
                                          <td>No</td>
                                          <td>DD/MM/YYYY</td>
                                       </tr>
                                       <tr onclick="window.location ='freelancer_quote.html'">
                                          <td>DD/MM/YYYY</td>
                                          <td>sample@gemail.com</td>
                                          <td>89100122</td>
                                          <td class="width-location">Location Location Location 123</td>
                                          <td>1</td>
                                          <td>1</td>
                                          <td>No</td>
                                          <td>DD/MM/YYYY</td>
                                       </tr>
                                       <tr onclick="window.location ='freelancer_quote.html'">
                                          <td>DD/MM/YYYY</td>
                                          <td>sample@gemail.com</td>
                                          <td>89100122</td>
                                          <td class="width-location">Location Location Location 123</td>
                                          <td>1</td>
                                          <td>1</td>
                                          <td>No</td>
                                          <td>DD/MM/YYYY</td>
                                       </tr>
                                       <tr onclick="window.location ='freelancer_quote.html'">
                                          <td>DD/MM/YYYY</td>
                                          <td>sample@gemail.com</td>
                                          <td>89100122</td>
                                          <td class="width-location">Location Location Location 123</td>
                                          <td>1</td>
                                          <td>1</td>
                                          <td>No</td>
                                          <td>DD/MM/YYYY</td>
                                       </tr>
                                       <tr onclick="window.location ='freelancer_quote.html'">
                                          <td>DD/MM/YYYY</td>
                                          <td>sample@gemail.com</td>
                                          <td>89100122</td>
                                          <td class="width-location">Location Location Location 123</td>
                                          <td>1</td>
                                          <td>1</td>
                                          <td>No</td>
                                          <td>DD/MM/YYYY</td>
                                       </tr>
                                       <tr onclick="window.location ='freelancer_quote.html'">
                                          <td>DD/MM/YYYY</td>
                                          <td>sample@gemail.com</td>
                                          <td>89100122</td>
                                          <td class="width-location">Location Location Location 123</td>
                                          <td>1</td>
                                          <td>1</td>
                                          <td>No</td>
                                          <td>DD/MM/YYYY</td>
                                       </tr>
                                       <tr onclick="window.location ='freelancer_quote.html'">
                                          <td>DD/MM/YYYY</td>
                                          <td>sample@gemail.com</td>
                                          <td>89100122</td>
                                          <td class="width-location">Location Location Location 123</td>
                                          <td>1</td>
                                          <td>1</td>
                                          <td>No</td>
                                          <td>DD/MM/YYYY</td>
                                       </tr>
                                       
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
                                       <td>No. of Images</td>
                                       <td>No. of Quotes</td>
                                       <td>Accepted</td>
                                       <td>Quoted Date</td>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <tr onclick="window.location ='freelancer_quote.html'">
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>Yes</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr onclick="window.location ='freelancer_quote.html'">
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr onclick="window.location ='freelancer_quote.html'">
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr onclick="window.location ='freelancer_quote.html'">
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr onclick="window.location ='freelancer_quote.html'">
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr onclick="window.location ='freelancer_quote.html'">
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr onclick="window.location ='freelancer_quote.html'">
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr onclick="window.location ='freelancer_quote.html'">
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr onclick="window.location ='freelancer_quote.html'">
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr onclick="window.location ='freelancer_quote.html'">
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    
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
                                       <td>No. of Images</td>
                                       <td>No. of Quotes</td>
                                       <td>Accepted</td>
                                       <td>Quoted Date</td>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    
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
                                       <td>No. of Images</td>
                                       <td>No. of Quotes</td>
                                       <td>Accepted</td>
                                       <td>Quoted Date</td>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    <tr>
                                       <td>DD/MM/YYYY</td>
                                       <td>sample@gemail.com</td>
                                       <td>89100122</td>
                                       <td class="width-location">Location Location Location 123</td>
                                       <td>1</td>
                                       <td>1</td>
                                       <td>No</td>
                                       <td>DD/MM/YYYY</td>
                                    </tr>
                                    
                                 </tbody>
                              </table>
                           </div>
                           </div>
                           <div class="pagination-center"><nav class="text-center" id="pagination-container" aria-label="Page navigation"><div class="paginationjs"><div class="paginationjs-pages"><ul><li class="paginationjs-prev disabled"><a>«</a></li><li class="paginationjs-page J-paginationjs-page active" data-num="1"><a>1</a></li><li class="paginationjs-page J-paginationjs-page" data-num="2"><a href="">2</a></li><li class="paginationjs-page J-paginationjs-page" data-num="3"><a href="">3</a></li><li class="paginationjs-page J-paginationjs-page" data-num="4"><a href="">4</a></li><li class="paginationjs-page J-paginationjs-page" data-num="5"><a href="">5</a></li><li class="paginationjs-ellipsis disabled"><a>...</a></li><li class="paginationjs-page paginationjs-last J-paginationjs-page" data-num="14"><a href="">14</a></li><li class="paginationjs-next J-paginationjs-next" data-num="2" title="Next page"><a href="">»</a></li></ul></div></div></nav></div>
                           </div>
                        </div>
                                   </div>
                               </div>
                           </div>
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
                                         <table class="table table-freelancer">
                                            <thead>
                                               <tr>
                                                  <th colspan="5">Job #123</th>
                                                  <th class="text-right"><a href="job-detail.html">Details &gt;&gt;</a></th>
                                               </tr>
                                            </thead>
                                            <tbody>
                                               <tr>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Quoted by</span><span class="qdesc">Grace (Undergraduate)</span></div></td>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Date</span><span class="qdesc">DD/MM/YYYY</span></div></td>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Amount</span><span class="qdesc">$1500</span></div></td>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Availability</span><span class="qdesc">DD/MM/YYYY</span></div></td>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Status</span><span class="qdesc">Valid to DD/MM/YYYY</span></div></td>
                                                  <td class="text-right"><a href="applicant-quote.html" class="btn btn-jobform-outline">View</a></td>
                                               </tr>
                                               <tr>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Quoted by</span><span class="qdesc">Grace (Undergraduate)</span></div></td>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Date</span><span class="qdesc">DD/MM/YYYY</span></div></td>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Amount</span><span class="qdesc">$1500</span></div></td>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Availability</span><span class="qdesc">DD/MM/YYYY</span></div></td>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Status</span><span class="qdesc text-success">Accepted</span></div></td>
                                                  <td class="text-right"><a href="applicant-quote.html" class="btn btn-jobform-outline">View</a></td>
                                               </tr>
                                            </tbody>
                                         </table>
                                         <table class="table table-freelancer">
                                            <thead>
                                               <tr>
                                                  <th colspan="5">Job #123</th>
                                                  <th class="text-right"><a href="job-detail.html">Details &gt;&gt;</a></th>
                                               </tr>
                                            </thead>
                                            <tbody>
                                               <tr>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Quoted by</span><span class="qdesc">Grace (Undergraduate)</span></div></td>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Date</span><span class="qdesc">DD/MM/YYYY</span></div></td>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Amount</span><span class="qdesc">$1500</span></div></td>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Availability</span><span class="qdesc">DD/MM/YYYY</span></div></td>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Status</span><span class="qdesc">Valid to DD/MM/YYYY</span></div></td>
                                                  <td class="text-right"><a href="applicant-quote.html" class="btn btn-jobform-outline">View</a></td>
                                               </tr>
                                               <tr>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Quoted by</span><span class="qdesc">Grace (Undergraduate)</span></div></td>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Date</span><span class="qdesc">DD/MM/YYYY</span></div></td>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Amount</span><span class="qdesc">$1500</span></div></td>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Availability</span><span class="qdesc">DD/MM/YYYY</span></div></td>
                                                  <td><div class="job-quotedtitle"><span class="qtitle">Status</span><span class="qdesc text-success">Accepted</span></div></td>
                                                  <td class="text-right"><a href="applicant-quote.html" class="btn btn-jobform-outline">View</a></td>
                                               </tr>
                                            </tbody>
                                         </table>
         
                                         <table class="table table-freelancer">
                                            <thead>
                                               <tr>
                                                  <th colspan="5">Job #123</th>
                                                  <th class="text-right"><a href="job-detail.html">Details &gt;&gt;</a></th>
                                               </tr>
                                            </thead>
                                            <tbody>
                                               <tr>
                                                  <td colspan="6"><div class="quoted-notfound">No one has quoted on this job yet.</div></td>
                                               </tr>
                                            </tbody>
                                         </table>
         
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


        

      
          return {
          getUserDetails :getUserDetails
        
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
        
          async function getJobDetail(jobId){
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
                  const jobDetails = jobs.Records[0]
                  //if existing user, verify the status
                  if (jobDetails) {
                    
                   
                    
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
                const jobDetails = jobs.Records[0]
                //if existing user, verify the status
                if (jobDetails) {
                  
                 
                  
                }
            
              
          
              }
        
        
            })
          }

          return {
            getAllJobs :getAllJobs,
            getJobDetail :getJobDetail
        
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

        var user = userData.getInstance();
        var jobs = jobData.getInstance();
        jobs.getAllJobs()
        user.getUserDetails(userId);


            var buttons = `
            <div class="btnjob"><a href="lodge.html" class="btn btn-lodge">Lodge a Job</a>
            <a href="/subscribe" class="btn btn-freelancer">I am a Freelancer</a>
             </div>`

            $('.home-banner').addClass('reverse-slider');

            $('.home-banner .banner-quote  p').after(buttons);
            
            $('.section-category').parent('div').hide();

            $('.home-serach').hide();

            $('.section-shop').hide();
        



    

        }
  
    
    });
  })();
  