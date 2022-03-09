<?php

require_once('stripe-php/init.php');

include 'callAPI.php';
include 'admin_token.php';

$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);
$token = $content['token']['id'];
error_log($token);

$baseUrl = getMarketplaceBaseUrl();
$stripe_secret_key = getSecretKey();

\Stripe\Stripe::setApiKey($stripe_secret_key);

// This is a $20.00 charge in US Dollar.
$charge = \Stripe\Charge::create(
array(
'amount' => 2000,
'currency' => 'usd',
'source' => $token
)
);

 echo json_encode($charge);
error_log($charge);