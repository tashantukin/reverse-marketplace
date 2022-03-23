(function() {
    var scriptSrc = document.currentScript.src;
    var packagePath = scriptSrc.replace('/scripts/payments.js', '').trim();
    var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
    var packageId = re.exec(scriptSrc.toLowerCase())[1];
    var userId = $('#userGuid').val();
    var customFieldPrefix = packageId.replace(/-/g, "");
    var timezone_offset_minutes = new Date().getTimezoneOffset();
    timezone_offset_minutes = timezone_offset_minutes == 0 ? 0 : -timezone_offset_minutes;
    var accessToken = 'Bearer ' + getCookie('webapitoken');
    const baseURL = window.location.hostname;
    const protocol = window.location.protocol;

    function getCookie (name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

    function getMarketplaceCustomFields(callback){
    var apiUrl = '/api/v2/marketplaces'
    $.ajax({
        url: apiUrl,
          headers: {
           'Authorization':  accessToken,
       },
        method: 'GET',
        contentType: 'application/json',
        success: function(result) {
            if (result) {
                callback(result.CustomFields);
            }
        }
    });
    
    }
    var stripeSettings =  new Vue({
        el: "#stripe-payments-content",
        data() {
            return {
                
             
            }
        },

        filters: {
            capitalize: function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },

        },

        methods: {
            async saveKeys() {
                try {
                    vm = this;
                    var data = {  'secretKey': $('#live-secret-key').val(), 'publishableKey': $('#live-publishable-key').val(), 'client-id' : $('#production-client-id').val()};
                    const response = await axios({
                        method: "POST",
                        url: packagePath + '/save_stripe_keys.php',
                        data: JSON.stringify(data),
                        
                    })
                    const keys = await response
                    
                    console.log({keys})
                   

                    // return templates

                } catch (error) {
                    console.log("error", error);
                }
            },


            validateKeys(){
                  vm = this;
                var e = false;
                jQuery("#live_secret_key .required").each(function () {
                    var val = jQuery(this).val();
                    var attr = jQuery(this).attr('id');
                    if (jQuery.trim(val) == '')
                    {
                        e = true;
                        jQuery(this).addClass('error-con');
                    }
                });

 
                if (!$(".error-con").length)
                {
                    this.saveKeys();
                    jQuery("#live-secret-key").prop("readonly", true);
                    jQuery("#live-publishable-key").prop("readonly", true);
                    jQuery("#save-btn").hide();
                    jQuery("#edit-btn").show();
                }
            },


            validatePK(pKey,el) {
                $('.error').text('');
                el.removeClass('error-con');
                try {
                    var stripe = Stripe(pKey);
                    stripe.createToken('pii', {personal_id_number: 'test'})
                        .then(result =>
                        {
                        //console.log(result);
                        if (result.token) {
                        
                        }
                        // public key is valid :o)
                        else {
                        //e = true;
                        el.addClass('error-con');
                        $('.error').text('Invalid Publishable key provided.');
                        }
                        
                    })
                }catch(err){
                    // console.log('err ' + err);
                    el.addClass('error-con');
                    $('.error').text('Please provide Publishable key instead.');
                }
  
            },

            validateSK(sKey, el)
            {
                $('.errorSecret').text('');
                el.removeClass('error-con');
                var data = { 'secret_key' : sKey};
                console.log(data);
                var apiUrl = packagePath + '/validate_secretkey.php';
                $.ajax({
                    url: apiUrl,          
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: function($result) {
                        console.log({ $result });
                        var isvalid = JSON.parse($result);
                        // console.log(isvalid);
                        // console.log(isvalid.result.code);
                        
                        if (isvalid.result != 'Valid') {

                        if (isvalid.result.code == 'secret_key_required') {
                            el.addClass('error-con');
                            $('.errorSecret').text('Please provide Secret key instead.');
                            } else {
                            //console.log()
                            el.addClass('error-con');
                            $('.errorSecret').text('Invalid Secret key provided.');
                            }
                        
                        }
                        
                    },
                    error: function ($result) {
                        
                    }
                });
            }
   
        },

        computed: {
           
          },

 
        beforeMount() {
          
            
        },


    })
  

    $(document).ready(function ()
    {
        


    getMarketplaceCustomFields(function(result) {
      $.each(result, function(index, cf) {
        
          if (cf.Name == 'stripe_api_key' && cf.Code.startsWith(customFieldPrefix)) {
            var api_key = cf.Values[0];
            $('#live-secret-key').val(api_key);
          }
          if (cf.Name == 'stripe_pub_key' && cf.Code.startsWith(customFieldPrefix)) {
            var account_url = cf.Values[0];
            $('#live-publishable-key').val(account_url);
          }

      })
  });     


        $("#save-btn").on("click", function ()
        {
            stripeSettings.validateKeys();
        })

         //validiate PK
        $('#live-publishable-key').on('keyup', function ()
        {
        if ($(this).val()) {
             stripeSettings.validatePK($(this).val(), $(this));
        }
        });

        $('#live-secret-key').on('keyup', function ()
        {
        if ($(this).val()) {
            stripeSettings.validateSK($(this).val(), $(this));
        }
        });

    
    });
})();