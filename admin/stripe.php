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

<div class="page-content" id="stripe-payments-content">
    <div class="gutter-wrapper">
        <div class="page-topnav"> <a class="btn-back" href="index.php"><i class="icon icon-arrowleft"></i> Back</a>
        </div>
        <div class="panel-box">
            <div class="page-content-top">
                <div><i class="icon icon-stripelogo icon-3x"></i></div>
                <div class="page-pay-stripe">
                    <p><a class="info-link"
                            href="https://support.arcadier.com/hc/en-us/articles/115001376913-Setting-up-your-payment-gateway-Stripe-"
                            target="_blank"><i class="icon blue-info-icon"></i>&nbsp;&nbsp;How do I Connect to
                            Stripe?</a></p>
                    <p>Stripe payments are <span>SCA</span> compliant; however Stripe’s new authentication flow does not
                        currently not support multi-merchant checkouts. For more information on SCA, or how to
                        enable/disable the new flow, <a
                            href="https://arcadier.zendesk.com/hc/en-us/articles/360035530333">click here</a></p>
                </div>
                <div align="right"><a href="https://dashboard.stripe.com/login" target="_blank" id="go-analytics"
                        class="mybtn btn-blue">Login to Stripe</a></div>
            </div>
        </div>
        <div class="panel-box goo-panel-box">
            <div class="page-content-top">
                <div><i class="icon icon-pay_link1 icon-3x"></i></div>
                <div>
                    <p><span class="goo-translate-name">1. Link your Stripe account to your Marketplace</span></p>
                    <p class="payment-stripe-info">If you change your live secret keys, all your merchants will have to
                        <strong class="red-bold-strong">re-onboard</strong> to your <strong
                            class="red-bold-strong">new</strong> Stripe account before they can start selling again!
                    </p>
                </div>
                <div>&nbsp;</div>
            </div>
            <div class="page-content-btm">
                <form name="live_secret_key" id="live_secret_key" action="#">
                    <div class="tracking-id show-right-broder">
                        <p class="google-analytics-id-txt goo-lowercase"><span class="red-bold-strong">LIVE</span>
                            PUBLISHABLE KEY</p>
                        <input type="text" id="live-publishable-key" name="live-publishable-key" value=""
                            class="form-control required">
                        <p class="error"> </p>
                    </div>
                    <div class="tracking-id show-right-broder mt-20">
                        <p class="google-analytics-id-txt goo-lowercase"><span class="red-bold-strong">LIVE</span>
                            SECRET KEY</p>
                        <input type="text" id="live-secret-key" name="live-secret-key" value=""
                            class="form-control required">
                        <p class="errorSecret"> </p>
                    </div>
                    <div class="mt-20">
                        <div id="save-btn"><input type="button" onclick="MakeUneditable()" class="link-id-btn"
                                value="Save" name="save"></div>
                        <div id="edit-btn" style="display:none"><input type="button" onclick="SaveConfirm()"
                                class="link-id-btn" value="Edit" name="save"></div>
                    </div>
                    <div class="mt-10">&nbsp;</div>
                </form>
            </div>
        </div>
        <!-- <div class="analytics-panels">
          <div class="panel-box goo-panel-box active">
            <div class="panel-box-title">
              <h3>Where can I find my Live Secret Key and my Live Publishable Key?</h3>
              <div class="pull-right"><a class="panel-toggle" href="javascript:void(0);"><i class="icon icon-toggle"></i></a></div>
              <div class="clearfix"></div>
            </div>
            <div class="panel-box-content" style="display: none;">
              <ul class="ul-display-desimal">
				<li>Login to your Stripe Account at <a href="https://dashboard.stripe.com/">https://dashboard.stripe.com/</a></li>
                <li>Once in the dashboard, click API on the left-hand side.<br/>You will see 2 API keys; <strong>live publishable key</strong> and <strong>live secret key</strong></li>
                <img src="images/stripe1.jpg" class="goo-img-size">
                <li>Copy these keys and paste them into their respective fields above and once done, click <strong>Save</strong>
				
              </ul>
				 <div class="extra-text">
					<span class="underline-bold">Do note that when linking your Stripe keys, be careful to only drag, copy and paste the exact characters
					needed under each field.</span>
					<p class="desc">Dragging, copy and paste extra characters will result in errors when your sellers on-board onto your marketplace.
					Refer to the screenshots below for examples of what is correct and incorrect.</p>
					<div class="direction">
						<span class="wrong">Incorrect: <p>drag, copy & paste extra characters</p></span>
						 <img src="images/extra1.jpg" class="direction-img-size">
					</div>
					<div class="direction">
						<span class="correct">Correct: <p>drag, copy & paste extra characters</p></span>
						 <img src="images/extra2.jpg" class="direction-img-size">
					</div>
				</div>
            </div>
          </div>
        </div> -->
        <div class="panel-box goo-panel-box">
            <div class="page-content-top">
                <div><i class="icon icon-pay_link2 icon-3x"></i></div>
                <div> <span class="goo-translate-name">2. Connect your Marketplace into Stripe</span> </div>
                <div>&nbsp;</div>
            </div>
            <div class="page-content-btm">
                <form name="connect-stripe-marketplace" id="connect-stripe-marketplace" action="">
                    <div class="tracking-id show-right-broder">
                        <p class="google-analytics-id-txt goo-lowercase">YOUR MARKETPLACE NAME</p>
                        <input type="text" class="form-control readonly-italic" value="Arcadier-marketplacename"
                            readonly="readonly">
                    </div>
                    <div class="tracking-id show-right-broder mt-20">
                        <p class="google-analytics-id-txt goo-lowercase">YOUR WEBSITE URL</p>
                        <input type="text" class="form-control readonly-italic" value="examplemarketplace.arcadier.com"
                            readonly="readonly">
                    </div>
                    <div class="tracking-id show-right-broder mt-20">
                        <p class="google-analytics-id-txt goo-lowercase"><span class="red-bold-strong">PRODUCTION</span>
                            CLIENT ID</p>
                        <input type="text" name="production-clientt-id" id="production-client-id"
                            class="form-control required" value="">
                    </div>
                    <div class="tracking-id show-right-broder mt-20">
                        <p class="google-analytics-id-txt goo-lowercase">YOUR REDIRECT URL</p>
                        <input type="text" class="form-control readonly-italic"
                            value="examplemarketplace.arcadier.com/checkout" readonly="readonly">
                    </div>
                    <div class="mt-20">
                        <div id="connect-save-btn"><input type="button" class="link-id-btn" value="Save" name="save"
                                onclick="MakeConnectStripeUnedit()"></div>
                        <div id="connect-edit-btn" style="display:none"><input type="button" class="link-id-btn"
                                value="Edit" name="connect-edit" onclick="SaveConnectStripeConfirm()"></div>
                    </div>
                </form>
            </div>
        </div>
        <!-- <div class="analytics-panels">
          <div class="panel-box goo-panel-box active">
            <div class="panel-box-title">
              <h3>How do I connect to Stripe?</h3>
              <div class="pull-right"><a class="panel-toggle" href="javascript:void(0);"><i class="icon icon-toggle"></i></a></div>
              <div class="clearfix"></div>
            </div>
            <div class="panel-box-content" style="display: none;">
              <ul class="ul-display-desimal">
			  
                <li>Go back to your Stripe dashboard and click <strong>Connect</strong> on the left-hand side 
After which, select <strong>Settings</strong> and <strong>Register your platform</strong></li>
                <img src="images/stripe2.jpg" class="goo-img-size">
                <li>Scroll down and enter your <strong>Marketplace Name</strong>, the <strong>Website URL</strong>, and your <strong>Marketplace Logo</strong>
that was attained previously into the fields under Standalone account</li>
                <img src="images/stripe3.jpg" class="goo-img-size">
                <li>Copy the Live Mode <strong>Client ID</strong> after scrolling back up and paste it under the Production Client ID field in the admin portal</li>
                <img src="images/stripe4.jpg" class="goo-img-size">
				<li>Copy the <strong>redirect URL</strong> in your admin portal and paste it under the respective field in your <strong>Stripe dashboard</strong></li>
				<li>Once done, click <strong>Save</strong> and you are done.<br/>
Do verify your Stripe account via email if you created a new account for this procedure</li>
                
              </ul>
            </div>
          </div>
        </div> -->
        <p>&nbsp;</p>
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