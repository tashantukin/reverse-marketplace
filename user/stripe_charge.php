<?php
require 'api.php';
$API = new API();
$packageId = $API->getPackageID();

require_once('stripe-php/init.php');

include 'callAPI.php';
//include 'admin_token.php';

$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);
$token = $content['token']['id'];
$amount = $content['amount'];
$quoteId = $content['quoteId'];
error_log($token);

$baseUrl = getMarketplaceBaseUrl();
$stripe_secret_key = getSecretKey();

\Stripe\Stripe::setApiKey($stripe_secret_key);

// This is a $20.00 charge in US Dollar.
$charge = \Stripe\Charge::create(
array(
'amount' => $amount,
'currency' => 'usd',
'source' => $token
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