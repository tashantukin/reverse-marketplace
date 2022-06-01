<!DOCTYPE html>
<html lang="en">

<head>

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
        <!-- nicescroll js -->
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
        <link href="https://bootstrap.arcadier.com/adminportal_pre/css/bootstrap.min.css" rel="stylesheet"
            type="text/css">
        <link href="https://bootstrap.arcadier.com/adminportal_pre/css/jquery-ui.min.css" rel="stylesheet"
            type="text/css">
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
</head>

<div class="page-content">
    <div class="gutter-wrapper">
        <div class="page-topnav"> <a class="btn-back" href="index.php"><i class="icon icon-arrowleft"></i> Back</a>
        </div>
        <div class="panel-box">
            <div class="page-content-top">

            </div>
        </div>
        <div class="panel-box goo-panel-box">

            <div class="page-content-btm">
                <form name="live_secret_key" id="live_secret_key" action="#">
                    <div class="tracking-id show-right-broder">
                        <p class="google-analytics-id-txt goo-lowercase"><span class="red-bold-strong">CUSTOM TABLE
                                NAME</span>
                        </p>
                        <input type="text" id="table-name" name="" value="" class="form-control required">
                        <p class="error"> </p>
                    </div>

                    <input type="button" onclick="" class="link-id-btn" value="Delete All data" name="save"
                        id="delete-data">
            </div>

            </form>
        </div>
    </div>

</div>
</div>


<script type="text/javascript">
// Struip connect functions
function MakeConnectStripeUnedit() {
    var e = false;
    jQuery("#connect-stripe-marketplace .required").each(function() {
        var val = jQuery(this).val();
        var attr = jQuery(this).attr('id');
        if (jQuery.trim(val) == '') {
            e = true;
            jQuery(this).addClass('error-con');
        }

    });
    if (!e) {
        jQuery("#production-clientt-id").prop("readonly", true);
        jQuery("#connect-save-btn").hide();
        jQuery("#connect-edit-btn").show();
    }
}

function SaveConnectStripeConfirm() {
    var e = false;
    jQuery("#live_secret_key .required").each(function() {
        var val = jQuery(this).val();
        var attr = jQuery(this).attr('id');
        if (jQuery.trim(val) == '') {
            e = true;
            jQuery(this).addClass('error-con');
        }

    });
    if (!e) {
        jQuery("#cover").fadeIn();
        jQuery("#connect-stripe-account").fadeIn();
    }
}

function popupCoonectStrip_ok() {
    jQuery("#cover").fadeOut();
    jQuery("#connect-stripe-account").fadeOut();
    jQuery("#production-clientt-id").prop("readonly", false);
    jQuery("#connect-edit-btn").hide();
    jQuery("#connect-save-btn").show();
}
// End stripe connect functions

// Set link stripe functions
function popupConfirm_close(closeid) {
    jQuery("#cover").fadeOut();
    jQuery("#" + closeid).fadeOut();
}

function popupConfirm_ok() {
    jQuery("#cover").fadeOut();
    jQuery("#link-stripe-account").fadeOut();
    jQuery("#live-secret-key").prop("readonly", false);
    jQuery("#live-publishable-key").prop("readonly", false);
    jQuery("#edit-btn").hide();
    jQuery("#save-btn").show();
}

// function MakeUneditable() {
//     var e = false;
//     jQuery("#live_secret_key .required").each(function() {
//         var val = jQuery(this).val();
//         var attr = jQuery(this).attr('id');
//         if (jQuery.trim(val) == '') {
//             e = true;
//             jQuery(this).addClass('error-con');
//         }

//     });
//     if (!e) {
//         jQuery("#live-secret-key").prop("readonly", true);
//         jQuery("#live-publishable-key").prop("readonly", true);
//         jQuery("#save-btn").hide();
//         jQuery("#edit-btn").show();
//     }

// }

function SaveConfirm() {
    var e = false;
    jQuery("#live_secret_key .required").each(function() {
        var val = jQuery(this).val();
        var attr = jQuery(this).attr('id');
        if (jQuery.trim(val) == '') {
            e = true;
            jQuery(this).addClass('error-con');
        }

    });
    if (!e) {
        jQuery("#cover").fadeIn();
        jQuery("#link-stripe-account").fadeIn();
    }
}
// End set live key function

function login_paypal(email) {
    jQuery('#paypalLogin').modal('show');
}
jQuery(document).ready(function() {
    jQuery(".required").focus(function() {
        jQuery(this).removeClass('error-con');
    });
    jQuery(".mobi-header .navbar-toggle").click(function(e) {
        e.preventDefault();
        jQuery("body").toggleClass("sidebar-toggled");
    });
    jQuery(".navbar-back").click(function() {
        jQuery(".mobi-header .navbar-toggle").trigger('click');
    });


});

jQuery(".panel-box-title").click(function() {
    jQuery(this).parents('.panel-box').toggleClass('active');
    jQuery(this).parents('.panel-box').find('.panel-box-content').slideToggle();
});
</script>
<script type="text/javascript" src="js/custom-nicescroll.js"></script>

<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.js"></script>
<script type="text/javascript" src="scripts/payments.js"></script>
<script type="text/javascript" src="scripts/delete.js"></script>