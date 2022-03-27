<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

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
    <script type="text/javascript" src="js/jquery.maphilight.min.js"></script>

    <!-- map js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js"
        charset="utf-8"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.min.js" charset="utf-8"></script>
    <script src="js/jquery.mapael.js" charset="utf-8"></script>
    <script src="js/maps/france_departments.js" charset="utf-8"></script>
    <script src="js/maps/world_countries.js" charset="utf-8"></script>
    <script src="js/maps/usa_states.js" charset="utf-8"></script>

    <!-- custom js -->
    <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/custom.js"></script>
    <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/jquery.ddslick.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>


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
    <link href="https://bootstrap.arcadier.com/package/reverse/css/custom.css" rel="stylesheet" type="text/css">
    <!-- modal style-->
    <link href="https://bootstrap.arcadier.com/spacetime/css/modal.css" rel="stylesheet" type="text/css">
</head>

<body class="seller-items">
    <!-- header -->

    <div class="main">
        <div class="content-pages">
            <div class="container">
                <div id="payment" class="payment-con">

                    <h3>Payment</h3>
                    <div class="payment-middle-con row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="paymentMethod">Payment Method</label>
                                <select class="form-control required" name="payment" id="paymentScheme">
                                    <option value="stripe">Stripe</option>
                                    <option value="cod">Cash on Delivery</option>
                                </select>
                            </div>

                            <div class="common-text">
                                <p>You will be charged $<span id="charge-amount">{{ jobListCharge }} </span> to Submit
                                    a
                                    Quote</p>
                                <p>Upon clicking the Pay button, you will be re-directed to the Payment Gateway to
                                    continue with your transaction</p>

                            </div>

                            <div id="card-element" style="display:none"> </div>
                            <!-- Used to display Element errors. -->
                            <div id="card-errors" role="alert"></div>
                            <p id="card-errors"
                                style="margin-bottom: 10px; line-height: inherit; color: #eb1c26; font-weight: bold;">
                            </p>



                            <hr>
                        </div>

                    </div>

                    <div class="payment-bottom-con row">
                        <div class="next-tab-area pull-right">
                            <span class="seller-btn"> <a class="my-btn btn-clear" href="javascript:void(0);">Cancel</a>
                            </span>
                            <span class="seller-btn"> <a class="my-btn btn-red" id="paynowPackage"
                                    href="javascript:void(0);">Pay Now</a>
                            </span>
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
    <!-- footer -->

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






</body>

<!-- begin footer -->
<script type="text/javascript" src="scripts/scripts.js"></script>
<!-- end footer -->

</html>