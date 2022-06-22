<?php
include 'callAPI.php';
include 'admin_token.php';
$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);

$custom_code = $content['code'];

$baseUrl = getMarketplaceBaseUrl();
$admin_token = getAdminToken();
$customFieldPrefix = getCustomFieldPrefix();

$url = $baseUrl . '/api/v2/users/';
$result = callAPI("GET", $admin_token['access_token'], $url, false);
$userId = $result['ID'];

$url = $baseUrl . '/api/v2/marketplaces/';
$marketplaceInfo = callAPI("GET", $admin_token['access_token'], $url, false);

$stripe = [];
$api_key;
$pub_key;
$client_id;

foreach ($marketplaceInfo['CustomFields'] as $customfield) {

    if ($customfield['Name'] == 'stripe_api_key') {

         $api_key =  $customfield['Values'][0];
        
    }

     if ($customfield['Name'] == 'stripe_pub_key') {

         $pub_key =  $customfield['Values'][0];
        
    }

    if ($customfield['Name'] == 'stripe_client_id') {

         $client_id =  $customfield['Values'][0];
        
    }

}

  echo json_encode(['result' => array('api_key' => $api_key, 'pub_key' => $pub_key, 'client_id' => $client_id)]);