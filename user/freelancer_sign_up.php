<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<?php
include 'callAPI.php';
include 'admin_token.php';
$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);
$userId = $content['userId'];
$plugin_id = $content['id'];
$baseUrl = getMarketplaceBaseUrl();
$admin_token = getAdminToken();
$customFieldPrefix = getCustomFieldPrefix();
// Query to get marketplace id
$url = $baseUrl . '/api/v2/marketplaces/';
$marketplaceInfo = callAPI("GET", null, $url, false);
// $url = $baseUrl . '/api/developer-packages/custom-fields?packageId=' . getPackageID();
// $packageCustomFields = callAPI("GET", null, $url, false);

$save_button_text = '';
foreach ($marketplaceInfo['CustomFields'] as $cf) {
    if ($cf['Name'] == 'freelancer_onboard_savebutton_text' && substr($cf['Code'], 0, strlen($customFieldPrefix)) == $customFieldPrefix) {
           $save_button_text = $cf['Values'][0];
    }
}
?>
<!-- begin header -->

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Market Place :: Job Form</title>
    <!-- core js -->
    <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/jquery-min.js"></script>
    <!-- bootstrap js -->
    <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/moment.min.js"></script>
    <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/bootstrap-datetimepicker.min.js">
    </script>
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

    </script>
    <!-- bootstrap js -->
    <script src="js/bootstrap.min.js" type="text/javascript">
    </script>
    <!-- bootbox js -->
    <script src="js/bootbox.min.js" type="text/javascript">
   
    <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/custom.js"></script>
    <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/jquery.ddslick.js"></script>


    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.js"></script>

    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

    <script type="text/javascript" src="subscribe/8e94739d-b260-41ec-9496-dfa98bb8cdc0/scripts/users.js"></script>

  
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />


    <style>
    body {
        margin: 0;
        padding: 0;
    }

    #map {
        width: 100%;
        height: 80vh;
    }
    </style>


    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.js"></script>
   <script src="https://unpkg.com/vue/dist/vue.min.js"></script> 

    <!-- bootstrap style -->
    <link href="https://bootstrap.arcadier.com/spacetime/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="https://bootstrap.arcadier.com/spacetime/css/bootstrap-datetimepicker.min.css" rel="stylesheet"
        type="text/css">
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
                <input type="hidden" id="button-text"value="<?php echo $save_button_text ?>">
                <input type="hidden" id="address-lat">
                <input type="hidden" id="address-long">
                <input type="hidden" id="servicing-lat">
                <input type="hidden" id="servicing-long">
                <div class="freelancer-content-main">
                    <div class="job-form-tab-design">
                        <div class="jobform-tab">
                            <ul class="nav nav-tabs">
                                <li class="active" id="registration-tab"><a data-toggle="tab"
                                        href="#registration"><span>Registration
                                        </span></a>
                                </li>
                                <li v-for="tab in allTabs" v-bind:class=""><a data-toggle="tab"
                                        :href="'#' + tab.Id"><span>{{ tab.tab_name }}</span></a></li>

                                <li id="payment-tab"><a data-toggle="tab" href="#payment-acceptance" class="">
                                        <span>Payment
                                            Acceptance</span></a>
                                </li>

                                <li id="verification-tab"><a data-toggle="tab" href="#verification"
                                        class=""><span>Verification</span></a></li>
                                <li id="approval-tab"><a data-toggle="tab" href="#approval"
                                        class=""><span>Approved</span></a>
                                </li>
                            </ul>
                        </div>
                        <div class="tab-content">
                            <!-- default tab -->
                            <div id="registration" class="tab-pane fade in active default">
                                <div class="jobform-form">
                                    <h3>Registration</h3>
                                    <div class="form-group">
                                        <label for="email">Email Address</label>
                                        <input type="text" class="form-control required" name="email" id="email" placeholder="">
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Set a Password</label>
                                        <input type="password" class="form-control required" name="password" id="password"
                                            placeholder="">
                                    </div>
                                    <div class="form-group">
                                        <label for="retype_password">Retype Password</label>
                                        <input type="password" class="form-control required"  name="retype_password"
                                            id="retype_password" placeholder="">
                                    </div>

                                    <div class="jobform-note">
                                        <p><u>Note</u></p>
                                        <p>To be verified, please have a copy of the following documents ready. </p>
                                        <p>Current ABN and Current Insurance Certificate.</p>
                                    </div>

                                    <div class="register-btn">
                                        <button onclick="j_nextTab();" class="btn btn-register">Register</button>

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

    <div class="backTop"><a href="javascript:void(0);" onclick="ScrollTop();"><img
                src="https://bootstrap.arcadier.com/spacetime/images/mobile_top.svg"></a></div>
    <div class="modal fade model-img-crop" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div id="modaldialog" class="html5imageupload" data-download="true" data-save="false"
                        data-resize="true" data-width="150" data-height="150" data-url="canvas.php"
                        style="width: 100%;">
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
                                <li><a href="#"><img
                                            src="https://bootstrap.arcadier.com/spacetime/images/fb_login.svg"></a>
                                </li>
                                <li><a href="#"><img
                                            src="https://bootstrap.arcadier.com/spacetime/images/goo_login.svg"></a>
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
    $(function() {
        var ddlData = [{
            text: "EN",
            value: 1,
            imageSrc: "images/gb.svg"
        }, {
            text: "CN",
            value: 2,
            imageSrc: "images/cn.svg"
        }, {
            text: "FR",
            value: 3,
            imageSrc: "images/fr.svg"
        }];
        $('.language-list').ddslick({
            data: ddlData,
            width: 100,
            imagePosition: "left",
            onSelected: function(selectedData) {}
        });
    });

    function waitForElement(elementPath, callBack) {
        window.setTimeout(function() {
            if ($(elementPath).length) {
                callBack(elementPath, $(elementPath));
            } else {
                waitForElement(elementPath, callBack);
            }
        }, 500);
    }

    function initialize() {
        var address = (document.getElementById('location_details'));
        var autocomplete = new google.maps.places.Autocomplete(address);
        autocomplete.setTypes(['geocode']);
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }
        });
    }


    function initialize_service_area() {
        var places = new google.maps.places.Autocomplete(document.getElementById('address'));
        google.maps.event.addListener(places, 'place_changed', function() {
            var place = places.getPlace();
            var address = place.formatted_address;
            var latitude = place.geometry.location.lat();
            var longitude = place.geometry.location.lng();
            var latlng = new google.maps.LatLng(latitude, longitude);
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'latLng': latlng
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var address = results[0].formatted_address;
                        var pin = results[0].address_components[results[0].address_components
                            .length - 1].long_name;
                        var country = results[0].address_components[results[0]
                            .address_components
                            .length - 2].long_name;
                        var state = results[0].address_components[results[0].address_components
                            .length - 3].long_name;
                        var city = results[0].address_components[results[0].address_components
                            .length - 4].long_name;
                        document.getElementById('country').value = country;
                        document.getElementById('state').value = state;
                        document.getElementById('city').value = city;
                        document.getElementById('postal_code').value = pin;
                        $('#location_details').val(city);
                    }
                }
            });
        });


        // var address = (document.getElementById('location_details'));
        // var autocomplete = new google.maps.places.Autocomplete(address);
        // autocomplete.setTypes(['geocode']);
        // google.maps.event.addListener(autocomplete, 'place_changed', function() {
        //     var place = autocomplete.getPlace();
        //     if (!place.geometry) {
        //         return;
        //     }

        //     var address = '';
        //     if (place.address_components) {
        //         address = [
        //             (place.address_components[0] && place.address_components[0].short_name || ''),
        //             (place.address_components[1] && place.address_components[1].short_name || ''),
        //             (place.address_components[2] && place.address_components[2].short_name || '')
        //         ].join(' ');
        //     }
        // });
    }

    function codeAddress() {
        geocoder = new google.maps.Geocoder();
        var address = document.getElementById("address").value;
        geocoder.geocode({
            'address': address
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                $('#address-lat').val(results[0].geometry.location.lat());
                $('#address-long').val(results[0].geometry.location.lng());

                console.log("Latitude: " + results[0].geometry.location.lat());
                console.log("Longitude: " + results[0].geometry.location.lng());
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    }

    function codeAddress_servicing() {
        geocoder = new google.maps.Geocoder();
        var address = document.getElementById("location_details").value;
        geocoder.geocode({
            'address': address
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                $('#servicing-lat').val(results[0].geometry.location.lat());
                $('#servicing-long').val(results[0].geometry.location.lng());

                console.log("Latitude: " + results[0].geometry.location.lat());
                console.log("Longitude: " + results[0].geometry.location.lng());
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    }

    // google.maps.event.addDomListener(window, 'load', function() {
    //     var places = new google.maps.places.Autocomplete(document.getElementById('address'));
    //     google.maps.event.addListener(places, 'place_changed', function() {
    //         var place = places.getPlace();
    //         var address = place.formatted_address;
    //         var latitude = place.geometry.location.lat();
    //         var longitude = place.geometry.location.lng();
    //         var latlng = new google.maps.LatLng(latitude, longitude);
    //         var geocoder = geocoder = new google.maps.Geocoder();
    //         geocoder.geocode({
    //             'latLng': latlng
    //         }, function(results, status) {
    //             if (status == google.maps.GeocoderStatus.OK) {
    //                 if (results[0]) {
    //                     var address = results[0].formatted_address;
    //                     var pin = results[0].address_components[results[0].address_components
    //                         .length - 1].long_name;
    //                     var country = results[0].address_components[results[0]
    //                         .address_components
    //                         .length - 2].long_name;
    //                     var state = results[0].address_components[results[0].address_components
    //                         .length - 3].long_name;
    //                     var city = results[0].address_components[results[0].address_components
    //                         .length - 4].long_name;
    //                     document.getElementById('country').value = country;
    //                     document.getElementById('state').value = state;
    //                     document.getElementById('city').value = city;
    //                     document.getElementById('postal_code').value = pin;
    //                 }
    //             }
    //         });
    //     });
    // });

        jQuery('.jobform-tab .nav-tabs a').on('click', function (event) {
            // console.log('in here');
            // var tab = jQuery(".jobform-tab li.active a").attr('href');
            // if (validateTab(tab) == 0 || jQuery(".jobform-tab").hasClass('prevTab') ) {
            //    jQuery(".jobform-tab").removeClass('prevTab');
            //    $(this).parent().addClass('check');
            //    $(this).parent().prevAll().addClass('check');
            //    $(this).parent().nextAll().removeClass('check');
            //    return true;
            // } else {
            //    return false
            // }
         });

    function j_nextTab() {

        // if (validateTab(tab)) {
        //      console.log('missing required fields')
        // }


          console.log('in here');
            var tab = jQuery(".jobform-tab li.active a").attr('href');
            if (validateTab(tab) == 0 || jQuery(".jobform-tab").hasClass('prevTab') ) {
                console.log('return true');
               jQuery(".jobform-tab").removeClass('prevTab');
               $(this).parent().addClass('check');
               $(this).parent().prevAll().addClass('check');
               $(this).parent().nextAll().removeClass('check');

               jQuery(".jobform-tab li.active").next('li').children('a').trigger('click')
               return true;
            } else {
                console.log('in false');
               return false
            }
        //jQuery(".jobform-tab li.active").next('li').children('a').trigger('click');
        console.log('this');
        setTimeout(function() {
            //   newMap();
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
        setTimeout(function() {
            window.location.href = "registration-done";
        }, 1000);
    }

    function jobTabTimeline() {
        var width = ($('.jobform-tab .nav-tabs li:eq(1)').offset().left - $('.jobform-tab .nav-tabs li:eq(0)').offset()
            .left) - $('.jobform-tab .nav-tabs li:eq(1)').width();
        $('style#job-timeline').remove();
        $('head').append('<style id="job-timeline">.jobform-tab .nav-tabs>li>a:before{ width: ' + width +
            'px;} .jobform-tab .nav-tabs>li.active>a:after{width: ' + width + 'px;} </style>');
    }

    function validateTab(tab) {
        var validate = 0;
        var target = jQuery(".job-form-tab-design .tab-content " + tab + " ").find('.jobform-form');

             target.find('.required').each(function() {
                    var val = jQuery(this).val();
                    if (!jQuery.trim(val)) {
                        validate = 1;
                        jQuery(this).addClass('error-con');
                    }
                });
            console.log({validate});
        // switch (tab) {
        //     case '#registration':
        //         /*var nEmail = jQuery("#email");
        //         target.find('.required').each(function () {
        //            var val = jQuery(this).val();
        //            if (!jQuery.trim(val)) {
        //               validate = 1;
        //               jQuery(this).addClass('error-con');
        //            }
        //         });
        //         if (!validateEmail(nEmail.val())) {
        //            validate = 1;
        //            nEmail.addClass('error-con');
        //         }*/
        //         break;
        //     case '#verification-details':

               


        //         break;
        //     case '#verification':
        //         target.find('.required').each(function() {
        //             var val = jQuery(this).val();
        //             if (!jQuery.trim(val)) {
        //                 validate = 1;
        //                 jQuery(this).addClass('error-con');
        //             }
        //         });
        //         break;
        //     case '#approval':
        //         target.find('.required').each(function() {
        //             var val = jQuery(this).val();
        //             if (!jQuery.trim(val)) {
        //                 validate = 1;
        //                 jQuery(this).addClass('error-con');
        //             }
        //         });
        //         break;
        //     case '#start':
        //         target.find('.required').each(function() {
        //             var val = jQuery(this).val();
        //             if (!jQuery.trim(val)) {
        //                 validate = 1;
        //                 jQuery(this).addClass('error-con');
        //             }
        //         });
        //         break;
        // }
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


function initAutocomplete() {

      if (!navigator.geolocation) {
                console.log("Your browser doesn't support geolocation feature!")
            } else {
                //setInterval(() => {
              //  navigator.geolocation.getCurrentPosition(getPosition)

                
                //}, 5000);
            }
              waitForElement('#address', function (){
//   const map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -33.8688, lng: 151.2195 },
//     zoom: 13,
//     mapTypeId: "roadmap",
//   });
  // Create the search box and link it to the UI element.

                
    const input = document.getElementById("address");
    const searchBox = new google.maps.places.SearchBox(input);
 //})
 // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
//   map.addListener("bounds_changed", () => {
//     searchBox.setBounds(map.getBounds());
//   });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {


    //const places = searchBox.getPlaces();


     var places = searchBox.getPlaces();

             places.forEach((place) => {

            var address = place.formatted_address;
            var latitude = place.geometry.location.lat();
            var longitude = place.geometry.location.lng();
            var latlng = new google.maps.LatLng(latitude, longitude);
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'latLng': latlng
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var address = results[0].formatted_address;
                        var pin = results[0].address_components[results[0].address_components
                            .length - 1].long_name;
                        var country = results[0].address_components[results[0]
                            .address_components
                            .length - 2].long_name;
                        var state = results[0].address_components[results[0].address_components
                            .length - 3].long_name;
                        var city = results[0].address_components[results[0].address_components
                            .length - 4].long_name;
                        document.getElementById('country').value = country;
                        document.getElementById('state').value = state;
                        document.getElementById('city').value = city;
                        document.getElementById('postal_code').value = pin;
                        $('#location_details').val(city);
                    }
                }
            });
        })

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    // markers.forEach((marker) => {
    //   marker.setMap(null);
    // });
    // markers = [];

    // For each place, get the icon, name and location.
    // const bounds = new google.maps.LatLngBounds();

    // places.forEach((place) => {
    //   if (!place.geometry || !place.geometry.location) {
    //     console.log("Returned place contains no geometry");
    //     return;
    //   }

    //   const icon = {
    //     url: place.icon,
    //     size: new google.maps.Size(71, 71),
    //     origin: new google.maps.Point(0, 0),
    //     anchor: new google.maps.Point(17, 34),
    //     scaledSize: new google.maps.Size(25, 25),
    //   };

    //   // Create a marker for each place.
    //   markers.push(
    //     new google.maps.Marker({
    //       map,
    //       icon,
    //       title: place.name,
    //       position: place.geometry.location,
    //     })
    //   );
    //   if (place.geometry.viewport) {
    //     // Only geocodes have viewport.
    //     bounds.union(place.geometry.viewport);
    //   } else {
    //     bounds.extend(place.geometry.location);
    //   }
    // });
    // map.fitBounds(bounds);
  });

})
}















    jQuery(document).ready(function() {


    waitForElement('#address', function() {
         var script = document.createElement('script');
        script.onload = function ()
      {
        google.maps.event.addDomListener(window, 'load', initialize);
        google.maps.event.addDomListener(window, 'load', initialize_service_area);
      }

       script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCbYXf7DUOc-j2QwGgtXcFp4fpGMD4Q59o&libraries=places";

        document.head.appendChild(script); 
    google.maps.event.addDomListener(window, 'load', initialize);
   

    })
    jobTabTimeline();

    $(window).on('resize', jobTabTimeline);

    jQuery('body').on('change', '#servicing_area_all', function(event) {
    if ($(this).is(':checked')) {
    // $('.location-map-hide-show').fadeIn('slow');
    // newMapSelectedAll();
    } else {
    // newMap();
    // $('.location-map-hide-show').fadeOut('slow');
    }
    });

    jQuery('body').on('change', '#servicing_area_remote', function(event) {
    if ($(this).is(':checked')) {
    // $('.location-map-hide-show').fadeIn('slow');
    // newMap();
    } else {
    // newMap();
    // $('.location-map-hide-show').fadeOut('slow');
    }
    });
    jQuery('#datepicker').datetimepicker({
    viewMode: 'years',
    format: 'MM/YYYY'
    });

    $('#credit_card').change(function() {
    $('.credit_card_input input').removeClass("error-con");
    if ($(this).is(':checked')) {
    $('.credit_card_input input').prop("disabled", true);
    $('.credit_card_input input').removeClass("required");
    } else {
    $('.credit_card_input input').prop("disabled", false);
    // $('.credit_card_input input').addClass("required");
    }
    }).trigger('change');



    $('#certificate_currency').change(function() {
    $('.certificate_currency_input input').removeClass("error-con");
    if ($(this).is(':checked')) {
    $('.certificate_currency_input').fadeIn();
    $('.certificate_currency_input input').addClass("required");
    $('.certificate_currency_input input').prop("disabled", false);
    } else {
    $('.certificate_currency_input').fadeOut();
    $('.certificate_currency_input input').prop("disabled", true);
    $('.certificate_currency_input input').removeClass("required");
    }
    }).trigger('change');

    $('#driver_license_director').change(function() {
    $('.driver_license_director_input input').removeClass("error-con");
    if ($(this).is(':checked')) {
    $('.driver_license_director_input').fadeIn();
    $('.driver_license_director_input input').prop("disabled", false);
    $('.driver_license_director_input input').addClass("required");
    } else {
    $('.driver_license_director_input').fadeOut();
    $('.driver_license_director_input input').prop("disabled", true);
    $('.driver_license_director_input input').removeClass("required");
    }
    }).trigger('change');

    $('#same_address').change(function() {
    $('.same_address_input input').removeClass("error-con");
    if ($(this).is(':checked')) {
    $('.same_address_input input').prop("disabled", true);
    $('.same_address_input input').removeClass("required");
    } else {
    $('.same_address_input input').prop("disabled", false);
    $('.same_address_input input').addClass("required");;
    }
    }).trigger('change');
    jQuery('.jobform-tab .nav-tabs a').on('show.bs.tab', function(event) {
    var tab = jQuery(".jobform-tab li.active a").attr('href');
    if (validateTab(tab) == 0 || jQuery(".jobform-tab").hasClass('prevTab')) {
    jQuery(".jobform-tab").removeClass('prevTab');
    $(this).parent().addClass('check');
    $(this).parent().prevAll().addClass('check');
    $(this).parent().nextAll().removeClass('check');
    return true;
    } else {
    return false
    }
    });
    $('.jobform-tab .nav-tabs a').on('shown.bs.tab', function() {
    if (jQuery(".jobform-tab li.active a").attr('href') == '#verification-details') {
    // $('.cmaphilight').maphilight({
    // fill: true,
    // fillColor: '000000',
    // fillOpacity: 0.2,
    // stroke: true,
    // strokeColor: 'ff0000',
    // strokeOpacity: 1,
    // strokeWidth: 1,
    // fade: true,
    // alwaysOn: false,
    // neverOn: false,
    // groupBy: false,
    // wrapClass: true,
    // shadow: false,
    // shadowX: 0,
    // shadowY: 0,
    // shadowRadius: 6,
    // shadowColor: '000000',
    // shadowOpacity: 0.8,
    // shadowPosition: 'outside',
    // shadowFrom: false,
    // });
    }

    });


    jQuery("#mobi-search").click(function() {
    jQuery(".search-bar").slideToggle();
    if (jQuery("#mobile-menu").is(":visible")) {
    jQuery("#mobile-menu").hide();
    }
    if (jQuery(".category-menu").is(":visible")) {
    jQuery(".category-menu").hide();
    }
    });

    /*nice scroll */
    jQuery("#mobile-menu > ul").niceScroll({
    cursorcolor: "#000",
    cursorwidth: "6px",
    cursorborderradius: "5px",
    cursorborder: "1px solid transparent",
    touchbehavior: true
    });

    jQuery("#menu-toggle").click(function() {
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
    jQuerymodal.bind('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
    if (jQuerymodal.hasClass('state-leave')) {
    jQuerymodal.removeClass('state-leave');
    }
    });
    jQuery('.close').on('click', function() {
    jQueryoverlay.removeClass('state-show');
    jQuerymodal.removeClass('state-appear').addClass('state-leave');
    jQuery('body').removeClass('modal-open')
    });
    jQuery('#register-modal').on('click', function() {
    jQueryoverlay.addClass('state-show');
    jQuerymodal.removeClass('state-leave').addClass('state-appear');
    jQuery('html, body').animate({
    scrollTop: 0
    }, 0);
    jQuery('body').addClass('modal-open');

    });



    // jQuery('#address').on('focusout', function() {




    // });

    });


    function AddPaymentCashOnDelivery(ele)

    {

    var $this = jQuery(ele);

    var $verify = $this.attr('data-verify');

    if ($verify == 'false')

    {

    bootbox.confirm({

    message: `By verifying this payment method, all your buyers will be able to checkout your items using Cash on
    Delivery and settlement has to be handled by you manually if they were to use this payment method.`,

    className: "my-confirmmodal",

    buttons: {

    confirm: {

    label: 'Okay',

    className: 'btn-success'

    },

    cancel: {

    label: 'Cancel',

    className: 'btn-danger'

    }

    },

    callback: function(result) {

    if (result)

    {

    $("#CashOnDeliveryPayment").text("").css("color", "#000");

    var imageUrl = 'images/done.svg';

    var warning = $this.parent().siblings('.verified').find('.img-payment-warning');

    var warningspan = $this.parent().siblings('.verified').find('span');

    warning.css({
    'background': 'url(' + imageUrl + ')no-repeat',
    'background-color': '#00c8b2',
    'border-radius': '30px',
    'width': '30px',
    'height': '30px',
    'margin-top': '5px'
    });

    warningspan.text("Verified").css('color', '#00c8b2');

    $(".seller-payment-container span.paycashdelivery").css({
    'width': 'Calc(100% - 40px)',
    'line-height': '40px'
    });

    $("#BtnCashDelivery").removeClass("error-con");

    $this.attr('data-verify', 'true');

    }

    }



    });

    }

    }
    </script>

 <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbYXf7DUOc-j2QwGgtXcFp4fpGMD4Q59o&callback=initAutocomplete&libraries=places&v=weekly&channel=2"
      async
    ></script>
    <!-- <script type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbYXf7DUOc-j2QwGgtXcFp4fpGMD4Q59o&libraries=places">
    </script> -->
    </script>
    <script type="text/javascript" src="subscribe/8e94739d-b260-41ec-9496-dfa98bb8cdc0/scripts/jquery.mapael.js">
    </script>
    <script type="text/javascript" src="subscribe/8e94739d-b260-41ec-9496-dfa98bb8cdc0/scripts/usa_states.js"></script>

    <script type="text/javascript">

    </script>



    <!-- <script type="text/javascript" src="subscribe/scripts/maps/world_countries.js"></script> -->
    <!-- end footer -->
</body>

</html>