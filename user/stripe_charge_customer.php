<?php
require 'api.php';
$API = new API();
$packageId = $API->getPackageID();

require_once('stripe-php/init.php');

include 'callAPI.php';
//include 'admin_token.php';

$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);
//$token = $content['token']['id'];
$customer_id = $content['customerId'];
$amount = $content['amount'];
$quoteId = $content['quoteId'];
$freelancer_quote_id = $content['freelancerQuoteId'];
error_log($token);

$baseUrl = getMarketplaceBaseUrl();
$stripe_secret_key = getSecretKey();

\Stripe\Stripe::setApiKey($stripe_secret_key);

$stripe = new \Stripe\StripeClient(
  $stripe_secret_key
);
$customer= $stripe->customers->retrieve(
  $customer_id,
  []
);
// error_log(json_encode($customer));

$payment =  $customer->invoice_settings->default_payment_method;

// This is a $20.00 charge in US Dollar.
$charge = \Stripe\PaymentIntent::create(
array(
'amount' => $amount,
'currency' => 'usd',
'customer' => $customer_id,
'setup_future_usage' => 'on_session',
'payment_method' => $payment,
'payment_method_types' => ['card']
)
);

echo json_encode($charge);
error_log($charge);


if ($quoteId) { 
    $quote_details = [
        'buyer_view_paid' => 'TRUE'
        
    ];
   // error_log($freelancer_details);
    error_log($content['Id']);

   // $packageId, $tableName, $rowId, $data)
   // $response = $API->editRowEntry($packageId, 'job_cache', $content['Id'], $job_details);

    $response = $API->editRowEntry($packageId, 'job_quotes', $quoteId, $quote_details);
}

if ($freelancer_quote_id) { 
    $quote_details = [
        'seller_view_paid' => 'TRUE'
        
    ];
   // error_log($freelancer_details);
    error_log($content['Id']);

   // $packageId, $tableName, $rowId, $data)
   // $response = $API->editRowEntry($packageId, 'job_cache', $content['Id'], $job_details);

    $response = $API->editRowEntry($packageId, 'freelancer_quotes', $freelancer_quote_id, $quote_details);
}