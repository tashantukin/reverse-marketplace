<?php
require_once('stripe-php/init.php');

include 'callAPI.php';
include 'admin_token.php';
$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);
$code = $content['code'];
$baseUrl = getMarketplaceBaseUrl();
$stripe_secret_key = getSecretKey();

\Stripe\Stripe::setApiKey($stripe_secret_key);
$response = \Stripe\OAuth::token([
  'grant_type' => 'authorization_code',
  'code' => $code,
]);

// Access the connected account id in the response
$connected_account_id = $response->stripe_user_id;

echo json_encode($response);
 ?>