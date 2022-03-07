<?php
include 'callAPI.php';
include 'admin_token.php';
$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);

$api_key = $content['secretKey'];
$account_url = $content['publishableKey'];
$client_id = $content['client-id'];
$baseUrl = getMarketplaceBaseUrl();
$admin_token = getAdminToken();
$customFieldPrefix = getCustomFieldPrefix();

// Query to get marketplace id
$url = $baseUrl . '/api/v2/marketplaces/';
$marketplaceInfo = callAPI("GET", null, $url, false);

// Query to get package custom fields
$url = $baseUrl . '/api/developer-packages/custom-fields?packageId=' . getPackageID();
$packageCustomFields = callAPI("GET", $admin_token['access_token'], $url, false);

$ApiKey = '';
$AccountURL = '';
$clientKey = "";

foreach ($packageCustomFields as $cf) {

    if ($cf['Name'] == 'stripe_api_key' && substr($cf['Code'], 0, strlen($customFieldPrefix)) == $customFieldPrefix) {
        $ApiKey = $cf['Code'];
    }

    if ($cf['Name'] == 'stripe_pub_key' && substr($cf['Code'], 0, strlen($customFieldPrefix)) == $customFieldPrefix) {
        $pubKey  = $cf['Code'];
    }
    if ($cf['Name'] == 'stripe_client_id' && substr($cf['Code'], 0, strlen($customFieldPrefix)) == $customFieldPrefix) {
        $clientKey  = $cf['Code'];
    }
    
}
$data = [
    'CustomFields' => [
        [
            'Code' => $ApiKey,
            'Values' => [$api_key],
        ],
        [
            'Code' =>  $pubKey,
            'Values' => [$account_url],
        ],

        [
            'Code' => $clientKey,
            'Values' => [$client_id],
        ] 

    ],
];

echo json_encode(['data' =>  $data]);

$url = $baseUrl . '/api/v2/marketplaces/';
$result = callAPI("POST", $admin_token['access_token'], $url, $data);
 echo json_encode(['result' =>  $result]);




?>