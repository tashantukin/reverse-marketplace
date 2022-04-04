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
    <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/bootstrap-datetimepicker.min.js">
    </script>
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
    <link href="https://bootstrap.arcadier.com/spacetime/css/bootstrap-datetimepicker.min.css" rel="stylesheet"
        type="text/css">
    <link href="https://bootstrap.arcadier.com/spacetime/css/fancy-radio.css" rel="stylesheet" type="text/css">

    <!-- custom style-->
    <link href="https://bootstrap.arcadier.com/spacetime/css/style.css" rel="stylesheet" type="text/css">
    <!-- responsive style-->
    <link href="https://bootstrap.arcadier.com/spacetime/css/responsive.css" rel="stylesheet" type="text/css">
    <link href="css/custom.css" rel="stylesheet" type="text/css">
    <!-- modal style-->
    <link href="https://bootstrap.arcadier.com/spacetime/css/modal.css" rel="stylesheet" type="text/css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
    <!-- <script src="https://unpkg.com/vue/dist/vue.min.js"></script> -->
    <link href="/user/plugins/8e94739d-b260-41ec-9496-dfa98bb8cdc0/css/style.css" rel="stylesheet" type="text/css">

    <!-- map js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js"
        charset="utf-8"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.min.js" charset="utf-8"></script>

    <script src="https://js.stripe.com/v3/"></script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

    <!-- <script src="/user/plugins/8e94739d-b260-41ec-9496-dfa98bb8cdc0/scripts/maps/france_departments.js" charset="utf-8"></script>
   <script src="/user/plugins/8e94739d-b260-41ec-9496-dfa98bb8cdc0/scripts/maps/world_countries.js" charset="utf-8"></script>
   <script src="/user/plugins/8e94739d-b260-41ec-9496-dfa98bb8cdc0/scripts/maps/usa_states.js" charset="utf-8"></script> -->
    <script type="text/javascript" src="scripts/jquery.mapael.js"></script>
    <script type="text/javascript" src="scripts/usa_states.js"></script>
    <!-- leaflet css  -->
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


</head>
<!-- end header -->

<?php
include 'callAPI.php';
include 'admin_token.php';
$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);
$merchant_id = $content['user-id'];

$baseUrl = getMarketplaceBaseUrl();
$admin_token = getAdminToken();
$customFieldPrefix = getCustomFieldPrefix();
$userToken = $_COOKIE["webapitoken"];
$url = $baseUrl . '/api/v2/users/'; 
$result = callAPI("GET", $userToken, $url, false);
$userId = $result['ID'];


$url = $baseUrl . '/api/v2/users/' . $userId ; 
$merchant = callAPI("GET", $admin_token['access_token'], $url, false);  

$stripe_payment_id;

foreach($merchant['CustomFields'] as $cf) { 
    
    if ($cf['Name'] == 'stripe_payment_id')
     {
        $stripe_payment_id = $cf['Values'][0];

     }
}

?>
<div class="content-pages">
    <div class="container ">
        <div class="freelancer-content-main">
            <input type="hidden" id="address-lat">
            <input type="hidden" id="address-long">
            <input type="hidden" id="stripe-id" value=<?php echo $stripe_payment_id ?>>
            <div class="lodge-tab-design ">
                <div class="jobform-tab">
                    <ul class="nav nav-tabs">
                        <li v-for="tab in allTabs" v-bind:class="{ active: tab.sort_order== 0 }"><a data-toggle="tab"
                                :href="'#' + tab.Id"><span>{{ tab.tab_name }}</span></a></li>

                        <li v-if="jobChargeEnabled == 'True'" class=""><a data-toggle="tab" href="#payment"
                                aria-expanded="true"><span>Payment</span></a>
                        </li>

                    </ul>
                </div>
                <div class="tab-content">


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
                        <input type="text" class="form-control required" name="work_done" id="work_done">
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
                                    <input type="file" id="file-doc" accept="" class="inputfile"
                                        data-multiple-caption="{count} Upload File" multiple value="Browse..."
                                        onchange="readURL(this);">
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
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<div class="modal-overlay"></div>
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

function j_nextTab() {
    jQuery(".jobform-tab li.active").next('li').children('a').trigger('click');
}

function j_finishedTab() {
    var tab = jQuery(".jobform-tab li.active a").attr('href');
    validateTab(tab);
    if (validateTab(tab) == 0) {
        jQuery(".jobform-tab").removeClass('prevTab');
        jQuery('.jobform-tab .nav-tabs li').addClass('check');
        jQuery('.jobform-tab .nav-tabs li').prevAll().addClass('check');
        jQuery('.jobform-tab .nav-tabs li').removeClass('active');
        setTimeout(function() {
            window.location.href = "/user/plugins/8e94739d-b260-41ec-9496-dfa98bb8cdc0/lodged.html";
        }, 1000);
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
    var target = jQuery(".job-form-tab-design .tab-content " + tab + " ").find('.jobform-form');
    switch (tab) {
        case '#select_location':
            target.find('.required').each(function() {
                var val = jQuery(this).val();
                if (!jQuery.trim(val)) {
                    validate = 1;
                    jQuery(this).addClass('error-con');
                }
            });
            break;
        case '#get_quote':
            target.find('.required').each(function() {
                var val = jQuery(this).val();
                if (!jQuery.trim(val)) {
                    validate = 1;
                    jQuery(this).addClass('error-con');
                }
            });
            break;
        case '#time_frame':
            target.find('.required').each(function() {
                var val = jQuery(this).val();
                if (!jQuery.trim(val)) {
                    validate = 1;
                    jQuery(this).addClass('error-con');
                }
            });

            if (!jQuery(".acknowledge").prop("checked")) {
                validate = 1;
                jQuery(".acknowledge").addClass('error-con');
            }

            break;
        case '#contact_details':
            var nEmail = jQuery("#email");
            target.find('.required').each(function() {
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
    var width = ($('.jobform-tab .nav-tabs li:eq(1)').offset().left - $('.jobform-tab .nav-tabs li:eq(0)')
        .offset()
        .left) - $('.jobform-tab .nav-tabs li:eq(1)').width();
    $('style#job-timeline').remove();
    $('head').append('<style id="job-timeline">.lodge-tab-design .jobform-tab .nav-tabs>li>a:before{ width: ' +
        width +
        'px !important;} .lodge-tab-design .jobform-tab .nav-tabs>li.active>a:after{width: ' + width +
        'px !important;} </style>');
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


function codeAddress() {
    geocoder = new google.maps.Geocoder();
    var address = document.getElementById("location_details").value;
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

 function getPosition(position)
            {
                // console.log(position)
                var lat = position.coords.latitude
                var long = position.coords.longitude
                var accuracy = position.coords.accuracy

                // if (marker) {
                //     map.removeLayer(marker)
                // }

                // if (circle) {
                //     map.removeLayer(circle)
                // }

                // marker = L.marker([lat, long])
                // circle = L.circle([lat, long], {
                //     radius: accuracy
                // })

                // var featureGroup = L.featureGroup([marker, circle]).addTo(map)

                // map.fitBounds(featureGroup.getBounds())

                console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy)


                

            }




function initAutocomplete() {

      if (!navigator.geolocation) {
                console.log("Your browser doesn't support geolocation feature!")
            } else {
                //setInterval(() => {
                navigator.geolocation.getCurrentPosition(getPosition)

                
                //}, 5000);
            }
              waitForElement('#map', function (){
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
    mapTypeId: "roadmap",
  });
  // Create the search box and link it to the UI element.

                
    const input = document.getElementById("location_details");
    const searchBox = new google.maps.places.SearchBox(input);
 //})
 // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

})
}























jQuery(document).ready(function() {


    waitForElement('#location_details', function() {

        google.maps.event.addDomListener(window, 'load', initialize);
        //google.maps.event.addDomListener(window, 'load', initialize_service_area);
    })




    jobTabTimeline();

    $(window).on('resize', jobTabTimeline);





    jQuery('.jobform-tab .nav-tabs a').on('show.bs.tab', function(event) {
        var tab = jQuery(".jobform-tab li.active a").attr('href');
        console.log(tab);
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
            $this.parents(".custom-fancyjb").find('.datepicker').prop("disabled", true);
        } else {
            $this.parents(".custom-fancyjb").find('.datepicker').prop("disabled", false);
        }
    });


    $('#completed_date').change(function() {
        var $this = $(this);
        if ($this.is(':checked')) {
            $this.closest('.fancy-radio').find('label input').prop("disabled", false);
        } else {
            $this.closest('.fancy-radio').find('label input').prop("disabled", true);
        }
    }).trigger('change');






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
    jQuery('.datepicker').datetimepicker({
        viewMode: 'days',
        format: 'DD/MM/YYYY'
    });

    jQuery("a[name='removeClickM']").on('click', function(e) {
        //  $(document).on("click", "a[name='removeClickM']", function(e) {

        // Stop form from submitting normally
        e.preventDefault();

        console.log('removing');

        for (i = 0; i < clickArr.length; i++) {

            if (search_group.hasLayer(clickArr[i])) {
                if (clickArr[i]._latlng.lat + "_" + clickArr[i]._latlng.lng == $(this).attr(
                        'id')) {
                    hideLayer(search_group, clickArr[i]);
                    clickArr.splice(clickArr.indexOf(clickArr[i]), 1);
                }

            }

        }
    })


    function newMap() {
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
                        click: function(e, id, mapElem, textElem) {
                            $.map(newData.areas, function(val, i) {
                                newData.areas[i] = {
                                    attrs: {
                                        fill: "#5ba4ff"
                                    }
                                };
                            });

                            $(".mapcontainer").trigger('update', [{
                                mapOptions: newData
                            }]);
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
                            $(".mapcontainer").trigger('update', [{
                                mapOptions: newData
                            }]);

                            console.log({
                                newData
                            })

                        }
                    }
                }
            },
            areas: {
                "HI": {
                    text: {
                        content: "Hawaii",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Hawaii"
                    }
                },

                "AK": {
                    text: {
                        content: "Alaska",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Alaska"
                    }
                },
                "FL": {
                    text: {
                        content: "Florida",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Florida"
                    }
                },
                "NH": {
                    text: {
                        content: "New Hampshire",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "New Hampshire"
                    }
                },
                "MI": {
                    text: {
                        content: "Michigan",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Michigan"
                    }
                },
                "VT": {
                    text: {
                        content: "Vermont",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Vermont"
                    }
                },
                "ME": {
                    text: {
                        content: "Maine",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Maine"
                    }
                },
                "RI": {
                    text: {
                        content: "Rhode Island",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Rhode Island"
                    }
                },
                "NY": {
                    text: {
                        content: "New York",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "New York"
                    }
                },
                "PA": {
                    text: {
                        content: "Pennsylvania",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Pennsylvania"
                    }
                },
                "NJ": {
                    text: {
                        content: "New Jersey",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "New Jersey"
                    }
                },
                "DE": {
                    text: {
                        content: "Delaware",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Delaware"
                    }
                },
                "MD": {
                    text: {
                        content: "Maryland",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Maryland"
                    }
                },
                "VA": {
                    text: {
                        content: "Virginia",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Virginia"
                    }
                },
                "WV": {
                    text: {
                        content: "West Virginia",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "West Virginia"
                    }
                },
                "OH": {
                    text: {
                        content: "Ohio",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Ohio"
                    }
                },
                "IN": {
                    text: {
                        content: "Indiana",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Indiana"
                    }
                },
                "IL": {
                    text: {
                        content: "Illinois",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Illinois"
                    }
                },
                "CT": {
                    text: {
                        content: "Connecticut",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Connecticut"
                    }
                },
                "WI": {
                    text: {
                        content: "Wisconsin",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Wisconsin"
                    }
                },
                "NC": {
                    text: {
                        content: "North Carolina",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "North Carolina"
                    }
                },
                "DC": {
                    text: {
                        content: "District of Columbia",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "District of Columbia"
                    }
                },
                "MA": {
                    text: {
                        content: "Massachusetts",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Massachusetts"
                    }
                },
                "TN": {
                    text: {
                        content: "Tennessee",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Tennessee"
                    }
                },
                "AR": {
                    text: {
                        content: "Arkansas",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Arkansas"
                    }
                },
                "MO": {
                    text: {
                        content: "Missouri",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Missouri"
                    }
                },
                "GA": {
                    text: {
                        content: "Georgia",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Georgia"
                    }
                },
                "SC": {
                    text: {
                        content: "South Carolina",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "South Carolina"
                    }
                },
                "KY": {
                    text: {
                        content: "Kentucky",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Kentucky"
                    }
                },
                "AL": {
                    text: {
                        content: "Alabama",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Alabama"
                    }
                },
                "LA": {
                    text: {
                        content: "Louisiana",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Louisiana"
                    }
                },
                "MS": {
                    text: {
                        content: "Mississippi",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Mississippi"
                    }
                },
                "IA": {
                    text: {
                        content: "Iowa",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Iowa"
                    }
                },
                "MN": {
                    text: {
                        content: "Minnesota",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Minnesota"
                    }
                },
                "OK": {
                    text: {
                        content: "Oklahoma",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Oklahoma"
                    }
                },
                "TX": {
                    text: {
                        content: "Texas",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Texas"
                    }
                },
                "NM": {
                    text: {
                        content: "New Mexico",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "New Mexico"
                    }
                },
                "KS": {
                    text: {
                        content: "Kansas",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Kansas"
                    }
                },
                "NE": {
                    text: {
                        content: "Nebraska",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Nebraska"
                    }
                },
                "SD": {
                    text: {
                        content: "South Dakota",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "South Dakota"
                    }
                },
                "ND": {
                    text: {
                        content: "North Dakota",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "North Dakota"
                    }
                },
                "WY": {
                    text: {
                        content: "Wyoming",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Wyoming"
                    }
                },
                "MT": {
                    text: {
                        content: "Montana",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Montana"
                    }
                },
                "CO": {
                    text: {
                        content: "Colorado",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Colorado"
                    }
                },
                "ID": {
                    text: {
                        content: "Idaho",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Idaho"
                    }
                },
                "UT": {
                    text: {
                        content: "Utah",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Utah"
                    }
                },
                "AZ": {
                    text: {
                        content: "Arizona",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Arizona"
                    }
                },
                "NV": {
                    text: {
                        content: "Nevada",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Nevada"
                    }
                },
                "OR": {
                    text: {
                        content: "Oregon",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Oregon"
                    }
                },
                "WA": {
                    text: {
                        content: "Washington",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "Washington"
                    }
                },
                "CA": {
                    text: {
                        content: "California",
                        attrs: {
                            "font-size": 14
                        }
                    },
                    tooltip: {
                        content: "California"
                    }
                }

            }
        });
    }


});


// function onMapClick(e) {

//     var marker = new L.Marker(e.latlng, {
//         draggable: true
//     });
//     map.addLayer(marker);
//     markers[marker._leaflet_id] = marker;
//     console.log(markers);
//     $('#overlay > ul').append('<li>Marker ' + marker._leaflet_id + ' - <a href="#" class="remove" id="' +
//         marker._leaflet_id + '">remove</a></li>');

//     // Remove a marker
//     $('.remove').on("click", function() {
//         // Remove the marker
//         map.removeLayer(markers[$(this).attr('id')]);

//         // Remove the link
//         $(this).parent('li').remove();

//         // Remove the marker from the array
//         delete markers[$(this).attr('id')];

//     });

// };

// var popup = L.popup();
// var marker = L.marker();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
//     console.log(e.latlng);


//     marker = L.marker(e.latlng, {
//         color: 'red',
//         fillColor: '#f03',
//         fillOpacity: 0.5,
//         radius: 500
//     }).addTo(map);

//     map.addLayer(marker);

// }
// const deleteMarker = (e) => {
//     if (deleteBool) {
//         e.target.removeFrom(map)
//         deleteBool = false
//     }
// }

// map.on('click', onMapClick);
// marker.on('click', deleteMarker)
// // marker.on("popupopen", onPopupOpen);

// //Button who active deleteBool
// const button = document.getElementById('btn')

// //Boolean who let me delete marker
// let deleteBool = false

// //Button function to enable boolean
// button.addEventListener('click', () => {
//     deleteBool = true



///})

// Function to delete marker 



//})
</script>



<!-- leaflet js  -->






<!-- <script type="text/javascript"
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbYXf7DUOc-j2QwGgtXcFp4fpGMD4Q59o&libraries=places">
</script> -->
 <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbYXf7DUOc-j2QwGgtXcFp4fpGMD4Q59o&callback=initAutocomplete&libraries=places&v=weekly&channel=2"
      async
    ></script>




<script type="text/javascript" src="scripts/jquery.mapael.js">
</script>

<script type="text/javascript" src="scripts/usa_states.js"></script>
<script type="text/javascript" src="scripts/maps/world_countries.js"></script>
<script type="text/javascript" src="scripts/lodge_job.js"></script>


<!-- end footer -->

<!-- <script src="/user/plugins/8e94739d-b260-41ec-9496-dfa98bb8cdc0/scripts/jquery.mapael.js" charset="utf-8"></script> -->

<!-- vue js production cdn -->