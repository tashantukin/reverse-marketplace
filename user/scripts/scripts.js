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
      //  })
        success: function (response)
        {
          console.log({ response })
        
          const users = response
          const userDetails = users.Records[0]

          if (userDetails) {
            
            //if existing user, redirect to page
            urls = `${protocol}//${baseURL}/subscribe`;
            window.location.href = urls;
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
  

  
    $(document).ready(function () {
      getMarketplaceCustomFields(function (result) {
        $.each(result, function (index, cf) {
         
        });
      });
        
        
        //home page

      if (document.body.className.includes('page-home')) {

        var user = userData.getInstance();
        user.getUserDetails(userId);


          
            var buttons = `
            <div class="btnjob"><a href="lodge.html" class="btn btn-lodge">Lodge a Job</a>
            <a href="freelancer-create-account.html" class="btn btn-freelancer">I am a Freelancer</a>
             </div>`

            $('.home-banner').addClass('reverse-slider');

            $('.home-banner .banner-quote  p').after(buttons);
            
            $('.section-category').parent('div').hide();

            $('.home-serach').hide();

            $('.section-shop').hide();
        



    

        }
  
    
    });
  })();
  