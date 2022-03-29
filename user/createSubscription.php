<?php
include 'callAPI.php';
//include 'admin_token.php';


require 'api.php';
$API = new API();

$packageId = $API->getPackageID();


$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);

$baseUrl = getMarketplaceBaseUrl();
$admin_token =  $API->AdminToken();
$userToken = $_COOKIE["webapitoken"];
$customFieldPrefix = getCustomFieldPrefix();

$customer_id = $content['customer_id'];
$payment_id = $content['payment_id'];
//$coupon_id = $content['coupon_id'];
// Query to get marketplace id
$url = $baseUrl . '/api/v2/marketplaces/';
$marketplaceInfo = callAPI("GET", null, $url, false);
$stripe_secret_key = getSecretKey();
require_once('stripe-php/init.php');
\Stripe\Stripe::setApiKey($stripe_secret_key);

// $plan_id='';
// $plan_data= [];
// foreach ($marketplaceInfo['CustomFields'] as $cf) {
//     if ($cf['Name'] == 'plan_id' && substr($cf['Code'], 0, strlen($customFieldPrefix)) == $customFieldPrefix) {
//         $plan_id = $cf['Values'][0];
//     }
// }
      $stripe = new \Stripe\StripeClient($stripe_secret_key);
        try {
          $payment_method = $stripe->paymentMethods->retrieve(
              $payment_id
          );
          $payment_method->attach([
            'customer' => $customer_id,
          ]);
        // echo json_encode(['result' =>  $attach]);

        } catch (Exception $e) {
          //return $response->withJson($e->jsonBody);
          echo json_encode(['result' => $e]);
        }

  // Set the default payment method on the customer
 $update = $stripe->customers->update($customer_id, [
    'invoice_settings' => [
      'default_payment_method' => $payment_id
    ]
  ]);
  echo json_encode(['result' =>  $update]);


   $freelancer_id = $update->name;


     $templates = array(array('Name' => 'user_id', "Operator" => "in",'Value' =>  $freelancer_id));
    $url =  $baseUrl . '/api/v2/plugins/'. $packageId .'/custom-tables/freelancer_details';
    $templateDetails =  callAPI("POST", $admin_token, $url, $templates);

    $userId = $templateDetails['Records'][0]['Id'];

     $freelancer_details = [
            
        'stripe_payment_id' =>  $update->id

    ];
    
    $response = $API->editRowEntry($packageId, 'freelancer_details', $userId, $freelancer_details);

    echo json_encode(['result' =>  $response]);

 // Create the subscription
//  $subscription = $stripe->subscriptions->create([
//     'customer' => $customer_id,
//     'items' => [
//       [
//         'price' => $plan_id ,
//       ],
//     ],
//     'coupon' => $coupon_id,
//     'expand' => ['latest_invoice.payment_intent'],
//   ]);

//  // return $response->withJson($subscription);

//   echo json_encode(['result' => $subscription]);


?>