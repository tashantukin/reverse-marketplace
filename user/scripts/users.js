const scriptSrc = document.currentScript.src;
console.log({ scriptSrc });
var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
const protocol = window.location.protocol;
const token = getCookie('webapitoken');
const baseURL = window.location.hostname;
var packageId = re.exec(scriptSrc.toLowerCase())[1];
const url = window.location.href.toLowerCase();
var userId;
var userguid = $('#userGuid').val()
var taskFiles = [];
var allFiles = [];
var sellerFields;
var packagePath = scriptSrc.replace("/scripts/users.js", "").trim();
var locationList = new Array();
var search_group = new L.LayerGroup();
var country = getCountry();


var isoCountries = {
    'AF' : 'Afghanistan',
    'AX' : 'Aland Islands',
    'AL' : 'Albania',
    'DZ' : 'Algeria',
    'AS' : 'American Samoa',
    'AD' : 'Andorra',
    'AO' : 'Angola',
    'AI' : 'Anguilla',
    'AQ' : 'Antarctica',
    'AG' : 'Antigua And Barbuda',
    'AR' : 'Argentina',
    'AM' : 'Armenia',
    'AW' : 'Aruba',
    'AU' : 'Australia',
    'AT' : 'Austria',
    'AZ' : 'Azerbaijan',
    'BS' : 'Bahamas',
    'BH' : 'Bahrain',
    'BD' : 'Bangladesh',
    'BB' : 'Barbados',
    'BY' : 'Belarus',
    'BE' : 'Belgium',
    'BZ' : 'Belize',
    'BJ' : 'Benin',
    'BM' : 'Bermuda',
    'BT' : 'Bhutan',
    'BO' : 'Bolivia',
    'BA' : 'Bosnia And Herzegovina',
    'BW' : 'Botswana',
    'BV' : 'Bouvet Island',
    'BR' : 'Brazil',
    'IO' : 'British Indian Ocean Territory',
    'BN' : 'Brunei Darussalam',
    'BG' : 'Bulgaria',
    'BF' : 'Burkina Faso',
    'BI' : 'Burundi',
    'KH' : 'Cambodia',
    'CM' : 'Cameroon',
    'CA' : 'Canada',
    'CV' : 'Cape Verde',
    'KY' : 'Cayman Islands',
    'CF' : 'Central African Republic',
    'TD' : 'Chad',
    'CL' : 'Chile',
    'CN' : 'China',
    'CX' : 'Christmas Island',
    'CC' : 'Cocos (Keeling) Islands',
    'CO' : 'Colombia',
    'KM' : 'Comoros',
    'CG' : 'Congo',
    'CD' : 'Congo, Democratic Republic',
    'CK' : 'Cook Islands',
    'CR' : 'Costa Rica',
    'CI' : 'Cote D\'Ivoire',
    'HR' : 'Croatia',
    'CU' : 'Cuba',
    'CY' : 'Cyprus',
    'CZ' : 'Czech Republic',
    'DK' : 'Denmark',
    'DJ' : 'Djibouti',
    'DM' : 'Dominica',
    'DO' : 'Dominican Republic',
    'EC' : 'Ecuador',
    'EG' : 'Egypt',
    'SV' : 'El Salvador',
    'GQ' : 'Equatorial Guinea',
    'ER' : 'Eritrea',
    'EE' : 'Estonia',
    'ET' : 'Ethiopia',
    'FK' : 'Falkland Islands (Malvinas)',
    'FO' : 'Faroe Islands',
    'FJ' : 'Fiji',
    'FI' : 'Finland',
    'FR' : 'France',
    'GF' : 'French Guiana',
    'PF' : 'French Polynesia',
    'TF' : 'French Southern Territories',
    'GA' : 'Gabon',
    'GM' : 'Gambia',
    'GE' : 'Georgia',
    'DE' : 'Germany',
    'GH' : 'Ghana',
    'GI' : 'Gibraltar',
    'GR' : 'Greece',
    'GL' : 'Greenland',
    'GD' : 'Grenada',
    'GP' : 'Guadeloupe',
    'GU' : 'Guam',
    'GT' : 'Guatemala',
    'GG' : 'Guernsey',
    'GN' : 'Guinea',
    'GW' : 'Guinea-Bissau',
    'GY' : 'Guyana',
    'HT' : 'Haiti',
    'HM' : 'Heard Island & Mcdonald Islands',
    'VA' : 'Holy See (Vatican City State)',
    'HN' : 'Honduras',
    'HK' : 'Hong Kong',
    'HU' : 'Hungary',
    'IS' : 'Iceland',
    'IN' : 'India',
    'ID' : 'Indonesia',
    'IR' : 'Iran, Islamic Republic Of',
    'IQ' : 'Iraq',
    'IE' : 'Ireland',
    'IM' : 'Isle Of Man',
    'IL' : 'Israel',
    'IT' : 'Italy',
    'JM' : 'Jamaica',
    'JP' : 'Japan',
    'JE' : 'Jersey',
    'JO' : 'Jordan',
    'KZ' : 'Kazakhstan',
    'KE' : 'Kenya',
    'KI' : 'Kiribati',
    'KR' : 'Korea',
    'KW' : 'Kuwait',
    'KG' : 'Kyrgyzstan',
    'LA' : 'Lao People\'s Democratic Republic',
    'LV' : 'Latvia',
    'LB' : 'Lebanon',
    'LS' : 'Lesotho',
    'LR' : 'Liberia',
    'LY' : 'Libyan Arab Jamahiriya',
    'LI' : 'Liechtenstein',
    'LT' : 'Lithuania',
    'LU' : 'Luxembourg',
    'MO' : 'Macao',
    'MK' : 'Macedonia',
    'MG' : 'Madagascar',
    'MW' : 'Malawi',
    'MY' : 'Malaysia',
    'MV' : 'Maldives',
    'ML' : 'Mali',
    'MT' : 'Malta',
    'MH' : 'Marshall Islands',
    'MQ' : 'Martinique',
    'MR' : 'Mauritania',
    'MU' : 'Mauritius',
    'YT' : 'Mayotte',
    'MX' : 'Mexico',
    'FM' : 'Micronesia, Federated States Of',
    'MD' : 'Moldova',
    'MC' : 'Monaco',
    'MN' : 'Mongolia',
    'ME' : 'Montenegro',
    'MS' : 'Montserrat',
    'MA' : 'Morocco',
    'MZ' : 'Mozambique',
    'MM' : 'Myanmar',
    'NA' : 'Namibia',
    'NR' : 'Nauru',
    'NP' : 'Nepal',
    'NL' : 'Netherlands',
    'AN' : 'Netherlands Antilles',
    'NC' : 'New Caledonia',
    'NZ' : 'New Zealand',
    'NI' : 'Nicaragua',
    'NE' : 'Niger',
    'NG' : 'Nigeria',
    'NU' : 'Niue',
    'NF' : 'Norfolk Island',
    'MP' : 'Northern Mariana Islands',
    'NO' : 'Norway',
    'OM' : 'Oman',
    'PK' : 'Pakistan',
    'PW' : 'Palau',
    'PS' : 'Palestinian Territory, Occupied',
    'PA' : 'Panama',
    'PG' : 'Papua New Guinea',
    'PY' : 'Paraguay',
    'PE' : 'Peru',
    'PH' : 'Philippines',
    'PN' : 'Pitcairn',
    'PL' : 'Poland',
    'PT' : 'Portugal',
    'PR' : 'Puerto Rico',
    'QA' : 'Qatar',
    'RE' : 'Reunion',
    'RO' : 'Romania',
    'RU' : 'Russian Federation',
    'RW' : 'Rwanda',
    'BL' : 'Saint Barthelemy',
    'SH' : 'Saint Helena',
    'KN' : 'Saint Kitts And Nevis',
    'LC' : 'Saint Lucia',
    'MF' : 'Saint Martin',
    'PM' : 'Saint Pierre And Miquelon',
    'VC' : 'Saint Vincent And Grenadines',
    'WS' : 'Samoa',
    'SM' : 'San Marino',
    'ST' : 'Sao Tome And Principe',
    'SA' : 'Saudi Arabia',
    'SN' : 'Senegal',
    'RS' : 'Serbia',
    'SC' : 'Seychelles',
    'SL' : 'Sierra Leone',
    'SG' : 'Singapore',
    'SK' : 'Slovakia',
    'SI' : 'Slovenia',
    'SB' : 'Solomon Islands',
    'SO' : 'Somalia',
    'ZA' : 'South Africa',
    'GS' : 'South Georgia And Sandwich Isl.',
    'ES' : 'Spain',
    'LK' : 'Sri Lanka',
    'SD' : 'Sudan',
    'SR' : 'Suriname',
    'SJ' : 'Svalbard And Jan Mayen',
    'SZ' : 'Swaziland',
    'SE' : 'Sweden',
    'CH' : 'Switzerland',
    'SY' : 'Syrian Arab Republic',
    'TW' : 'Taiwan',
    'TJ' : 'Tajikistan',
    'TZ' : 'Tanzania',
    'TH' : 'Thailand',
    'TL' : 'Timor-Leste',
    'TG' : 'Togo',
    'TK' : 'Tokelau',
    'TO' : 'Tonga',
    'TT' : 'Trinidad And Tobago',
    'TN' : 'Tunisia',
    'TR' : 'Turkey',
    'TM' : 'Turkmenistan',
    'TC' : 'Turks And Caicos Islands',
    'TV' : 'Tuvalu',
    'UG' : 'Uganda',
    'UA' : 'Ukraine',
    'AE' : 'United Arab Emirates',
    'GB' : 'United Kingdom',
    'US' : 'United States',
    'UM' : 'United States Outlying Islands',
    'UY' : 'Uruguay',
    'UZ' : 'Uzbekistan',
    'VU' : 'Vanuatu',
    'VE' : 'Venezuela',
    'VN' : 'Viet Nam',
    'VG' : 'Virgin Islands, British',
    'VI' : 'Virgin Islands, U.S.',
    'WF' : 'Wallis And Futuna',
    'EH' : 'Western Sahara',
    'YE' : 'Yemen',
    'ZM' : 'Zambia',
    'ZW' : 'Zimbabwe'
};

function getCountryName (countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
}

 function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function getCookie(name){
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}  
function waitForElement(elementPath, callBack)
{
  window.setTimeout(function ()
  {
    if ($(elementPath).length) {
      callBack(elementPath, $(elementPath));
    } else {
      waitForElement(elementPath, callBack);
    }
  }, 500);
}

 function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
        }    
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
 function completeOnboarding(code)
        {
            var apiUrl = packagePath + '/stripe_auth.php';
            var data = { code };
            $.ajax({
                url: apiUrl,
                method: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (response)
                {
                    var response= $.parseJSON(response);
                    
                    console.log({ response })
                   //   $("#BtnStripeLinked").click(function(){
                    $("#BtnStripeLinked").removeClass("error-con");
                    localStorage.setItem("stripe-onboarded", "true");
                    localStorage.setItem("stripe_acc_id", response.access_token);
                    
                
                     $("#StripeSellerPayment").text("").css("color", "#000");

                     var imageUrl =  
                        protocol +
                        baseURL  +
                        "/user/plugins/" +
                        packageId +
                        "/images/done.svg";

                    var warning = $('#BtnStripeLinked').parent().siblings('.verified').find('.img-payment-warning');

                    var warningspan = $('#BtnStripeLinked').parent().siblings('.verified').find('span');

                    warning.css({'background': 'url(' + imageUrl + ')no-repeat', 'background-color': '#ff5a60', 'border-radius' : '30px', 'width': '30px', 'height' : '30px', 'margin-top': '5px' } );

                    warningspan.text("Verified").css('color', '#ff5a60');

                    $('#BtnStripeLinked').parents(".seller-payment-container").find("span.stripe").css({'width': 'Calc(100% - 40px)', 'line-height' : '40px'});

                    


                    

                   
                // });

                },
                error: function error(e)
                {
                    
                }
                
            })
}

 function getCountry()
{ 
    var apiUrl = '/api/v2/marketplaces'
    $.ajax({
        url: apiUrl,
        method: 'GET',
        contentType: 'application/json',
            headers: {
            "Content-Type": "application/json"
            },
        
        success: function (result)
        {
            if (result) {

             country =  getCountryName(result.CountryCode);
            }
        }
    });


  //  })
    
    

}

//retrieve dynamic fields
waitForElement('.tab-content', function ()
{
sellerFields = new Vue({
    el: ".freelancer-content-main",

    data()
    {
        return {
            allSellerFields: [],
            totalTabs: 0,
            fieldDetails: [],
            taskOption: [],
            freelancerId: '',
            uploadCustomFields: [],
            url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_form?sort=ModifiedDateTime`,
            registrationStatus: 'Pending',
            confirmed: '',
            adminComment: '',
            companyName: '',
            address: '',
            country: '',
            state: '',
            city: '',
            postalCode: '',
            telephone: '',
            isEdit: 0,
            allTabs: [],
            allFreelancerCustomDetails: {},

        }
    },
    methods: {

        async getAllSellerFields()
        {
            try {
                vm = this;
                const response = await axios({
                    method: "GET",
                    url: vm.url,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const details = await response
                vm.allJobDetails = details.data
                vm.fieldDetails = vm.allJobDetails.Records
                vm.uploadCustomFields = vm.allJobDetails.Records.filter((field) => field.type_of_field === 'file')
                console.log(vm.uploadCustomFields)
                if ($('#userGuid').length != 0) {
                    vm.getUserDetails();
                }
               // vm.taskOption = $.parseJSON(vm.jobDetails[0].values);
                
            } catch (error) {
                console.log("error", error);
            }

            
        },

        async getUserDetails()
        {
            vm = this;
            var data = [{ 'Name': 'user_id', 'Operator': "equal", "Value": $('#userGuid').val() }]
                
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
                        vm.isEdit = 1;
                        vm.freelancerId = userDetails['Id'];
                        vm.adminComment = userDetails['admin_comment']
                        vm.registrationStatus = userDetails['status']
                        vm.confirmed =  userDetails['approved_confirmed']
                        $('.comment-desc').text(vm.adminComment);

                        $('.nav-tabs li:nth-child(1)').removeClass('active');
                       // $('.nav-tabs #verification-tab').addClass('active');
                        $('#registration').removeClass('active in');
                        if (vm.registrationStatus == 'Approved' && vm.confirmed == null) {
                            $('#verification-details .btn-jobform-outline').hide();
                            $('.nav-tabs #approval-tab').addClass('active');
                            $('.nav-tabs #verification').removeClass('active');
                            $('#approval').addClass('active in'); 
                        } else if (vm.registrationStatus == 'Approved' && vm.confirmed == '1') {
                              $('#verification-details .btn-jobform-outline').hide();
                            $('.nav-tabs li:nth-child(2)').addClass('active');
                            $('.tab-content div:nth-child(2)').addClass('active in');
                            $("input[name='Company Name']").val(userDetails['company_name'])
                            $("input[name='address']").val(userDetails['full_address']);
                            $("input[name='Contact Number']").val(userDetails['contact_number']);
                            $("input[name='location_details']").val(userDetails['servicing_area']);
                             $('#postal_code').val( userDetails['postal_code']);
                        }
                        else if (vm.registrationStatus == 'Rejected') {

                            console.log('rejected')
                                $('.nav-tabs li:nth-child(2)').addClass('active');
                             $('.tab-content div:nth-child(2)').addClass('active in');
                            $("input[name='Company Name']").val(userDetails['company_name'])
                            $("input[name='address']").val(userDetails['full_address']);
                            $("input[name='Contact Number']").val(userDetails['contact_number']);
                            $("input[name='location_details']").val(userDetails['servicing_area']);
                             $('#postal_code').val( userDetails['postal_code']);
                        }
                        
                        else {
                            $('#verification').addClass('active in');
                        }
                       
                        //hide the back to registration button
                        $('#verification-details .btn-jobform-outline').hide();

                        $('#company-name').val(userDetails['company_name'])
                        $('#address').val(userDetails['full_address']);
                        $('#city').val( userDetails['city']);
                        $('#state').val( userDetails['state']);
                        $('#country').val(userDetails['country']);
                        $('#postal_code').val( userDetails['postal_code']);
                        $('#phone').val(userDetails['contact_number']);

                        //files 
                        var files = JSON.parse(userDetails['attached_files']);
                        console.log({ files });

                        // files.forEach(function (file, i)
                        // {
                        //     file['files'].forEach(function (filename, i)
                        //     {
                        //         $('.table-document tbody').append(`<tr>
                        //         <td class="action-icondelete"><a class="delete-cat" href="javascript:void(0)"><i class="icon icon-ndelete"></i></a></td>
                        //         <td>${filename['name']}</td>
                        //         <td><div class="text-right document-action"><a href="${filename['URL']}">View</a>|<a href="${filename['URL']}">Download</a></div></td>
                        //         </tr>`);
                        //     })
                        // })
                    }
            
                
            
                }
            
            
            })
 
        },

        async getAllTabs()
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
                    vm.totalTabs = tabs.data.TotalRecords;
                    var classes = ""; 
                    var backbutton = "";
                    console.log(vm.allTabs);
                    
                    $.each(vm.allTabs, function (index, tab)
                    {  
                        if (tab.sort_order == 0) {
                           classes = "tab-pane fade";
                            
                        } else {
                            classes = "tab-pane fade";
                            backbutton =  `<button onclick="j_prevTab();" class="btn btn-jobform-outline">Back</button>`
                        }

                         //if last tab, text is Save, else, Next
                        var buttonText = vm.totalTabs == (index + 1) ? $('#button-text').val() : 'Next'
                        var buttonId = vm.totalTabs == (index + 1) ? 'save' : ""
                        console.log( `${vm.totalTabs}  ${(index + 1)}` )
                        $(".tab-content").append(`
                        
                             <div id="${tab.Id}" class="${classes}"
                             classification-name="${tab.tab_name}">
                              ${backbutton}
                            <div class="jobform-form">
                            <h3>${tab.tab_name}</h3>
                             <hr>
                               <div class="next-tab-area"><span class="seller-btn"> <a onclick="j_nextTab();"
                                class="my-btn btn-red" href="javascript:void(0);" id="${buttonId}">${ buttonText }</a> </span></div>
                                </div>
                            </div>

                         `)
                          $(".my-btn").css({ padding: "0px" });
                          $(".fancy-checkbox label span").css({height: "0px"});
                        
                        vm.getAllFields(tab.Id, tab.tab_name)


                        if (vm.totalTabs == (index + 1)) {
                           var paymentTab =  `<div id="payment-acceptance" class="tab-pane fade default">
                        <button onclick="j_prevTab();" class="btn btn-jobform-outline">Back</button>
                        <div class="jobform-form">
                           <h3>Payment Acceptance</h3>
                              <div class="seller-common-box pull-left" id="PaymentListSec">
                                 <div class="item-form-group">
                                    <div class="seller-setting-p">
                                       <p>
                                          <b>
                                          Payment Method
                                          </b>
                                       </p>
                                       <p>
                                          Select your preferred payment method.
                                       </p>
                                    </div>
                                    <div class="col-md-12 seller-payment-container">
                                       <div class="col-xs-12 col-sm-3 col-md-3">
                                          <div class="type-payment payment-stripe">
                                          </div>
                                       </div>
                                       <div class="col-xs-12 col-sm-4 col-md-4">
                                          <div class="payment-input" id="StripeSellerPayment" placeholder="Email Address">
                                             No account linked
                                          </div>
                                       </div>

                                       <div class="col-xs-12 col-sm-5 col-md-5">
                                          <div class="col-xs-12 col-sm-12 col-md-12">
                                             <div class="btn-link-payment" id="BtnStripeLinked">
                                                Link Account
                                             </div>
                                          </div>
                                          <div class="col-xs-12 col-sm-12 col-md-12">
                                             <div class="img-payment-warning">
                                             </div>
                                             <span class="stripe">
                                             This payment method is compulsory.
                                             </span>
                                          </div>
                                       </div>

                                       
                                    </div>
                                    
                                    <div class="col-md-12 seller-payment-container">
                                       <div class="col-xs-12 col-sm-3 col-md-3">
                                          <div class="pay-getway-logo-txt">
                                             Cash on Delivery
                                          </div>
                                       </div>
                                       <div class="col-xs-12 col-sm-4 col-md-4">
                                          <div class="payment-input" id="CashOnDeliveryPayment">
                                             No account linked
                                          </div>
                                       </div>
                                       <div class="col-xs-12 col-sm-5 col-md-5">
                                          <div class="col-xs-12 col-sm-12 col-md-12">
                                             <div class="btn-link-payment" data-verify="false" id="BtnCashDelivery" onclick="AddPaymentCashOnDelivery(this)">
                                                Link Account
                                             </div>
                                          </div>
                                          <div class="col-xs-12 col-sm-12 col-md-12 verified">
                                             <div class="img-payment-warning">
                                             </div>
                                             <span class="paycashdelivery">
                                             This payment method is compulsory.
                                             </span>
                                          </div>
                                       </div>
                                       
                                    </div>
                        
                                 </div>
                              </div>
                         
                           <hr>
                            <div class="next-tab-area"><span class="seller-btn"> <a onclick="j_nextTab();" class="my-btn btn-red" href="javascript:void(0);">Next</a> </span></div>
                        </div>
                            </div>
                            
                            
                            <div id="verification" class="tab-pane fade default">
                        <button onclick="j_prevTab();" class="btn btn-jobform-outline">Back</button>
                        <div class="jobform-form">
                           <h3>Verification</h3>

                           <div class="verification-box"><p>Waiting for verification.<br>We are currently assessing the data you have filled in.</p></div>
                           <div class="form-group">
                              <label for="comments">Additional admin comments:</label>
                              <div class="comment-desc"></div>
                           </div>
                           <hr>
                            
                        </div>
                     </div>
                    <div id="approval" class="tab-pane fade default">
                        <button onclick="j_prevTab();" class="btn btn-jobform-outline">Back</button>
                        <div class="jobform-form">
                           <h3>Approval</h3>
                           <div class="form-group">
                              <label for="approval">Description</label>
                              <textarea class="form-control required" rows="5" name="approval" id="approval" placeholder=""></textarea>
                           </div>
                           <hr>
                           <div class="next-tab-area" id="start"><span class="seller-btn"> <a onclick="j_nextTab();" class="my-btn btn-red" href="javascript:void(0);">Start</a> </span></div>
                        </div>
                     </div>
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            `


                            

                            $(".tab-content").append(paymentTab);     
                            $(".my-btn").css({ padding: "0px" });
                            
                        
                        }


                    
                    })

                  


                    

    
                } catch (error) {
                    console.log("error", error);
                }
        },

        async getAllFields(tabId,tabName)
         {
                vm = this;
                var data = [{ 'Name': 'classification', 'Operator': "equal", "Value": tabId }]
            
                
            $.ajax({
                method: "POST",
                url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_form?sort=-sort_order/`,
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
                        const fieldDetails = fields.sort(GetSortOrder("sort_order"));
                        
                        $.each(fieldDetails, function (index, field)
                        {
                            fieldName = field.name,
                            fieldText =  field.text,
                                fieldType = field.type_of_field,
                                fieldId = field.Id
                            fieldRequired = field.is_required;
                            fieldPlaceholder = field.placeholder;

                            var isrequired = fieldRequired == 'True' ? 'required' : "";
                            var customFieldInput = '';
                            switch (fieldType) {
                                case 'search':

                                    customFieldInput = `<div class="search-abn">
                                <input type="search" class="form-control search" name="${fieldName}"
                                    placeholder="${field.placeholder}">
                                <button><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg></button>
                                </div>`
                                    break;
                                
                                case 'textfield':
                            
                                    customFieldInput = `<div class="form-group custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}"> <label for=${fieldId}>${fieldText}</label>  <input type="text" class="form-control ${isrequired}" name="${fieldName}"id="${fieldName}" placeholder="${fieldPlaceholder}"></div>`
                                    break;
                               
                                case 'dropdown':
                                    let options;
                                   
                                    $.each(JSON.parse(field.values), function (index, option)
                                    {
                                        options += `<option name='${option}' value="${option}">${option}</option>`
                                    });
                                    customFieldInput = `<div class="form-group custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}"> <label for=${fieldId}>${fieldText}</label> <select id="${fieldId}" class="form-control ${isrequired}"  name="${fieldName}" id="${fieldName}" type="dropdown">
                                      ${options}
                                    </select> </div>`;
                                    break;
                                       
                                case 'checkbox':
                                    isrequired  = isrequired == 'required' ? 'req-chkbx' : '';
                                    let chkoptions = '';
                                    $.each(JSON.parse(field.values), function (index, option)
                                    {
                                        chkoptions += `<div class="fancy-checkbox checkbox-sm ">
                                        <input type="checkbox" id="${option}" name="${fieldId}">
                                        <label for="${option}"><span>${option}</span>
                                        </label>  </div>`
                                    });
                                    customFieldInput = `<div class="form-group custom-fancyjb custom-details ${isrequired}" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}"> 
                                    <label for=${fieldId}>${fieldText}</label>    
                                    ${chkoptions}
                                    </div>`;
                                    break;

                                case 'radiobutton':
                                    let radioOptions = '';
                                    $.each(JSON.parse(field.values), function (index, option)
                                    {
                                        radioOptions += `<div class="fancy-radio radio-sm ${isrequired}">
                                        <input type="radio" id="${option}" name="${option}">
                                        <label for="${option}"><span>${option}</span>
                                        </label>  </div>`
                                    });
                                    customFieldInput = `<div class="custom-fancyjb custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}"> 
                                    <label for=${fieldId}>${fieldText}</label>    
                                    ${radioOptions}
                                    </div>`;

                                    break;
                                
                                case 'number':
                            
                                    customFieldInput = `<div class="form-group custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}"> <label for=${fieldId}>${fieldText}</label>  <input type="number" class="form-control ${isrequired}" name="${fieldName}"id="${fieldName}" placeholder="${fieldPlaceholder}"></div>`
                                    break;
                               
                                case 'datepicker':

                                    customFieldInput = `<div class="form-group custom-details" id="${fieldId}" custom-name="${fieldName}"  custom-type="${fieldType}"><label for=${fieldId}>${fieldText}</label><input type="text" class="form-control datepicker ${isrequired}" name="${fieldName}" id="${fieldName}" placeholder="DD/MM/YYYY"> </div>`
                                    jQuery('.datepicker').datetimepicker({
                                        viewMode: 'days',
                                        format: 'DD/MM/YYYY'
                                    });
                                    break;
                                
                                case 'textarea':
                                    
                                    customFieldInput = `<div class="form-group custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}">
                                   <label for=${fieldId}>${fieldText}</label>
                                    <textarea class="form-control ${isrequired}" name="${fieldName}" id="${fieldName}" rows="5" placeholder="${fieldPlaceholder}"></textarea>
                                    </div>`
                                    break;
                               
                                case 'checkconfirm':

                                    customFieldInput = `<div class="form-group custom-fancyjb custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}">
                                    <div class="fancy-checkbox checkbox-sm">
                                        <input type="checkbox" name="${fieldId}" id="${fieldName}" class="${isrequired}">
                                         <label for=${fieldId}>${fieldText}</label>
                                    </div>
                                    </div>`
                                    break;
                            
                                case 'file':

                                    customFieldInput = `<div class="form-group custom-details" id="${fieldId}" custom-name="${fieldName}" custom-type="${fieldType}">
                                        <div class="custom-fancyjb">
                                            <div class="fancy-checkbox checkbox-sm">
                                                <input type="checkbox" checked="checked" name="${fieldName}"
                                                    id="${fieldId}">
                                                <label for="${fieldId}"><span> ${fieldText}
                                                    </span></label>
                                            </div>
                                        </div>

                                        <div class="driver_license_director_input">
                                            <div class="form-group">
                                                <label>Upload Documents</label>
                                                <div class="browse-control">
                                                    <a class="model-btn">
                                                        <input type="text" class="form-control" value="">
                                                        <div class="browse-btn">
                                                            <input type="file" value="Browse..."
                                                                onchange="readURL(this);" id="uploads"
                                                                upload-name="${fieldName}" class="${isrequired}">
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
                                    </div>`
                                    break;
                                
                                case 'note':

                                    customFieldInput = `<div class="jobform-note">
                                    <p><u>Note</u></p>
                                    <p>${fieldText}</p> 
                                    <p></p>
                                </div>`
                                    break;
                                   
                                case 'location':
                                    customFieldInput = `<div class="btn-hbox custom-fancyjb cdflex">
                       
                              <div class="fancy-radio radio-sm">
                                 <input type="radio" name="remote_work" id="remote_work" value="0" checked="">
                                 <label for="remote_work"><span>Remote Work</span></label>
                              </div>
                              <div class="fancy-radio radio-sm">
                                 <input type="radio" name="remote_work" id="in_person_work" value="1">
                                 <label for="in_person_work"><span>In-Person Work</span></label>
                              </div>
                           </div>
                            <div class="form-group">
                                    <label for="location_details">Servicing Area</label>
                                    <input type="text" class="form-control" name="location_details" id="location_details" onfocusout="codeAddress_servicing()" onchange="codeAddress_servicing()" placeholder="" value="">
                            </div>

                            <div class="location-map-hide-show" style="display: none;">
                            
                            <div class="mapcontainer">
                                <div id="map">
                               
                                </div>
                            </div>

                            </div>`
                                    break;
                                
                            case 'address-fields':
                                     customFieldInput = `<div class="form-group">
                              <label for="address">Address</label>
                              <input type="text" class="form-control required" name="address" id="address" onfocusout="codeAddress()" placeholder="">
                           </div>
                           <div class="form-group">
                              <label for="country">Country</label>
                              <input type ="text" class="form-control" name="country" id="country" value="${country}">
                               
                           </div>
                           <div class="form-group">
                              <label for="state">State</label>
                              <input type="text" class="form-control required" name="state" id="state" placeholder="">
                           </div>
                           <div class="form-group">
                              <label for="city">City</label>
                              <input type="text" class="form-control required" name="city" id="city" placeholder="">
                           </div>
                           <div class="form-group">
                              <label for="postal_code">Postal Code</label>
                              <input type="text" class="form-control required" name="postal_code" id="postal_code" placeholder="">
                           </div>
                           <div class="form-group">`
                            }
                            
                            var customField = `
                                ${customFieldInput}
                            `
                        
                            $(`.tab-content #${tabId} .jobform-form hr`).before(customField)



                        })


                      

                        
                        
                    }
                   

                }
            
            
            })
        },

        //method used
        async  saveUser(cf,location,files)
        {
           // customfield_data, $('#location').val(), allFiles
            vm = this;
            var user_details = {

                "user_id": localStorage.getItem('userID'),
                "custom_fields": cf,
                "servicing_area": location,
                'location_coordinates': JSON.stringify(Array($('#address-lat').val(), $('#address-long').val())),
                'servicing_coords': JSON.stringify(Array($('#servicing-lat').val(), $('#servicing-long').val())),
                "status": "Pending",
                'files': JSON.stringify(taskFiles),
                'stripe_key': localStorage.getItem('stripe_acc_id'),
                'is_payment_onboarded': localStorage.getItem('stripe_acc_id') == null ? false : true,

                 
                'full_address': `${$('#address').val()} ${$('#city').val()}  ${$('#country').val()} ${$('#state').val()}`,
                'email': $('#email').val(),
                'company_name': $("input[name='Company Name']").val(), //$('#company-name').val(),
                'country': $('#country').val(),
                'state': $('#state').val(),
                'city': $('#city').val(),
                'postal-code': $('#postal_code').val(),
                'contact-number': $("input[name='Contact Number']").val(),
                'userguid': $("#userGuid").val(),
                
                'action': vm.isEdit == 1 ? 'edit' : 'add',
                'freelancer_id': vm.freelancerId,
                'current-status': vm.registrationStatus
               
                
            };
        
            console.log(user_details);
            var settings = {
                "url": packagePath + "/save_user.php",
                "method": "POST",
                "data": JSON.stringify(user_details)
            }
            $.ajax(settings).done(function (response)
            {
                localStorage.removeItem("userID");
                localStorage.removeItem("stripe-onboarded");
                localStorage.removeItem("fieldValues");
                $('#verification .btn-jobform-outline').hide();


                
                if (vm.isEdit == 1) {
               

                    window.location.href = "/";
                
                } 


                
               // var allresponse = $.parseJSON(response)
               // console.log($.parseJSON(response));
               // localStorage.setItem("jobID", allresponse.Id);
        
        
             
            });
        
        },
        //save/ edit method used
        async getAllFieldData(el)
        {
             vm = this;
             el.find('.tab-pane:not(.default)').each(function ()
             {
                 var tabData = [];
                 var $this = $(this);
                 var customValue;
                 $(this).find('.custom-details').each(function ()
                      
                 {
                     switch ($(this).attr('custom-type')) {
                        
                         case 'textfield':
                             customValue = $(this).find('input').val();
                             break;
                         case 'number':
                            customValue = $(this).find('input').val();
                             break;
                         case 'datepicker': 
                            customValue = $(this).find('input').val();
                             break;
                         case 'textarea': 
                            customValue = $(this).find('textarea').val();
                             break;
                         case 'dropdown': 
                            customValue = $(this).find('select').val();
                             break;
                         case 'radiobutton': 
                            customValue = $(this).find("input:checked").attr('name');
                             break;
                         case 'checkbox': 
                            var checkvalues = [];
                            $(this).find('input:checkbox').each(function() 
                            {    
                                if($(this).is(':checked'))
                                checkvalues.push($(this).attr('id'));
                            });
                            customValue = checkvalues;
                             break;
                         
                         case 'checkconfirm': 
                            var checkvalues = [];
                            $(this).find('input:checkbox').each(function() 
                            {    
                                if($(this).is(':checked'))
                                checkvalues.push($(this).attr('id'));
                            });
                            customValue = checkvalues;
                             break;

                    }


                     tabData.push({ 'tab_name': $this.attr('classification-name'), 'customfield_id': $(this).attr('id'), 'customfield_name' : $(this).attr('custom-name'), 'values' : customValue})
                 })

                 vm.allFreelancerCustomDetails[$(this).attr('id')] = tabData;   
            })
            console.log(`${JSON.stringify(vm.allFreelancerCustomDetails)}`)
            
            localStorage.setItem("fieldValues", JSON.stringify(vm.allFreelancerCustomDetails));
            this.saveUser(vm.allFreelancerCustomDetails, $('#location_details').val(), allFiles);


    
        }, 
          
        async getLocations(){

                 try {
                     vm = this;
                     const response = await axios({
                         method: "GET",
                         url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_locations`,
                         // data: data,
                         headers: {
                             'Authorization': `Bearer ${token}`
                         }
                     })
                     const locations = await response
                   
                    
                     $.each(locations.data.Records, function (index, coords)
                     {
                         var location_list = JSON.parse(coords['location_list'])

                         $.each(location_list, function (index, loc)
                         {

                             console.log({loc})
                             var clickPositionMarker = L.marker([loc['lat'], loc['lng']], {
                                    color: 'red',
                                    fillColor: '#f03',
                                    fillOpacity: 0.5,
                                    radius: 500
                                });

                            clickPositionMarker.addTo(search_group).bindPopup(coords['job_id'])
                                    .openPopup();

                            
                         })
                     })

                    

    
                 } catch (error) {
                     console.log("error", error);
                 }
        },

        async getNearestLocations(currentLat, currentLng, distInKm)
        {
             try {
                     vm = this;
                     const response = await axios({
                         method: "GET",
                         url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_locations`,
                     })
                     const locations = await response
                   
                     $.each(locations.data.Records, function (index, coords)
                     {
                         var location_list = JSON.parse(coords['location_list'])

                         $.each(location_list, function (index, loc)
                         {

                            if (distanceBetweenTwoPlace(currentLat, currentLng, loc['lat'], loc['lng'], "K") <= distInKm) {
                                console.log( coords['job_id']);
                            }

                            
                         })
                     })

            
            } catch (error) {
                console.log("error", error);
            }
        },
        

    },

    filters: {
        capitalize: function (str)
        {
          return str.charAt(0).toUpperCase() + str.slice(1);
        },

        hypenate : function (str)
        {
          return str.replace(" ","-").toLowerCase();
        },
      },
    beforeMount() {
        this.getAllTabs()
    },

    mounted() {
       // this.currentTime = 3;
    
        this.$nextTick(() => {
            this.getAllSellerFields()
            
           // this.getUserDetails();
        });
      }
})

})

//payment methods


waitForElement('#payment-acceptance', function ()
{
payments = new Vue({
    el: "#payment-acceptance",

    data()
    {
        return {
            stripeSecretKey: "",
            stripePubKey: "",
            stripeClientId: "",
            stripeOnboardingLink: ""

        }
    },
    methods: {
        async getAuthorizeToken(callback)
        {
            var apiUrl = packagePath + '/get_token.php';
            
            $.ajax({
                url: apiUrl,
                method: 'POST',
                
                contentType: 'application/json',
                success: function (response)
                {
                    var adminToken = $.parseJSON(response);
                    
                    callback(adminToken['token']['access_token']);

                },
                error: function error(e)
                {
                    
                }
                
            })
        },

        async getCustomFields(callback)
        { 

            vm = this;
            this.getAuthorizeToken(function (result)
            {
                var token = result;
            var apiUrl = '/api/v2/marketplaces'
            $.ajax({
                url: apiUrl,
                method: 'GET',
                contentType: 'application/json',
                    headers: {
                    "Content-Type": "application/json"
                    },
                beforeSend: function beforeSend(xhr)
                {
                    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
                },
                success: function (result)
                {
                    if (result) {
                        callback(result.CustomFields);
                    }
                }
            });


            })
            
            
        
        },

        async getStripeRedirectLink()
        {
            	this.getCustomFields(function (result)
				{   vm = this;
					var client_id;
					if (result) {
						$.each(result, function (index, cf)
						{
							if (cf.Name == 'stripe_client_id') {
								code = cf.Code;
								client_id = cf.Values[0];
                                
                                this.stripeOnboardingLink = `https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=${client_id}&&redirect_uri=${baseURL}/subscribe?redirect=true`
                                window.location.href = this.stripeOnboardingLink;
							}
	
						})
			
					}
					
				});	
        },

        

    },

    filters: {
        capitalize: function (str)
        {
          return str.charAt(0).toUpperCase() + str.slice(1);
        },

        hypenate : function (str)
        {
          return str.replace(" ","-").toLowerCase();
        },
      },
    beforeMount()
    {
      
    
    },

    mounted() {
       // this.currentTime = 3;
    
        this.$nextTick(() => {
           // this.getStripeRedirectLink()
           // this.getStripeRedirectLink();
           // this.getUserDetails();
        });
      }
})

})

//home page buyer
window.onload = function ()
{
    const jobDetails = new Vue({
        el: ".freelancer-content-main",

        data()
        {
            return {
                allJobs: [],
                url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_form?sort=ModifiedDateTime`

            }
        },
        methods: {

            async getAllJobs(action)
            {
                try {
                    vm = this;
                    const response = await axios({
                        method: action,
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_cache`,
                        // data: data,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const jobs = await response
                    vm.allJobs = jobs.data.Records

                    console.log(vm.allJobs);
                
                    // return templates

                } catch (error) {
                    console.log("error", error);
                }
            },


        },

        filters: {
            capitalize: function (str)
            {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },

            hypenate: function (str)
            {
                return str.replace(" ", "-").toLowerCase();
            },
        },
        beforeMount()
        {
            this.getAllJobs('GET')
          
        }

    })
    
}

var usersData = (function ()
  {
    var instance;
   
    var userToken, userId;

    function init()
    {
        function createUser(email, password, confPassword)
        {
            
            var apiUrl = packagePath + '/get_token.php';
            $.ajax({
                url: apiUrl,
                method: 'POST',
            
                contentType: 'application/json',
                // data: JSON.stringify(data),
                success: function (response)
                {
                    var adminToken = $.parseJSON(response);
                    var atoken = adminToken['token']['access_token'];
                   // console.log({ atoken })
                    uploadData = { 'Email': email, 'Password' : password, 'ConfirmPassword' : confPassword } 
                    var id = adminToken['id'];
                   // console.log({ id })
                    
                    console.log('data' + JSON.stringify(uploadData));
                    var url = `${protocol}//${baseURL}/api/v2/accounts/register`;
                    jQuery.ajax({
                    url: url,
                    data: JSON.stringify(uploadData),
                    cache: false,
                    contentType: false,
                    processData: false,
                    method: 'POST',
                    type: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                        },
                    beforeSend: function beforeSend(xhr)
                    {
                        xhr.setRequestHeader('Authorization', `Bearer ${atoken}`);
                    },
                    success: function success(result)
                    {
                        jQuery(".jobform-tab li.active").next('li').children('a').trigger('click');
                        $('#verification-details .btn-jobform-outline').hide()
                        $('#register-modal-consumer').hide();
                        $('#register-modal-seller').hide();
                        $('.cart-menu').hide();
                       // console.log(result);
                      //  console.log(result['access_token']);
                        userId = result['UserId'];
                        localStorage.setItem("userID", userId);
                        
                       
                        if (typeof successCallback === "function") {
                        if (result && result.length > 0) {
                    
                            // successCallback(result[0].SourceUrl);
                        } else {
                            //failedCallback(null);
                        }
                        }
                    },
                    error: function error(e)
                    {
                        if (typeof failedCallback === "function") {
                        failedCallback(e);
                        }
                        console.log(e.status)
                        console.log(e.responseText);
                        var res =  JSON.parse(e.responseText)
                        console.log(JSON.parse(e.responseText));
                        console.log(res['Message']);

                        if (res['Message'] == 'Username is already taken.') {
                            $('#email').addClass('error-con');
                            $('#email').after('<p class="warning-message">Email is already taken. </p>')
                        }

                        if (res['Message'] == 'The request is invalid.') {
                            console.log(Object.keys(res['ModelState']))
                        }
                        


                        //console.log(Object.values(e.responseText['ModelState']))
                       // toastr.error('An error occurred when saving event, please try again.', 'Oops!Something went wrong.');
                        return;
                    }
                    });

                
                }
            
            
            })
        
        }

        function saveUser(cf,location,files)
        {
           // customfield_data, $('#location').val(), allFiles
            var user_details = {

                "user_id": userId,
                "custom_fields": cf,
                "servicing_area": location,
                'location_coordinates': JSON.stringify(location),
                "status": "Pending",
                'files': JSON.stringify(allFiles),
                'stripe_key': localStorage.getItem('stripe_acc_id'),
                'is_payment_onboarded' : localStorage.getItem('stripe_acc_id') == null ? false : true,

                 
                'full_address': `${$('#address').val()} ${$('#city').val()}  ${$('#country').val()} ${$('#state').val()} ${$('#postal_code').val()}`,
                'email': $('#email').val(),
                'company_name': $('#company-name').val(),
                'country':  $('#country').val(),
                'state' :$('#state').val(),
                'city' : $('#city').val(),
                'postal-code': $('#postal-code').val(),
                'contact-number': $('#phone').val(),
                
            };
        
            console.log(user_details);
            var settings = {
                "url": packagePath + "/save_user.php",
                "method": "POST",
                "data": JSON.stringify(user_details)
            }
            $.ajax(settings).done(function(response){
                
               // var allresponse = $.parseJSON(response)
              //  console.log($.parseJSON(response));
               // localStorage.setItem("jobID", allresponse.Id);
                localStorage.removeItem("userID");
                localStorage.removeItem("stripe-onboarded");
                localStorage.removeItem("fieldValues");

             
            });
        
        }

        function getCustomFieldValues()
        {
            //get all the textfields and dropdowns
            customfield_data = [];
            checkbox_data = [];
           
            $('.custom-details').find(':input').not('.search').each(function ()
            {
                textfield_data = [];
     
                        if ($(this).attr('type') != "search" && $(this).attr('type') != "checkbox" && $(this).attr('type') != "hidden" ) {
                        // if ($(this).attr('type') != 'checkbox') {
                                let custom_code = $(this).attr('name');
                                let custom_value = $(this).val();
                                textfield_data.push(custom_value);

                                customfield_data.push({ 'code': custom_code, 'Values': textfield_data })
                        //  }
                        }
            });
            
           
            //for checkboxes
            $('.customcheckbox').each(function ()
            {
            let chkoptions = [];
            $(this).find(':checkbox:checked').each(function ()
            {
                console.log($(this).attr('data-name'));
                chkoptions.push($(this).attr('data-name'));
            });
            customfield_data.push({ 'code': $(this).attr('id'), 'Values': chkoptions });
            });

            
            console.log(customfield_data);
            allFiles[0]['files'] = taskFiles;
            console.log({ allFiles });
            saveUser(customfield_data, $('#location').val(), allFiles);
           // saveCustomFiedldValues(customfield_data);
        }
        function confirmRegistration()
        {
            var details = {

                "Id": $('#userGuid').val()
                
            };
    
            var settings = {
                "url": packagePath + "/update_confirmation.php",
                "method": "POST",
                "data": JSON.stringify(details)
            }
            $.ajax(settings).done(function(response){
                
                window.location.href = "/";
            
            });
    
        }

      
      return {
          createUser: createUser,
          saveUser: saveUser,
          getCustomFieldValues: getCustomFieldValues,
          confirmRegistration : confirmRegistration
     
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

var documentData = (function ()
  {
    var instance;
  //  var taskFiles = [];
    function init()
    {

        function getFile (category)       
        {   
            if ($("#uploads[type='file']") !== undefined && $("#uploads[type='file']") !== null && $("#uploads[type='file']").val() !== '') {

                totalfiles = document.getElementById('uploads').files.length;
                console.log({ totalfiles });

                var fileId =  Math.floor( Math.random() * 1000 ) + Date.now();
                var fileList = [];
                
                for (var index = 0; index < totalfiles; index++) {
    
                    fileList.push(document.getElementById('uploads').files[index])
                }
                
                fileList.forEach( function (file, i) {
                
                    sendFile(file, category, fileId);
                    console.log({ i });
                
                })
                allFiles.push({ "name": category, "files": ''})
 

            } 
        }

        function sendFile(file, category, fileId)
        {
            
            var apiUrl = packagePath + '/get_token.php';
            $.ajax({
                url: apiUrl,
                method: 'POST',
            
                contentType: 'application/json',
                // data: JSON.stringify(data),
                success: function (response)
                {
                    var adminToken = $.parseJSON(response);
                    var atoken = adminToken['token']['access_token'];
                    console.log({ atoken })
                    
                    var id = adminToken['id'];
                    console.log({ id })
                    
                    var data = new FormData();
                    data.set('file', file);

                    console.log('data' + JSON.stringify(data));
                    var url = '/api/v2/files/' +  id  + '/files/';
                    jQuery.ajax({
                    url: url,
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    method: 'POST',
                    type: 'POST',
                    beforeSend: function beforeSend(xhr)
                    {
                        xhr.setRequestHeader('Authorization', `Bearer ${atoken}`);
                    },
                    success: function success(result)
                    {
                        console.log(result);
                        taskFiles.push({ 'Id': fileId, 'URL': result[0]['SourceUrl'], 'name': category });
                        console.log({ taskFiles });

                        // allFiles.forEach(function (filename, i)
                        // {
                            $('.table-document tbody').append(`<tr id = ${fileId}>
                            <td class="action-icondelete"><a class="delete-cat" id="delete-file" href="javascript:void(0)"><i class="icon icon-ndelete"></i></a></td>
                            <td>${result[0]['Filename']}</td>
                            <td><div class="text-right document-action"><a href="${result[0]['SourceUrl']}">View</a>|<a href="${result[0]['SourceUrl']}">Download</a></div></td>
                            </tr>`);
                            
                        // })

                        // i == (totalfiles - 1) ? saveFiles("POST") : '';
                        

                        if (typeof successCallback === "function") {
                        if (result && result.length > 0) {
                    
                            // successCallback(result[0].SourceUrl);
                        } else {
                            //failedCallback(null);
                        }
                        }
                    },
                    error: function error(e)
                    {
                        if (typeof failedCallback === "function") {
                        failedCallback(e);
                        }

                        toastr.error('An error occurred when saving event, please try again.', 'Oops!Something went wrong.');
                        return;
                    }
                    });

                
                }
            
            
            })
        
        }


        function deleteFile(el)
        {
            
            var id = el.parents('tr').attr('id');

            console.log({id})
            
            taskFiles = taskFiles.filter((file) => file.Id !== parseInt(id));

            el.parents('tr').remove();

            console.log({ taskFiles });
        }



        async function saveFiles(action, jobID)
        {
        try {
            
            const defaultURL = `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_custom_task_cache/rows`
            
            url =  defaultURL;
            
            uploadData = { 'all_tasks': JSON.stringify(allTasks), 'jobID' : jobID}
            
            const response = await axios({

                method: action,
                url: url,
                data:  uploadData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const uploadedData = await response
        

            console.log({ uploadedData  });
            

        } catch (error) {
            console.log("error", error);
        }
        
        }
        
        function saveTask()
        {
            allTasks.push({ 'task_name': $('#job_name').val(), 'address': $('#work_done').val(), 'remote': $('.modal-content #remote')[0].checked, 'in_person': $('.modal-content #in-person')[0].checked, 'files': taskFiles })
            console.log({ allTasks });
            $("#file-doc[type='file']").val('');

            taskFiles = [];

            var last = allTasks[allTasks.length - 1];
            var index = allTasks.indexOf(last);
            console.log({ index })
            
            
            console.log({ last });
            console.log(last['task_name']);
            var filec = last['files']
            var fileCount =  filec.length
          //  console.log(fileCount.length);

            //append task details below
            var jobBox =  `<div class="job-main-box"><a href="javascript:void(0);" class="action"><i class="icon icon-ndelete"></i></a> <div class="job-desc"><p>${last['task_name']}</p> <p class="text-gray">${last['address']}</p></div> <a href="javascript:void(0);" class="no-off-file">No. of File: ${fileCount}</a></div> `

            $('.job-list-box').append(jobBox);

        }

      return {
        sendFile: sendFile,
        getFile: getFile,
        saveFiles: saveFiles,
        saveTask: saveTask,
        deleteFile:deleteFile
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




$(document).ready(function ()
{

    getCountry();
    //if the page refreshes and the user is already done on registration,
    // do not redirect it back to registration page and sign up again,
    //redirect it to verification or payment page if stripe redirection
   
    //stripe redirection
    if (url.indexOf('/subscribe?redirect=true&code=') >= 0) {

        var new_client_id = getParameterByName('code');
        completeOnboarding(new_client_id)

        waitForElement('#payment-acceptance', function ()
        {
            jQuery(".jobform-tab #payment-tab").children('a').trigger('click');
            jQuery(".tab-content #registration").removeClass('in active');
            jQuery(".tab-content #payment-acceptance").addClass('in active');


            var allCurrentFields = $.parseJSON(localStorage.getItem("fieldValues"));
            $.each(allCurrentFields, function (index, field)
            {
                $.each(field, function (index, fieldValue)
                {
                    console.log({ fieldValue })
                    console.log(fieldValue.customfield_id)
                    $(`#${fieldValue.customfield_id}`).find('input').val(fieldValue.values)
                    $(`#${fieldValue.customfield_id}`).find('textarea').val(fieldValue.values)
                    $(`#${fieldValue.customfield_id}`).find('input').val(parseInt(fieldValue.values))
                })
                            
            })
           
        })
        
        

    } else {
           waitForElement('#payment-acceptance', function ()
        {
            var currentFreelancerId = localStorage.getItem("userID");
            console.log({ currentFreelancerId });
            if (currentFreelancerId != null) {
                //redirect back to page not registration tab
                jQuery(".jobform-tab #registration-tab").next('li').children('a').trigger('click');
                jQuery(".tab-content #registration").removeClass('in active')
                jQuery(".tab-content .tab-pane:nth-child(2)").addClass('in active');
                // jQuery(".tab-content #registration").next('.tab-pane').addClass('in');
                // jQuery(".tab-content #registration").next('.tab-pane').addClass('active');
            }
            
          
          //reload all the existing fields from the local storage

          var allCurrentFields = $.parseJSON(localStorage.getItem("fieldValues"));
          $.each(allCurrentFields, function (index, field)
          {
              $.each(field, function (index, fieldValue)
              {
                  console.log({ fieldValue })
                   console.log( fieldValue.customfield_id )
                  $(`#${fieldValue.customfield_id}`).find('input').val(fieldValue.values)
                  $(`#${fieldValue.customfield_id}`).find('textarea').val(fieldValue.values)
                  $(`#${fieldValue.customfield_id}`).find('input').val(parseInt(fieldValue.values))
              })
             
          })


        })
    }


    //seller registration button 
    $('#register-modal-seller').hide();
    $('.cart-menu').hide();
    $(".my-btn").css({ padding: "0px" });
    $('body').append('<input type ="hidden" id="location">');
    
    $('body').on('click', '.btn-register', function ()
    {
        console.log('button register');
        $('#email').removeClass('error-con');
        $('#password').removeClass('error-con');
        $('#retype_password').removeClass('error-con');

        if ($('#email').val() == "" && $('#password').val() == "" && $('#retype_password').val() == "") {
            $('#email').addClass('error-con');
            $('#password').addClass('error-con');
            $('#retype_password').addClass('error-con')
        } else {

           


           // jQuery(".jobform-tab li.active").next('li').children('a').trigger('click')
            var users = usersData.getInstance();
            users.createUser($('#email').val(), $('#password').val(), $('#retype_password').val());
        }
       
    })

    $('body').on('change', '#uploads', function (){
        var documents = documentData.getInstance();
        taskFiles = [];
        documents.getFile($(this).attr('upload-name'));
        
    })

    $('body').on('click', '#payment-acceptance .jobform-form .next-tab-area .my-btn', function ()
    {
        //validation here

        //validation passed
        //check if the user is just getting back on other page and already onboarded earlier
        var isPaymentOnboarded = localStorage.getItem('stripe-onboarded');
        console.log(isPaymentOnboarded);
        if (isPaymentOnboarded == 'true') {
            console.log('here');
              $("#StripeSellerPayment").text("").css("color", "#000");

                  var imageUrl =  
                        protocol +
                        baseURL  +
                        "/user/plugins/" +
                        packageId +
                        "/images/done.svg";

                    var warning = $('#BtnStripeLinked').parent().siblings('.verified').find('.img-payment-warning');

                    var warningspan = $('#BtnStripeLinked').parent().siblings('.verified').find('span');

                    warning.css({'background': 'url(' + imageUrl + ')no-repeat', 'background-color': '#ff5a60', 'border-radius' : '30px', 'width': '30px', 'height' : '30px', 'margin-top': '5px'});

                    warningspan.text("Verified").css('color', '#ff5a60');

                    $('#BtnStripeLinked').parents(".seller-payment-container").find("span.stripe").css({'width': 'Calc(100% - 40px)', 'line-height' : '40px'});
        }

       // var users = usersData.getInstance();
       if( $('.paycashdelivery').text() == 'Verified') {
        sellerFields.getAllFieldData($('.tab-content'));
     //  users.getCustomFieldValues();
       }
    })

    $('body').on('click', '#start .seller-btn .my-btn', function ()
    {
        var users = usersData.getInstance();
        users.confirmRegistration();
    })


    $('body').on('focus',".datepicker", function(){
            $(this).datetimepicker({
                viewMode: 'days',
                format: 'DD/MM/YYYY'
            })
    });

    $('body').on('click', '#save', function ()
    {

    var validate = 0;
        var target = $(this).parents('.tab-content').find('.jobform-form');

            target.find('.required').each(function() {
                var val = jQuery(this).val();
                if (!jQuery.trim(val)) {
                    validate = 1;
                    jQuery(this).addClass('error-con');
                }

                 if ($(this).is(':checkbox')) {
            if (!isChecked) {
                validate = 1;
                jQuery(this).addClass('error-con');
            }
        }
            });
        


        
    target.find('.req-chkbx').each(function() {

        var checked = $(this).find("input:checked").length > 0;
        if (!checked) {
            $(this).find('input:first').addClass('error-con');
            // alert("Please check at least one checkbox");
            validate = 1;
            //return false;

        }
    });
        
    //   if (validate == 1) {
    //       console.log('we dont do that here')
    //   } else {
            // sellerFields.getAllFieldData($('.tab-content'));
    //   }           
    

    })


    $('body').on('change', '#in_person_work', function() {
    console.log('in person click')
    if ($(this).is(':checked')) {
       // $('.location-map-hide-show').fadeIn('slow');
        //  if (url.indexOf("/subscribe") >= 0) {


        //                 var map;
                        
        //      var clickArr = new Array();
            

           
        //      waitForElement('#map', function ()
        //      {
        //          if (!map) {
        //              map = L.map('map').fitWorld();
        //              // L.map('map').setView([0, 0], 6);

        //              //osm layer
        //              var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //              });
        //              osm.addTo(map);
        //              map.addLayer(search_group);
        //          }
                
        //           //add the existing jobs here
        //          sellerFields.getLocations();

        //          // map.on('click', onMapClick);

        //          var markers = new Array();
                           
        //                     map.on('click', function (e)
        //                     {
        //                         var clickPositionMarker = L.marker([e.latlng.lat, e.latlng.lng], {
        //                             color: 'red',
        //                             fillColor: '#f03',
        //                             fillOpacity: 0.5,
        //                             radius: 500
        //                         });
        //                         clickArr.push(clickPositionMarker);
        //                         mapLat = e.latlng.lat;
        //                         mapLon = e.latlng.lng;
        //                         clickPositionMarker.addTo(search_group).bindPopup("<a name='removeClickM' id=" + e
        //                             .latlng.lat +
        //                             "_" + e.latlng.lng + "></a>")
        //                             .openPopup();
        //                         $('.leaflet-popup-close-button').attr('id', e
        //                             .latlng.lat +
        //                             "_" + e.latlng.lng)

        //                         /*   clickPositionMarker.on('click', function(e) {
        //                           markerDelAgain(); 
        //                         }); */

        //                         locationList.push(e.latlng);
        //                         console.log({
        //                             locationList
        //                         });

        //                     });

        //                     if (!navigator.geolocation) {
        //                         console.log("Your browser doesn't support geolocation feature!")
        //                     } else {
        //                         //setInterval(() => {
        //                         navigator.geolocation.getCurrentPosition(getPosition)
        //                         //}, 5000);
        //                     }

        //                     var marker, circle;

        //                     function getPosition(position)
        //                     {
        //                         // console.log(position)
        //                         var lat = position.coords.latitude
        //                         var long = position.coords.longitude
        //                         var accuracy = position.coords.accuracy

        //                         if (marker) {
        //                             map.removeLayer(marker)
        //                         }

        //                         if (circle) {
        //                             map.removeLayer(circle)
        //                         }

        //                         marker = L.marker([lat, long])
        //                         circle = L.circle([lat, long], {
        //                             radius: accuracy
        //                         })

        //                         var featureGroup = L.featureGroup([marker, circle]).addTo(map)

        //                         map.fitBounds(featureGroup.getBounds())

        //                         console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy)
        //                         sellerFields.getNearestLocations(lat, long, 100)

        //                     }



        //                 })
        //             }

    } else {
        $('.location-map-hide-show').fadeOut('slow');
    }
    });

    $('body').on('change', '#remote_work', function() {
            console.log('remote work click')
            if ($(this).is(':checked')) {
                $('.location-map-hide-show').fadeOut('slow');

            } else {
                $('.location-map-hide-show').fadeIn('slow');
            }
    });

   //PAYMENT
    
    //STRIPE LINK
    $('body').on('click', '#BtnStripeLinked', function ()
    {
       
         payments.getStripeRedirectLink();

    })

    
     //delete an uploaded file from fe
    $('body').on('click', '#delete-file', function ()
        {
            var documents = documentData.getInstance();
            documents.deleteFile($(this));
        
    })
   

})