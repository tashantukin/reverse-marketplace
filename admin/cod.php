<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://bootstrap.arcadier.com/adminportal_pre/js/jquery-1.11.3.min.js" type="text/javascript">
    </script>
    <script src="https://bootstrap.arcadier.com/adminportal_pre/js/jquery.js" type="text/javascript">
    </script>
    <!-- bootstrap js -->
    <script src="https://bootstrap.arcadier.com/adminportal_pre/js/bootstrap.min.js" type="text/javascript">
    </script>
    <script src="https://bootstrap.arcadier.com/adminportal_pre/js/jquery.nicescroll.min.js" type="text/javascript">
    </script>
    <!-- bootbox js -->
    <script src="https://bootstrap.arcadier.com/adminportal_pre/js/bootbox.min.js" type="text/javascript">
    </script>
    <!-- tablesorter js -->
    <script src="https://bootstrap.arcadier.com/adminportal_pre/js/jquery.tablesorter.js" type="text/javascript">
    </script>
    <!-- html5upload js -->
    <script src="https://bootstrap.arcadier.com/adminportal_pre/js/html5imageupload.min.js" type="text/javascript">
    </script>
    <!-- Pagination js -->
    <script src="https://bootstrap.arcadier.com/adminportal/js/pagination.min.js" type="text/javascript">
    </script>
    <!-- custom js -->
    <script src="https://bootstrap.arcadier.com/adminportal_pre/js/custom.js" type="text/javascript">
    </script>
    <!-- bootstrap style -->
    <link href="https://bootstrap.arcadier.com/adminportal_pre/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="https://bootstrap.arcadier.com/adminportal_pre/css/jquery-ui.min.css" rel="stylesheet" type="text/css">
    <link href="https://bootstrap.arcadier.com/adminportal_pre/css/html5imageupload.css" rel="stylesheet"
        type="text/css">
    <link href="https://bootstrap.arcadier.com/adminportal_pre/css/switch-btn.css" rel="stylesheet" type="text/css">
    <!-- Pagination style -->
    <link href="https://bootstrap.arcadier.com/adminportal/css/pagination.css" rel="stylesheet" type="text/css">
    <!-- custom style-->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet"
        type="text/css">
    <link href="https://bootstrap.arcadier.com/adminportal/css/style.css" rel="stylesheet" type="text/css">
    <!-- responsive style-->
    <link href="https://bootstrap.arcadier.com/adminportal/css/responsive.css" rel="stylesheet" type="text/css">


    <!-- custom style-->
    <link rel="stylesheet" type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <!-- responsive style-->
    <link href="css/responsive.css" rel="stylesheet" type="text/css">

    <script src="https://js.stripe.com/v3/"></script>
    </meta>
</head>

<div class="page-content" id="payment-custom-content">

    <div class="gutter-wrapper">
        <div class="page-topnav"> <a class="btn-back" href="payments.html"><i class="icon icon-arrowleft"></i> Back</a>
        </div>
        <div class="panel-box">
            <div class="page-content-top private-setting-container-switch">
                <div><i class="icon icon-cod1 icon-3x"></i></div>
                <div>
                    <p>Do note that for Cash on Delivery payments, you will be <span class="black-color">unable to
                            charge a commission fee</span> from your <br>marketplace transactions should they use this
                        payment method.</p>
                    <p><span class="black-color">To turn it on, toggle the button on the side.</span></p>
                </div>
                <div class="private-setting-switch">
                    <div class="onoffswitch">
                        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cod_myonoffswitch"
                            checked="">
                        <label class="onoffswitch-label" for="cod_myonoffswitch"> <span
                                class="onoffswitch-inner"></span> <span class="onoffswitch-switch"></span> </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel-box goo-panel-box" id="cod_description">
            <div class="page-content-top">
                <div><i class="icon icon-cod2 icon-3x"></i></div>
                <div>
                    <p><span class="goo-translate-name">COD Payment Method Setup</span></p>
                    <p>Your users will be shown the payment description after selecting this payment method</p>
                </div>
                <div>&nbsp;</div>
            </div>
            <div class="page-content-btm">
                <form name="custom-payment-method" id="custom-payment-method" action="#">
                    <div class="form-field-controler">
                        <div class="custom-field-form">
                            <div>
                                <label>PAYMENT DESCRIPTION TO SELLER</label>
                                <span> - (170 character max.)</span><a href="javascript:void(0);"
                                    onclick="jQuery('.pmntcmn-desc-imgsec-area').slideToggle();"><i
                                        class="icon icon-reminder"></i></a>
                            </div>
                            <div class="pmntcmn-desc-imgsec-area" style="display: none;">
                                <div class="pmntcmn-desc-imgsec">
                                    <div>
                                        <div class="pmntcmn-descimg-infoicon"><i class="icon icon-reminder"></i></div>
                                        <p>This section will appear on the seller onboarding / settings page in the
                                            payments tab. It will appear next to the generic payment method, under our
                                            default payment gateways.</p>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="pmntcmn-desc-img"><img src="images/payment-custom-list.png"></div>
                                </div>
                            </div>
                            <div>
                                <textarea
                                    id="cod-description">You will only receive payment for the item upon collection of the item by the buyer by delivery or pick-up methods.</textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- <div class="pmntcmn-btnsave-sec"><a href="javascript:void(0);" onclick="save_payment_custom_method();"
                class="blue-btn">Save</a></div> -->
    </div>
</div>

<!-- begin footer -->
<script type="text/javascript">
jQuery(document).ready(function() {
    jQuery(".mobi-header .navbar-toggle").click(function(e) {
        e.preventDefault();
        jQuery("body").toggleClass("sidebar-toggled");
    });
    jQuery(".navbar-back").click(function() {
        jQuery(".mobi-header .navbar-toggle").trigger('click');
    });

    $("#cod_myonoffswitch").click(function() {
        if (!$('.private-setting-switch input[name=onoffswitch]').is(':checked')) {
            $("#cod_description").addClass("hide");
        } else {
            $("#cod_description").removeClass("hide");
        }
    });

});


function readURL(input) {
    console.log(input.files[0])
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            console.log(e.target);
            var container = jQuery(".paymntcmn-logo-container");
            container.html('');
            var pImage = "<img src=" + e.target.result + " alt='image'>";
            container.append(pImage);
            jQuery(".browse-control[name=file_name]").val(input.files[0]['name']);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function save_payment_custom_method() {
    var e = false;
    jQuery('.required').removeClass('error-con1');

    jQuery('#payment-custom-content .required').each(function() {
        var tv = jQuery(this).val();
        if (jQuery.trim(tv) == '') {
            jQuery(this).addClass('error-con1');
            if (e == false) {
                jQuery(this).focus();
            }
            e = true;
        }
    });

    if (e == true) {
        return false;
    }
}
</script>
<script type="text/javascript" src="scripts/payments.js"></script>

<!-- end footer -->